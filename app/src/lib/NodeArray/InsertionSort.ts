import type NodeArray from ".";
import board from "../../App/Canvas/Board";
import Color from "../Colors";

const InsertionSort = async (arr: NodeArray) => {
  for (let i = 0; i < arr.array.length; i++) {
    let node = arr.array[i];

    node.color = Color.Violet;
    await board.render();
    await board.pause();

    for (let j = i - 1; j >= 0; j--) {
      if (arr.array[j].value > arr.array[j + 1].value) {
        [arr.array[j], arr.array[j + 1]] = [arr.array[j + 1], arr.array[j]];

        await board.render();
        await board.pause();
      }
    }

    node.color = Color.Green;
    await board.render();
    await board.pause();
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Color.Transparent;
  }
  await board.render();
};

export default InsertionSort;
