import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import board from "../../lib/Board";
import Label from "./Label";

interface IProps {
  play: (func: () => Promise<void>) => Promise<void>;
}

const UtilSection: FC<IProps> = ({ play }) => {
  const location = useLocation();

  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <Link to="/">
          <button className="material-icons text-2xl font-bold text-zinc-600">
            arrow_back
          </button>
        </Link>
        <h1 className="text-2xl px-4 text-zinc-600">
          {location.pathname.substring(1).split("-").join(" ")}
        </h1>
      </div>
      <hr />

      <div className="flex justify-between items-center mx-4 my-2">
        <Label>Scale</Label>

        <input
          className="mb-2 w-1/2"
          type="range"
          min={0.1}
          max={1}
          step={0.01}
          defaultValue={board.scale}
          onChange={(e) => {
            let value = +e.target.value;

            board.scale = value;
            play(async () => {
              await board.draw();
            });
          }}
        />
      </div>

      <div className="flex justify-between items-center mx-4 my-2">
        <Label>Animation Speed</Label>

        <input
          className="mb-2 w-1/2"
          type="range"
          min={10}
          max={1000}
          step={10}
          defaultValue={1000 - board.speed}
          onChange={(e) => {
            let value = +e.target.value;

            board.speed = 1000 - value;
            play(async () => {
              await board.draw();
            });
          }}
        />
      </div>
    </>
  );
};

export default UtilSection;
