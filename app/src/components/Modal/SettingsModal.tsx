import React, { FC } from "react";
import Modal, { IModalProps } from ".";
import board from "../../App/Canvas/Board";
import useFullScreen from "../../hooks/useFullScreen";
import Button from "../Button";

const SettingsModal: FC<IModalProps> = (props) => {
  const [_, toggleFullscreen] = useFullScreen();

  return (
    <Modal {...props}>
      <div className="flex justify-between">
        <h1 className="text-dark-secondary">Settings</h1>
        <button onClick={() => props.setIsOpen(false)}>
          <span className="material-icons text-dark-secondary">close</span>
        </button>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between py-2">
        <span className="font-mono">Animation Speed</span>
        <input
          type="range"
          className="w-1/2"
          min={100}
          max={1000}
          step={10}
          onChange={(e) => {
            let value = +e.target.value;

            if (value !== undefined && Number.isNaN(value) === false) {
              board.speed = 1000 - value;
            }
          }}
          defaultValue={1000 - board.speed}
        />
      </div>

      <div className="flex justify-between py-2">
        <span className="font-mono">Scale</span>
        <input
          type="range"
          className="w-1/2"
          min={0.1}
          max={2}
          step={0.1}
          onChange={(e) => {
            let value = +e.target.value;

            if (value !== undefined && Number.isNaN(value) === false) {
              board.scale = +e.target.value;
              board.render();
            }
          }}
          defaultValue={board.scale}
        />
      </div>

      <Button onClick={toggleFullscreen}>Toggle Fullscreen</Button>
    </Modal>
  );
};

export default SettingsModal;
