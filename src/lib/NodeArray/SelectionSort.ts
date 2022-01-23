import board from "../Board";
import NodeArray from ".";
import Node from "../Node";
import Color from "../Colors";
import { pause } from "../../utils/animation";

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

async function SelectionSort(arr: NodeArray) {
  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = PRIMARY;
    await pause();
    await board.draw();

    for (let j = i + 1; j < arr.array.length; j++) {
      arr.array[j].color = PRIMARY;
      await pause();
      await board.draw();

      if (arr.array[i].value > arr.array[j].value) {
        [arr.array[i], arr.array[j]] = [arr.array[j], arr.array[i]];

        await pause();
        await board.draw();
      }

      arr.array[j].color = Node.DEFAULT_COLOR;
      await pause();
      await board.draw();
    }

    arr.array[i].color = SUCCESS;
    await pause();
    await board.draw();
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Node.DEFAULT_COLOR;
  }

  await pause();
  await board.draw();
}

export default SelectionSort;
