import React, { FC } from "react";
import { Link } from "react-router-dom";
import { PanelContent } from "..";
import Button from "../../../components/Button";

const Home: FC = () => {
  return (
    <PanelContent title="Select Structure">
      <Link to="array">
        <Button>Array</Button>
      </Link>
      <Link to="binary-search-tree">
        <Button>Binary Search Tree</Button>
      </Link>
      <Link to="max-heap">
        <Button>Max-Heap</Button>
      </Link>
      <Link to="priority-queue">
        <Button>Priority Queue</Button>
      </Link>
    </PanelContent>
  );
};

export default Home;
