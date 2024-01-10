import { Flying, Hit, Shield } from "./playerState.js";
import CollisionAnimation from "./collisionAnimation.js";
import FloatingMessage from "./floatingMessage.js";
import BulletController from "./bulletController.js";

export default class Player {
  shootPress = false;

  constructor(game) {
    this.game = game;
    this.width = 88;
    this.height = 62;
    this.x = 0;
    this.y = (this.game.height - this.height) * 0.5;
    this.image = playerImage;
    this.hitSound = new Audio("../assets/sounds/player-hit.wav");
    this.hitSound.volume = 0.2;
    this.playerBulletController = new BulletController(
      this.game,
      6,
      "green",
      true
    );
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 10;
    this.shieldPower = 50;
    this.maxShieldPower = 50;
    this.states = [
      new Flying(this.game),
      new Shield(this.game),
      new Hit(this.game),
    ];
  }
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);

    // Movement
    this.x += this.speedX;
    if (input.includes("ArrowRight") || input.includes("touch right"))
      this.speedX = this.maxSpeed;
    else if (input.includes("ArrowLeft") || input.includes("touch left"))
      this.speedX = -this.maxSpeed;
    else this.speedX = 0;
    this.y += this.speedY;
    if (input.includes("ArrowUp") || input.includes("touch up"))
      this.speedY = -this.maxSpeed;
    else if (input.includes("ArrowDown") || input.includes("touch down"))
      this.speedY = this.maxSpeed;
    else this.speedY = 0;

    // Boundaries
    if (this.x < 0) this.x = 0;
    if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;

    if (this.y < 0) this.y = 0;
    if (this.y >= this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;

    // Shoot
    if (input.includes("Space")) this.shootPress = true;
    else this.shootPress = false;

    // HIT & SHIELD animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      if (this.currentState.state === "SHIELD") this.shieldPower--;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    if (this.shootPress)
      this.playerBulletController.shoot(
        this.x + this.width,
        this.y + this.height * 0.5,
        4,
        0,
        10,
        false
      );
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.currentState.state === "SHIELD") {
      context.beginPath();
      context.arc(
        this.x + this.width * 0.5,
        this.y + this.height * 0.5,
        this.width * 0.5,
        0,
        Math.PI * 2
      );
      context.fillStyle = "rgba(0,191,255,0.2)";
      context.fill();
      context.closePath();
    }
    if (this.game.debug) {
      context.strokeStyle = "white";
      context.strokeRect(
        this.x + this.width * 0.15,
        this.y + this.height * 0.3,
        this.width * 0.75,
        this.height * 0.4
      );
    }

    this.playerBulletController.draw(context);
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  addPoints(enemy) {
    this.game.score++;
    if (this.game.enableSound) enemy.deathSound.play();
    if (this.game.gameSpeed < this.game.maxSpeed) this.game.gameSpeed += 0.01;
    if (this.game.enemyInterval > 50) this.game.enemyInterval--;
    this.game.floatingMessages.push(
      new FloatingMessage("+1", enemy.x, enemy.y, 150, 50)
    );
  }
  removePoints() {
    this.game.lives--;
    if (this.game.enableSound) this.hitSound.play();
    this.game.score -= 5;
    this.game.floatingMessages.push(
      new FloatingMessage("-5", this.x, this.y, 150, 50)
    );
    this.setState(2);
    if (this.game.lives < 1) this.game.gameOver = true;
  }
  checkCollision() {
    // Player with enemies bullets
    this.game.enemiesBulletController.bullets.forEach((bullet) => {
      if (
        this.currentState === this.states[0] &&
        this.x + this.width * 0.15 < bullet.x + bullet.width &&
        this.x + this.width * 0.15 + this.width * 0.75 > bullet.x &&
        this.y + this.height * 0.3 < bullet.y + bullet.height &&
        this.y + this.height * 0.3 + this.height * 0.4 > bullet.y
      ) {
        bullet.markedForDeletion = true;
        this.removePoints();
      }
    });
    this.game.enemies.forEach((enemy) => {
      // Enemy with player bullets
      this.playerBulletController.bullets.forEach((bullet) => {
        if (
          enemy.x + enemy.width * 0.15 < bullet.x + bullet.width &&
          enemy.x + enemy.width * 0.15 + enemy.width * 0.75 > bullet.x &&
          enemy.y + enemy.height * 0.3 < bullet.y + bullet.height &&
          enemy.y + enemy.height * 0.3 + enemy.height * 0.4 > bullet.y
        ) {
          enemy.markedForDeletion = true;
          bullet.markedForDeletion = true;
          this.game.collisions.unshift(
            new CollisionAnimation(
              this.game,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
          this.addPoints(enemy);
        }
      });

      // Player with enemy
      if (
        this.currentState !== this.states[2] &&
        this.x + this.width * 0.15 <
          enemy.x + enemy.width * 0.15 + enemy.width * 0.75 &&
        this.x + this.width * 0.15 + this.width * 0.75 >
          enemy.x + enemy.width * 0.15 &&
        this.y + this.height * 0.3 <
          enemy.y + +enemy.height * 0.3 + enemy.height * 0.4 &&
        this.y + this.height * 0.3 + this.height * 0.4 >
          enemy.y + enemy.height * 0.3
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.unshift(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (this.currentState === this.states[0]) {
          this.removePoints();
        } else {
          this.addPoints(enemy);
        }
      }
    });
  }
}
