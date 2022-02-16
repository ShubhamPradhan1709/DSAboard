import React, { FC, useEffect, useRef, useState } from "react";
import { StructurePanel } from "..";
import board from "../../../lib/Board";
import { fetchRoute } from "../../../utils/server";
import AlgoButton from "../../Buttons/AlgoButton";
import AlgoInputButton from "../../Buttons/AlgoInputButton";
import Label from "../Label";
import Section from "../Section";

import BinarySearchTree from "../../../lib/BinarySearchTree";
import BSTInsert from "../../../lib/BinarySearchTree/BSTInsert";
import BSTRemove from "../../../lib/BinarySearchTree/BSTRemove";
import BSTSearch from "../../../lib/BinarySearchTree/BSTSearch";

const BinarySearchTreePanel: FC<StructurePanel> = ({ play }) => {
  const [T, setTree] = useState<BinarySearchTree>();
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

      const { values } = await fetchRoute("binarySearchTree");

      const t = new BinarySearchTree(50);
      t.moveTo(100, 100);
      t.setTreeFromArray(values);

      setTree(t);
      board.add(t);
      await board.draw();
    });
  };

  if (T === undefined) {
    return null;
  }

  return (
    <>
      <Section>
        <AlgoButton title="Load Random Data" onClick={setRandomData} />
      </Section>
      <Section>
        <Label>Tree</Label>
        <div className="flex items-center">
          <input
            ref={inputRef}
            className="shadow appearance-none border flex-1 py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Tree Nodes"
            defaultValue={T.preOrderTraversal().join()}
            onChange={(e) => {
              let values = e.target.value.split(",").map((val) => +val);

              T.setTreeFromArray(values);
              play(async () => {
                await board.draw();
              });
            }}
          />
          <button
            className="material-icons p-3 text-white bg-blue-700 rounded-md ml-3"
            onClick={() => {
              inputRef.current.value = T.preOrderTraversal().join();
            }}
          >
            update
          </button>
        </div>
        <p className="text-violet-500 text-xs italic py-1">
          * Comma seperated values that will be inserted to an empty tree in
          sequence.
        </p>
      </Section>

      <Section>
        <Label>Animations</Label>

        <AlgoInputButton
          title="Search"
          onClick={(value) => play(async () => await BSTSearch(T, value))}
        />

        <AlgoInputButton
          title="Insert"
          onClick={(value) => play(async () => await BSTInsert(T, value))}
        />

        <AlgoInputButton
          title="Remove"
          onClick={(value) => play(async () => await BSTRemove(T, value))}
        />
      </Section>
    </>
  );
};

export default BinarySearchTreePanel;
