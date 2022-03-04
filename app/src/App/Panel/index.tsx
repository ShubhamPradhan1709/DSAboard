import React, { FC } from "react";
import useFullScreen from "../../hooks/useFullScreen";
import useSlider from "../../hooks/useSlider";
import { isScreenMd, isScreenSm } from "../../utils/screenSize";

const Panel: FC = () => {
  const [length, Slider] = useSlider();
  const [fullscreen, toggleFullscreen] = useFullScreen();

  return (
    <div
      className="flex flex-col flex-shrink-0 md:flex-row bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
      style={{
        height: isScreenSm() ? `${length}px` : "100%",
        width: isScreenMd() ? `${length}px` : "100%", }}
    >
      <Slider />
      <div className="flex-auto">
        <button className="rounded bg-blue-500 p-1 text-white" onClick={toggleFullscreen}>Fullscreen</button>
      </div>
    </div>
  );
};

export default Panel;
