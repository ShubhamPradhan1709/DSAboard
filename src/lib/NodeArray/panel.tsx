import React, { FC, useEffect, useState } from "react";
import { StructurePanel } from "../../components/Panel";
import AlgoButton from "../../components/AlgoButton";
import board from "../Board";
import NodeArray from ".";

import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import BubbleSort from "./BubbleSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import AlgoInputButton from "../../components/AlgoInputButton";
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch";

const NodeArrayPanel: FC<StructurePanel> = ({ play }) => {
  const [arr, setArr] = useState<NodeArray>();

  useEffect(() => {
    const array = new NodeArray([9, 8, 7, 6, 5, 4, 0, 1, 2, 3]);
    array.moveTo(100, 100);

    setArr(array);
    board.add(array);
    play(async () => {
      await board.draw();
    });

    return () => {
      board.remove(array);
    };
  }, []);

  return (
    <>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Array
        </label>
        <input
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Array"
          defaultValue={arr?.array.map((node) => node.value).join()}
          onChange={(e) => {
            let values = e.target.value.split(",").map((val) => +val);

            play(async () => {
              arr.setArray(values);
              await board.draw();
            });
          }}
        />
        <p className="text-violet-500 text-xs italic py-1">
          * Comma seperated values of array.
        </p>
      </div>

      <hr className="m-4" />

      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Algorithms
        </label>

        <AlgoButton
          title="Insertion Sort"
          onClick={() => play(async () => await InsertionSort(arr))}
        />
        <AlgoButton
          title="Bubble Sort"
          onClick={() => play(async () => await BubbleSort(arr))}
        />
        <AlgoButton
          title="Merge Sort"
          onClick={() => play(async () => await MergeSort(arr))}
        />
        <AlgoButton
          title="Quick Sort"
          onClick={() => play(async () => await QuickSort(arr))}
        />
        <AlgoButton
          title="Selection Sort"
          onClick={() => play(async () => await SelectionSort(arr))}
        />

        <AlgoInputButton
          title="Linear Search"
          onClick={(value) => play(async () => await LinearSearch(arr, value))}
        />

        <AlgoInputButton
          title="Binary Search"
          onClick={(value) => play(async () => await BinarySearch(arr, value))}
        />
      </div>
    </>
  );
};

export default NodeArrayPanel;
