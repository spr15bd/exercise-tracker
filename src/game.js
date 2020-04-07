import Player from "./player.js";
import Bullet from "./bullet.js";
import Bonus from "./bonus.js";
import Explosion from "./explosion.js";
import Input from "./input";
import Level from "./level";
import Sound from "./sound";
import Text from "./text.js";
import Title from "./title.js";

const GAMESTATE = {
  MENU: 0,
  GAMEINPROGRESS: 1,
  GAMEOVER: 2
};

export default class Game {
  constructor(screenWidth, screenHeight) {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "/starbackground.png";
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.playerLaser = new Sound("/sounds/laser.m4a", 3, 0.1);
    this.enemyExplosion = new Sound("/sounds//enemyExplosion.m4a", 3, 0.25);
    this.playerExplosion = new Sound("/sounds//explosion.m4a", 3, 0.15);
    this.mothershipExplosion = new Sound("/sounds/randomize79.m4a", 3, 0.15);
    this.player = new Player(this.screenWidth, this.screenHeight, this);
    new Input(this.player, this);
    this.screen = -1;
    this.gameState = GAMESTATE.MENU; // initially show the menu screen
    this.bulletPool = []; // array for enemy and player bullets
    this.stats = document.getElementById("stats");
    this.score = document.getElementById("score");
    this.lives = document.getElementById("lives");
    this.hiscore = document.getElementById("hiscore");
    this.titleText = new Title(
      this.screenWidth / 2 - 150,
      800,
      300,
      160,
      "./title.png"
    );
    this.text0 = new Text(
      this.screenWidth / 2 - 47,
      230,
      10,
      24,
      0,
      "/captions.png"
    );

    this.text1 = new Text(
      this.screenWidth / 2 - 47,
      300,
      10,
      24,
      1,
      "/captions.png"
    );

    this.text2 = new Text(
      this.screenWidth / 2 - 47,
      324,
      10,
      24,
      2,
      "/captions.png"
    );
    this.text3 = new Text(
      this.screenWidth / 2 - 47,
      348,
      10,
      24,
      3,
      "/captions.png"
    );

    this.text4 = new Text(
      this.screenWidth / 2 - 102,
      372,
      10,
      24,
      4,
      "/captions.png"
    );

    this.text5 = new Text(
      this.screenWidth / 2 - 103,
      442,
      10,
      24,
      5,
      "/captions.png"
    );
    this.enemies = [];
    this.blocks = [];
  }

  initialiseGame() {
    this.bonusCaption = null;
    this.currentStage = 0;
    this.playerBulletSpeed = -120;
    this.enemyBulletSpeed = 150;
    this.levelComplete = true;
    this.player.paused = true;
    this.player.isVisible = true;
    this.screen++;
    this.lastPlayerBulletTimeStamp = 0;
    this.delayOver = true; // set to true whenever a delay is over
    this.enemyCharging = false;
    this.explosions = [];
    this.explosion = null;
    this.exitAngle = 0;
    this.exitPos = {
      x: 0,
      y: 0
    };
    this.enemyAttacking = 0;
    this.nextDistance = 0;
    this.backgroundImage.yPos = -600;
    this.level = new Level(this.screen, this.screenWidth, this.screenHeight); // initialise the first level
    this.enemies = this.level.getEnemies();
    this.blocks = this.level.getBlocks(); // ...and an array of blocks and their positions
    this.enemyCharging = false;
    this.chargingEnemy = Math.floor(Math.random() * this.enemies.length);
    this.waiting = false;
    this.delayOver = this.screen === 0 ? true : false;
    this.queenDead = false;
    this.bulletPool = []; // array for enemy and player bullets
    // set bullets to zero here so that any previous level bullets don't
    // interfere with new level
    this.level.startEnemyWaveCycle1 = Date.now();
    this.bonusTime = false; // when true a bonus alien may momentarily appear at the top of the screen
  }

  start() {
    if (this.gameState === GAMESTATE.MENU) {
      this.initialiseGame();

      this.gameState = GAMESTATE.GAMEINPROGRESS;
    }
  }

  gameOver() {
    this.screen = -1;
    this.bulletPool = null;
    this.explosions = [];
    this.gameState = GAMESTATE.GAMEOVER;
  }

