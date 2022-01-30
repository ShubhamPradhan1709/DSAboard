import board from "./Board";
import Label, { LabelPosition } from "./Label";

export type Box = {
  x: number;
  y: number;
  height: number;
  width: number;
};

class Structure {
  _id: number;
  box: Box;
  labels: { [key in LabelPosition]: Label };

  constructor() {
    this.box = { x: 0, y: 0, height: 0, width: 0 };
    this._id = board.getID();

    this.labels = {
      LEFT: undefined,
      RIGHT: undefined,
      UP: undefined,
      DOWN: undefined,
    };
  }

  /** Determine box of structure on given context */
  async preDraw(ctx: CanvasRenderingContext2D) {}

  /** Draw structure on given context */
  async draw(ctx: CanvasRenderingContext2D) {
    // Draw labels
    await this.labels.LEFT?.draw(ctx);
    await this.labels.RIGHT?.draw(ctx);
    await this.labels.UP?.draw(ctx);
    await this.labels.DOWN?.draw(ctx);
  }

  /** Move structure to given co-ordinates */
  moveTo(x: number, y: number) {
    this.box.x = x;
    this.box.y = y;
  }

  /** Set Label */
  setLabel(label: string, pos: LabelPosition) {
    this.labels[pos] = new Label(this, label, pos);
  }

  /** unset Label */
  unsetLabel(pos: LabelPosition) {
    this.labels[pos] = undefined;
  }
}

export default Structure;
