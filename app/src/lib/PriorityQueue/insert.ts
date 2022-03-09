import PriorityQueue from ".";
import board from "../../App/Canvas/Board";
import { BinaryTreeNode } from "../BinaryTree";
import { BTNodeSetLeft, BTNodeSetRight } from "../BinaryTree/utils";
import Color from "../Colors";
import Heap from "../Heap";

async function PriorityQueueInsert(heap: PriorityQueue, value: number) {
  const node = new BinaryTreeNode(value);
  heap.array.push(node);

  if (heap.array.length !== 1) {
    let index = heap.array.length - 1;
    let parent = heap.array[Heap.PARENT(index)];

    if (Heap.LEFT(Heap.PARENT(index)) === index) {
      await BTNodeSetLeft(parent, node);
    } else if (Heap.RIGHT(Heap.PARENT(index)) === index) {
      await BTNodeSetRight(parent, node);
    }
  }

  node.color = Color.Green;
  await board.render();
  await board.pause();

  let i = heap.array.length - 1;

  while (i > 0 && heap.array[Heap.PARENT(i)].value > heap.array[i].value) {
    heap.array[Heap.PARENT(i)].color = Color.Violet;
    await board.render();
    await board.pause();

    [heap.array[Heap.PARENT(i)], heap.array[i]] = [
      heap.array[i],
      heap.array[Heap.PARENT(i)],
    ];

    await board.render();
    await board.pause();

    heap.array[i].color = Color.Transparent;
    await board.render();
    await board.pause();

    i = Heap.PARENT(i);
  }

  node.color = Color.Transparent;
  await board.render();
  await board.pause();
}

export default PriorityQueueInsert;

