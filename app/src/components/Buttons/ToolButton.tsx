import React, { FC } from "react";

interface IProps {
  title?: string;
  disabled?: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ToolButton: FC<IProps> = ({
  disabled = false,
  title = "",
  handleClick,
  children
}) => {
  return (
    <button
      className={`text-white p-1 m-1 rounded-md material-icons ${
        disabled ? "bg-slate-400" : "bg-slate-500 hover:bg-slate-700"
      }`}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default ToolButton;
