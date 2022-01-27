import React, { FC, useEffect, useState } from "react";
import { StructurePanel } from "../../components/Panel";
import AlgoButton from "../../components/AlgoButton";
import board from "../Board";
import type NodeArray from ".";
import AlgoInputButton from "../../components/AlgoInputButton";
import Label from "../../components/Label";
import PanelSection from "../../components/PanelSection";

const NodeArrayPanel: FC<StructurePanel> = ({ play }) => {
  const [arr, setArr] = useState<NodeArray>();

  useEffect(() => {
    play(async () => {
      const { default: NodeArray } = await import('.');
      const array = new NodeArray([9, 8, 7, 6, 5, 4, 0, 1, 2, 3]);
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

  return (
    <>
      <PanelSection>
        <Label title="Array" />

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
        <Label title="Algorithms" />

        <AlgoButton
          title="Insertion Sort"
          onClick={() =>
            play(
              async () => await (await import("./InsertionSort")).default(arr)
            )
          }
        />

        <AlgoButton
          title="Bubble Sort"
          onClick={() =>
            play(async () => await (await import("./BubbleSort")).default(arr))
          }
        />
        <AlgoButton
          title="Merge Sort"
          onClick={() =>
            play(async () => await (await import("./MergeSort")).default(arr))
          }
        />
        <AlgoButton
          title="Quick Sort"
          onClick={() =>
            play(async () => await (await import("./QuickSort")).default(arr))
          }
        />
        <AlgoButton
          title="Selection Sort"
          onClick={() =>
            play(
              async () => await (await import("./SelectionSort")).default(arr)
            )
          }
        />

        <AlgoInputButton
          title="Linear Search"
          onClick={(value) =>
            play(
              async () =>
                await (await import("./LinearSearch")).default(arr, value)
            )
          }
        />

        <AlgoInputButton
          title="Binary Search"
          onClick={(value) =>
            play(
              async () =>
                await (await import("./BinarySearch")).default(arr, value)
            )
          }
        />
      </PanelSection>
    </>
  );
};

export default NodeArrayPanel;
