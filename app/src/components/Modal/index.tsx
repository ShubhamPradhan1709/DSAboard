import { Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";

export interface IModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<IModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Transition show={isOpen}>
      <Transition.Child
        enter="transition-opacity ease-linear duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute h-screen w-screen bg-black/50 top-0 left-0 p-3">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative bg-white m-auto max-w-lg w-full rounded-lg p-3 mt-10">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default Modal;
