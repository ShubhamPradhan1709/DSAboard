import React, { FC } from "react";
import "./styles.css";

const Loading: FC = () => {
  return (
    <div className="z-10 w-full h-full bg-white top-0 left-0 absolute">
      <div className="w-full h-full flex justify-center items-center">
        <div className="loadingio-spinner-bars-wbxz0i13iq">
          <div className="ldio-42ninjqcgp4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;