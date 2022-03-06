import React, { FC } from "react";
import Panel from "..";
import Button from "../../../components/Button";

const Home: FC = () => {
  return (
    <Panel title="Select Structure">
      <Button>Array</Button>
      <Button>Binary Search Tree</Button>
      <Button>Priority Queue</Button>
      <Button>Max-Heap</Button>
      <Button>Red Black Tree</Button>
      <Button>B-Tree</Button>
    </Panel>
  );
};

export default Home;
