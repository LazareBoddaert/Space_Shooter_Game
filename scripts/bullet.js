export default class Bullet {
  constructor(
    game,
    x,
    y,
    bulletSpeedX,
    bulletSpeedY,
    bulletColor,
    shootFromTop = false
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.bulletSpeedX = bulletSpeedX;
    this.bulletSpeedY = bulletSpeedY;
    this.bulletColor = bulletColor;
    this.shootFromTop = shootFromTop;
    this.width = 20;
    this.height = 5;

    this.markedForDeletion = false;
  }
  update() {
    if (
      this.x + this.width > this.game.width ||
      this.x + this.width < 0 ||
      this.y + this.height < 0 ||
      this.y + this.height > this.game.height
    ) {
      this.markedForDeletion = true;
    }
    this.x += this.bulletSpeedX;
    this.y += this.bulletSpeedY;
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = this.bulletColor;
    if (this.shootFromTop) {
      context.arc(this.x, this.y, this.height, 0, 2 * Math.PI);
      context.fill();
    } else {
      context.fillRect(this.x - 15, this.y, this.width, this.height);
    }
    context.closePath();
  }
}
