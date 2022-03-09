import type NodeArray from ".";
import board from "../../App/Canvas/Board";
import Color from "../Colors";

const SelectionSort = async (arr: NodeArray) => {
  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Color.Blue;
    await board.render();
    await board.pause();

    for (let j = i + 1; j < arr.array.length; j++) {
      arr.array[j].color = Color.Violet;
      await board.render();
      await board.pause();

      if (arr.array[j].value < arr.array[i].value) {
        [arr.array[j], arr.array[i]] = [arr.array[i], arr.array[j]];
        arr.array[i].color = Color.Blue;
        await board.render();
        await board.pause();

      }
      arr.array[j].color = Color.Transparent;
      await board.render();
    }

    arr.array[i].color = Color.Green;
    await board.render();
    await board.pause();
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Color.Transparent;
  }
  await board.render();
};

export default SelectionSort;
