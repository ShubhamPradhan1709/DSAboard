import Node from "./Node";
import Structure, { Box } from "./Structure";

export type LabelPosition =
  | typeof Label.LEFT
  | typeof Label.RIGHT
  | typeof Label.UP
  | typeof Label.DOWN;

class Label {
  box: Box;
  struct: Structure;
  label: string;
  position: LabelPosition;

  static LEFT: "LEFT" = "LEFT";
  static UP: "UP" = "UP";
  static RIGHT: "RIGHT" = "RIGHT";
  static DOWN: "DOWN" = "DOWN";

  constructor(struct: Structure, label: string, position: LabelPosition) {
    this.box = { ...struct.box };
    this.struct = struct;
    this.label = label;
    this.position = position;
  }

  async draw(ctx: CanvasRenderingContext2D) {
    const padding = 10;

    this.box = { ...this.struct.box };
    this.box.width = ctx.measureText(this.label).width + padding;
    this.box.height = (Node.HEIGHT * 2) / 5 + padding;

    if (this.position === Label.LEFT) {
      this.box.x -= this.box.width 
      this.box.y += this.struct.box.height / 2 - this.box.height / 2;
    }
    if (this.position === Label.UP) {
      this.box.x += this.struct.box.width / 2 - this.box.width / 2;
      this.box.y -= this.box.height;
    }
    if (this.position === Label.RIGHT) {
      this.box.x += this.struct.box.width;
      this.box.y += this.struct.box.height / 2 - this.box.height / 2;
    }
    if (this.position === Label.DOWN) {
      this.box.x += this.struct.box.width / 2 - this.box.width / 2;
      this.box.y += this.struct.box.height;
    }

    ctx.font = `${(Node.HEIGHT * 2) / 5}px serif`;
    ctx.strokeStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";

    ctx.fillText(
      this.label,
      this.box.x + this.box.width / 2,
      this.box.y + this.box.height / 2
    );
  }
}

export default Label;
