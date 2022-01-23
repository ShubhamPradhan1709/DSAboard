import Edge from '../Edge';
import Label from '../Label';
import Node from '../Node';
import Structure from '../Structure';

export class BinaryTreeNode extends Node {
  left?: BinaryTreeNode;
  right?: BinaryTreeNode;
  parent: BinaryTreeNode | undefined; // Root will have parent undefined

  leftEdgePercent: number;
  rightEdgePercent: number;

  constructor(value: number) {
    super(value);

    this.leftEdgePercent = 100;
    this.rightEdgePercent = 100;
  }

  /**
   * Draw Binary tree node
   * @param {CanvasRenderingContext2D} ctx - canvas rendering context
   */
  public async draw(ctx: CanvasRenderingContext2D) {
    await Promise.all([
      super.draw(ctx),

      // Draw children
      this.left?.draw(ctx),
      this.right?.draw(ctx),

      // Draw edges to left and right children
      (async () => {
        if (this.left) {
          let e = new Edge(this.box, this.left.box, true);
          e.percent = this.leftEdgePercent;
          await e.draw(ctx);
        }
        if (this.right) {
          let e = new Edge(this.box, this.right.box, true);
          e.percent = this.rightEdgePercent;
          await e.draw(ctx);
        }
      })(),
    ]);
  }

  /**
   * Insert a left child node
   * @param {number} value - value of node to insert
   */
  public setLeft(value: number) {
    this.left = new BinaryTreeNode(value);
    this.left.moveTo(this.box.x - Node.WIDTH * 2, this.box.y);

    this.left.parent = this;
  }

  /**
   * Insert a right child node
   * @param {number} value - value of node to insert
   */
  public setRight(value: number) {
    this.right = new BinaryTreeNode(value);
    this.right.moveTo(this.box.x - Node.WIDTH * 2, this.box.y);

    this.right.parent = this;
  }

  /**
   * Checks if it is a root node
   */
  protected isRoot() {
    return this.parent === undefined;
  }

  /**
   * Return true if it is left child of its parent
   * Return false if it is right child of its parent
   * Return undefined if it has no parent
   */
  protected isLeftChild() {
    if (this.isRoot() === false) {
      return this.parent.left === this;
    } else {
      return undefined;
    }
  }

  /**
   * Return true if it is right child of its parent
   * Return false if it is left child of its parent
   * Return undefined if it has no parent
   */
  protected isRightChild() {
    if (this.isRoot() === false) {
      return this.parent.right === this;
    } else {
      return undefined;
    }
  }
}

class BinaryTree extends Structure {
  root: BinaryTreeNode;

  /**
   * @constructor
   * @param {number} value - value of root node
   */
  constructor(value: number) {
    super();

    this.box = {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    };

    this.root = new BinaryTreeNode(value);
  }

  protected async align() {
    // Inorder position of node in below traversal
    let pos = 0;
    const alignNode = async (node: BinaryTreeNode) => {
      if (node.left) {
        node.left.box.y = node.box.y + Node.HEIGHT * 2;
        await alignNode(node.left);
      }

      // Align node based on its inorder traversal
      node.box.x = this.box.x + Node.WIDTH * pos;
      pos += 1;

      // Update box height
      this.box.height = Math.max(this.box.height, node.box.y);

      if (node.right) {
        node.right.box.y = node.box.y + Node.HEIGHT * 2;
        await alignNode(node.right);
      }
    };

    // Align root node appropriately
    this.root.moveTo(this.box.x, this.box.y);

    await alignNode(this.root);

    // Update box width
    this.box.width = pos * Node.WIDTH;
  }

  /**
   * Draw binary tree
   * @param {CanvasRenderingContext2D} ctx - canvas rendering context
   */
  public async draw(ctx: CanvasRenderingContext2D) {
    await this.align();
    this.root.setLabel('ROOT', Label.UP);
    await this.root.draw(ctx);
    this.root.unsetLabel(Label.UP);

    await super.draw(ctx);
  }
}

export default BinaryTree;
