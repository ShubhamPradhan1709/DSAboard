import React, { FC, useEffect, useState } from "react";
import { StructurePanel } from "..";
import board from "../../../lib/Board";
import MaxHeap from "../../../lib/MaxHeap";
import MaxHeapInsert from "../../../lib/MaxHeap/insert";
import MaxHeapRemove from "../../../lib/MaxHeap/remove";
import AlgoButton from "../../Buttons/AlgoButton";
import AlgoInputButton from "../../Buttons/AlgoInputButton";
import Label from "../Label";
import Section from "../Section";

const MaxHeapPanel: FC<StructurePanel> = ({ play }) => {
  const [heap, setHeap] = useState<MaxHeap>();

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
      const t = new MaxHeap();
      t.moveTo(100, 100);

      setHeap(t);
      board.add(t);
      await board.draw();
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

      <Section>
        <Label>Heap (Array Representation)</Label>

        <input
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Array"
          defaultValue={heap.array.map((node) => node.value).join()}
          onChange={(e) => {
            let values = e.target.value.split(",").map((val) => +val);

            play(async () => {
              heap.setTreeFromArray(values);
              await board.draw();
            });
          }}
        />

        <p className="text-violet-500 text-xs italic py-1">
          * Comma seperated values of array.
        </p>
      </Section>
      <Section>
        <AlgoInputButton
          title="Insert"
          onClick={(value) => play(async () => await MaxHeapInsert(heap, value))}
        />

        <AlgoButton
          title="Remove"
          onClick={() => play(async () => await MaxHeapRemove(heap))}
        />
      </Section>
    </>
  );
};

export default MaxHeapPanel;
