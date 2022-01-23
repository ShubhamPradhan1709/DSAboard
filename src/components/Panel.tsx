import React, { FC, useEffect, useState } from "react";
import BinarySearchTreePanel from "../lib/BinarySearchTree/panel";
import board from "../lib/Board";
import DS, { DSList } from "../lib/DS";
import NodeArrayPanel from "../lib/NodeArray/panel";
import useResponsiveScreen from "../utils/useResponsiveScreen";
import Loading from "./Loading";

export interface StructurePanel {
  play: (func: () => Promise<void>) => Promise<void>;
}

const Panel: FC = () => {
  const [height, setHeight] = useState(200);
  const [loading, showLoading] = useState(false);

  const [selectedDS, setSelectedDS] = useState<DS>(DS.NodeArray);

  const size = useResponsiveScreen();

  const [drag, setDrag] = useState(false);

  const handleDrag = (clientY: number) => {
    console.log(clientY);
    if (drag && clientY > 100) {
      setHeight(window.innerHeight - clientY - 20);
    }
  };

  useEffect(() => {
    if (height + 100 > window.innerHeight) {
      setHeight(window.innerHeight - 100);
    }
  });

  const play = async (func: () => Promise<void>) => {
    showLoading(true);
    await func();
    showLoading(false);
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
        className="overflow-auto p-2"
        style={{ height: `${size === "lg" ? "100%" : height + "px"}` }}
      >
        {loading && <Loading />}

        <div className={`${loading ? "hidden" : ""}`}>
          <button
            className="p-3 w-full rounded-lg font-bold bg-slate-600 hover:bg-slate-800 text-white flex justify-between"
            onClick={() => setSelectedDS(undefined)}
          >
            <h2>{selectedDS}</h2>
            <span className="material-icons">expand_more</span>
          </button>

          {selectedDS === undefined ? (
            <DSList setSelectedDS={setSelectedDS} />
          ) : (
            <>
              <hr className="my-4" />
              <div className="flex justify-between items-center m-4">
                <label className="block text-gray-700 text-md font-bold">
                  Scale
                  <span className="text-sm italic font-medium">
                    (between 0 and 1)
                  </span>
                </label>
                <input
                  className="shadow appearance-none border py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  min={0}
                  step={0.1}
                  max={1}
                  defaultValue={board.scale}
                  onChange={(e) => {
                    let value = +e.target.value;

                    if (value > 1) {
                      value = 1;
                    }
                    if (value < 0) {
                      value = 0;
                    }

                    board.scale = value;
                    play(async () => {
                      await board.draw();
                    });
                  }}
                />
              </div>
              <hr className="my-4" />

              {selectedDS === DS.NodeArray && <NodeArrayPanel play={play} />}
              {selectedDS === DS.BinarySearchTree && (
                <BinarySearchTreePanel play={play} />
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Panel;
