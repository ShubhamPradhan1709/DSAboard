import React, { FC } from "react";
import HomeModal from "../components/Modal/HomeModal";
import Canvas from "./Canvas";
import Panel from "./Panel";
import Array from "./Panel/Route/Array";
import Home from "./Panel/Route/Home";

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
        <Array />
      </Panel>

      {/* <HomeModal /> */}
    </div>
  );
};

export default App;
