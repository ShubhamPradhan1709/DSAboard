import React, { FC } from "react";
import Panel from "./Panel";

const App: FC = () => {
  return (
    <div className="h-screen w-screen bg-dark-primary flex min-h-full flex-col md:flex-row">
      <div className="flex-auto flex flex-col overflow-auto p-1 ">
        <header>
          <h1 className="text-white text-center text-2xl">DSABoard</h1>
        </header>
        <div className="flex-auto overflow-auto">
          <canvas height={2000} width={2000} />
        </div>
      </div>

      <Panel />
    </div>
  );
};

export default App;
