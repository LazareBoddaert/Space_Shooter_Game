export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Verdana";
    this.livesImage = heartImage;
    this.mobileButtonRadius = 34;
  }
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    // STATE
    if (this.game.debug)
      context.fillText(
        "Active state: " + this.game.player.currentState.state,
        420,
        80
      );

    // Score
    context.fillText("Score: " + this.game.score, 20, 50);

    // Lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 30 * i + 25, 65, 25, 25);
    }

    // Ammunitions
    let bulletsLeft =
      this.game.player.playerBulletController.maxBulletsAtATime -
      this.game.player.playerBulletController.bullets.length;
    context.fillText("Bullets: ", 200, 50);
    for (let i = 0; i < bulletsLeft; i++) {
      context.fillRect(12 * i + 315, 26, 5, 25);
    }

    // Shield
    let shieldLeft = this.game.player.shieldPower * 0.1;
    context.fillText("Shield: ", 200, 88);
    for (let i = 0; i < shieldLeft; i++) {
      context.fillRect(12 * i + 308, 64, 5, 25);
    }

    // GameOver
    if (this.game.gameOver) {
      context.fillStyle = "rgba(0,0,0,0.2)";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.textAlign = "center";
      context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
      context.fillStyle = "white";
      context.fillText(
        "GAME OVER !",
        this.game.width * 0.5,
        this.game.height * 0.5 - 75
      );
      context.fillText(
        `Final score: ${this.game.score}`,
        this.game.width * 0.5,
        this.game.height * 0.5
      );
      context.fillText(
        "Press 'Enter' to restart",
        this.game.width * 0.5,
        this.game.height * 0.5 + 75
      );
    }
    context.restore();
  }
}

export function defaultPauseMenu(context) {
  context.save();
  context.fillStyle = "rgba(0,0,0,0.2)";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.font = "36px Verdana";
  context.fillStyle = "white";
  context.textAlign = "left";
  context.fillText(
    "Move: 'Arrows'",
    context.canvas.width * 0.1,
    context.canvas.height * 0.2
  );
  context.fillText(
    "Audio: 'K'",
    context.canvas.width * 0.6,
    context.canvas.height * 0.2
  );
  context.fillText(
    "Shoot: 'Space'",
    context.canvas.width * 0.1,
    context.canvas.height * 0.4
  );
  context.fillText(
    "Pause: 'P'",
    context.canvas.width * 0.6,
    context.canvas.height * 0.4
  );
  context.fillText(
    "Shield: 'S'",
    context.canvas.width * 0.1,
    context.canvas.height * 0.6
  );
  context.fillText(
    "Fullscreen: 'F'",
    context.canvas.width * 0.6,
    context.canvas.height * 0.6
  );
  context.textAlign = "center";
  context.fillText(
    "Press 'Enter' to continue",
    context.canvas.width * 0.5,
    context.canvas.height * 0.8
  );
  context.font = "24px Verdana";
  context.fillText(
    "Press 'I' to get more info about this game",
    context.canvas.width * 0.5,
    context.canvas.height * 0.9
  );
  context.restore();
}

export function mobilePauseMenu(context) {
  context.save();
  context.fillStyle = "rgba(0,0,0,0.2)";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.font = "36px Verdana";
  context.fillStyle = "white";
  context.textAlign = "left";
  context.fillText(
    "Move: 'Arrows'",
    context.canvas.width * 0.1,
    context.canvas.height * 0.2
  );
  context.fillText(
    "Audio: 'A'",
    context.canvas.width * 0.6,
    context.canvas.height * 0.2
  );
  context.fillText(
    "Shoot: 'B'",
    context.canvas.width * 0.1,
    context.canvas.height * 0.4
  );
  context.fillText(
    "Pause: 'P'",
    context.canvas.width * 0.6,
    context.canvas.height * 0.4
  );
  context.fillText(
    "Shield: 'S'",
    context.canvas.width * 0.1,
    context.canvas.height * 0.6
  );
  context.textAlign = "center";
  context.fillText(
    "Press 'P' to continue",
    context.canvas.width * 0.5,
    context.canvas.height * 0.8
  );
  context.restore();
}

export function aboutTheGame(context) {
  context.clearRect(0, 0, canvas1.width, canvas1.height);
  context.save();
  context.fillStyle = "rgba(0,0,0,0.2)";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.font = "36px Verdana";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(
    "ABOUT THIS PROJECT",
    context.canvas.width * 0.5,
    context.canvas.height * 0.1
  );

  context.font = "24px Verdana";
  context.textAlign = "left";
  context.fillText(
    "This game was created for learning purpose",
    14,
    context.canvas.height * 0.25
  );
  context.fillText(
    "It was build with HTML / CSS / Javascript",
    14,
    context.canvas.height * 0.35
  );
  context.fillText(
    "Game code: github.com/LazareBoddaert/Space_Shooter_Game/",
    14,
    context.canvas.height * 0.45
  );
  context.fillText(
    "Created by Lazare Boddaert | https://lazareboddaert.com/",
    14,
    context.canvas.height * 0.55
  );
  context.fillText(
    "Spaceships assets by: https://bevouliin.com",
    14,
    context.canvas.height * 0.65
  );
  context.fillText(
    "Sounds assets by: https://opengameart.org/",
    14,
    context.canvas.height * 0.75
  );

  context.font = "36px Verdana";
  context.textAlign = "center";
  context.fillText(
    "Press 'P' to return to the game",
    context.canvas.width * 0.5,
    context.canvas.height * 0.9
  );
  context.restore();
}
