import React, { FC } from "react";
import githubMark from "./assets/GitHub-Mark-Light-64px.png";

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-2 select-none">
      <h1 className="text-2xl text-white">DSA Board</h1>
      <a href="https://github.com/Chetan-Satpute/DSABoard" target="_blank">
        <img src={githubMark} height={32} width={32} />
      </a>
    </header>
  );
};

export default Header;
