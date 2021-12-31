import React, { FC } from "react";
import githubMark from "../assets/GitHub-Mark-Light-64px.png";

const App: FC = () => {
  return (
    <div className="h-screen w-screen">
      <header className="flex justify-between items-center p-3">
        <h1 className="text-3xl text-white">DSA Board</h1>
        <a href="https://www.github.com/Chetan-Satpute/DSABoard" target="_blank">
          <img src={githubMark} height="32" width="32" />
        </a>
      </header>
    </div>
  );
};

export default App;
