import { useContext } from 'react';
import { ToggleSidebarContext } from '@/context/ToggleSidebarContext';
import { useTranslation } from 'react-i18next';

export function useToggleSidebarContext() {
  const { t } = useTranslation();
  const context = useContext(ToggleSidebarContext);
  if (context === undefined) {
    throw new Error(
      t('message.context.common.error', { context: 'ToggleSidebarContext' }),
    );
  }
  return context;
}
