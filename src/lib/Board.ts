class Board {
  canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.height = 5000;
    this.canvas.width = 5000;
  }
}

const board = new Board();

export default board;
