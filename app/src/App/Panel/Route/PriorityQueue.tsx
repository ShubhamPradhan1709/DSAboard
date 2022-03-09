import React, { FC, useEffect, useState } from "react";
import { PanelContent } from "..";
import InputButton from "../../../components/Button/InputButton";
import Input from "../../../components/Input";
import usePlay from "../../../hooks/usePlay";
import { getArrayData } from "../../../utils/server";
import board from "../../Canvas/Board";

import Button from "../../../components/Button";
import PriorityQueue from "../../../lib/PriorityQueue";
import PriorityQueueRemove from "../../../lib/PriorityQueue/remove";
import PriorityQueueInsert from "../../../lib/PriorityQueue/insert";

const PriorityQueuePanel: FC = () => {
  const [T] = useState<PriorityQueue>(new PriorityQueue());
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
    <PanelContent title="Priority Queue">
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

      <Button onClick={setRandomData}>Get Random Priority Queue</Button>

      <hr className="my-3" />

      <InputButton
        onClick={(value) => play(async () => await PriorityQueueInsert(T, value))}
      >
        Insert Value
      </InputButton>

      <Button onClick={() => play(async () => await PriorityQueueRemove(T))}>
        Pop value
      </Button>
    </PanelContent>
  );
};

export default PriorityQueuePanel;
