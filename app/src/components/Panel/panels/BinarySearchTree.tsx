import React, { FC, useEffect, useState } from "react";
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

  useEffect(() => {
    play(async () => {
      const { values } = await fetchRoute("binarySearchTree");

      const t = new BinarySearchTree(50);
      t.moveTo(100, 100);
      t.setTreeFromArray(values);

      setTree(t);
      board.add(t);
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
      const { values } = await fetchRoute("binarySearchTree");
      T.setTreeFromArray(values);
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
            className="shadow appearance-none border flex-1 py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Tree Nodes"
            value={T.preOrderTraversal().join()}
            onChange={(e) => {
              let values = e.target.value.split(",").map((val) => +val);

              T.setTreeFromArray(values);
              play(async () => {
                await board.draw();
              });
            }}
          />
          <button
            className="my-1 mx-2 font-semibold leading-none text-white bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
            onClick={() => {
              let values = T.preOrderTraversal();

              T.setTreeFromArray(values);
              play(async () => {
                await board.draw();
              });
            }}
          >
          <span className="material-icons">send</span>
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
