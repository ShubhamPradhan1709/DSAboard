import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import AlertModal from "../components/Modal/AlertModal";
import HomeModal from "../components/Modal/HomeModal";
import Canvas from "./Canvas";
import Panel, { PanelContent } from "./Panel";

import Home from "./Panel/Route/Home";
const Array = React.lazy(() => import("./Panel/Route/Array"));
const BinarySearchTree = React.lazy(
  () => import("./Panel/Route/BinarySearchTree")
);
const MaxHeap = React.lazy(() => import("./Panel/Route/MaxHeap"));
const PriorityQueuePanel = React.lazy(
  () => import("./Panel/Route/PriorityQueue")
);

const App: FC = () => {
  return (
    <div className="h-screen w-screen bg-dark-primary flex min-h-full flex-col md:flex-row">
      <div className="flex-auto flex flex-col overflow-auto p-1 ">
        <header>
          <h1 className="text-white text-center text-2xl">DSA Board</h1>
        </header>

        <main className="flex-auto overflow-auto">
          <Canvas />
        </main>
      </div>

      <Panel>
        <React.Suspense
          fallback={
            <PanelContent title="Loading...">
              <Loading />
            </PanelContent>
          }
        >
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="array" element={<Array />} />
            <Route path="binary-search-tree" element={<BinarySearchTree />} />
            <Route path="max-heap" element={<MaxHeap />} />
            <Route path="priority-queue" element={<PriorityQueuePanel />} />
          </Routes>
        </React.Suspense>
      </Panel>

      <HomeModal />
      <AlertModal />
    </div>
  );
};

export default App;
