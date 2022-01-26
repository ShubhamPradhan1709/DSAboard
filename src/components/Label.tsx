import React, { FC } from "react";

interface IProps {
  title: string;
}

const Label: FC<IProps> = ({ title }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {title}
    </label>
  );
};

export default Label;
