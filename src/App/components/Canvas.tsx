import React, { FC, useEffect, useRef } from "react";
import board from "../Board";

const Canvas: FC = () => {
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    canvasContainer.current.appendChild(board.canvas);

    return () => {
      canvasContainer.current.removeChild(board.canvas);
    };
  }, []);

  return <main ref={canvasContainer} className="overflow-auto grow"></main>;
};

export default Canvas;
