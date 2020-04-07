import Sprite from "./sprite.js";
export default class Title {
  constructor(xPos, yPos, width, height, imageSrc) {
    this.sourceWidth = 400;
    this.sourceHeight = 192;
    this.width = width;
    this.height = height;

    this.position = {
      x: xPos,
      y: yPos
    };
    this.pivotPoint = {
      x: -this.width / 2,
      y: -this.height / 2
    };
    this.image = new Image();
    this.image.src = imageSrc;

    this.titleSprite = new Sprite(
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
    this.titleSprite.draw(ctx);

    ctx.restore();
  }
}
