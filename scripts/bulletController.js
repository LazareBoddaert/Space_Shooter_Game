import Bullet from "./bullet.js";

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(game, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.game = game;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio("assets/sounds/shoot.wav");
    this.shootSound.volume = 0.2;
  }
  draw(context) {
    this.bullets.forEach((bullet) => {
      bullet.draw(context);
    });
    if (this.timeTillNextBulletAllowed > 0) this.timeTillNextBulletAllowed--;
  }
  shoot(
    x,
    y,
    bulletSpeedX,
    bulletSpeedY,
    timeTillNextBulletAllowed = 0,
    shootFromTop = false
  ) {
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {
      const bullet = new Bullet(
        this.game,
        x,
        y,
        bulletSpeedX,
        bulletSpeedY,
        this.bulletColor,
        shootFromTop
      );
      this.bullets.push(bullet);
      if (this.soundEnabled && this.game.enableSound) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}
