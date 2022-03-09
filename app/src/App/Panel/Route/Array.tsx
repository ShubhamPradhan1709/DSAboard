import React, { FC, useEffect, useState } from "react";
import { PanelContent } from "..";
import Button from "../../../components/Button";
import InputButton from "../../../components/Button/InputButton";
import Input from "../../../components/Input";
import AlertModal from "../../../components/Modal/AlertModal";
import usePlay from "../../../hooks/usePlay";
import NodeArray from "../../../lib/NodeArray";
import BinarySearch from "../../../lib/NodeArray/BinarySearch";
import BubbleSort from "../../../lib/NodeArray/BubbleSort";
import InsertionSort from "../../../lib/NodeArray/InsertionSort";
import LinearSearch from "../../../lib/NodeArray/LinearSearch";
import MergeSort from "../../../lib/NodeArray/MergeSort";
import QuickSort from "../../../lib/NodeArray/QuickSort";
import SelectionSort from "../../../lib/NodeArray/SelectionSort";
import { getArrayData } from "../../../utils/server";
import board from "../../Canvas/Board";

const Array: FC = () => {
  const [arr] = useState<NodeArray>(new NodeArray());
  const play = usePlay();

  useEffect(() => {
    board.add(arr);
    arr.moveTo(100, 100);
    setRandomData();

    return () => {
      board.resetState();
      board.render();
    }
  }, []);

  const setRandomData = async () => {
    await play(async () => {
      const values = await getArrayData();
      arr.setArray(values);

      await board.render();
    });
  };

  return (
    <PanelContent title="Array">
      <h1 className="text-dark-secondary">Array</h1>
      <Input
        onChange={(e) => {
          const values = e.target.value.split(",").map((n) => Number(n));

          arr.setArray(values);
          board.render();
        }}
        defaultValue={arr.array.map((node) => node.value).join()}
      />

      <hr className="my-3" />

      <Button onClick={setRandomData}>Get Random Array</Button>

      <hr className="my-3" />

      <h1 className="text-dark-secondary">Search</h1>
      <InputButton
        onClick={(value) => play(async () => await LinearSearch(arr, value))}
      >
        Linear Search
      </InputButton>

      <InputButton
        onClick={(value) => play(async () => await BinarySearch(arr, value))}
      >
        Binary Search
      </InputButton>

      <hr className="my-3" />

      <h1 className="text-dark-secondary">Sort</h1>
      <Button onClick={() => play(async () => await InsertionSort(arr))}>
        Insertion Sort
      </Button>

      <Button onClick={() => play(async () => await BubbleSort(arr))}>
        Bubble Sort
      </Button>

      <Button onClick={() => play(async () => await SelectionSort(arr))}>
        Selection Sort
      </Button>

      <Button onClick={() => play(async () => await MergeSort(arr))}>
        Merge Sort
      </Button>

      <Button onClick={() => play(async () => await QuickSort(arr))}>
        Quick Sort
      </Button>
    </PanelContent>
  );
};

export default Array;
