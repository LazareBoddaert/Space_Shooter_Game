const states = {
  FLYING: 0,
  SHIELD: 1,
  SHOOTING: 2,
  HIT: 3,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Flying extends State {
  constructor(game) {
    super("FLYING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
  }
  handleInput(input) {
    if (input.includes("KeyS") && this.game.player.shieldPower > 0) {
      this.game.player.setState(states.SHIELD);
    }
  }
}

export class Shield extends State {
  constructor(game) {
    super("SHIELD", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
  }
  handleInput(input) {
    if (this.game.player.shieldPower <= 0)
      this.game.player.setState(states.FLYING);
    else if (!input.includes("KeyS")) this.game.player.setState(states.FLYING);
  }
}

export class Hit extends State {
  constructor(game) {
    super("HIT", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 1;
  }
  handleInput(input) {
    setTimeout(() => {
      this.game.player.setState(states.FLYING);
    }, 1500);
  }
}
