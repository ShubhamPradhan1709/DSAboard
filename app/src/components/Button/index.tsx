import React, { FC, MouseEventHandler } from "react";

interface IProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<IProps> = ({ onClick, children }) => {
  return (
    <button
      className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
