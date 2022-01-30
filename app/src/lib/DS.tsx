import React, { FC } from "react";

enum DS {
  NodeArray = "Node Array",
  BinarySearchTree = "Binary Search Tree",
}

export const DSList: FC<{
  setSelectedDS: React.Dispatch<React.SetStateAction<DS>>;
}> = ({ setSelectedDS }) => {
  const list = Object.entries(DS);
  const buttonList = list.map(([key, value], index) => (
    <button
      key={key}
      className={`
          w-full p-2 border-y-slate-100 font-bold bg-slate-600 text-white hover:bg-slate-800
          ${index === 0 ? " rounded-t-lg" : ""}
          ${index === list.length - 1 ? " rounded-b-lg" : ""}
        `}
      onClick={() => setSelectedDS(value)}
    >
      {value}
    </button>
  ));

  return <div className="mt-2">{buttonList}</div>;
};

export default DS;
