import Player from "./player.js";
import InputHandler from "./input.js";
import {
  EnemyShip1,
  EnemyShip2,
  EnemyShip3,
  EnemyShip4,
  EnemyShip5,
} from "./enemies.js";
import bgParticle from "./bgParticle.js";
import { UI, defaultPauseMenu, mobilePauseMenu, aboutTheGame } from "./ui.js";
import BulletController from "./bulletController.js";

window.addEventListener("load", function () {
  canvas1.width = 800;
  canvas1.height = 500;
  const ctx = canvas1.getContext("2d");
  let isPaused = true;

  class Game {
    constructor(width, height) {
      this.canvas = canvas1;
      this.width = width;
      this.height = height;
      this.touchDevice = false;
      this.groundMargin = 0;
      this.gameSpeed = 1;
      this.maxSpeed = 10;
      this.backgroundStars = [];
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "rgba(255,255,255,0.8)";
      this.time = 0;
      this.gameOver = false;
      this.lives = 3; // todo: 5 ???
      this.enableSound = true;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.enemiesBulletController = new BulletController(
        this,
        10,
        "red",
        false
      );
    }
    update(deltaTime) {
      this.time += deltaTime;

      // Background stars
      this.backgroundStars.forEach((star) => star.update());

      // Player
      this.player.update(this.input.keys, deltaTime);

      // Handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });

      // Handle floating messages
      this.floatingMessages.forEach((message) => {
        message.update();
      });

      // Handle collision animation
      this.collisions.forEach((collision) => {
        collision.update(deltaTime);
      });

      // Handle bullets
      this.player.playerBulletController.bullets.forEach((bullet) => {
        bullet.update();
      });
      this.enemiesBulletController.bullets.forEach((bullet) => {
        bullet.update();
      });

      // Remove object marked for deletion
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.player.playerBulletController.bullets =
        this.player.playerBulletController.bullets.filter(
          (bullet) => !bullet.markedForDeletion
        );
      this.enemiesBulletController.bullets =
        this.enemiesBulletController.bullets.filter(
          (bullet) => !bullet.markedForDeletion
        );
    }
    draw(context) {
      // Background stars
      if (this.backgroundStars.length === 0) {
        for (let i = 0; i < 75; i++) {
          this.backgroundStars.push(
            new bgParticle(
              this,
              Math.random() * this.width,
              Math.random() * this.height,
              3,
              Math.random() * 2
            )
          );
        }
      }

      this.backgroundStars.forEach((star) => {
        star.draw(context);
      });
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (Math.random() < 0.2) this.enemies.push(new EnemyShip1(this));
      else if (Math.random() < 0.4) this.enemies.push(new EnemyShip2(this));
      else if (Math.random() < 0.6) this.enemies.push(new EnemyShip3(this));
      else if (Math.random() < 0.8) this.enemies.push(new EnemyShip4(this));
      else this.enemies.push(new EnemyShip5(this));
    }
  }

  function toggleFullScreen() {
    if (!document.fullScreenButton) {
      ctx.canvas.requestFullscreen().catch((err) => {
        alert(`Error, can't enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        alert(`Error, can't disable full-screen mode: ${err.message}`);
      });
    }
  }

  const game = new Game(canvas1.width, canvas1.height);
  let lastTime = 0;

  window.addEventListener("keyup", (e) => {
    if (e.code === "KeyP" || (e.code === "Enter" && isPaused)) {
      isPaused = !isPaused;
      if (!isPaused) animate(0);
    }
    if (e.code === "KeyI" && isPaused) aboutTheGame(ctx);
    if (e.code === "KeyF") toggleFullScreen();
  });

  // Mobile device
  if (
    "ontouchstart" in window ||
    navigator.msMaxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0
  ) {
    game.touchDevice = true;
    pauseButton.addEventListener("click", () => {
      isPaused = !isPaused;
      if (!isPaused) animate(0);
    });
    audioButton.addEventListener("click", () => {
      game.enableSound = !game.enableSound;
    });
    if (isPaused) {
      aboutButton.addEventListener("click", () => {
        aboutTheGame(ctx);
      });
    }
  } else {
    const mobileButtons = document.getElementsByClassName("mobileButton");
    for (let button of mobileButtons) {
      button.style.display = "none";
    }
  }

  function animate(timeStamp) {
    if (isPaused) {
      if(game.touchDevice) {
        mobilePauseMenu(ctx);
        aboutButton.style.display = "block";
      } else {
        defaultPauseMenu(ctx);
      }
      return;
    }
    if(game.touchDevice) aboutButton.style.display = "none";

    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) {
      requestAnimationFrame(animate);
    } else {
      window.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && game.gameOver) {
          location.reload();
        }
      });
    }
  }
  animate(0);
});