  shootBullet(entity) {
    if (this.gameState === GAMESTATE.GAMEINPROGRESS) {
      if (entity === this.player && !entity.paused && entity.isVisible) {
        // do not allow a player bullet to be fired until a specified time has elapsed
        if (Date.now() - this.lastPlayerBulletTimeStamp > 300) {
          this.bulletPool.push(
            new Bullet(
              entity.position.x + entity.width / 2,
              entity.position.y,
              this.playerBulletSpeed, // speed of player bullets
              entity.bulletImage
            )
          );

          this.playerLaser.play();
          this.lastPlayerBulletTimeStamp = Date.now();
        }
      } else if (entity.inPlay && !entity.paused) {
        this.bulletPool.push(
          new Bullet(
            entity.position.x + entity.width / 2,
            entity.position.y,
            this.enemyBulletSpeed, // speed of enemy bullets
            entity.bulletImage
          )
        );
      }
    }
  }

  update(delta) {
    if (this.gameState === GAMESTATE.MENU) {
      if (this.titleText.position.y >= 40) this.titleText.position.y -= 5;
      this.text0.update(delta);
      if (this.text0.completed) {
        this.text1.update(delta);
      }
      if (this.text1.completed) {
        this.text2.update(delta);
      }
      if (this.text2.completed) {
        this.text3.update(delta);
      }
      if (this.text3.completed) {
        this.text4.update(delta);
      }
      if (this.text4.completed) {
        this.text5.update(delta);
      }
    }

    if (this.gameState !== GAMESTATE.GAMEINPROGRESS) {
      return;
    }

    // update player
    if (this.player != null) this.player.update(delta);
    // update blocks

    this.blocks.forEach(block => {
      if (this.queenDead) {
        block.moveTo(Math.random() * 800, -200, delta, delta);
        this.mothershipExplosion.play();
      }
      block.update(delta);

      //block.speed.x = 0;
    });
    // update enemies
    this.moveEnemies(delta);
    // update collisions
    this.checkForCollisions(delta);
    // update explosions
    this.checkForExplosions(delta);

    if (this.bonusCaption != null) {
      this.bonusCaption.update(delta);
    }
    if (!this.bonusTime && !this.levelComplete) {
      if (Math.random() > 0.999) {
        this.bonusTime = true;
        this.level.getBonusEnemy(9);
        //console.log("getting bonus enemy");
      }
    }

    // when all enemies defeated, thrust the player ship upward a few seconds & move to next level
    if (this.levelComplete) {
      if (this.delayOver) {
        this.thrust();
      } else {
        this.delay(2000, () => {
          this.delayOver = true;
        });
      }
    }
  }

  thrust() {
    if (this.backgroundImage.yPos < 0) {
      this.enemies.forEach(enemy => {
        enemy.position.y += 3;
      });
      this.blocks.forEach(block => {
        block.position.y += 3;
      });
      // do the between levels player thrust upwards routine
      this.backgroundImage.yPos += 3;
    } else {
      // initial player thrust is now over

      // when the player first meets the enemies they are paused for a short time
      this.delay(300, () => {
        this.backgroundImage.yPos = -600;
        this.levelComplete = false;
        this.enemies.forEach(enemy => {
          enemy.paused = false;
        });

        this.player.paused = false;
      });

      // wait a couple of seconds, reset variables and start a new level...
      // move the background image back above the screen ready for the end of the next level
      // (top and bottom half of the background image are the same so the change is unnoticeable)
    }
  }

  draw(ctx) {
    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.screenWidth, this.screenHeight);

      ctx.fillStyle = "black";
      ctx.fill();
      ctx.textAlign = "center";
      ctx.fillStyle = "#e61ce1";
      ctx.font = "18px consolas sans mono";
      /*
      ctx.fillText(
        "Controls",
        this.screenWidth / 2,
        this.screenHeight / 2 - 40
      );
      */
      ctx.fillStyle = "#a21ce6";
      /*ctx.fillText(
        "Use keyboard arrows to move left and right, and <ctrl> to fire.",
        this.screenWidth / 2,
        this.screenHeight / 2 + 20
      );*/
      ctx.fillStyle = "#741ce6";
      /*ctx.fillText(
        "Press <space> to start. Good luck an' go ahead!",
        this.screenWidth / 2,
        this.screenHeight / 2 + 80
      );*/
      this.titleText.draw(ctx);
      this.text0.draw(ctx);
      this.text1.draw(ctx);
      this.text2.draw(ctx);
      this.text3.draw(ctx);
      this.text4.draw(ctx);

