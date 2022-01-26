import Structure from "./Structure";
import Color from "./Colors";

class Node extends Structure {
  value: number;
  color: Color;
  roundedCorners: {
    topLeft: boolean;
    topRight: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
  };

  static HEIGHT = 35;
  static WIDTH = 70;
  static BORDER = 2;
  static DEFAULT_COLOR = Color.Transparent;

  constructor(value: number) {
    super();

    this.box = {
      x: 0,
      y: 0,
      width: Node.WIDTH,
      height: Node.HEIGHT,
    };

    this.value = value;
    this.roundedCorners = {
      topLeft: true,
      topRight: true,
      bottomLeft: true,
      bottomRight: true,
    };

    this.color = Node.DEFAULT_COLOR;
  }

  /** Draw node */
  public async draw(ctx: CanvasRenderingContext2D) {
    await super.draw(ctx);

    let cornerRadius = Node.HEIGHT / 4;

    let x = this.box.x + Node.BORDER / 2;
    let y = this.box.y + Node.BORDER / 2;

    ctx.strokeStyle = "white";
    ctx.lineWidth = Node.BORDER;

    ctx.beginPath();

    // Top Left
    ctx.moveTo(x, y + cornerRadius);
    if (this.roundedCorners.topLeft) {
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x + cornerRadius, y);
    }

    x += Node.WIDTH - Node.BORDER;
    ctx.lineTo(x - cornerRadius, y);

    // Top Right
    if (this.roundedCorners.topRight) {
      ctx.quadraticCurveTo(x, y, x, y + cornerRadius);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + cornerRadius);
    }

    y += Node.HEIGHT - Node.BORDER;
    ctx.lineTo(x, y - cornerRadius);

    // Bottom Right
    if (this.roundedCorners.bottomRight) {
      ctx.quadraticCurveTo(x, y, x - cornerRadius, y);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x - cornerRadius, y);
    }

    x -= Node.WIDTH - Node.BORDER;
    ctx.lineTo(x + cornerRadius, y);

    // Bottom Left
    if (this.roundedCorners.bottomLeft) {
      ctx.quadraticCurveTo(x, y, x, y - cornerRadius);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x, y - cornerRadius);
    }

    ctx.closePath();

    // Fill background color
    const gradient = ctx.createRadialGradient(
      this.box.x + this.box.width / 2,
      this.box.y + this.box.height / 2,
      Math.sqrt((this.box.width / 2) ** 2 + (this.box.height / 2) ** 2),
      this.box.x + this.box.width / 2,
      this.box.y + this.box.height / 2,
      0
    );

    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, Color.Transparent);

    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw outline of node
    ctx.stroke();

    // Value of node in center
    ctx.font = `${(Node.HEIGHT * 3) / 5}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(
      Number.isNaN(this.value) ? "NaN" : this.value.toString(),
      this.box.x + Node.WIDTH / 2,
      this.box.y + Node.HEIGHT / 2
    );
  }
}

export default Node;
