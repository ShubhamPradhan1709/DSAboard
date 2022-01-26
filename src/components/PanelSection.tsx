import React, { FC } from "react";

const PanelSection: FC = ({ children }) => {
  return (
    <>
      <div className="m-4">{children}</div>
      <hr className="my-4" />
    </>
  );
};

export default PanelSection;
