import React, { FC, useEffect, useState } from "react";
import { StructurePanel } from "..";
import board from "../../../lib/Board";
import Heap from "../../../lib/Heap";
import PriorityQueue from "../../../lib/PriorityQueue";
import AlgoButton from "../../Buttons/AlgoButton";
import Section from "../Section";

const PriorityQueuePanel: FC<StructurePanel> = ({ play }) => {
  const [heap, setHeap] = useState<Heap>();

  useEffect(() => {
    setRandomData();

    return () => {
      play(async () => {
        board.empty();
        await board.draw();
      });
    };
  }, []);

  const setRandomData = async () => {
    await play(async () => {
      const t = new PriorityQueue();
      t.moveTo(100, 100);

      setHeap(t);
      board.add(t);
      await board.draw();
    });
  };

  if (heap === undefined) {
    return null;
  }

  return (
    <>
      <Section>
        <AlgoButton title="Load Random Data" onClick={setRandomData} />
      </Section>
    </>
  );
};

export default PriorityQueuePanel;
