import NodeArray from ".";
import board from "../../App/Canvas/Board";
import { alertEvent } from "../../components/Modal/AlertModal";
import Color from "../Colors";

async function BinarySearch(arr: NodeArray, value: number) {
  for (let i = 1; i < arr.array.length; i++) {
    if (arr.array[i].value < arr.array[i - 1].value) {
      alertEvent("Array must be sorted!");

      return;
    }
  }

  let found = false;

  let l = 0;
  let r = arr.array.length - 1;

  while (l < r && found === false) {
    let m = Math.floor((l + r) / 2);

    arr.array[m].color = Color.Violet;
    await board.draw();
    await board.pause();

    if (arr.array[m].value === value) {
      arr.array[m].color = Color.Green;
      await board.draw();
      await board.pause();
      await board.pause();

      found = true;
    } else if (arr.array[m].value < value) {
      for (let i = l; i <= m; i++) {
        arr.array[i].color = Color.Red;
      }

      await board.draw();
      await board.pause();
      await board.pause();

      l = m + 1;
    } else if (arr.array[m].value > value) {
      for (let i = m; i <= r; i++) {
        arr.array[i].color = Color.Red;
      }

      await board.draw();
      await board.pause();
      await board.pause();

      r = m - 1;
    }
  }

  if (l === r && arr.array[l].value === value) {
    arr.array[l].color = Color.Green;
    await board.draw();
    await board.pause();
    await board.pause();
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Color.Transparent;
  }

  await board.draw();
  await board.pause();
}

export default BinarySearch;
