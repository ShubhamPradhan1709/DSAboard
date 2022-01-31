import React, { FC } from "react";
import { Link } from "react-router-dom";

enum DS {
  NodeArray = "Node Array",
  BinarySearchTree = "Binary Search Tree",
}

export const DSList: FC = () => {
  const list = Object.entries(DS);
  const buttonList = list.map(([key, value], index) => (
    <Link key={key} to={`/${value.split(" ").join("-")}`}>
      <button
        className={`
          w-full p-2 border-y-slate-100 font-bold bg-slate-600 text-white hover:bg-slate-800
          ${index === 0 ? " rounded-t-lg" : ""}
          ${index === list.length - 1 ? " rounded-b-lg" : ""}
        `}
      >
        {value}
      </button>
    </Link>
  ));

  return <div className="mt-2">{buttonList}</div>;
};

export default DS;
