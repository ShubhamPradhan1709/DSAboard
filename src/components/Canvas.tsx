import React, { FC, useEffect, useRef } from "react";
import board from "./../lib/Board";

const Canvas: FC = () => {
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    canvasContainer.current.appendChild(board.canvas);

    return () => {
      canvasContainer.current.removeChild(board.canvas);
    };
  }, []);

  return (
    <div
      ref={canvasContainer}
      id="canvas-container"
      className="h-full overflow-auto"
    />
  );
};

export default Canvas;
