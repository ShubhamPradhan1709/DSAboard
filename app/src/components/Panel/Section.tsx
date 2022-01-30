import React, { FC } from "react";

const Section: FC = ({ children }) => {
  return (
    <>
      <hr className="my-4" />
      <div className="m-4">{children}</div>
    </>
  );
};

export default Section;
