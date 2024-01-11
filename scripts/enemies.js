class Enemy {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.width = 76;
    this.height = 76;
    this.maxFrame = 0;
    this.bulletSpeedX = -5;
    this.bulletSpeedY = 0;
    this.bulletLeft = 2;
    this.deathSound = new Audio("assets/sounds/enemy-death.flac");
    this.deathSound.volume = 0.6;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    // Movement
    this.x -= this.speedX + this.game.gameSpeed;
    this.y += this.speedY;
    if (this.y < 0) this.y = 0;
    else if (this.y > this.game.height - this.height)
      this.y = this.game.height - this.height;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    // Remove enemies
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    // Shoot
    if (this.bulletLeft > 0 && Math.random() < 0.01) {
      this.game.enemiesBulletController.shoot(
        this.x,
        this.y + this.height * 0.5,
        this.bulletSpeedX - this.game.gameSpeed,
        this.bulletSpeedY,
        50,
        false
      );
      this.bulletLeft--;
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.game.debug)
      context.strokeRect(
        this.x + this.width * 0.15,
        this.y + this.height * 0.3,
        this.width * 0.75,
        this.height * 0.4
      );

    this.game.enemiesBulletController.draw(context);
  }
}

export class EnemyShip1 extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width + this.width;
    this.y =
      Math.random() * (this.game.height - this.height - this.game.groundMargin);
    this.image = enemyShip1;
    this.speedX = 3.5;
    this.speedY = 0;
  }
}

export class EnemyShip2 extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width + this.width;
    this.y =
      Math.random() * (this.game.height - this.height - this.game.groundMargin);
    this.image = enemyShip2;
    this.speedX = 2.5;
    this.speedY = 0;
    this.angle = 0;
    this.va = Math.random() * 0.06 + 0.06;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (
      this.y < 0 ||
      this.y > this.game.height - this.height - this.game.groundMargin
    )
      this.angle = -this.angle;
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class EnemyShip3 extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width + this.width;
    this.y =
      -(
        Math.random() *
        (this.game.height - this.height - this.game.groundMargin) *
        0.5
      ) + this.game.height;
    this.image = enemyShip3;
    this.speedX = 0.6;
    this.speedY = 0;
    this.angle = 0;
    this.va = Math.random() * 0.05 + 0.05;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (
      this.y < 0 ||
      this.y > this.game.height - this.height - this.game.groundMargin
    )
      this.angle = -this.angle;
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class EnemyShip4 extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width + this.width;
    this.y =
      Math.random() *
      (this.game.height - this.game.groundMargin - this.height * 2);
    this.image = enemyShip4;
    this.speedX = 4;
    this.speedY = 0;
    this.angle = 0;
    this.velocityX = Math.random() * 0.6 + 0.6;
    this.curve = Math.random() * 5 + 5;
    this.bulletLeft = 0;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (
      this.y < 0 ||
      this.y > this.game.height - this.height - this.game.groundMargin
    )
      this.angle = -this.angle;
    this.y += Math.sin(this.angle) * this.curve;
    this.angle += 0.1;
  }
}

export class EnemyShip5 extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width + this.width;
    this.y =
      Math.random() *
      (this.game.height - this.height - this.game.groundMargin) *
      0.1;
    this.image = enemyShip5;
    this.bulletSpeedX = 0;
    this.bulletSpeedY = 4;
    this.bulletLeft = 5;
    this.speedX = 3;
    this.speedY = 0;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (
      this.y < 0 ||
      this.y > this.game.height - this.height - this.game.groundMargin
    )
      this.angle = -this.angle;
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
  draw(context) {
    // Shoot
    if (this.bulletLeft > 0 && Math.random() < 0.01) {
      this.game.enemiesBulletController.shoot(
        this.x + this.width * 0.5,
        this.y + this.height,
        this.bulletSpeedX - this.game.gameSpeed,
        this.bulletSpeedY,
        50,
        true
      );
      this.bulletLeft--;
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.game.debug)
      context.strokeRect(
        this.x + this.width * 0.15,
        this.y + this.height * 0.3,
        this.width * 0.75,
        this.height * 0.4
      );
    this.game.enemiesBulletController.draw(context);
  }
}
