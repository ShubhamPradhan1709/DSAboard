import { Transition } from "@headlessui/react";
import React, { FC, useState } from "react";
import useResponsiveScreen from "../util/useResponsiveScreen";
import FloatButton from "./FloatButton";

const Panel: FC = () => {
  const [showControls, setShowControls] = useState(true);
  const size = useResponsiveScreen();

  return (
    <>
      <Transition
        show={showControls || size === "lg"}
        appear={true}
        as="aside"
        enter="transition-opacity duration-150 bg-white absolute w-screen h-screen"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        entered="bg-white absolute w-screen h-screen lg:relative lg:shrink-0 lg:w-1/3"
        leave="transition-opacity duration-150 bg-white absolute w-screen h-screen"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      ></Transition>

      {size !== "lg" && (
        <FloatButton toggleValue={showControls} toggle={setShowControls} />
      )}
    </>
  );
};

export default Panel;
