import React, { FC } from "react";
import board from "../../lib/Board";
import Label from "./Label";

interface IProps {
  play: (func: () => Promise<void>) => Promise<void>;
}

const UtilSection: FC<IProps> = ({ play }) => {
  return (
    <div className="flex justify-between items-center m-4">
      <Label>
        Scale
        <span className="text-sm italic font-medium">(between 0 and 1)</span>
      </Label>

      <input
        className="shadow appearance-none border py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        min={0}
        step={0.1}
        max={1}
        defaultValue={board.scale}
        onChange={(e) => {
          let value = +e.target.value;

          if (value > 1) {
            value = 1;
          }
          if (value < 0) {
            value = 0;
          }

          board.scale = value;
          play(async () => {
            await board.draw();
          });
        }}
      />
    </div>
  );
};

export default UtilSection;
