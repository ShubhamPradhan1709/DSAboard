import React, { FC, useState } from "react";
import resetCanvasView from "../../utils/resetCanvasView";
import ToolButton from "../Buttons/ToolButton";
import Canvas from "../Canvas";
import HomeModal from "../Modals/HomeModal";

const Main: FC = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = async (value?: boolean) => {
    const root = document.getElementById("root");

    if (document.fullscreenElement && value !== true) {
      try {
        await document.exitFullscreen();
        setFullscreen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await root.requestFullscreen({ navigationUI: "hide" });
        setFullscreen(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="overflow-auto grow relative">
      <div className="absolute right-0 m-3 text-white flex flex-col">
        <ToolButton handleClick={resetCanvasView}>home</ToolButton>
        <ToolButton
          handleClick={() => toggleFullScreen()}
          disabled={!document.fullscreenEnabled}
        >
          {fullscreen ? "fullscreen_exit" : "fullscreen"}
        </ToolButton>
      </div>

      <Canvas />

      <HomeModal toggleFullScreen={toggleFullScreen} />
    </main>
  );
};

export default Main;
