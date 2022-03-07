import board from "../App/Canvas/Board";

export type Box = {
  x: number;
  y: number;
  height: number;
  width: number;
};

class Structure {
  _id: number | string;
  box: Box;

  constructor() {
    this.box = { x: 0, y: 0, height: 0, width: 0 };
    this._id = board.getID();
  }

  
  /** Determine box of structure on given context */
  async preDraw(ctx: CanvasRenderingContext2D) {}

  /** Draw structure on given context */
  async draw(ctx: CanvasRenderingContext2D) {}

  /** Move structure to given co-ordinates */
  moveTo(x: number, y: number) {
    this.box.x = x;
    this.box.y = y;
  }
}

export default Structure;

