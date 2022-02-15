import MaxHeap from ".";
import { pause } from "../../utils/animation";
import { BinaryTreeNode } from "../BinaryTree";
import board from "../Board";
import Color from "../Colors";
import Heap from "../Heap";

async function MaxHeapInsert(heap: MaxHeap, value: number) {
  const node = new BinaryTreeNode(value);
  heap.array.push(node);

  node.color = Color.Green;
  await board.draw();
  await pause();

  let i = heap.array.length - 1;

  while (i > 0 && heap.array[Heap.PARENT(i)].value < heap.array[i].value) {
    heap.array[Heap.PARENT(i)].color = Color.Violet;
    await board.draw();
    await pause();

    [heap.array[Heap.PARENT(i)], heap.array[i]] = [
      heap.array[i],
      heap.array[Heap.PARENT(i)],
    ];

    await board.draw();
    await pause();

    heap.array[i].color = Color.Transparent;
    await board.draw();
    await pause();

    i = Heap.PARENT(i);
  }

  node.color = Color.Transparent;
  await board.draw();
  await pause();
}

export default MaxHeapInsert;
