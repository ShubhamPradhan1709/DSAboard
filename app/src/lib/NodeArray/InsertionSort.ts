import board from "../Board";
import NodeArray from ".";
import Node from "../Node";
import Color from "../Colors";
import { pause } from "../../utils/animation";

const PRIMARY = Color.Cyan;
const SUCCESS = Color.Green;

async function InsertionSort(arr: NodeArray) {
  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = PRIMARY;

    await pause();
    await board.draw();

    let j = i;
    for (j = i; j > 0; j--) {
      if (arr.array[j].value < arr.array[j - 1].value) {
        [arr.array[j], arr.array[j - 1]] = [arr.array[j - 1], arr.array[j]];

        await pause();
        await board.draw();
      } else {
        break;
      }
    }

    arr.array[j].color = SUCCESS;
    await pause();
    await board.draw();
  }

  await pause();
  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Node.DEFAULT_COLOR;
  }
  await board.draw();
}

export default InsertionSort;
