import { useToggleSidebarContext } from '@/context';
import { useTranslation } from 'react-i18next';
import { HiBars3 } from 'react-icons/hi2';

export function SidebarToggleButton() {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useToggleSidebarContext();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="text-gray-600 hover:text-emerald-600 hover:transition-colors hover:duration-200 active:text-emerald-700 dark:text-gray-400"
        title={isOpen ? t('tooltip.closeSidebar') : t('tooltip.openSidebar')}
        onClick={onToggle}
      >
        <HiBars3 size="1.5rem" />
      </button>
    </div>
  );
}
