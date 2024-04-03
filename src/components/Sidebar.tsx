import { MainLogo, Navbar } from '@/components';
import { useToggleSidebarContext, useScreenSizeContext } from '@/context';
import { twMerge } from 'tailwind-merge';
import { AiOutlineClose } from 'react-icons/ai';
import { Uploader } from '@/data/Uploader';

export function Sidebar() {
  const { isOpen, onClose } = useToggleSidebarContext();
  const { isSm } = useScreenSizeContext();

  return (
    <aside
      className={twMerge(
        'fixed left-0 top-0 z-40 flex h-full w-3/5 transform flex-col gap-8 border-r border-gray-100 bg-white py-4 pt-12 transition-transform duration-200 ease-in-out sm:relative sm:row-span-2 sm:row-start-1 sm:w-auto sm:pt-4 sm:transition-none dark:border-gray-800 dark:bg-dark',
        isOpen
          ? 'translate-x-0 px-6'
          : '-translate-x-full px-2 sm:translate-x-0',
      )}
    >
      {isSm && (
        <button
          className="absolute right-4 top-3 translate-x-2 rounded-md border-0 bg-gray-100 p-2 outline-none dark:bg-gray-800"
          type="button"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
      )}
      <MainLogo redirect mini={!isSm && !isOpen} />
      <Navbar />
      {process.env.NODE_ENV === 'development' && isOpen && <Uploader />}
    </aside>
  );
}
