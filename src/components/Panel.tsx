import React, { FC, useState } from "react";
import useResponsiveScreen from "../utils/useResponsiveScreen";

const Panel: FC = ({ children }) => {
  const [height, setHeight] = useState(200);
  const size = useResponsiveScreen();

  const [drag, setDrag] = useState(false);

  const handleDrag = (clientY: number) => {
    if (drag && clientY > 100) {
      setHeight(window.innerHeight - clientY - 20);
    }
  };

  return (
    <aside className="fixed w-screen bottom-0 bg-white rounded-t-3xl lg:rounded-none lg:relative lg:shrink-0 lg:w-1/3">
      {size !== "lg" && (
        <div
          className="p-3 flex justify-center"
          onMouseDown={() => setDrag(true)}
          onTouchStart={() => setDrag(true)}
          onMouseMove={(e) => handleDrag(e.clientY)}
          onTouchMove={(e) => handleDrag(e.touches[0].clientY)}
          onMouseUp={() => setDrag(false)}
          onTouchEnd={() => setDrag(false)}
        >
          <div className="bg-slate-800 w-1/2 rounded-md p-1"></div>
        </div>
      )}
      <div
        className="overflow-auto"
        style={{ height: `${size === "lg" ? "100%" : height + "px"}` }}
      >
        {children}
      </div>
    </aside>
  );
};

export default Panel;
