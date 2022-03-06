import Structure from "../lib/Structure";

class Board {
  canvas: HTMLCanvasElement;
  state: Structure[];

  speed: number;
  scale: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.state = [];

    this.speed = 500;
    this.scale = 1;
  }

  // Render current state on canvas
  async render() {

    // Wait for next animation frame
    await new Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    });

    await this.preDraw();
    await this.draw();
  }

  // Tasks that need to be done before drawing
  async preDraw() {}

  // Draw state on board
  async draw() {}
}

const board = new Board();

export default board;
