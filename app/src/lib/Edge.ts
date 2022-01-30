import { Box } from "./Structure";

type Point = { x: number; y: number };

class Edge {
  start: Box;
  end: Box;
  directed: boolean;
  percent: number;

  static HEAD_LENGTH = 10;
  static OFF_LENGTH = 10;

  constructor(start: Box, end: Box, directed: boolean = false) {
    this.start = start;
    this.end = end;
    this.directed = directed;
    this.percent = 100;
  }

  async draw(ctx: CanvasRenderingContext2D) {
    let xdiff = Math.abs(
      this.end.x + this.end.width / 2 - (this.start.x + this.start.width / 2)
    );
    let ydiff = Math.abs(
      this.end.y + this.end.height / 2 - (this.start.y + this.start.height / 2)
    );
    let xsign = this.end.x > this.start.x ? 1 : -1;
    let ysign = this.end.y > this.start.y ? 1 : -1;

    let start = {
      x: this.start.x + this.start.width / 2,
      y: this.start.y + this.start.height / 2,
    };

    let end = {
      x: this.end.x + this.end.width / 2,
      y: this.end.y + this.end.height / 2,
    };

    if (ydiff / xdiff < this.start.height / this.start.width) {
      start.x += (this.start.width / 2) * xsign;
      start.y += (ydiff / xdiff) * (this.start.width / 2) * ysign;
    } else {
      start.x += (xdiff / ydiff) * (this.start.height / 2) * xsign;
      start.y += (this.start.height / 2) * ysign;
    }

    if (ydiff / xdiff < this.end.height / this.end.width) {
      end.x -= (this.end.width / 2) * xsign;
      end.y -= (ydiff / xdiff) * (this.end.width / 2) * ysign;
    } else {
      end.x -= (xdiff / ydiff) * (this.end.height / 2) * xsign;
      end.y -= (this.end.height / 2) * ysign;
    }

    this.drawLine(ctx, start, end, this.directed);
  }

  drawLine(
    ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    directed: boolean
  ) {
    let angle = Math.atan2(end.y - start.y, end.x - start.x);

    let p = (100 - this.percent) / 100;

    let length =
      Math.sqrt(
        (end.x - start.x) * (end.x - start.x) +
          (end.y - start.y) * (end.y - start.y)
      ) - Edge.HEAD_LENGTH;

    ctx.lineWidth = 2;
    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(
      end.x -
        length * Math.cos(angle) * p -
        (Edge.HEAD_LENGTH * Math.cos(angle)) / 2,
      end.y -
        length * Math.sin(angle) * p -
        (Edge.HEAD_LENGTH * Math.sin(angle)) / 2
    );
    ctx.closePath();

    ctx.stroke();

    if (directed) {
      ctx.beginPath();
      ctx.moveTo(
        end.x - length * Math.cos(angle) * p,
        end.y - length * Math.sin(angle) * p
      );
      ctx.lineTo(
        end.x -
          length * Math.cos(angle) * p -
          Edge.HEAD_LENGTH * Math.cos(angle - Math.PI / 6),
        end.y -
          length * Math.sin(angle) * p -
          Edge.HEAD_LENGTH * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        end.x -
          length * Math.cos(angle) * p -
          Edge.HEAD_LENGTH * Math.cos(angle + Math.PI / 6),
        end.y -
          length * Math.sin(angle) * p -
          Edge.HEAD_LENGTH * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();

      ctx.fill();
    }
  }
}

export default Edge;
