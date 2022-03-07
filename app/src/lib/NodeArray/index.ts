import Node from "../Node/Node";
import Structure from "../Structure";

class NodeArray extends Structure {
  array: Node[];

  constructor() {
    super();

    this.box = {
      x: 0,
      y: 0,
      width: 0,
      height: Node.HEIGHT,
    };

    this.array = [];
  }


  /** Update box */
  async preDraw(ctx: CanvasRenderingContext2D): Promise<void> {
    this.box.width = this.array.length * Node.WIDTH;
  }

  /** Draw node array */
  async draw(ctx: CanvasRenderingContext2D) {
    // Update box width
    this.box.width = 0;
    this.box.width = this.array.length * Node.WIDTH;

    // Draw each array node individually
    for (let i = 0; i < this.array.length; i++) {
      // Move node at its correct position
      this.array[i].moveTo(this.box.x + Node.WIDTH * i, this.box.y);

      this.array[i].roundedCorners = {
        topLeft: i === 0,
        topRight: i === this.array.length - 1,
        bottomLeft: i === 0,
        bottomRight: i === this.array.length - 1,
      };

      await this.array[i].draw(ctx);
    }

    // Call Super Draw
    await super.draw(ctx);
  }

  /** Set node array */
  setArray(array: number[]) {
    this.array = [];
    for (let i = 0; i < array.length; i++) {
      let node = new Node(array[i]);
      node.moveTo(this.box.x + Node.WIDTH * i, this.box.y);

      this.array.push(node);
    }
  }
}

export default NodeArray;
