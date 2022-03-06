import React, { FC, useState } from "react";
import Modal  from ".";
import useFullScreen from "../../hooks/useFullScreen";

const HomeModal: FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [_, toggleFullScreen] = useFullScreen();

  return (
    <Modal isOpen={showModal} setIsOpen={setShowModal}>
      <div className="flex p-3">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
          <span className="material-icons text-blue-500">priority_high</span>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Fullscreen Mode
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              It is recommended to use this application in fullscreen mode.
              <br />
              <br />
              Fullscreen mode can be toggled from settings
              <span className="material-icons text-sm pl-2">settings</span>.
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            toggleFullScreen();
            setShowModal(false);
          }}
        >
          Enter Fullscreen
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
