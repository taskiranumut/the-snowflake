import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '@/hooks';
import { AiOutlineClose } from 'react-icons/ai';

type ModalContextTypes = {
  openName: string;
  handleOpen: (name: string) => void;
  handleClose: () => void;
};

type ModalProps = {
  children: ReactNode;
};

type OpenProps = {
  children: ReactElement;
  name: string;
};

type WindowProps = OpenProps & { closeOutsideClick?: boolean };

const ModalContext = createContext<ModalContextTypes | undefined>(undefined);

function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('ModalContext does not exist!');
  }

  return context;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  function handleOpen(name: string) {
    setOpenName(name);
  }

  function handleClose() {
    setOpenName('');
  }

  return (
    <ModalContext.Provider value={{ openName, handleClose, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }: OpenProps) {
  const { handleOpen } = useModalContext();

  return cloneElement(children, { onClick: () => handleOpen(name) });
}

function Window({ name, children, closeOutsideClick = false }: WindowProps) {
  const { openName, handleClose } = useModalContext();
  const modalWindowRef = useOutsideClick<HTMLDivElement>(handleClose);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-gray-500 bg-opacity-50 backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-md transition duration-500"
        ref={closeOutsideClick ? modalWindowRef : null}
      >
        <button
          className="absolute right-4 top-3 translate-x-2 rounded-md border-0 bg-none p-2 outline-none transition-all duration-200 hover:bg-gray-100 focus:border-0 focus:outline-none focus:ring-2 focus:ring-sky-300"
          type="button"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
        <div>{cloneElement(children, { onCloseModal: handleClose })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
