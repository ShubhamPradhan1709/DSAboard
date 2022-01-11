import React, { FC } from "react";

interface IProps {
  toggleValue: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FloatButton: FC<IProps> = ({ toggleValue, toggle }) => {
  return (
    <button
      className="fixed bottom-0 right-0 p-4 m-5 rounded-full border-2 border-white shadow-gray-500 shadow-md bg-blue-800 material-icons text-white"
      onClick={() => toggle(!toggleValue)}
    >
      {toggleValue ? "unfold_less" : "unfold_more"}
    </button>
  );
};

export default FloatButton;
