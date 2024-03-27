import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export function useThemeContext() {
  const { t } = useTranslation();
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      t('message.context.common.error', { context: 'ThemeContext' }),
    );
  }
  return context;
}
