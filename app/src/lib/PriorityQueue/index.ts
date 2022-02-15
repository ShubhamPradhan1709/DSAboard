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
}

export default PriorityQueue;
