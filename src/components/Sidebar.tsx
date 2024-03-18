import { MainLogo, Navbar } from '@/components';
import { useToggleSidebarContext } from '@/context';
import { twMerge } from 'tailwind-merge';

export function Sidebar() {
  const { isOpen } = useToggleSidebarContext();

  return (
    <aside
      className={twMerge(
        'row-span-2 row-start-1 flex flex-col gap-8 border-r border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-dark',
        !isOpen ? 'px-2' : 'px-6',
      )}
    >
      <MainLogo redirect mini={!isOpen} />
      <Navbar />
    </aside>
  );
}
