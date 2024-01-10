export default class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.markedForDeletion = false;
    this.timer = 0;
    this.maxTimer = 100;
  }
  update() {
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > this.maxTimer) this.markedForDeletion = true;
  }
  draw(context) {
    context.font = "20px Verdana";
    context.fillStyle = "rgba(255,255,255,0.6)";
    context.fillText(this.value, this.x, this.y);
  }
}
