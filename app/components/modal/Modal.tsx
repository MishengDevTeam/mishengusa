'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body: React.ReactElement | string;
  footer?: React.ReactElement | string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
  }, [disabled]);

  if (!isOpen) return null;

  return (
    <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none '>
      <div
        onClick={onClose}
        className='relative w-full h-full bg-neutral-900/70'
      ></div>
      <div
        className={`absolute mx-auto h:auto w-[90vw] md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 max-w-[1720px]`}
      >
        {/* MODAL CONTENT */}
        <div
          className={`translate duration-300 
    ${showModal ? `translate-y-0 opacity-100` : `translate-y-full opacity-0`}
    `}
        >
          <div className='relative flex flex-col w-full bg-white outline-none focus:outline-none translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg'>
            {/* HEADER */}
            <div
              className={`relative flex items-center justify-center rounded-t-lg border-b truncate
              py-4
              `}
            >
              <div className={`text-lg font-semibold truncate`}>{title}</div>
              <button onClick={onClose} className='absolute right-6'>
                <IoMdClose size={24} />
              </button>
            </div>
            {/* BODY */}
            <div className={`flex relative justify-center py-4 px-2`}>
              {body}
            </div>
            {/* FOOTER */}
            <div className={`flex justify-center pt-2 pb-4 border-t`}>
              {footer}
            </div>
          </div>
        </div>
        {disabled && <div className='h-50'>loadingScreen</div>}
      </div>
    </div>
  );
};
export default Modal;
