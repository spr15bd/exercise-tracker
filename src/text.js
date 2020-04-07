import Sprite from "./sprite.js";
import Sound from "./sound";
export default class Text {
  constructor(xPos, yPos, width, height, textLine, imageSrc) {
    this.sourceWidth = 0;
    this.sourceHeight = 11;
    this.width = width;
    this.height = height;
    this.textLine = textLine;
    this.position = {
      x: xPos + this.width / 2,
      y: yPos
    };
    this.pivotPoint = {
      x: 0,
      y: 0
    };
    this.image = new Image();
    this.image.src = imageSrc;

    this.currentIndex = 0;
    this.textSprite = new Sprite(
      this.image,
      this.sourceWidth,
      this.sourceHeight,
      0,
      this.textLine * 12,
      this.pivotPoint,
      this.width,
      this.height,
      1
    );
    this.textSound = new Sound("/sounds/textSound.m4a", 1, 0.15);
    //this.textSound.play();
    if (this.textLine === 0) {
      this.ticks = -180;
    } else {
      this.ticks = -50;
    }
    this.completed = false;
  }

  update(delta) {
    this.ticks++;
    if (this.ticks === 7) {
      this.textSprite.sourceWidth = 5;
      this.textSprite.width = 10;
    } else if (this.ticks === 14) {
      this.textSprite.sourceWidth = 11;
      this.textSprite.width = 22;
    } else if (this.ticks === 21) {
      this.textSprite.sourceWidth = 17;
      this.textSprite.width = 34;
    } else if (this.ticks === 28) {
      this.textSprite.sourceWidth = 22;
      this.textSprite.width = 44;
    } else if (this.ticks === 35) {
      this.textSprite.sourceWidth = 26;
      this.textSprite.width = 52;
      if (
        this.textLine === 0 ||
        this.textLine === 1 ||
        this.textLine === 2 ||
        this.textLine === 3
      ) {
        this.completed = true;
      }
    } else if (this.ticks === 42) {
      this.textSprite.sourceWidth = 33;
      this.textSprite.width = 66;
    } else if (this.ticks === 49) {
      this.textSprite.sourceWidth = 35;
      this.textSprite.width = 70;
      //this.textSound.play();
    } else if (this.ticks === 56) {
      this.textSprite.sourceWidth = 41;
      this.textSprite.width = 82;
    } else if (this.ticks === 63) {
      this.textSprite.sourceWidth = 43;
      this.textSprite.width = 86;
      //this.textSound.play();
    } else if (this.ticks === 70) {
      this.textSprite.sourceWidth = 50;
      this.textSprite.width = 100;
    } else if (this.ticks === 77) {
      this.textSprite.sourceWidth = 57;
      this.textSprite.width = 114;
      //this.textSound.play();
    } else if (this.ticks === 84) {
      this.textSprite.sourceWidth = 65;
      this.textSprite.width = 130;
      //this.textSound.play();
    } else if (this.ticks === 91) {
      this.textSprite.sourceWidth = 71;
      this.textSprite.width = 142;
    } else if (this.ticks === 98) {
      this.textSprite.sourceWidth = 78;
      this.textSprite.width = 156;
      //this.textSound.play();
    } else if (this.ticks === 105) {
      this.textSprite.sourceWidth = 83;
      this.textSprite.width = 166;
    } else if (this.ticks === 112) {
      this.textSprite.sourceWidth = 88;
      this.textSprite.width = 176;
      //this.textSound.play();
    } else if (this.ticks === 119) {
      this.textSprite.sourceWidth = 93;
      this.textSprite.width = 186;
      //this.textSound.play();
    } else if (this.ticks === 126) {
      this.textSprite.sourceWidth = 99;
      this.textSprite.width = 198;
    } else if (this.ticks === 133) {
      this.textSprite.sourceWidth = 103;
      this.textSprite.width = 206;
      this.completed = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );

    ctx.rotate((this.angle * Math.PI) / 180);
    //this.position.x = 230;

    this.textSprite.draw(ctx);
    //this.position.x += 10;

    //this.position.x = 230;
    //this.textSprite.draw(ctx);

    ctx.restore();
  }

  /*getCurrentSymbol(symbol) {
    switch (symbol) {
      case "a": {
        this.position.x = 0;
        this.position.y = 0;
      }
    }
  }*/
}
