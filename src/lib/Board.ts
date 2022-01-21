import Node from "./Node";
import Structure from "./Structure";

class Board {
  canvas: HTMLCanvasElement;
  structList: { [id: number]: Structure };

  constructor() {
    this.canvas = document.createElement("canvas");
    this.structList = {};
  }

  async draw() {
    const ctx = this.canvas.getContext("2d");

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

    this.resize(width, height);

    // ===================================================================
    // Set default styles for ctx
    ctx.strokeStyle = "#ffffff";

    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw all structures from structureList
    await Promise.all(
      Object.values(this.structList).map(
        async (struct) => await struct.draw(ctx)
      )
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

  /** Add a structure to board */
  add(struct: Structure): void {
    let id = 0;
    do {
      id = Math.floor(Math.random() * 100);
    } while (this.structList[id] !== undefined);

    struct._id = id;
    this.structList[id] = struct;
  }

  /** Remove a structure from board */
  remove(struct: Structure): void {
    if (this.structList[struct._id] !== undefined) {
      delete this.structList[struct._id];
    }
  }
}

const board = new Board();

export default board;
