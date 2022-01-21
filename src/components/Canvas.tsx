import React, { FC, useEffect, useRef } from "react";
import Color from "../lib/Colors";
import Node from "../lib/Node";
import board from "./../lib/Board";

const Canvas: FC = () => {
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    canvasContainer.current.appendChild(board.canvas);

    return () => {
      canvasContainer.current.removeChild(board.canvas);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const node = new Node(500);
      node.moveTo(100, 100);

      node.color = Color.Cyan;

      await board.draw();
    })();
  }, []);

  return <div ref={canvasContainer} id="canvas-container" className="h-full overflow-auto" />;
};

export default Canvas;
