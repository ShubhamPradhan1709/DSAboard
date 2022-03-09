import React, { FC, useEffect, useState } from "react";
import Modal from ".";

const ALERT_EVENT = "ALERT";

export const alertEvent = (info: string) => {
  const event = new CustomEvent(ALERT_EVENT, { detail: info });
  document.dispatchEvent(event);
};

const AlertModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState<string>();

  useEffect(() => {
    const eventHandler = (e: CustomEvent) => {
      setShowModal(true);
      setInfo(e.detail);
    };

    document.addEventListener(ALERT_EVENT, eventHandler);

    return () => {
      document.removeEventListener(ALERT_EVENT, eventHandler);
    };
  }, []);

  return (
    <Modal isOpen={showModal} setIsOpen={setShowModal}>
      <div className="flex">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
          <span className="material-icons text-red-500">priority_high</span>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div className="mt-2">
            <p className="text-sm text-gray-500">{info}</p>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
