import React, { FC } from "react";
import Canvas from "./Canvas";
import Panel from "./Panel";
import Home from "./Panel/Home";

const App: FC = () => {
  return (
    <div className="h-screen w-screen bg-dark-primary flex min-h-full flex-col md:flex-row">
      <div className="flex-auto flex flex-col overflow-auto p-1 ">
        <header>
          <h1 className="text-white text-center text-2xl">DSABoard</h1>
        </header>

        <main className="flex-auto overflow-auto">
          <Canvas />
        </main>
      </div>

      <Home />
    </div>
  );
};

export default App;
