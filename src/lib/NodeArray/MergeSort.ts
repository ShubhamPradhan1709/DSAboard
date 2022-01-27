import NodeArray from ".";
import { pause } from "../../utils/animation";
import board from "../Board";
import Color from "../Colors";
import Node from "../Node";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

async function MergeSort(arr: NodeArray) {
  if (arr.array.length > 1) {
    let mid = Math.floor(arr.array.length / 2);

    let left = new NodeArray(arr.array.slice(0, mid).map((node) => node.value));
    left.moveTo(arr.box.x, arr.box.y + 2 * Node.HEIGHT);

    let right = new NodeArray(
      arr.array.slice(mid, arr.array.length).map((node) => node.value)
    );
    right.moveTo(
      arr.box.x + (mid + 1) * Node.WIDTH,
      arr.box.y + 2 * Node.HEIGHT
    );

    board.add(left, right);

    await board.draw();
    await pause();

    await MergeSort(left);
    await MergeSort(right);

    await Merge(arr, left, right);

    board.remove(left, right);

    await board.draw();
    await pause();

    for (let i = 0; i < arr.array.length; i++) {
      arr.array[i].color = Node.DEFAULT_COLOR;
    }

    await board.draw();
    await pause();
  }
}

async function Merge(arr: NodeArray, a: NodeArray, b: NodeArray) {
  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].value = NaN;
  }

  await board.draw();
  await pause();

  let i = 0;
  let j = 0;

  for (let k = 0; k < arr.array.length; k++) {
    arr.array[k].color = PRIMARY;
    await board.draw();
    await pause();

    if (i === a.array.length) {
      arr.array[k].value = b.array[j].value;
      b.array[j].value = NaN;

      j += 1;
    } else if (j === b.array.length) {
      arr.array[k].value = a.array[i].value;
      a.array[i].value = NaN;

      i += 1;
    } else {
      if (a.array[i].value < b.array[j].value) {
        arr.array[k].value = a.array[i].value;
        a.array[i].value = NaN;

        i += 1;
      } else {
        arr.array[k].value = b.array[j].value;
        b.array[j].value = NaN;

        j += 1;
      }
    }

    arr.array[k].color = SUCCESS;
    await board.draw();
    await pause();
  }
}

export default MergeSort;