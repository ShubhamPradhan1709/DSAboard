import MaxHeap from ".";
import { pause } from "../../utils/animation";
import board from "../Board";
import Color from "../Colors";
import Heap from "../Heap";

export async function MaxHeapify(heap: MaxHeap, i: number = 0) {
  let largest = i;

  heap.array[i].color = Color.Cyan;
  await board.draw();
  await pause();

  heap.array[Heap.LEFT(i)].color = Color.Violet;
  await board.draw();
  await pause();
  if (
    Heap.LEFT(i) < heap.array.length &&
    heap.array[Heap.LEFT(i)].value > heap.array[largest].value
  ) {
    largest = Heap.LEFT(i);
  } else {
    heap.array[Heap.LEFT(i)].color = Color.Transparent;
    await board.draw();
    await pause();
  }

  heap.array[Heap.RIGHT(i)].color = Color.Violet;
  await board.draw();
  await pause();
  if (
    Heap.RIGHT(i) < heap.array.length &&
    heap.array[Heap.RIGHT(i)].value > heap.array[largest].value
  ) {
    largest = Heap.RIGHT(i);
  } else {
    heap.array[Heap.RIGHT(i)].color = Color.Transparent;
    await board.draw();
    await pause();
  }

  if (largest !== i) {
    [heap.array[i].value, heap.array[largest].value] = [
      heap.array[largest].value,
      heap.array[i].value,
    ];

    heap.array[i].color = Color.Violet;
    heap.array[largest].color = Color.Cyan;
    await board.draw();
    await pause();

    heap.array[i].color = Color.Transparent;
    heap.array[largest].color = Color.Transparent;
    await board.draw();
    await pause();

    await heap.heapify(largest);
  }
}

