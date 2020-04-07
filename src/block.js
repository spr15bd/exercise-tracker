import Sprite from "./sprite.js";
export default class Block {
  constructor(xPos, yPos, width, height, blockType, imageSrc) {
    // declare block properties
    // (blocks being chunks of mothership)
    this.width = width;
    this.height = height;
    this.blockType = blockType;
    this.position = {
      x: xPos,
      y: yPos
    };
    this.pivotPoint = {
      x: -this.width / 2,
      y: -this.height / 2
    };
    this.speed = {
      x: 30,
      y: 0
    };
    this.image = new Image();
    this.image.src = imageSrc;
    // if the block is 0 type block it's a moving forcefield block. Make the source width smaller than the whole 8x8 block - this is to prevent block boundary artifacts / flickering
    // if the block is a 9 type block, it's the top part of the mothership
    // for all other block types it's a destructible part of the mothership
    if (this.blockType === 0) {
      this.sourceWidth = 4;
      this.sourceHeight = 4;
    } else if (this.blockType === 9) {
      this.sourceWidth = 96;
      this.sourceHeight = 16;
    } else {
      this.sourceWidth = 8;
      this.sourceHeight = 8;
    }
    this.blockSprite = new Sprite(
      this.image,
      this.sourceWidth,
      this.sourceHeight,
      this.blockType * 8,
      0,
      this.pivotPoint,
      this.width,
      this.height,
      1
    );
    this.startX = this.position.x;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );

    ctx.rotate((this.angle * Math.PI) / 180);
    this.blockSprite.draw(ctx);

    ctx.restore();
  }
  update(delta) {
    // every delta milliSeconds
    if (!delta) return;
    // move the forcefield blocks horizontally. When they reach the right hand side of the mothership move them back to the left hand side
    if (this.blockType === 0) {
      this.position.x += 8; // pixels per milliSecond
      if (this.position.x > 580) {
        this.position.x = 204;
      }
    }
  }

  // method to move an entity to a specified xy coordinate
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
  }
}
