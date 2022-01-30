import { Router } from "express";
import { randomArrayGenerator } from "../utils";

const binarySearchTree = Router();

binarySearchTree.get("/", async (_, res) => {
  let array = randomArrayGenerator();

  array.sort((a, b) => {
    return a - b;
  });

  const f = async (arr: number[]): Promise<number[]> => {
    if (arr.length > 1) {
      const midIndex = Math.floor((arr.length - 1) / 2);

      const mid = arr[midIndex];
      const left = arr.splice(0, midIndex);
      arr.splice(0, 1);
      const right = arr;

      return [mid, ...(await f(left)), ...(await f(right))];
    } else {
      return [...arr];
    }
  };

  array = await f(array);

  res.send({
    data: {
      values: array,
    },
  });
});

export default binarySearchTree;