      this.text5.draw(ctx);
      document.getElementById("game-screen").focus();
    } else if (this.gameState === GAMESTATE.GAMEINPROGRESS) {
      this.stats.style.display = "flex";
      this.drawBackground(ctx);
      this.player.draw(ctx);

      if (this.blocks.length > 0) {
        this.blocks.forEach(block => {
          block.draw(ctx);
        });
      }
      this.enemies.forEach(enemy => {
        enemy.draw(ctx);
      });
      if (this.bonusCaption != null) this.bonusCaption.draw(ctx);
      if (this.bulletPool.length > 0) {
        this.bulletPool.forEach(bullet => {
          bullet.draw(ctx);
        });
      }
      this.lives.innerHTML = this.player.lives;
      this.score.innerHTML = this.player.score;
      this.hiscore.innerHTML = this.player.hiscore;
      this.explosions.forEach(explosion => {
        explosion.draw(ctx);
      });
    } else if (this.gameState === GAMESTATE.GAMEOVER) {
      this.drawBackground(ctx);
      ctx.textAlign = "center";
      ctx.fillStyle = "#e61ce1";
      ctx.font = "24px dejavu sans mono";
      ctx.fillText("Game Over", this.screenWidth / 2, this.screenHeight / 2);
      // wait 3 seconds then load up the menu screen
      this.delay(3000, () => {
        this.gameState = GAMESTATE.MENU;
      });
    }
  }

  moveEnemies(delta) {
    if (!delta) return;

    this.enemies.forEach((enemy, i) => {
      if (enemy.paused) return;
      if (
        (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
          (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) <=
        100000
      ) {
        enemy.inPlay = true;
      }
      if (Math.random() > 0.995) {
        this.shootBullet(enemy);
      }

      if (enemy.enemyType === 0) {
        enemy.speed.x = 5 * Math.cos((enemy.angle * Math.PI) / 180);
        enemy.speed.y = 5 * Math.sin((enemy.angle * Math.PI) / 180);

        enemy.position.x = Math.ceil(enemy.position.x) + enemy.speed.x;
        enemy.position.y = Math.floor(enemy.position.y) + enemy.speed.y;

        if (Math.random() > 0.995) {
          this.shootBullet(enemy);
        }
        if (
          enemy.inPlay &&
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
            (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
              (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) >
            400000
        ) {
          enemy.position.x = this.screenWidth;
          enemy.position.y = this.screenHeight / 2;
          enemy.angle = 180;
          enemy.inPlay = false;
        } else if (
          enemy.inPlay &&
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
            (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
              (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) >
            100000
        ) {
          enemy.rotate(-2);
        }
      } else if (enemy.enemyType === 1) {
        enemy.speed.x = 5 * Math.cos((enemy.angle * Math.PI) / 180);
        enemy.speed.y = 5 * Math.sin((enemy.angle * Math.PI) / 180);

        enemy.position.x = Math.floor(enemy.position.x) + enemy.speed.x;
        enemy.position.y = Math.floor(enemy.position.y) + enemy.speed.y;
        if (
          enemy.inPlay &&
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
            (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
              (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) >
            400000
        ) {
          enemy.position.x = this.screenWidth;
          enemy.position.y = this.screenHeight / 2;
          enemy.angle = 180;
          enemy.inPlay = false;
        } else if (
          enemy.inPlay &&
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
            (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
              (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) >
            100000
        ) {
          enemy.rotate(1.5);
        }
      } else if (enemy.enemyType === 2) {
        if (enemy.movement === 0) {
          enemy.moveTo(
            400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
            enemy.start.y + 600,
            delta,
            delta
          );
          if (Date.now() - this.level.startEnemyWaveCycle >= 10000) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 1) {
          if (
            enemy !==
            this.enemies.filter(item => item.enemyType === 2)[
              this.enemyAttacking
            ]
          ) {
            enemy.moveTo(
              400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
              enemy.position.y,
              delta,
              delta
            );
          } else {
            // enemy swoop...
            enemy.position.y += 20 * (delta / 1000);
            enemy.moveTo(
              260 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
              this.player.position.y - 150,
              delta,
              delta
            );
            if (Math.random() > 0.85) {
              this.shootBullet(enemy);
            }
            if (enemy.position.y >= this.player.position.y - 150) {
              enemy.movement = 2;
            }
          }
        } else if (enemy.movement === 2) {
          if (
            enemy !==
            this.enemies.filter(item => item.enemyType === 2)[
              this.enemyAttacking
            ]
          ) {
            enemy.moveTo(
              400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
              enemy.position.y,
              delta,
              delta
            );
          } else {
            enemy.moveTo(
              this.player.position.x - 150,
              this.player.position.y - 150,
              delta * 2,
              delta * 2
            );
            if (Math.random() > 0.9) {
              this.shootBullet(enemy);
            }
            if (
              Math.abs(enemy.position.x - (this.player.position.x - 150)) <
                30 &&
              Math.abs(enemy.position.y - (this.player.position.y - 150)) < 30
            ) {
              enemy.movement = 3;
            }
          }
        } else if (enemy.movement === 3) {
          if (
            enemy !==
            this.enemies.filter(item => item.enemyType === 2)[
              this.enemyAttacking
            ]
          ) {
            enemy.moveTo(
              400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
              enemy.position.y,
              delta,
              delta
            );
          } else {
            enemy.moveTo(
              this.player.position.x + 150,
              this.player.position.y - 150,
              delta * 2,
              delta * 2
            );
            if (Math.random() > 0.95) {
              this.shootBullet(enemy);
            }
            if (
              Math.abs(enemy.position.x - (this.player.position.x + 150)) <
                30 &&
              Math.abs(enemy.position.y - (this.player.position.y - 150)) < 30
            ) {
              enemy.movement = 4;
            }
          }
        } else if (enemy.movement === 4) {
          // finish enemy swoop, move enemy back into formation
          if (
            enemy !==
            this.enemies.filter(item => item.enemyType === 2)[
              this.enemyAttacking
            ]
          ) {
            enemy.moveTo(
              400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
              enemy.position.y,
              delta,
              delta
            );
          } else {
            enemy.moveTo(
              400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
              enemy.start.y + 600,
              delta,
              delta * 1.5
            );
            if (Math.abs(enemy.position.y - (600 + enemy.start.y)) < 5) {
              enemy.moveTo(
                400 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
                enemy.start.y + 600,
                delta,
                delta * 20
              );
              enemy.movement = 0;
              this.level.startEnemyWaveCycle = Date.now();
              this.enemyAttacking += 1;
              if (
                this.enemyAttacking >=
                this.enemies.filter(item => item.enemyType === 2).length
              ) {
                this.enemyAttacking = 0;
              }
            }
          }
        }
      } else if (enemy.enemyType === 3) {
        if (enemy.movement === 0) {
          enemy.moveTo(
            424 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
            enemy.start.y + 600,
            delta,
            delta
          );

          if (
            Date.now() - this.level.startEnemyWaveCycle1 >= 10000 &&
            enemy.position.x >= enemy.start.x
          ) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 1) {
          enemy.position.y += 130 * (delta / 1000);
          if (Math.abs(enemy.position.y - (600 + enemy.start.y)) > 150) {
            enemy.movement = 2;
          }
        } else if (enemy.movement === 2) {
          enemy.angle = 0;
          enemy.position.x -= 250 * (delta / 1000);
          if (enemy.position.x < 0) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 3) {
          enemy.angle = 180;
          enemy.position.x += 250 * (delta / 1000);
          if (enemy.position.x > this.screenWidth) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 4) {
          enemy.angle = 270;
          enemy.moveTo(
            424 * Math.sin(Date.now() * 0.0015) + enemy.start.x,
            enemy.start.y + 600,
            delta,
            delta * 2
          );
          if (Math.abs(enemy.position.y - (enemy.start.y + 600)) < 5) {
            this.level.startEnemyWaveCycle1 = Date.now();
            enemy.movement = 0;
          }
        }
      } else if (enemy.enemyType === 4) {
        enemy.speed.x = 7 * Math.cos((enemy.angle * Math.PI) / 180);
        enemy.speed.y = 7 * Math.sin((enemy.angle * Math.PI) / 180);

        enemy.position.x = Math.floor(enemy.position.x) + enemy.speed.x;
        enemy.position.y = Math.floor(enemy.position.y) + enemy.speed.y;
        if (enemy.angle <= 0) {
          enemy.angle += 360;
        }

        if (
          Math.random() > 0.95 &&
          Math.abs(enemy.position.x - this.player.position.x) < 100
        ) {
          this.shootBullet(enemy);
        }
        if (
          enemy.inPlay &&
          (enemy.position.x < -300 ||
            enemy.position.x + enemy.width > this.screenWidth + 300 ||
            enemy.position.y < -300 ||
            enemy.position.y + enemy.height > this.screenHeight + 300)
        ) {
          enemy.position.x = this.screenWidth;
          enemy.position.y = this.screenHeight / 2;
          enemy.angle = 180;
          enemy.inPlay = false;
        } else if (
          enemy.inPlay &&
          (enemy.position.x < 100 ||
            enemy.position.x + enemy.width > this.screenWidth - 100 ||
            enemy.position.y < 100 ||
            enemy.position.y + enemy.height > this.screenHeight - 100)
        ) {
          if (enemy.position.x < 100) {
            if (enemy.angle < 180) {
              enemy.rotate(-2);
            } else {
              enemy.rotate(2);
            }
          } else if (enemy.position.x + enemy.width > this.screenWidth - 100) {
            if (enemy.angle < 360) {
              enemy.rotate(-2);
            } else {
              enemy.rotate(2);
            }
          } else if (enemy.position.y < 100) {
            if (enemy.angle < 270) {
              enemy.rotate(-2);
            } else {
              enemy.rotate(2);
            }
          } else if (enemy.position.y > enemy.position.y + enemy.height - 100) {
            if (enemy.angle < 90) {
              enemy.rotate(2);
            } else {
              enemy.rotate(-2);
            }
          }
        }
      } else if (enemy.enemyType === 6) {
        if (enemy.movement === 0) {
          enemy.moveTo(
            300 * Math.sin(Date.now() * 0.002) + enemy.start.x,
            enemy.start.y + 650,
            delta,
            delta / 2
          );
          if (enemy.position.y > enemy.start.y + 575) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 1) {
          if (Math.random() > 0.975) {
            this.shootBullet(enemy);
          }
          enemy.moveTo(
            100 * Math.sin(Date.now() * 0.002) + (enemy.start.x + 400) * 0.5,
            enemy.start.y + 100,
            delta,
            delta / 2
          );
          if (enemy.position.y < enemy.start.y + 150) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 2) {
          enemy.moveTo(
            this.player.position.x - enemy.start.x,
            this.player.position.y,
            delta,
            delta * 3
          );

          /*enemy.moveTo(
            300 * Math.sin(Date.now() * 0.002) + enemy.start.x,
            enemy.start.y + 650,
            delta,
            delta / 2
          );*/

          if (enemy.position.y > enemy.start.y + 600) {
            enemy.movement = 0;
          }
        }
      } else if (enemy.enemyType === 7) {
        if (enemy.movement === 0) {
          enemy.moveTo(
            300 * Math.sin(Date.now() * 0.002) + (enemy.start.x + 400) / 2,
            enemy.start.y + 600,
            delta,
            delta / 2
          );
          if (enemy.position.y > enemy.start.y + 575) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 1) {
          if (Math.random() > 0.975) {
            this.shootBullet(enemy);
          }
          enemy.moveTo(
            100 * Math.sin(Date.now() * 0.002) + enemy.start.x,
            enemy.start.y + 100,
            delta,
            delta / 2
          );
          if (enemy.position.y < enemy.start.y + 150) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 2) {
          enemy.moveTo(
            300 * Math.sin(Date.now() * 0.002) + enemy.start.x,
            enemy.start.y + 750,
            delta,
            delta / 2
          );

          if (enemy.position.y > enemy.start.y + 700) {
            enemy.movement = 0;
          }
        }
      } else if (enemy.enemyType === 8) {
        if (enemy.movement === 0) {
          enemy.moveTo(
            350 + enemy.start.x,
            enemy.start.y - 400 + 150,
            delta * 1.5,
            delta
          );
          if (enemy.position.x > 200 + enemy.start.x) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 1) {
          enemy.moveTo(
            enemy.start.x - 220,
            enemy.start.y - 400 + 250,
            delta * 1.5,
            delta
          );
          if (enemy.position.x < enemy.start.x - 150) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 2) {
          enemy.moveTo(
            350 + enemy.start.x,
            enemy.start.y - 400 + 350,
            delta * 1.5,
            delta
          );
          if (enemy.position.x > 200 + enemy.start.x) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 3) {
          enemy.moveTo(
            enemy.start.x - 200,
            enemy.start.y - 400 + 450,
            delta * 1.5,
            delta
          );
          if (enemy.position.x < enemy.start.x - 150) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 4) {
          enemy.moveTo(
            300 + enemy.start.x,
            enemy.start.y - 400 + 550,
            delta * 1.5,
            delta
          );
          if (enemy.position.x > 200 + enemy.start.x) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 5) {
          enemy.moveTo(
            enemy.start.x - 200,
            enemy.start.y - 400 + 650,
            delta * 1.5,
            delta
          );
          if (enemy.position.x < enemy.start.x - 150) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 6) {
          enemy.moveTo(enemy.start.x, enemy.start.y, delta * 1.5, delta);
          if (enemy.position.x < 50 + enemy.start.x) {
            enemy.movement = 0;
          }
        }
      } else if (enemy.enemyType === 9) {
        enemy.position.x += 1;
        //console.log("move");

        if (enemy.position.x > this.screenWidth) {
          this.enemies.splice(i, 1);
          this.checkWhetherEnemiesRemaining();
        }
      } else if (enemy.enemyType === 10) {
        /*if (enemy.movement === 0) {
          enemy.moveTo(0, 200, delta, delta);
          if (enemy.position.x < 100) enemy.movement += 1;
        } else if (enemy.movement === 1) {
          enemy.moveTo(300, 600, enemy.start.y + 200, delta, delta);
          if (enemy.position.y > 500) enemy.movement = 2;
        } else if (enemy.movement === 2) {
          enemy.moveTo(800, 300, delta, delta);
          if (enemy.position.x > 700) enemy.movement = 0;
        }*/

        if (enemy.movement === 0) {
          if (enemy.position.x < 150) {
            enemy.movement += 1;
          } else {
          }
        } else if (enemy.movement === 1) {
          if (enemy.angle <= 610) {
            enemy.angle += 3;
          } else {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 2) {
          if (enemy.position.y > this.screenHeight - 100) {
            enemy.movement += 1;
          } else {
          }
        } else if (enemy.movement === 3) {
          if (enemy.angle > 0) {
            enemy.angle -= 3;
          } else {
            enemy.movement = 0;
          }
        }
        enemy.speed.x = -8 * Math.cos((enemy.angle * Math.PI) / 180);
        enemy.speed.y = -8 * Math.sin((enemy.angle * Math.PI) / 180);
        enemy.position.x = Math.floor(enemy.position.x) + enemy.speed.x;
        enemy.position.y = Math.floor(enemy.position.y) + enemy.speed.y;
        if (
          enemy.inPlay &&
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
            (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
              (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) >
            400000
        ) {
          enemy.position.x = this.screenWidth;
          enemy.position.y = this.screenHeight / 2;
          enemy.angle = 0;

          enemy.inPlay = false;
        } else if (
          enemy.inPlay &&
          (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) *
            (enemy.position.x + enemy.width / 2 - this.screenWidth / 2) +
            (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) *
              (enemy.position.y + enemy.height / 2 - this.screenHeight / 2) >
            10400
        ) {
          //enemy.rotate(1);
        }
      } else if (enemy.enemyType === 11) {
        if (enemy.movement === 0) {
          enemy.position.x -= 4;
          if (enemy.position.x < 0) {
            enemy.angle -= 10;
          }
          if (enemy.angle <= -180) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 3) {
          if (enemy.angle <= -180) {
            enemy.movement += 1;
          }
        } else if (enemy.movement === 1) {
          enemy.position.x += 4;
          if (enemy.position.x > this.screenWidth) {
            enemy.angle = 0;
            enemy.movement = 0;
          }
        }
      }

      enemy.update(delta);
    });
  }

  checkForCollisions(delta) {
    // check for and handle any player, enemy or screen boundary collisions with bullets
    if (this.bulletPool.length > 0) {
      this.bulletPool.forEach((bullet, i) => {
        bullet.update(delta);
        if (
          (bullet.speed.y === this.playerBulletSpeed &&
            bullet.position.y < 0) ||
          (bullet.speed.y === this.enemyBulletSpeed &&
            bullet.position.y > this.screenHeight)
        ) {
          this.bulletPool.splice(i, 1);
          //console.log(this.bulletPool.length);
        }
        // player and enemy bullet collision
        if (
          bullet.collidesWith(this.player) &&
          bullet.speed.y === this.enemyBulletSpeed &&
          this.player.isVisible &&
          !this.player.isInvincible
        ) {
          this.bulletPool.splice(i, 1);
          this.playerLoseLife();
        }

        this.blocks.forEach((block, k) => {
          if (bullet.collidesWith(block) && bullet.speed.y === -120) {
            //destroy block on collision with player bullet as long as it's not the mothership 'sphere' block
            if (block.blockType !== 9) {
              this.blocks.splice(k, 1);
              this.bulletPool.splice(i, 1);
            }
          }
        });

        this.enemies.forEach((enemy, j) => {
          if (enemy.enemyType === 9 && enemy.position.x > this.screenWidth) {
            this.enemies.splice(j, 1);
          }
          if (bullet.collidesWith(enemy) && bullet.speed.y === -120) {
            this.bulletPool.splice(i, 1);
            this.player.incrementScore(enemy.enemyType);
            this.explosions.push(
              new Explosion(
                enemy.position.x,
                enemy.position.y,
                "./explosion.png"
              )
            );
            //if (this.gameState === GAMESTATE.GAMEINPROGRESS) {
            this.enemyExplosion.play();
            //}
            if (enemy.enemyType === 9) {
              this.bonusCaption = new Bonus(
                enemy.position.x,
                enemy.position.y,
                "./bonus.png"
              );
            }
            if (j < this.enemyAttacking) {
              this.enemyAttacking -= 1;
            }
            if (enemy.enemyType === 5) {
              this.enemies.splice(j, 1);
              if (
                this.enemies.filter(item => item.enemyType === 5).length <= 0
              ) {
                this.queenDead = true;
                setTimeout(() => {
                  this.initialiseGame();
                }, 1300);
              }
            } else {
              this.enemies.splice(j, 1);
              this.checkWhetherEnemiesRemaining();
            }
          } else if (
            this.player.collidesWith(enemy) &&
            this.player.isVisible &&
            !this.player.isInvincible
          ) {
            this.playerLoseLife();
          }
        });
      });
    }
  }
  checkForExplosions(delta) {
    this.explosions.forEach(explosion => {
      if (explosion != null) {
        if (explosion.readyForDeletion === true) {
          explosion = null;
        } else {
          explosion.update(delta);
        }
      }
    });
  }
  delay(time, callback) {
    if (!this.waiting) {
      this.present = Date.now();
      this.waiting = true;
    }
    if (Date.now() - this.present > time) {
      this.waiting = false;
      this.delayOver = true;
      callback();
    }
  }
  drawBackground(ctx) {
    ctx.drawImage(
      this.backgroundImage,
      0, // source (spritesheet file) x
      0, // source (spritesheet file) y
      800, // source (spritesheet file) width
      1200, // source (spritesheet file) height
      0, // gamescreen x
      this.backgroundImage.yPos, // gamescreen y
      this.screenWidth, // gamescreen width
      this.screenHeight * 2 // gamescreen height (twice screen height as it's a scrolling background)
    );
  }
  playerLoseLife() {
    this.explosions.push(
      new Explosion(
        this.player.position.x,
        this.player.position.y,
        "./explosion.png"
      )
    );
    this.playerExplosion.play();
    this.player.isVisible = false;
    this.player.lives -= 1;
    if (this.player.lives <= 0) {
      // game over
      setTimeout(() => {
        if (this.player.score > this.player.hiscore) {
          localStorage.setItem("hiscore", this.player.score);
        }
        this.player.reset();
        this.gameOver();
      }, 2000);
    } else {
      // lose a life routine
      setTimeout(() => {
        this.player.isVisible = true;
        this.player.isInvincible = true;
        //this.player.playerSprite.sourceY = 32;
        //do 3 second countdown
        setTimeout(() => {
          this.player.isInvincible = false;
        }, 2000);
      }, 3000);
    }
  }
  checkWhetherEnemiesRemaining() {
    console.log(this.enemies.length);
    if (this.enemies.length <= 0) {
      this.currentStage += 1;
      if (this.currentStage >= this.level.stages) {
        setTimeout(() => {
          this.initialiseGame();
        }, 1300);
      } else {
        this.enemies = this.level.getNewEnemies(this.screen);

        this.enemies.forEach(enemy => (enemy.paused = false));
      }
    }
  }
}
