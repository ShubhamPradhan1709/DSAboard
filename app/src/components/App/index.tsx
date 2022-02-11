import React, { FC } from "react";
import Header from "../Header";
import Main from "../Main";
import HomeModal from "../Modals/HomeModal";
import Panel from "../Panel";

const App: FC = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-full flex flex-col p-1 lg:w-2/3">
        <Header />
        <Main />
      </div>

      <Panel />
      <HomeModal />
    </div>
  );
};
export default App;
