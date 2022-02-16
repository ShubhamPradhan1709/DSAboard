import Heap from "../Heap";

class PriorityQueue extends Heap {
  insert(value: number): void {
    super.insert(value);

    let i = this.array.length - 1;

    while (i > 0 && this.array[Heap.PARENT(i)].value > this.array[i].value) {
      [this.array[Heap.PARENT(i)], this.array[i]] = [
        this.array[i],
        this.array[Heap.PARENT(i)],
      ];

      i = Heap.PARENT(i);
    }
  }

  async heapify(i: number) {
    let smallest = i;

    if (
      Heap.LEFT(i) < this.array.length &&
      this.array[Heap.LEFT(i)].value < this.array[smallest].value
    ) {
      smallest = Heap.LEFT(i);
    }

    if (
      Heap.RIGHT(i) < this.array.length &&
      this.array[Heap.RIGHT(i)].value < this.array[smallest].value
    ) {
      smallest = Heap.RIGHT(i);
    }

    if (smallest !== i) {
      [this.array[i].value, this.array[smallest].value] = [
        this.array[smallest].value,
        this.array[i].value,
      ];

      await this.heapify(smallest);
    }
  }
}

export default PriorityQueue;
