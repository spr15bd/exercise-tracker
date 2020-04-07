export default class Sprite {
  constructor(
    image,
    sourceWidth,
    sourceHeight,
    sourceX,
    sourceY,
    pivotPoint,
    width,
    height,
    numFrames,
    frameDuration,
    repeatAnimation,
    angle
  ) {
    this.image = image;
    this.sourceWidth = sourceWidth;
    this.sourceHeight = sourceHeight;
    this.angle = angle;
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.pivotPoint = pivotPoint;
    this.width = width;
    this.height = height;
    this.numFrames = numFrames;
    this.frameIndex = 0;
    this.ticksPerFrame = frameDuration;
    this.repeatAnimation = repeatAnimation;
    this.ticks = 0;
    this.terminateSprite = false;
  }
  update(delta) {
    if (!delta) return;

    this.ticks++;

    if (this.ticks >= this.ticksPerFrame) {
      this.frameIndex++;
      if (this.frameIndex >= this.numFrames) {
        if (this.repeatAnimation === true) {
          this.frameIndex = 0;
        } else {
          this.terminateSprite = true;
        }
      }
      this.ticks = 0;
    }
    this.sourceX = this.sourceWidth * this.frameIndex;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.sourceX, // source x
      this.sourceY, // source y
      this.sourceWidth,
      this.sourceHeight,
      this.pivotPoint.x,
      this.pivotPoint.y,
      this.width,
      this.height
    );
  }
  setSourceX(x) {
    this.sourceX = x;
  }
}
