import { useToggleSidebarContext } from '@/context';
import { HiBars3 } from 'react-icons/hi2';

export function SidebarToggleButton() {
  const { isOpen, toggleSidebar } = useToggleSidebarContext();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="text-gray-600 hover:text-emerald-600 hover:transition-colors hover:duration-200 active:text-emerald-700 dark:text-gray-400"
        title={isOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={toggleSidebar}
      >
        <HiBars3 size="1.5rem" />
      </button>
    </div>
  );
}
