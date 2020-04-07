import Block from "./block.js";
import Enemy from "./enemy.js";
export default class Level {
  constructor(level, width, height) {
    this.startEnemyWaveCycle = Date.now();
    this.screenWidth = width;
    this.screenHeight = height;
    this.enemies = [];
    this.blocks = [];
    this.stages = 0; // stages per level

    if (level === 0) {
      this.stages = 2;
      this.enemies.push(
        //new Enemy(width / 2 - 130, -480, 180, 1, 0, "./enemies.png"),
        //new Enemy(width / 2 - 160, -480, 180, 1, 1, "./enemies.png"),
        //new Enemy(width / 2 - 190, -480, 180, 1, 2, "./enemies.png"),
        new Enemy(width / 2 - 220, -480, 180, 1, 3, "./enemies.png")
        //new Enemy(width / 2 - 250, -480, 180, 1, 4, "./enemies.png"),
        //new Enemy(width / 2 - 280, -480, 180, 1, 5, "./enemies.png")

        //new Enemy(width / 2 + 100, -480, 0, 0, "./enemies.png"),
        //new Enemy(width / 2 + 130, -480, 0, 0, "./enemies.png"),
        //new Enemy(width / 2 + 160, -480, 0, 0, "./enemies.png"),
        //new Enemy(width / 2 + 190, -480, 0, 0, "./enemies.png"),
        //new Enemy(width / 2 + 220, -480, 0, 0, "./enemies.png"),
        //new Enemy(width / 2 + 250, -480, 0, 0, "./enemies.png"),

        //new Enemy(width / 2 - 230, -230, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 - 200, -200, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 - 170, -170, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 - 140, -140, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 - 110, -110, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 - 80, -80, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 - 50, -50, 45, 1, "./enemies.png"),
        //new Enemy(width / 2 + 198, -230, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 + 168, -200, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 + 138, -170, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 + 108, -140, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 + 78, -110, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 + 48, -80, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 + 18, -50, 135, 0, "./enemies.png"),
        //new Enemy(width / 2 - 16, -430, 90, 0, 0, "./enemies.png"),
        //new Enemy(width / 2 - 16, -390, 90, 0, 1, "./enemies.png"),
        //new Enemy(width / 2 - 16, -350, 90, 0, 2, "./enemies.png"),
        //new Enemy(width / 2 - 16, -310, 90, 0, 3, "./enemies.png"),
        //new Enemy(width / 2 - 16, -270, 90, 0, 4, "./enemies.png"),
        //new Enemy(width / 2 - 16, -230, 90, 0, 5, "./enemies.png")
      );
    } else if (level === 1) {
      this.enemies.push(
        new Enemy(240, -500, 270, 2, 0, "./enemies.png"),
        new Enemy(300, -500, 270, 2, 1, "./enemies.png"),
        new Enemy(360, -500, 270, 2, 2, "./enemies.png"),
        new Enemy(420, -500, 270, 2, 3, "./enemies.png"),
        new Enemy(480, -500, 270, 2, 4, "./enemies.png"),
        new Enemy(540, -500, 270, 2, 5, "./enemies.png"),

        new Enemy(180, -400, 270, 2, 6, "./enemies.png"),
        new Enemy(240, -400, 270, 2, 7, "./enemies.png"),
        new Enemy(300, -400, 270, 2, 8, "./enemies.png"),
        new Enemy(360, -400, 270, 2, 9, "./enemies.png"),
        new Enemy(420, -400, 270, 2, 10, "./enemies.png"),
        new Enemy(480, -400, 270, 2, 11, "./enemies.png"),
        new Enemy(540, -400, 270, 2, 12, "./enemies.png"),
        new Enemy(600, -400, 270, 2, 13, "./enemies.png"),

        new Enemy(240, -300, 270, 3, 0, "./enemies.png"),
        new Enemy(300, -300, 270, 3, 1, "./enemies.png"),
        new Enemy(360, -300, 270, 3, 2, "./enemies.png"),
        new Enemy(420, -300, 270, 3, 3, "./enemies.png"),
        new Enemy(480, -300, 270, 3, 4, "./enemies.png"),
        new Enemy(540, -300, 270, 3, 5, "./enemies.png"),

        //new Enemy(240, -200, 270, 3, "./enemies.png"),
        //new Enemy(300, -200, 270, 3, "./enemies.png"),
        //new Enemy(360, -200, 270, 3, "./enemies.png"),
        //new Enemy(420, -200, 270, 3, "./enemies.png"),
        //new Enemy(480, -200, 270, 3, "./enemies.png"),
        //new Enemy(540, -200, 270, 3, "./enemies.png"),

        new Enemy(width - 130, -300, 180, 0, 0, "./enemies.png"),
        new Enemy(width - 160, -300, 180, 0, 1, "./enemies.png"),
        new Enemy(width - 190, -300, 180, 0, 2, "./enemies.png"),
        new Enemy(width - 220, -300, 180, 0, 3, "./enemies.png"),
        new Enemy(width - 250, -300, 180, 0, 4, "./enemies.png")
      );
    } else if (level === 4) {
    } else {
      this.blocks.push(
        new Block(204, -372, 384, 64, 9, "./block.png"),

        new Block(204, -292, 16, 16, 7, "./block.png"),
        new Block(220, -292, 16, 16, 2, "./block.png"),
        new Block(236, -292, 16, 16, 3, "./block.png"),
        new Block(252, -292, 16, 16, 4, "./block.png"),
        new Block(268, -292, 16, 16, 3, "./block.png"),
        new Block(284, -292, 16, 16, 2, "./block.png"),
        new Block(300, -292, 16, 16, 1, "./block.png"),
        new Block(316, -292, 16, 16, 2, "./block.png"),
        new Block(332, -292, 16, 16, 1, "./block.png"),
        new Block(348, -292, 16, 16, 3, "./block.png"),
        new Block(364, -292, 16, 16, 2, "./block.png"),
        new Block(380, -292, 16, 16, 3, "./block.png"),
        new Block(396, -292, 16, 16, 3, "./block.png"),
        new Block(412, -292, 16, 16, 4, "./block.png"),
        new Block(428, -292, 16, 16, 2, "./block.png"),
        new Block(444, -292, 16, 16, 4, "./block.png"),
        new Block(460, -292, 16, 16, 2, "./block.png"),
        new Block(476, -292, 16, 16, 3, "./block.png"),
        new Block(492, -292, 16, 16, 1, "./block.png"),
        new Block(508, -292, 16, 16, 3, "./block.png"),
        new Block(524, -292, 16, 16, 4, "./block.png"),
        new Block(540, -292, 16, 16, 3, "./block.png"),
        new Block(556, -292, 16, 16, 2, "./block.png"),
        new Block(572, -292, 16, 16, 6, "./block.png"),

        new Block(220, -276, 16, 16, 7, "./block.png"),
        new Block(236, -276, 16, 16, 4, "./block.png"),
        new Block(252, -276, 16, 16, 1, "./block.png"),
        new Block(268, -276, 16, 16, 2, "./block.png"),
        new Block(284, -276, 16, 16, 1, "./block.png"),
        new Block(300, -276, 16, 16, 3, "./block.png"),
        new Block(316, -276, 16, 16, 4, "./block.png"),
        new Block(332, -276, 16, 16, 2, "./block.png"),
        new Block(348, -276, 16, 16, 3, "./block.png"),
        new Block(364, -276, 16, 16, 3, "./block.png"),
        new Block(380, -276, 16, 16, 1, "./block.png"),
        new Block(396, -276, 16, 16, 2, "./block.png"),
        new Block(412, -276, 16, 16, 1, "./block.png"),
        new Block(428, -276, 16, 16, 3, "./block.png"),
        new Block(444, -276, 16, 16, 2, "./block.png"),
        new Block(460, -276, 16, 16, 1, "./block.png"),
        new Block(476, -276, 16, 16, 1, "./block.png"),
        new Block(492, -276, 16, 16, 3, "./block.png"),
        new Block(508, -276, 16, 16, 2, "./block.png"),
        new Block(524, -276, 16, 16, 1, "./block.png"),
        new Block(540, -276, 16, 16, 2, "./block.png"),
        new Block(556, -276, 16, 16, 6, "./block.png"),

        new Block(252, -260, 16, 16, 7, "./block.png"),
        new Block(268, -260, 16, 16, 3, "./block.png"),
        new Block(284, -260, 16, 16, 1, "./block.png"),
        new Block(300, -260, 16, 16, 3, "./block.png"),
        new Block(316, -260, 16, 16, 4, "./block.png"),
        new Block(332, -260, 16, 16, 2, "./block.png"),
        new Block(348, -260, 16, 16, 2, "./block.png"),
        new Block(364, -260, 16, 16, 3, "./block.png"),
        new Block(380, -260, 16, 16, 2, "./block.png"),
        new Block(396, -260, 16, 16, 3, "./block.png"),
        new Block(412, -260, 16, 16, 4, "./block.png"),
        new Block(428, -260, 16, 16, 1, "./block.png"),
        new Block(444, -260, 16, 16, 2, "./block.png"),
        new Block(460, -260, 16, 16, 3, "./block.png"),
        new Block(476, -260, 16, 16, 2, "./block.png"),
        new Block(492, -260, 16, 16, 3, "./block.png"),
        new Block(508, -260, 16, 16, 4, "./block.png"),
        new Block(524, -260, 16, 16, 6, "./block.png"),

        new Block(300, -244, 16, 16, 7, "./block.png"),
        new Block(316, -244, 16, 16, 4, "./block.png"),
        new Block(332, -244, 16, 16, 1, "./block.png"),
        new Block(348, -244, 16, 16, 2, "./block.png"),
        new Block(364, -244, 16, 16, 3, "./block.png"),
        new Block(380, -244, 16, 16, 1, "./block.png"),
        new Block(396, -244, 16, 16, 2, "./block.png"),
        new Block(412, -244, 16, 16, 1, "./block.png"),
        new Block(428, -244, 16, 16, 3, "./block.png"),
        new Block(444, -244, 16, 16, 1, "./block.png"),
        new Block(460, -244, 16, 16, 3, "./block.png"),
        new Block(476, -244, 16, 16, 6, "./block.png"),

        new Block(204, -308, 8, 8, 0, "./block.png"),
        new Block(212, -308, 8, 8, 0, "./block.png"),
        new Block(220, -308, 8, 8, 0, "./block.png"),
        new Block(228, -308, 8, 8, 0, "./block.png"),
        new Block(236, -308, 8, 8, 0, "./block.png"),
        new Block(244, -308, 8, 8, 0, "./block.png"),
        new Block(252, -308, 8, 8, 0, "./block.png"),
        new Block(260, -308, 8, 8, 0, "./block.png"),
        new Block(268, -308, 8, 8, 0, "./block.png"),
        new Block(276, -308, 8, 8, 0, "./block.png"),
        new Block(284, -308, 8, 8, 0, "./block.png"),
        new Block(292, -308, 8, 8, 0, "./block.png"),
        new Block(300, -308, 8, 8, 0, "./block.png"),
        new Block(308, -308, 8, 8, 0, "./block.png"),
        new Block(316, -308, 8, 8, 0, "./block.png"),
        new Block(324, -308, 8, 8, 0, "./block.png"),
        new Block(332, -308, 8, 8, 0, "./block.png"),
        new Block(340, -308, 8, 8, 0, "./block.png"),
        new Block(348, -308, 8, 8, 0, "./block.png"),
        new Block(356, -308, 8, 8, 0, "./block.png"),
        new Block(364, -308, 8, 8, 0, "./block.png"),
        new Block(372, -308, 8, 8, 0, "./block.png"),
        new Block(380, -308, 8, 8, 0, "./block.png"),
        new Block(388, -308, 8, 8, 0, "./block.png"),
        new Block(396, -308, 8, 8, 0, "./block.png"),
        new Block(404, -308, 8, 8, 0, "./block.png"),
        new Block(412, -308, 8, 8, 0, "./block.png"),
        new Block(420, -308, 8, 8, 0, "./block.png"),
        new Block(428, -308, 8, 8, 0, "./block.png"),
        new Block(436, -308, 8, 8, 0, "./block.png"),
        new Block(444, -308, 8, 8, 0, "./block.png"),
        new Block(452, -308, 8, 8, 0, "./block.png"),
        new Block(460, -308, 8, 8, 0, "./block.png"),
        new Block(468, -308, 8, 8, 0, "./block.png"),
        new Block(476, -308, 8, 8, 0, "./block.png"),
        new Block(484, -308, 8, 8, 0, "./block.png"),
        new Block(492, -308, 8, 8, 0, "./block.png"),
        new Block(500, -308, 8, 8, 0, "./block.png"),
        new Block(508, -308, 8, 8, 0, "./block.png"),
        new Block(516, -308, 8, 8, 0, "./block.png"),
        new Block(524, -308, 8, 8, 0, "./block.png"),
        new Block(532, -308, 8, 8, 0, "./block.png"),
        new Block(540, -308, 8, 8, 0, "./block.png"),
        new Block(548, -308, 8, 8, 0, "./block.png"),
        new Block(556, -308, 8, 8, 0, "./block.png"),
        new Block(564, -308, 8, 8, 0, "./block.png"),
        new Block(572, -308, 8, 8, 0, "./block.png"),
        new Block(580, -308, 8, 8, 0, "./block.png"),

        new Block(204, -300, 8, 8, 0, "./block.png"),
        new Block(212, -300, 8, 8, 0, "./block.png"),
        new Block(220, -300, 8, 8, 0, "./block.png"),
        new Block(228, -300, 8, 8, 0, "./block.png"),
        new Block(236, -300, 8, 8, 0, "./block.png"),
        new Block(244, -300, 8, 8, 0, "./block.png"),
        new Block(252, -300, 8, 8, 0, "./block.png"),
        new Block(260, -300, 8, 8, 0, "./block.png"),
        new Block(268, -300, 8, 8, 0, "./block.png"),
        new Block(276, -300, 8, 8, 0, "./block.png"),
        new Block(284, -300, 8, 8, 0, "./block.png"),
        new Block(292, -300, 8, 8, 0, "./block.png"),
        new Block(300, -300, 8, 8, 0, "./block.png"),
        new Block(308, -300, 8, 8, 0, "./block.png"),
        new Block(316, -300, 8, 8, 0, "./block.png"),
        new Block(324, -300, 8, 8, 0, "./block.png"),
        new Block(332, -300, 8, 8, 0, "./block.png"),
        new Block(340, -300, 8, 8, 0, "./block.png"),
        new Block(348, -300, 8, 8, 0, "./block.png"),
        new Block(356, -300, 8, 8, 0, "./block.png"),
        new Block(364, -300, 8, 8, 0, "./block.png"),
        new Block(372, -300, 8, 8, 0, "./block.png"),
        new Block(380, -300, 8, 8, 0, "./block.png"),
        new Block(388, -300, 8, 8, 0, "./block.png"),
        new Block(396, -300, 8, 8, 0, "./block.png"),
        new Block(404, -300, 8, 8, 0, "./block.png"),
        new Block(412, -300, 8, 8, 0, "./block.png"),
        new Block(420, -300, 8, 8, 0, "./block.png"),
        new Block(428, -300, 8, 8, 0, "./block.png"),
        new Block(436, -300, 8, 8, 0, "./block.png"),
        new Block(444, -300, 8, 8, 0, "./block.png"),
        new Block(452, -300, 8, 8, 0, "./block.png"),
        new Block(460, -300, 8, 8, 0, "./block.png"),
        new Block(468, -300, 8, 8, 0, "./block.png"),
        new Block(476, -300, 8, 8, 0, "./block.png"),
        new Block(484, -300, 8, 8, 0, "./block.png"),
        new Block(492, -300, 8, 8, 0, "./block.png"),
        new Block(500, -300, 8, 8, 0, "./block.png"),
        new Block(508, -300, 8, 8, 0, "./block.png"),
        new Block(516, -300, 8, 8, 0, "./block.png"),
        new Block(524, -300, 8, 8, 0, "./block.png"),
        new Block(532, -300, 8, 8, 0, "./block.png"),
        new Block(540, -300, 8, 8, 0, "./block.png"),
        new Block(548, -300, 8, 8, 0, "./block.png"),
        new Block(556, -300, 8, 8, 0, "./block.png"),
        new Block(564, -300, 8, 8, 0, "./block.png"),
        new Block(572, -300, 8, 8, 0, "./block.png"),
        new Block(580, -300, 8, 8, 0, "./block.png")
      );
      this.enemies.push(
        new Enemy(this.screenWidth / 2, -400, 90, 4, 0, "./enemies.png"),
        new Enemy(this.screenWidth / 2, -400, 0, 4, 1, "./enemies.png"),
        new Enemy(this.screenWidth / 2, -400, 180, 4, 2, "./enemies.png"),
        new Enemy(this.screenWidth / 2, -400, 270, 4, 3, "./enemies.png"),
        new Enemy(this.screenWidth / 2, -352, 270, 5, 0, "./enemies.png")

        /*new Enemy(240, -500, 270, 2, "./enemies.png"),
        new Enemy(300, -500, 270, 2, "./enemies.png"),
        new Enemy(360, -500, 270, 2, "./enemies.png"),
        new Enemy(420, -500, 270, 2, "./enemies.png"),
        new Enemy(480, -500, 270, 2, "./enemies.png"),
        new Enemy(540, -500, 270, 2, "./enemies.png")*/
      );
    }
  }
  getBlocks() {
    return this.blocks;
  }
  getEnemies() {
    return this.enemies;
  }

