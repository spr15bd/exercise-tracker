import Sprite from "./sprite.js";

export default class Enemy {
  constructor(xPos, yPos, angle, enemyType, enemyNumber, imageSrc) {
    // declare enemy properties
    this.enemyType = enemyType;
    this.width = 32;
    this.height = 32;
    this.speed = {
      x: 0,
      y: 0
    };
    this.state = 0;
    this.start = {
      x: xPos,
      y: yPos
    };

    this.position = {
      x: xPos,
      y: yPos
    };
    this.pivotPoint = {
      x: -this.width / 2,
      y: -this.height / 2
    };
    this.last = {
      x: xPos,
      y: yPos
    };
    if (enemyNumber != null) {
      this.enemyNumber = enemyNumber;
    }
    this.paused = true;
    this.maxTurn = 180;
    this.image = new Image();
    this.image.src = imageSrc;
    this.bulletImage = new Image();
    this.bulletImage.src = "./enemyBullet.png";
    this.sourceWidth = 32;
    this.sourceHeight = 32;
    this.sourceX = 0;
    if (this.enemyType === 0) {
      this.sourceY = 0;
    } else if (this.enemyType === 1) {
      this.sourceY = 32;
    } else if (this.enemyType === 2) {
      this.sourceY = 64;
    } else if (this.enemyType === 3) {
      this.sourceY = 96;
    } else if (this.enemyType === 4) {
      this.sourceY = 128;
    } else if (this.enemyType === 5) {
      this.sourceY = 264;
    } else if (this.enemyType === 6 || this.enemyType === 11) {
      this.sourceY = 296;
    } else if (this.enemyType === 7) {
      this.sourceY = 196;
    } else if (this.enemyType === 9) {
      this.sourceY = 264;
      this.paused = false; //bonus enemy will appear mid-level - as enemies are unpaused during game initialisation, this one won't be so must be unpaused on creation here
      this.width = 28;
      this.height = 28;
    } else if (this.enemyType === 10) {
      this.sourceY = 360;
    }

    this.numberOfFrames = 8;
    this.frameDuration = 15;
    this.repeatAnimation = true;
    this.angle = angle;
    this.newAngle = 45;
    this.enemySprite = new Sprite(
      this.image,
      this.sourceWidth,
      this.sourceHeight,
      this.sourceX,
      this.sourceY,
      this.pivotPoint,
      this.width,
      this.height,
      this.numberOfFrames, // number of frames in the spritsheet
      this.frameDuration,
      this.repeatAnimation,
      this.angle
    );

    this.movement = 0;
    this.bounced = 0;
    this.swoop = false;
    this.now = 0;
    this.inPlay = false;
    this.turned180 = false;
    this.turning = false;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );

    ctx.rotate(((this.angle + 90) * Math.PI) / 180);
    this.enemySprite.draw(ctx);

    ctx.restore();
  }
  update(delta) {
    // every delta milliSeconds
    if (!delta || this.paused) return;

    // movement across screen
    // pixels per milliSecond

    this.enemySprite.update(delta);
  }
  moveTo(x, y, deltaX, deltaY) {
    if (!deltaX || !deltaY || this.paused) return;

    if (this.position.x !== x) {
      this.speed.x = (x - this.position.x) * (deltaX / 1000);
    }
    if (this.position.y !== y) {
      this.speed.y = (y - this.position.y) * (deltaY / 1000);
    }

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    /*this.targetAngle =
      180 + 180 * (Math.atan2(this.speed.y, this.speed.x) / Math.PI);
    if (this.angle < this.targetAngle) {
      this.angle += (this.targetAngle - this.angle) * 0.1;
    } else {
      this.angle -= (this.angle - this.targetAngle) * 0.1;
    }*/
  }

  rotate(angle) {
    if (!this.paused) {
      this.angle += angle;
    }
  }
}
