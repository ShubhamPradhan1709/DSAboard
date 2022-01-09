import React, { FC } from "react";
import githubMark from "../assets/GitHub-Mark-Light-64px.png";

const App: FC = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-2/3 flex flex-col p-1">
        <header className="flex justify-between items-center p-2">
          <h1 className="text-2xl text-white">DSA Board</h1>
          <a href="https://github.com/Chetan-Satpute/DSABoard" target="_blank">
            <img src={githubMark} height={32} width={32} />
          </a>
        </header>
        <main className="overflow-auto grow">
          <canvas height={2000} width={2000} />
        </main>
      </div>
      <aside className="bg-white md:shrink-0 w-full absolute md:relative h-full md:w-1/3"></aside>
    </div>
  );
};

export default App;
