import React, { FC, useEffect, useState } from "react";
import { PanelContent } from "..";
import Button from "../../../components/Button";
import InputButton from "../../../components/Button/InputButton";
import Input from "../../../components/Input";
import usePlay from "../../../hooks/usePlay";
import BinarySearchTree from "../../../lib/BinarySearchTree";
import BSTInsert from "../../../lib/BinarySearchTree/BSTInsert";
import BSTRemove from "../../../lib/BinarySearchTree/BSTRemove";
import BSTSearch from "../../../lib/BinarySearchTree/BSTSearch";
import { getBSTData } from "../../../utils/server";
import board from "../../Canvas/Board";

const BinarySearchTreePanel: FC = () => {
  const [T] = useState<BinarySearchTree>(new BinarySearchTree());
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
      const values = await getBSTData();
      T.setTreeFromArray(values);

      await board.render();
    });
  };

  return (
    <PanelContent title="Binary Search Tree">
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

      <Button onClick={setRandomData}>Get Random Binary Search Tree</Button>

      <hr className="my-3" />

      <InputButton
        onClick={(value) => play(async () => await BSTInsert(T, value))}
      >
        Insert Value
      </InputButton>

      <InputButton
        onClick={(value) => play(async () => await BSTRemove(T, value))}
      >
        Remove Value
      </InputButton>

      <InputButton
        onClick={(value) => play(async () => await BSTSearch(T, value))}
      >
        Search Value
      </InputButton>

    </PanelContent>
  );
};

export default BinarySearchTreePanel;
