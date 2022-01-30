import NodeArray from ".";
import { pause } from "../../utils/animation";
import board from "../Board";
import Color from "../Colors";
import Node from "../Node";

const PRIMARY = Color.Violet;
const DANGER = Color.Red;
const SUCCESS = Color.Green;

async function BinarySearch(arr: NodeArray, value: number) {
  for (let i = 1; i < arr.array.length; i++) {
    if (arr.array[i].value < arr.array[i - 1].value) {
      alert("Array is not sorted");
      return;
    }
  }

  let found = false;

  let l = 0;
  let r = arr.array.length - 1;

  while (l < r && found === false) {
    let m = Math.floor((l + r) / 2);

    arr.array[m].color = PRIMARY;
    await board.draw();
    await pause();

    if (arr.array[m].value === value) {
      arr.array[m].color = SUCCESS;
      await board.draw();
      await pause();
      await pause();

      found = true;
    } else if (arr.array[m].value < value) {
      for (let i = l; i <= m; i++) {
        arr.array[i].color = DANGER;
      }

      await board.draw();
      await pause();
      await pause();

      l = m + 1;
    } else if (arr.array[m].value > value) {
      for (let i = m; i <= r; i++) {
        arr.array[i].color = DANGER;
      }

      await board.draw();
      await pause();
      await pause();

      r = m - 1;
    }
  }

  if (l === r && arr.array[l].value === value) {
    arr.array[l].color = SUCCESS;
    await board.draw();
    await pause();
    await pause();
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Node.DEFAULT_COLOR;
  }

  await board.draw();
  await pause();
}

export default BinarySearch;
