import MaxHeap from ".";
import board from "../../App/Canvas/Board";
import Color from "../Colors";
import Heap from "../Heap";

export async function MaxHeapify(heap: MaxHeap, i: number = 0) {
  let largest = i;

  heap.array[i].color = Color.Cyan;
  await board.render();
  await board.pause();

  if (Heap.LEFT(i) < heap.array.length) {
    heap.array[Heap.LEFT(i)].color = Color.Violet;
    await board.render();
    await board.pause();
    if (heap.array[Heap.LEFT(i)].value > heap.array[largest].value) {
      largest = Heap.LEFT(i);
    } else {
      heap.array[Heap.LEFT(i)].color = Color.Transparent;
      await board.render();
      await board.pause();
    }
  }

  if (Heap.RIGHT(i) < heap.array.length) {
    heap.array[Heap.RIGHT(i)].color = Color.Violet;
    await board.render();
    await board.pause();
    if (heap.array[Heap.RIGHT(i)].value > heap.array[largest].value) {
      largest = Heap.RIGHT(i);

      heap.array[Heap.LEFT(i)].color = Color.Transparent;
      await board.render();
      await board.pause();
    } else {
      heap.array[Heap.RIGHT(i)].color = Color.Transparent;
      await board.render();
      await board.pause();
    }
  }

  if (largest !== i) {
    [heap.array[i].value, heap.array[largest].value] = [
      heap.array[largest].value,
      heap.array[i].value,
    ];

    heap.array[i].color = Color.Violet;
    heap.array[largest].color = Color.Cyan;
    await board.render();
    await board.pause();

    heap.array[i].color = Color.Transparent;
    heap.array[largest].color = Color.Transparent;
    await board.render();
    await board.pause();

    await MaxHeapify(heap, largest);

    heap.array[largest].color = Color.Transparent;
    await board.render();
    await board.pause();
  }
}
