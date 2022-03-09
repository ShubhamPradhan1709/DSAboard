import React, { FC } from "react";

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  value?: string;
  className?: string;
}

const Input: FC<IProps> = ({ className, ...props }) => {

  return <input className={`w-full border border-secondary rounded-lg py-2 px-3 focus:outline-none text-gray-700 ${className}`} {...props} />;
};

export default Input;
