import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

function Modal({ open, onClose, children }: ModalProps) {
  return (
    open &&
    createPortal(
      <div className="fixed left-0 top-0 z-50 h-screen w-full bg-gray-500 bg-opacity-50 backdrop-blur-sm transition-all duration-500">
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-md transition duration-500">
          <button
            className="absolute right-4 top-3 translate-x-2 rounded-md border-0 bg-none p-2 outline-none transition-all duration-200 hover:bg-gray-100 focus:border-0 focus:outline-none focus:ring-2 focus:ring-sky-300"
            type="button"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
          <div>{children}</div>
        </div>
      </div>,
      document.body,
    )
  );
}

export default Modal;
