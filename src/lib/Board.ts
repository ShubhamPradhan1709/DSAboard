import Structure, { Box } from "./Structure";

class Board {
  canvas: HTMLCanvasElement;
  structList: { [id: number]: Structure };
  scale: number;

  // add new strucure in structList with this id
  currID: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.structList = {};

    this.currID = 0;
    this.scale = 1;
  }

  async draw() {
    const ctx = this.canvas.getContext("2d");

    console.log('here', this.scale);


    // Update canvas size according to strucures in structList
    let height = 0;
    let width = 0;

    await Promise.all(
      Object.values(this.structList).map(async (struct) => {
        await struct.preDraw(ctx);

        width = Math.max(width, struct.box.x + struct.box.width);
        height = Math.max(height, struct.box.y + struct.box.height);
      })
    );

    this.resize(width * this.scale, height * this.scale);

    // ===================================================================
    // Set default styles for ctx
    ctx.strokeStyle = "#ffffff";

    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set Scale
    ctx.scale(this.scale, this.scale);

    // Draw all structures from structureList
    await Promise.all(
      Object.values(this.structList).map(
        async (struct) => await struct.draw(ctx)
      )
    );
  }

  /** Get unique ID */
  getID() {
    return this.currID++;
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

  /** Add a structure to board */
  add(...args: Structure[]): void {
    for (let struct of args) {
      this.structList[struct._id] = struct;
    }
  }

  /** Remove a structure from board */
  remove(...args: Structure[]): void {
    for (let struct of args) {
      if (this.structList[struct._id] !== undefined) {
        delete this.structList[struct._id];
      }
    }
  }
}

const board = new Board();

export default board;
