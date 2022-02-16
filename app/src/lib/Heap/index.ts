import BinaryTree, { BinaryTreeNode } from "../BinaryTree";

class Heap extends BinaryTree {
  array: BinaryTreeNode[];

  static PARENT(i: number) {
    return Math.floor(i / 2 - (i % 2 === 0 ? 1 : 0));
  }
  static LEFT(i: number) {
    return Math.floor(i * 2 + 1);
  }
  static RIGHT(i: number) {
    return Math.floor(i * 2 + 2);
  }

  constructor(arr: number[] = [50]) {
    super(arr[0]);

    this.setTreeFromArray(arr);
  }

  async preDraw(ctx: CanvasRenderingContext2D): Promise<void> {
    this.root = this.array[0];

    for (let i = 0; i < this.array.length; i++) {
      this.array[i].left = undefined;
      this.array[i].right = undefined;

      if (Heap.LEFT(i) < this.array.length) {
        this.array[i].left = this.array[Heap.LEFT(i)];
        this.array[Heap.LEFT(i)].parent = this.array[i];
      }

      if (Heap.RIGHT(i) < this.array.length) {
        this.array[i].right = this.array[Heap.RIGHT(i)];
        this.array[Heap.RIGHT(i)].parent = this.array[i];
      }
    }

    await super.preDraw(ctx);
  }

  insert(value: number) {
    const node = new BinaryTreeNode(value);
    this.array.push(node);
  }

  setTreeFromArray(arr: number[]) {
    if (arr.length > 0) {
      const node = new BinaryTreeNode(arr[0]);
      this.root = node;

      this.array = [node];

      for (let i = 1; i < arr.length; i++) {
        this.insert(arr[i]);
      }
    }
  }
}

export default Heap;
