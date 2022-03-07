import React, { FC } from "react";

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  value?: string;
}

const Input: FC<IProps> = (props) => {
  return <input className="w-full border border-secondary rounded-lg py-2 px-3 focus:outline-none text-gray-700" {...props} />;
};

export default Input;
