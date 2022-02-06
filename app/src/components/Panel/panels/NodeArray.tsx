import React, { FC, useEffect, useState } from "react";
import { StructurePanel } from "..";
import board from "../../../lib/Board";
import { fetchRoute } from "../../../utils/server";
import AlgoButton from "../../Buttons/AlgoButton";
import AlgoInputButton from "../../Buttons/AlgoInputButton";
import Label from "../Label";
import Section from "../Section";

import NodeArray from "../../../lib/NodeArray";
import BinarySearch from "../../../lib/NodeArray/BinarySearch";
import BubbleSort from "../../../lib/NodeArray/BubbleSort";
import InsertionSort from "../../../lib/NodeArray/InsertionSort";
import LinearSearch from "../../../lib/NodeArray/LinearSearch";
import MergeSort from "../../../lib/NodeArray/MergeSort";
import QuickSort from "../../../lib/NodeArray/QuickSort";
import SelectionSort from "../../../lib/NodeArray/SelectionSort";

const NodeArrayPanel: FC<StructurePanel> = ({ play }) => {
  const [arr, setArr] = useState<NodeArray>();

  useEffect(() => {
    play(async () => {
      const { array: values } = await fetchRoute("array");

      const array = new NodeArray(values);
      array.moveTo(100, 100);

      setArr(array);
      board.add(array);
      await board.draw();
    });

    return () => {
      play(async () => {
        board.empty();
        await board.draw();
      });
    };
  }, []);

  const setRandomData = async () => {
    await play(async () => {
      const { array: values } = await fetchRoute("array");
      arr.setArray(values);
      await board.draw();
    });
  };

  if (arr === undefined) {
    return null;
  }

  return (
    <>
      <Section>
        <AlgoButton title="Load Random Data" onClick={setRandomData} />
      </Section>
      <Section>
        <Label>Array</Label>

        <input
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Array"
          value={arr.array.map((node) => node.value).join()}
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
      </Section>

      <Section>
        <Label>Algorithms</Label>

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
      </Section>
    </>
  );
};

export default NodeArrayPanel;
