import React, { FC, useEffect, useState } from "react";
import type BinarySearchTree from ".";
import AlgoInputButton from "../../components/Buttons/AlgoInputButton";
import Label from "../../components/Panel/Label";
import { StructurePanel } from "../../components/Panel";
import Section from "../../components/Panel/Section";
import board from "../Board";
import { BACKEND_URL } from "../../utils/server";
import { pause } from "../../utils/animation";
import AlgoButton from "../../components/Buttons/AlgoButton";

const BinarySearchTreePanel: FC<StructurePanel> = ({ play }) => {
  const [T, setTree] = useState<BinarySearchTree>();

  useEffect(() => {
    play(async () => {
      const { default: BinarySearchTree } = await import(".");
      const values = await fetchRandomData();

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

  const fetchRandomData = async () => {
    const response = await fetch(`${BACKEND_URL}/binarysearchtree`);
    await pause();

    if (response.ok) {
      const { data } = (await response.json()) as { data: { values: number[] } };
      return data.values;
    } else {
      alert("Could not fetch data: Will be fixed soon!");
    }
  };

  const setRandomData = async () => {
    await play(async () => {
      const values = await fetchRandomData();
      T.setTreeFromArray(values);
      await board.draw();
    });
  };

  return (
    <>
      <Section>
        <AlgoButton title="Load Random Data" onClick={setRandomData} />
      </Section>
      <Section>
        <Label>Tree</Label>
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
      </Section>

      <Section>
        <Label>Animations</Label>

        <AlgoInputButton
          title="Search"
          onClick={(value) =>
            play(
              async () => await (await import("./BSTSearch")).default(T, value)
            )
          }
        />

        <AlgoInputButton
          title="Insert"
          onClick={(value) =>
            play(
              async () => await (await import("./BSTInsert")).default(T, value)
            )
          }
        />

        <AlgoInputButton
          title="Remove"
          onClick={(value) =>
            play(
              async () => await (await import("./BSTRemove")).default(T, value)
            )
          }
        />
      </Section>
    </>
  );
};

export default BinarySearchTreePanel;
