import React, { FC, useState } from "react";
import Header from "../Header";
import HomeModal from "../HomeModal";
import Main from "../Main";
import Panel from "../Panel";

const App: FC = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-full flex flex-col p-1 lg:w-2/3">
        <Header />
        <Main />
      </div>

      <Panel></Panel>
    </div>
  );
};
export default App;
