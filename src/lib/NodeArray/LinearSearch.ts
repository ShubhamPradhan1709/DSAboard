import NodeArray from ".";
import { pause } from "../../utils/animation";
import board from "../Board";
import Color from "../Colors";
import Node from "../Node";

const PRIMARY = Color.Violet;
const DANGER = Color.Red;
const SUCCESS = Color.Green;

async function LinearSearch(arr: NodeArray, value: number) {

  let found = false;

  for (let i = 0; i < arr.array.length && found === false; i++) {

    arr.array[i].color = PRIMARY;
    await board.draw();
    await pause();

    if (value === arr.array[i].value) {
      arr.array[i].color = SUCCESS;
      await board.draw();
      await pause();
      await pause();

      found = true;
    } else {
      arr.array[i].color = DANGER;
      await board.draw();
      await pause();
    }

    arr.array[i].color = Node.DEFAULT_COLOR;
    await board.draw();
  }


}

export default LinearSearch;
