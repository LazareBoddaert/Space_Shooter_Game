export default class bgParticle {
  constructor(game, x, y, speedX, size) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.size = size;
  }
  update() {
    if (this.x + this.size < 0) {
      this.x = this.game.width + this.size;
      this.y = Math.random() * this.game.height;
    };
    this.x -= this.speedX + this.game.gameSpeed;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }
}
