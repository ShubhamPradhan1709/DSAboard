import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import useOrientation from "./useOrientation";

function useSlider(): [number, FC<{}>] {
  const [height, setHeight] = useState(200);
  const orientation = useOrientation();

  useLayoutEffect(() => {
    if (height + 100 > window.innerHeight) {
      setHeight(window.innerHeight - 100);
    }

    if (height + 100 > window.innerWidth) {
      setHeight(window.innerWidth - 100);
    }
  }, [orientation]);

  const slider: FC = useCallback(() => {
    const [drag, setDrag] = useState(false);

    const handleDrag = (clientY: number) => {
      if (drag && clientY > 100) {
        setHeight(window.innerHeight - clientY - 20);
      }
    };

    return (
      <div
        className="p-3 flex justify-center lg:hidden"
        onMouseDown={() => setDrag(true)}
        onTouchStart={() => setDrag(true)}
        onMouseMove={(e) => handleDrag(e.clientY)}
        onTouchMove={(e) => handleDrag(e.touches[0].clientY)}
        onMouseUp={() => setDrag(false)}
        onTouchEnd={() => setDrag(false)}
      >
        <div className="bg-slate-800 w-1/2 rounded-md p-1" />
      </div>
    );
  }, []);

  return [height, slider];
}

export default useSlider;
