import type NodeArray from ".";
import board from "../../App/Canvas/Board";
import Color from "../Colors";

const BubbleSort = async (arr: NodeArray) => {
  let flag = true;

  while (flag === true) {
    flag = false;

    for (let i = 1; i < arr.array.length; i++) {
      let a = arr.array[i - 1];
      let b = arr.array[i];

      a.color = Color.Blue;
      b.color = Color.Violet;
      await board.render();
      await board.pause();

      if (b.value < a.value) {
        flag = true;

        [arr.array[i], arr.array[i - 1]] = [arr.array[i - 1], arr.array[i]];
        await board.render();
        await board.pause();
      }

      a.color = Color.Transparent;
      b.color = Color.Transparent;
      await board.render();
      await board.pause();
    }

    if (flag) {
      for (let i = 0; i < arr.array.length; i++) {
        arr.array[i].color = Color.Red;
      }
      await board.render();
      await board.pause();

      for (let i = 0; i < arr.array.length; i++) {
        arr.array[i].color = Color.Transparent;
      }
      await board.render();
      await board.pause();
    }
  }

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Color.Green;
  }
  await board.render();
  await board.pause();

  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].color = Color.Transparent;
  }
  await board.render();
};

export default BubbleSort;
