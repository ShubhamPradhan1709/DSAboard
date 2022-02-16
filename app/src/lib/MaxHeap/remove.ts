import MaxHeap from ".";
import { pause } from "../../utils/animation";
import { BTNodeUnsetLeft, BTNodeUnsetRight } from "../BinaryTree/utils";
import board from "../Board";
import Color from "../Colors";
import { MaxHeapify } from "./utils";

async function MaxHeapRemove(heap: MaxHeap) {
  heap.array[0].color = Color.Red;
  await board.draw();
  await pause();

  [heap.array[0], heap.array[heap.array.length - 1]] = [
    heap.array[heap.array.length - 1],
    heap.array[0],
  ];

  heap.array[0].color = Color.Cyan;
  await board.draw();
  await pause();

  const node = heap.array[heap.array.length - 1];

  if (node.parent) {
    if (node.parent.left === node) {
      await BTNodeUnsetLeft(node.parent);
      node.parent.leftEdgePercent = 100;
    } else if (node.parent.right === node) {
      await BTNodeUnsetRight(node.parent);
      node.parent.rightEdgePercent = 100;
    }
  }

  heap.array.pop();
  await board.draw();
  await pause();


  await MaxHeapify(heap);
}

export default MaxHeapRemove;
