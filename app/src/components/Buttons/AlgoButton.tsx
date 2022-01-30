import React, { FC } from "react";

interface IProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AlgoButton: FC<IProps> = ({ title, onClick }) => {
  return (
    <button
      className="w-full my-1 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default AlgoButton;
