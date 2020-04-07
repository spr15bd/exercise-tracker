import Sprite from "./sprite.js";
export default class Bonus {
  constructor(xPos, yPos, imageSrc) {
    // declare bullet properties
    this.width = 28;
    this.height = 28;
    this.position = {
      x: xPos,
      y: yPos
    };
    this.pivotPoint = {
      x: -this.width / 2,
      y: -this.height / 2
    };
    this.speed = {
      x: 0,
      y: -18
    };
    this.image = new Image();
    this.image.src = imageSrc;
    this.sourceWidth = 32;
    this.sourceHeight = 32;

    this.bonusSprite = new Sprite(
      this.image,
      this.sourceWidth,
      this.sourceHeight,
      0,
      0,
      this.pivotPoint,
      this.width,
      this.height,
      1
    );
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );

    ctx.rotate((this.angle * Math.PI) / 180);
    this.bonusSprite.draw(ctx);

    ctx.restore();
  }
  update(delta) {
    // every delta milliSeconds
    if (!delta) return;
    this.position.y += this.speed.y / delta; // pixels per milliSecond
  }
}
