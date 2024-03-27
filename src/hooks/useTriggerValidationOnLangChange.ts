import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { type UseFormTrigger, type FieldValues } from 'react-hook-form';

export function useTriggerValidationOnLangChange<T extends FieldValues>(
  trigger: UseFormTrigger<T>,
) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleChangeLanguage = () => {
      setTimeout(() => {
        trigger();
      }, 0);
    };

    i18n.on('languageChanged', handleChangeLanguage);

    return () => {
      i18n.off('languageChanged', handleChangeLanguage);
    };
  }, [i18n, trigger]);
}
