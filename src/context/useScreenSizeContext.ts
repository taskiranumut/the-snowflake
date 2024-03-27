import { useContext } from 'react';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { useTranslation } from 'react-i18next';

export function useScreenSizeContext() {
  const { t } = useTranslation();
  const context = useContext(ScreenSizeContext);

  if (context === undefined) {
    throw new Error(
      t('message.context.common.error', { context: 'ScreenSizeContext' }),
    );
  }

  return context;
}
