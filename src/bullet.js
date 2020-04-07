import Sprite from "./sprite.js";
export default class Bullet {
  constructor(xPos, yPos, speed, image) {
    // declare bullet properties
    this.width = 4;
    this.height = 8;
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
      y: speed
    };
    this.image = image;
    this.sourceWidth = 2;
    this.sourceHeight = 4;

    this.bulletSprite = new Sprite(
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
  collidesWith(entity) {
    if (
      this.position.x >= entity.position.x &&
      this.position.x <= entity.position.x + entity.width &&
      this.position.y >= entity.position.y &&
      this.position.y <= entity.position.y + entity.height
    ) {
      return true;
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );

    ctx.rotate((this.angle * Math.PI) / 180);
    this.bulletSprite.draw(ctx);

    ctx.restore();
  }
  update(delta) {
    // every delta milliSeconds
    if (!delta) return;
    this.position.y += this.speed.y / delta; // pixels per milliSecond
  }
}
