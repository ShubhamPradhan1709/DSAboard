import board from "../../App/Canvas/Board";
import Color from "../Colors";

import NodeArray from ".";

const PRIMARY = Color.Violet;
const SECONDARY = Color.Cyan;
const DANGER = Color.Red;
const PIVOT = Color.Blue;
const SUCCESS = Color.Green;

async function partition(arr: NodeArray, p: number, q: number) {
  // Highlight pivot node
  arr.array[q].color = PIVOT;
  await board.render();
  await board.pause();

  let i = p - 1;
  for (let j = p; j < q; j++) {
    arr.array[j].color = PRIMARY;
    await board.render();
    await board.pause();

    if (arr.array[j].value < arr.array[q].value) {
      [arr.array[i + 1], arr.array[j]] = [ arr.array[j], arr.array[i + 1] ];
      i += 1;

      arr.array[i].color = SECONDARY;
      await board.render();
    } else {
      arr.array[j].color = DANGER;
      await board.render();
    }
  }

  [arr.array[i + 1], arr.array[q]] = [ arr.array[q], arr.array[i + 1] ];

  // Highlight pivot node
  // Pivot node on correct position
  await board.render();
  await board.pause();
  arr.array[i + 1].color = SUCCESS;
  await board.render();
  await board.pause();

  for (let k = p; k <= q; k++) {
    if (k != i + 1) {
      arr.array[k].color = Color.Transparent;
    }
  }
  await board.render();
  await board.pause();

  return i + 1;
}

async function __QuickSort__(
    arr: NodeArray,
    p: number,
    q: number,
) {
  if (p <= q) {
    let pos = await partition(arr, p, q);

    await __QuickSort__(arr, p, pos - 1);
    await __QuickSort__(arr, pos + 1, q);
  }
}

async function QuickSort(arr: NodeArray) {
  await __QuickSort__(arr, 0, arr.array.length - 1);

  for (let k = 0; k < arr.array.length; k++) {
    arr.array[k].color = Color.Transparent;
  }

  await board.render();
  await board.pause();
}

export default QuickSort;
