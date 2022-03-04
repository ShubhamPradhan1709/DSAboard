import React, { FC, useCallback, useState } from "react";
import { isScreenMd, isScreenSm } from "../utils/screenSize";

function useSlider(): [number, FC<{}>] {
  const [length, setLength] = useState(500);

  const Slider: FC = useCallback(() => {
    const [drag, setDrag] = useState(false);

    const handleDrag = (clientX: number, clientY: number) => {
      if (isScreenSm()) {
        if (drag) {
          const value = window.innerHeight - clientY;
          if (value > 100 && window.innerHeight - value > 100) {
            setLength(window.innerHeight - clientY + 14);
          }
        }
      }

      if (isScreenMd()) {
        if (drag) {
          const value = window.innerWidth - clientX;
          if (value > 400 && window.innerWidth - value > 400) {
            setLength(window.innerWidth - clientX + 14);
          }
        }
      }
    };

    return (
      <div
        className="flex justify-center items-center p-3 cursor-row-resize md:cursor-col-resize"
        onMouseDown={() => setDrag(true)}
        onTouchStart={() => setDrag(true)}
        onMouseMove={(e) => handleDrag(e.clientX, e.clientY)}
        onTouchMove={(e) =>
          handleDrag(e.touches[0].clientX, e.touches[0].clientY)
        }
        onMouseUp={() => setDrag(false)}
        onTouchEnd={() => setDrag(false)}
      >
        <div className="p-0.5 bg-dark-secondary w-1/2 md:h-1/2 rounded-lg"></div>
      </div>
    );
  }, []);

  return [length, Slider];
}

export default useSlider;
