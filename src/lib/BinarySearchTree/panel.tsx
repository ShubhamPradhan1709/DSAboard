import React, { FC, useEffect } from "react";
import { StructurePanel } from "../../components/Panel";
import { pause } from "../../utils/animation";

const BinarySearchTreePanel: FC<StructurePanel> = ({ play }) => {
  useEffect(() => {
    play(async () => {
      await pause();
    });
  }, []);
  return <>Binary Search Tree</>;
};

export default BinarySearchTreePanel;
