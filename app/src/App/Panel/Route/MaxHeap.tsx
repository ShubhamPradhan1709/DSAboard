import React, { FC, useEffect, useState } from "react";
import { PanelContent } from "..";
import InputButton from "../../../components/Button/InputButton";
import Input from "../../../components/Input";
import usePlay from "../../../hooks/usePlay";
import { getArrayData } from "../../../utils/server";
import board from "../../Canvas/Board";

import MaxHeap from "../../../lib/MaxHeap";
import MaxHeapInsert from "../../../lib/MaxHeap/insert";
import Button from "../../../components/Button";
import MaxHeapRemove from "../../../lib/MaxHeap/remove";

const MaxHeapPanel: FC = () => {
  const [T] = useState<MaxHeap>(new MaxHeap());
  const play = usePlay();

  useEffect(() => {
    board.add(T);
    T.moveTo(100, 100);

    setRandomData();

    return () => {
      board.resetState();
      board.render();
    };
  }, []);

  const setRandomData = async () => {
    await play(async () => {
      const values = await getArrayData();
      T.setTreeFromArray(values);

      await board.render();
    });
  };

  return (
    <PanelContent title="Max Heap">
      <h1 className="text-dark-secondary">Array Representation</h1>
      <Input
        defaultValue={T.preOrderTraversal().join()}
        onChange={(e) => {
          const values = e.target.value
            .split(",")
            .map((n) => Number(n))
            .filter((n) => n !== undefined)
            .filter((n) => Number.isNaN(n) === false);

          T.setTreeFromArray(values);
          board.render();
        }}
      />
      <span className="text-xs font-mono text-gray-700 italic">
        (values are inserted in sequence)
      </span>

      <hr className="my-3" />

      <Button onClick={setRandomData}>Get Random Max Heap</Button>

      <hr className="my-3" />

      <InputButton
        onClick={(value) => play(async () => await MaxHeapInsert(T, value))}
      >
        Insert Value
      </InputButton>

      <Button onClick={() => play(async () => await MaxHeapRemove(T))}>
        Pop value
      </Button>
    </PanelContent>
  );
};

export default MaxHeapPanel;
