import React, { FC, useState } from "react";
import Button from ".";
import Input from "../Input";

interface IProps {
  onClick: (value: any) => void;
  className?: string;
}
const InputButton: FC<IProps> = ({ onClick, className, children }) => {
  const [value, setValue] = useState(0);

  return (
    <div className={`flex justify-center items-center mb-2 ${className}`}>
        <Input className="mr-2" onChange={(e) => setValue(+e.target.value)} />
        <Button className="mr-0 mb-0" onClick={() => onClick(value)}>{children}</Button>
    </div>
  );
};

export default InputButton;
