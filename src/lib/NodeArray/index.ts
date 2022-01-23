import Label from '../Label';
import Node from './../Node';
import Structure from './../Structure';

class NodeArray extends Structure {
  array: Node[];

  /**
   * @constructor
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number[]} array - number array
   */
  constructor(array: number[]) {
    super();

    this.box = {
      x: 0,
      y: 0,
      width: array.length * Node.WIDTH,
      height: Node.HEIGHT,
    };

    this.setArray(array);
  }

  /**
   * Set node array
   *
   * @param {number[]} array
   */
  public setArray(array: number[]) {
    this.array = [];
    for (let i = 0; i < array.length; i++) {
      let node = new Node(array[i]);
      node.moveTo(this.box.x + Node.WIDTH * i, this.box.y);

      this.array.push(node);
    }
  }

  /**
   * Draw node array
   * @param {CanvasRenderingContext2D} ctx - canvas rendering context
   */
  public async draw(ctx: CanvasRenderingContext2D) {
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

      this.array[i].setLabel(`${i}`, Label.UP);
      await this.array[i].draw(ctx);
    }

    // Call Super Draw
    await super.draw(ctx);
  }
}

export default NodeArray;
