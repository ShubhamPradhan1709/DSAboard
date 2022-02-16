import React, { FC, useEffect, useRef, useState } from "react";
import { StructurePanel } from "..";
import board from "../../../lib/Board";
import PriorityQueue from "../../../lib/PriorityQueue";
import PriorityQueueInsert from "../../../lib/PriorityQueue/insert";
import PriorityQueueRemove from "../../../lib/PriorityQueue/remove";
import { fetchRoute } from "../../../utils/server";
import AlgoButton from "../../Buttons/AlgoButton";
import AlgoInputButton from "../../Buttons/AlgoInputButton";
import Label from "../Label";
import Section from "../Section";

const PriorityQueuePanel: FC<StructurePanel> = ({ play }) => {
  const [heap, setHeap] = useState<PriorityQueue>();
  const inputRef = useRef<HTMLInputElement>();

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
      board.empty();

      const t = new PriorityQueue();
      t.moveTo(100, 100);

      const { array: values } = await fetchRoute("array");

      t.setTreeFromArray(values);

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

      <Section>
        <Label>Heap (Array Representation)</Label>

        <div className="flex items-center">
          <input
            ref={inputRef}
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
          <button
            className="material-icons p-3 text-white bg-blue-700 rounded-md ml-3"
            onClick={() => {
              inputRef.current.value = heap.array
                .map((node) => node.value)
                .join();
            }}
          >
            update
          </button>
        </div>

        <p className="text-violet-500 text-xs italic py-1">
          * Comma seperated values of array.
        </p>
      </Section>
      <Section>
        <AlgoInputButton
          title="Insert"
          onClick={(value) =>
            play(async () => await PriorityQueueInsert(heap, value))
          }
        />

        <AlgoButton
          title="Remove"
          onClick={() => play(async () => await PriorityQueueRemove(heap))}
        />
      </Section>
    </>
  );
};

export default PriorityQueuePanel;
