'use client'

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface IModal {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<IModal> = (i) => {
  const [showModal, setShowModal] = useState(i.isOpen);
  useEffect(() => {
    setShowModal(i.isOpen);
  }, [i.isOpen]);

  const handleClose = useCallback(() => {
    if (i.disable) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      i.onClose();
    }, 300);
  }, [i.disable, i.onClose]);

  const handleSubmit = useCallback(() => {
    if (i.disable) {
      return;
    }
    i.onSubmit();
  }, [i.disable, i.onSubmit]);

  const handleSecondaryACtion = useCallback(() => {
    if (i.disable || !i.secondaryAction) {
      return;
    }
    i.secondaryAction();
  }, [i.disable, i.secondaryAction]);

  if (!i.isOpen) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-2/5 xl:w/2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-serif">
                    {i.title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">
                {i.body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                    {i.secondaryAction && i.secondaryActionLabel && (
                        <Button outline label={i.secondaryActionLabel} disabled={i.disable} onClick={handleSecondaryACtion}/>
                    )}
                    <Button label={i.actionLabel} disabled={i.disable} onClick={handleSubmit}/>
                </div>
                {i.footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
