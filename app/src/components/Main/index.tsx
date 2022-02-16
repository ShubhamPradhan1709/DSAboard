import React, { FC } from "react";
import Canvas from "../Canvas";

const Main: FC = () => {
  return (
    <main className="overflow-auto grow relative">
      <Canvas />
    </main>
  );
};

export default Main;
