import Structure from "../../../lib/Structure";

export type State = { [id: number | string]: Structure };

class Board {
  canvas: HTMLCanvasElement;
  state: State;

  speed: number;
  scale: number;

  // add new strucure in structList with this id
  currID: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.state = {};

    this.speed = 500;
    this.scale = 1;

    this.currID = 0;
  }

  /** Render current state on canvas */
  async render() {
    // Wait for next animation frame and predraw
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    await this.preDraw();
    await this.draw();
  }

  /** Tasks that need to be done before drawing */
  async preDraw() {
    // Get canvas context
    const ctx = this.canvas.getContext("2d");

    // Update canvas size according to strucures in state
    let height = 0;
    let width = 0;

    await Promise.all(
      Object.values(this.state).map(async (struct) => {
        await struct.preDraw(ctx);

        width = Math.max(width, struct.box.x + struct.box.width);
        height = Math.max(height, struct.box.y + struct.box.height);
      })
    );

    this.resize(width * this.scale, height * this.scale);
  }

  /** Draw state on board */
  async draw() {
    // Get canvas context
    const ctx = this.canvas.getContext("2d");
    // Set default styles for ctx
    ctx.strokeStyle = "#ffffff";

    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set Scale
    ctx.scale(this.scale, this.scale);

    // Draw all structures from structureList
    await Promise.all(
      Object.values(this.state).map(async (struct) => await struct.draw(ctx))
    );
  }

  /** Resize canvas with padding */
  resize(width: number, height: number): void {
    const padding = 100;

    width = width + padding;
    height = height + padding;

    // Set canvas width and height
    this.canvas.width = width;
    this.canvas.height = height;

    // Get canvas and context
    let ctx = this.canvas.getContext("2d");

    // Set display size (css pixels)
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";

    // Set actual size in memory (scaled to account for extra pixel density)
    var scale = window.devicePixelRatio;
    this.canvas.width = Math.floor(width * scale);
    this.canvas.height = Math.floor(height * scale);

    // Normalise coordinate system to use css pixels
    ctx.scale(scale, scale);
  }

  /** Get unique ID */
  getID() {
    return this.currID++;
  }

  /** Add a structure to board */
  add(...args: Structure[]): void {
    for (let struct of args) {
      this.state[struct._id] = struct;
    }
  }

  /** Remove a structure from board */
  remove(...args: Structure[]): void {
    for (let struct of args) {
      if (this.state[struct._id] !== undefined) {
        delete this.state[struct._id];
      }
    }
  }

  /** Remove all structures from board */
  resetState() {
    this.state = {};
    this.currID = 0;
  }

  /** Pause based on speed */
  async pause() {
    await new Promise((res) => setTimeout(res, this.speed));
  }
}

const board = new Board();

export default board;
