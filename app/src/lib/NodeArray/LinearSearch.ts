import NodeArray from ".";
import board from "../../App/Canvas/Board";
import Color from "../Colors";

async function LinearSearch(arr: NodeArray, value: number) {
  let found = false;

  for (let i = 0; i < arr.array.length && found === false; i++) {
    arr.array[i].color = Color.Violet;
    await board.render();
    await board.pause();

    if (value === arr.array[i].value) {
      found = true;

      arr.array[i].color = Color.Green;
      await board.render();
      await board.pause();
      await board.pause();
    }

    arr.array[i].color = Color.Transparent;
    await board.render();
  }

  if (found === false) {
    for (let i = 0; i < arr.array.length && found === false; i++) {
      arr.array[i].color = Color.Red;
    }
    await board.render();
    await board.pause();

    for (let i = 0; i < arr.array.length && found === false; i++) {
      arr.array[i].color = Color.Transparent;
    }
    await board.render();
    await board.pause();
  }
}

export default LinearSearch;
