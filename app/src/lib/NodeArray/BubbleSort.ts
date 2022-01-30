import board from "../Board";
import NodeArray from ".";
import Node from "../Node";
import Color from "../Colors";
import { pause } from "../../utils/animation";

const PRIMARY = Color.Violet;
const SECONDARY = Color.Cyan;
const SUCCESS = Color.Green;
const DANGER = Color.Red;

async function BubbleSort(arr: NodeArray) {
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = 0; i < arr.array.length - 1; i++) {
      arr.array[i].color = PRIMARY;
      arr.array[i + 1].color = SECONDARY;

      await pause();
      await board.draw();

      if (arr.array[i].value > arr.array[i + 1].value) {
        [arr.array[i], arr.array[i + 1]] = [arr.array[i + 1], arr.array[i]];
        swapped = true;

        arr.array[i].color = SECONDARY;
        arr.array[i + 1].color = PRIMARY;

        await pause();
        await board.draw();
      }

      arr.array[i].color = Node.DEFAULT_COLOR;
      arr.array[i + 1].color = Node.DEFAULT_COLOR;

      await pause();
      await board.draw();
    }

    for (let i = 0; i < arr.array.length; i++) {
      arr.array[i].color = swapped ? DANGER : SUCCESS;
    }

    await pause();
    await board.draw();

    for (let i = 0; i < arr.array.length; i++) {
      arr.array[i].color = Node.DEFAULT_COLOR;
    }

    await pause();
    await board.draw();
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Node.DEFAULT_COLOR;
  }

  await pause();
  await board.draw();
}

export default BubbleSort;
