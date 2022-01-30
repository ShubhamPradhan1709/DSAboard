import React, { FC } from "react";

interface IProps {
  className?: string;
}

const Label: FC<IProps> = ({ className, children }) => {
  return (
    <label
      className={`block text-gray-700 text-sm font-bold mb-2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
