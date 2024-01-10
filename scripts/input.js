export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.code === "ArrowDown" ||
          e.code === "ArrowUp" ||
          e.code === "ArrowLeft" ||
          e.code === "ArrowRight" ||
          e.code === "Enter" ||
          e.code === "KeyS" ||
          e.code === "Space") &&
        !this.keys.includes(e.code)
      ) {
        this.keys.push(e.code);
      } else if (e.code === "KeyD") this.game.debug = !this.game.debug;
      else if (e.code === "KeyK")
        this.game.enableSound = !this.game.enableSound;
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.code === "ArrowDown" ||
        e.code === "ArrowUp" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowRight" ||
        e.code === "Enter" ||
        e.code === "KeyS" ||
        e.code === "Space"
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });

    // Mobile device
    window.addEventListener("touchstart", (e) => {
      switch (e.target.id) {
        case "leftButton":
          if (!this.keys.includes("ArrowLeft")) this.keys.push("ArrowLeft");
          break;
        case "upButton":
          if (!this.keys.includes("ArrowUp")) this.keys.push("ArrowUp");
          break;
        case "rightButton":
          if (!this.keys.includes("ArrowRight")) this.keys.push("ArrowRight");
          break;
        case "downButton":
          if (!this.keys.includes("ArrowDown")) this.keys.push("ArrowDown");
          break;
        case "shootButton":
          if (!this.keys.includes("Space")) this.keys.push("Space");
          break;
        case "shieldButton":
          if (!this.keys.includes("KeyS")) this.keys.push("KeyS");
          break;
        default:
          break;
      }
    });
    window.addEventListener("touchend", (e) => {
      switch (e.target.id) {
        case "leftButton":
          this.keys.splice(this.keys.indexOf("ArrowLeft"), 1);
          break;
        case "upButton":
          this.keys.splice(this.keys.indexOf("ArrowUp"), 1);
          break;
        case "rightButton":
          this.keys.splice(this.keys.indexOf("ArrowRight"), 1);
          break;
        case "downButton":
          this.keys.splice(this.keys.indexOf("ArrowDown"), 1);
          break;
        case "shootButton":
          this.keys.splice(this.keys.indexOf("Space"), 1);
          break;
        case "shieldButton":
          this.keys.splice(this.keys.indexOf("KeyS"), 1);
          break;
        default:
          break;
      }
    });
  }
}
