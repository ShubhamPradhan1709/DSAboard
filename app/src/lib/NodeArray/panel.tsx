import React, { FC, useEffect, useState } from "react";
import { StructurePanel } from "../../components/Panel";
import AlgoButton from "../../components/Buttons/AlgoButton";
import board from "../Board";
import AlgoInputButton from "../../components/Buttons/AlgoInputButton";
import Label from "../../components/Panel/Label";
import PanelSection from "../../components/Panel/Section";
import { BACKEND_URL } from "../../utils/server";
import { pause } from "../../utils/animation";

import NodeArray from ".";
import InsertionSort from "./InsertionSort";
import BubbleSort from "./BubbleSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import SelectionSort from "./SelectionSort";
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch";

const NodeArrayPanel: FC<StructurePanel> = ({ play }) => {
  const [arr, setArr] = useState<NodeArray>();

  useEffect(() => {
    play(async () => {
      // const { default: NodeArray } = await import(".");
      const values = await fetchRandomData();

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

  const fetchRandomData = async () => {
    const response = await fetch(`${BACKEND_URL}/nodearray`);
    await pause();

    if (response.ok) {
      const { data } = (await response.json()) as { data: { array: number[] } };
      return data.array;
    } else {
      alert("Could not fetch data: Will be fixed soon!");
    }
  };

  const setRandomData = async () => {
    await play(async () => {
      const values = await fetchRandomData();
      arr.setArray(values);
      await board.draw();
    });
  };

  return (
    <>
      <PanelSection>
        <AlgoButton title="Load Random Data" onClick={setRandomData} />
      </PanelSection>
      <PanelSection>
        <Label>Array</Label>

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
      </PanelSection>

      <PanelSection>
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
      </PanelSection>
    </>
  );
};

export default NodeArrayPanel;
