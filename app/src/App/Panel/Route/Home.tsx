import React, { FC, useContext, useEffect } from "react";
import { PanelContent } from "..";
import Button from "../../../components/Button";
import PlayContext from "../../../contexts/playContext";
import board from "../../Canvas/Board";

const Home: FC = () => {

  useEffect(() => {
    const ctx = board.canvas.getContext('2d');

    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.stroke();
  }, []);


  return (
    <PanelContent title="Select Structure">
      <Button>Array</Button>
      <Button>Binary Search Tree</Button>
      <Button>Priority Queue</Button>
      <Button>Max-Heap</Button>
      <Button>Red Black Tree</Button>
      <Button>B-Tree</Button>
    </PanelContent>
  );
};

export default Home;
