import MaxHeap from ".";
import board from "../../App/Canvas/Board";
import { BTNodeUnsetLeft, BTNodeUnsetRight } from "../BinaryTree/utils";
import Color from "../Colors";
import { MaxHeapify } from "./utils";

async function MaxHeapRemove(heap: MaxHeap) {
  heap.array[0].color = Color.Red;
  await board.render();
  await board.pause();

  [heap.array[0], heap.array[heap.array.length - 1]] = [
    heap.array[heap.array.length - 1],
    heap.array[0],
  ];

  heap.array[0].color = Color.Cyan;
  await board.render();
  await board.pause();

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
  await board.render();
  await board.pause();


  await MaxHeapify(heap);
}

export default MaxHeapRemove;
