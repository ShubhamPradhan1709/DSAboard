import React, { FC } from "react";
import Canvas from "../Canvas";
import HomeModal from "../Modals/HomeModal";

const Main: FC = () => {
  return (
    <main className="overflow-auto grow">
      <Canvas />
    </main>
  );
};

export default Main;
