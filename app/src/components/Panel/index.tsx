import React, { FC, useState } from "react";
import { lgWidth } from "../../hooks/useResponsiveScreen";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Loading from "../Loading";
import DS, { DSList } from "../../lib/DS";
import UtilSection from "./UtilsSection";
import useSlider from "../../hooks/useSlider";
import MaxHeapPanel from "./panels/MaxHeap";
import PriorityQueuePanel from "./panels/PriorityQueue";

const NodeArrayPanel = React.lazy(() => import("./panels/NodeArray"));
const BinarySearchTreePanel = React.lazy(
  () => import("./panels/BinarySearchTree")
);

export interface StructurePanel {
  play: (func: () => Promise<void>) => Promise<void>;
}

const Panel: FC = () => {
  const [loading, showLoading] = useState(false);
  const [height, Slider] = useSlider();

  const location = useLocation();

  const play = async (func: () => Promise<void>) => {
    showLoading(true);
    await func();
    showLoading(false);
  };

  return (
    <aside className="fixed w-screen bottom-0 bg-white rounded-t-3xl lg:rounded-none lg:relative lg:shrink-0 lg:w-1/3">
      <Slider />

      <div
        className={`p-2 relative ${loading ? "" : "overflow-auto"}`}
        style={{
          height: `${window.innerWidth >= lgWidth ? "100%" : height + "px"}`,
        }}
      >
        {loading && <Loading />}

        <Link to="/">
          <button className="p-3 w-full rounded-lg font-bold bg-slate-600 hover:bg-slate-800 text-white flex justify-between">
            <h2>{location.pathname.substring(1).split("-").join(" ")}</h2>
            <span className="material-icons">expand_more</span>
          </button>
        </Link>

        {location.pathname !== "/" && <UtilSection play={play} />}

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
            <Route
              path={`/${DS.MaxHeap.split(" ").join("-")}`}
              element={<MaxHeapPanel play={play} />}
            />
            <Route
              path={`/${DS.PriorityQueue.split(" ").join("-")}`}
              element={<PriorityQueuePanel play={play} />}
            />
          </Routes>
        </React.Suspense>
      </div>
    </aside>
  );
};

export default Panel;
