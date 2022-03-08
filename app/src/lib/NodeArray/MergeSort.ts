import NodeArray from ".";
import board from "../../App/Canvas/Board";
import Color from "../Colors";
import Node from "../Node/Node";

async function MergeSort(arr: NodeArray) {
  if (arr.array.length > 1) {
    let mid = Math.floor(arr.array.length / 2);

    let left = new NodeArray();
    left.setArray(arr.array.slice(0, mid).map((node) => node.value));
    left.moveTo(arr.box.x, arr.box.y + 2 * Node.HEIGHT);

    let right = new NodeArray();
    right.setArray(
      arr.array.slice(mid, arr.array.length).map((node) => node.value)
    );
    right.moveTo(
      arr.box.x + (mid + 1) * Node.WIDTH,
      arr.box.y + 2 * Node.HEIGHT
    );

    board.add(left, right);

    await board.render();
    await board.pause();

    await MergeSort(left);
    await MergeSort(right);

    await Merge(arr, left, right);

    board.remove(left, right);

    await board.render();
    await board.pause();

    for (let i = 0; i < arr.array.length; i++) {
      arr.array[i].color = Color.Transparent;
    }

    await board.render();
    await board.pause();
  }
}

async function Merge(arr: NodeArray, a: NodeArray, b: NodeArray) {
  for (let i = 0; i < arr.array.length; i++) {
    arr.array[i].value = NaN;
  }

  await board.render();
  await board.pause();

  let i = 0;
  let j = 0;

  for (let k = 0; k < arr.array.length; k++) {
    arr.array[k].color = Color.Violet;
    await board.render();
    await board.pause();

    if (i === a.array.length) {
      arr.array[k].value = b.array[j].value;
      b.array[j].value = NaN;

      j += 1;
    } else if (j === b.array.length) {
      arr.array[k].value = a.array[i].value;
      a.array[i].value = NaN;

      i += 1;
    } else {
      if (a.array[i].value < b.array[j].value) {
        arr.array[k].value = a.array[i].value;
        a.array[i].value = NaN;

        i += 1;
      } else {
        arr.array[k].value = b.array[j].value;
        b.array[j].value = NaN;

        j += 1;
      }
    }

    arr.array[k].color = Color.Green;
    await board.render();
    await board.pause();
  }
}

export default MergeSort;