  getNewEnemies(level) {
    if (level === 0) {
      this.enemies.push(
        new Enemy(this.screenWidth / 2 - 216, -250, 270, 6, 0, "./enemies.png"),
        new Enemy(this.screenWidth / 2 - 116, -250, 270, 6, 1, "./enemies.png"),
        new Enemy(this.screenWidth / 2 - 16, -250, 270, 6, 2, "./enemies.png"),
        new Enemy(this.screenWidth / 2 + 84, -250, 270, 6, 3, "./enemies.png"),
        new Enemy(this.screenWidth / 2 + 184, -250, 270, 6, 4, "./enemies.png"),

        new Enemy(this.screenWidth / 2 - 216, -50, 270, 6, 5, "./enemies.png"),
        new Enemy(this.screenWidth / 2 - 116, -50, 270, 6, 6, "./enemies.png"),
        new Enemy(this.screenWidth / 2 - 16, -50, 270, 6, 7, "./enemies.png"),
        new Enemy(this.screenWidth / 2 + 84, -50, 270, 6, 8, "./enemies.png"),
        new Enemy(this.screenWidth / 2 + 184, -50, 270, 6, 9, "./enemies.png"),

        new Enemy(
          this.screenWidth + 10,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth + 50,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth + 90,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth + 130,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth + 170,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth + 210,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth - 30,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth - 70,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(
          this.screenWidth - 110,
          this.screenHeight / 2,
          0,
          10,
          0,
          "./enemies.png"
        ),
        new Enemy(this.screenWidth + 10, 140, 0, 11, 0, "./enemies.png")
      );
    }

    return this.enemies;
  }

  getBonusEnemy(enemyType) {
    this.enemies.push(new Enemy(-50, 50, 270, enemyType, 0, "./enemies.png"));
  }

  getStartTime() {
    return this.start;
  }
}
