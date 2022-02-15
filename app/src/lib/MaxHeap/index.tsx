import { BinaryTreeNode } from "../BinaryTree";
import Heap from "../Heap";

class MaxHeap extends Heap {
  insert(value: number): void {
    super.insert(value);

    let i = this.array.length - 1;

    while (i > 0 && this.array[Heap.PARENT(i)].value < this.array[i].value) {
      [this.array[Heap.PARENT(i)], this.array[i]] = [
        this.array[i],
        this.array[Heap.PARENT(i)],
      ];

      i = Heap.PARENT(i);
    }
  }

  async heapify(i: number) {
    let largest = i;

    if (
      Heap.LEFT(i) < this.array.length &&
      this.array[Heap.LEFT(i)].value > this.array[largest].value
    ) {
      largest = Heap.LEFT(i);
    }

    if (
      Heap.RIGHT(i) < this.array.length &&
      this.array[Heap.RIGHT(i)].value > this.array[largest].value
    ) {
      largest = Heap.RIGHT(i);
    }

    if (largest !== i) {
      [this.array[i].value, this.array[largest].value] = [
        this.array[largest].value,
        this.array[i].value,
      ];

      await this.heapify(largest);
    }
  }
}

export default MaxHeap;
