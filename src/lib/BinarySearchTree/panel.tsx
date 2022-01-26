import React, { FC, useEffect, useState } from "react";
import BinarySearchTree from ".";
import AlgoInputButton from "../../components/AlgoInputButton";
import Label from "../../components/Label";
import { StructurePanel } from "../../components/Panel";
import PanelSection from "../../components/PanelSection";
import board from "../Board";
import BSTInsert from "./BSTInsert";
import BSTRemove from "./BSTRemove";
import BSTSearch from "./BSTSearch";

const BinarySearchTreePanel: FC<StructurePanel> = ({ play }) => {
  const [T, setTree] = useState<BinarySearchTree>();

  useEffect(() => {
    const t = new BinarySearchTree(50);
    t.moveTo(100, 100);
    t.setTreeFromArray([50, 25, 10, 40, 75, 60, 90]);

    setTree(t);
    board.add(t);
    play(async () => {
      await board.draw();
    });

    return () => {
      board.remove(t);
      play(async () => {
        await board.draw();
      });
    };
  }, []);

  return (
    <>
      <PanelSection>
        <Label title="Tree" />
        <input
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Tree Nodes"
          defaultValue={T?.preOrderTraversal().join()}
          onChange={(e) => {
            let values = e.target.value.split(",").map((val) => +val);

            T.setTreeFromArray(values);
            play(async () => {
              await board.draw();
            });
          }}
        />
        <p className="text-violet-500 text-xs italic py-1">
          * Comma seperated values that will be inserted to an empty tree in
          sequence.
        </p>
      </PanelSection>

      <PanelSection>
        <Label title="Animations" />

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
      </PanelSection>
    </>
  );
};

export default BinarySearchTreePanel;
