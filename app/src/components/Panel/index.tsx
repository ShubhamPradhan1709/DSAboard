import React, { FC, useEffect, useState } from "react";
import useResponsiveScreen from "../../utils/useResponsiveScreen";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Loading from "../Loading";
import DS, { DSList } from "../../lib/DS";

const NodeArrayPanel = React.lazy(() => import("../../lib/NodeArray/panel"));
const BinarySearchTreePanel = React.lazy(
  () => import("../../lib/BinarySearchTree/panel")
);

export interface StructurePanel {
  play: (func: () => Promise<void>) => Promise<void>;
}

const Panel: FC = () => {
  const [height, setHeight] = useState(200);
  const [loading, showLoading] = useState(false);

  const location = useLocation();

  const size = useResponsiveScreen();

  const [drag, setDrag] = useState(false);

  const handleDrag = (clientY: number) => {
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
        className="overflow-auto p-2 relative"
        style={{ height: `${size === "lg" ? "100%" : height + "px"}` }}
      >
        {loading && <Loading />}

        <Link to="/">
          <button className="p-3 w-full rounded-lg font-bold bg-slate-600 hover:bg-slate-800 text-white flex justify-between">
            <h2>{location.pathname.substring(1).split("-").join(" ")}</h2>
            <span className="material-icons">expand_more</span>
          </button>
        </Link>

        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<DSList />} />
            <Route
              path={`/${DS.NodeArray.split(" ").join("-")}`}
              element={<NodeArrayPanel play={play} />}
            />
            <Route
              path={`/${DS.BinarySearchTree.split(" ").join("-")}`}
              element={<BinarySearchTreePanel play={play} />}
            />
          </Routes>
        </React.Suspense>
      </div>
    </aside>
  );
};

export default Panel;
