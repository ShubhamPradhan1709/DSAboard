import React, { FC, useEffect, useRef } from "react";
import useFullScreen from "../../hooks/useFullScreen";
import board from "../../lib/Board";
import resetCanvasView from "../../utils/resetCanvasView";
import ToolButton from "../Buttons/ToolButton";

const Canvas: FC = () => {
  const canvasContainer = useRef<HTMLDivElement>();
  const [fullscreen, toggleFullScreen] = useFullScreen();

  useEffect(() => {
    canvasContainer.current.appendChild(board.canvas);

    return () => {
      canvasContainer.current.removeChild(board.canvas);
    };
  }, []);

  return (
    <>
      <div className="absolute right-0 m-3 text-white flex flex-col">
        <ToolButton handleClick={resetCanvasView}>home</ToolButton>
        <ToolButton
          handleClick={() => toggleFullScreen()}
          disabled={!document.fullscreenEnabled}
        >
          {fullscreen ? "fullscreen_exit" : "fullscreen"}
        </ToolButton>
      </div>

      <div
        ref={canvasContainer}
        id="canvas-container"
        className="h-full overflow-auto"
      />
    </>
  );
};

export default Canvas;
