import React, { FC } from "react";
import Canvas from "./components/Canvas";
import githubMark from "../assets/GitHub-Mark-Light-64px.png";
import Panel from "./components/Panel";

const App: FC = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-full flex flex-col p-1 md:w-2/3">
        <header className="flex justify-between items-center p-2 select-none">
          <h1 className="text-2xl text-white">DSA Board</h1>
          <a href="https://github.com/Chetan-Satpute/DSABoard" target="_blank">
            <img src={githubMark} height={32} width={32} />
          </a>
        </header>

        <Canvas />
      </div>

      <Panel />
    </div>
  );
};
export default App;
