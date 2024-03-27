import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

type LanguageType = 'en' | 'tr';

type LanguageData = {
  icon: string;
  shortName: string;
  name: string;
};

type LanguagesDataType = {
  en: LanguageData;
  tr: LanguageData;
};

type LanguageProps = {
  language: LanguageType;
  small?: boolean;
};

export function Language({ language, small = false }: LanguageProps) {
  const { t } = useTranslation();
  const languagesData: LanguagesDataType = {
    en: {
      icon: 'gb',
      shortName: t('common.englishShort'),
      name: t('common.english'),
    },
    tr: {
      icon: 'tr',
      shortName: t('common.turkishShort'),
      name: t('common.turkish'),
    },
  };

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between',
        small ? 'gap-1' : 'gap-2',
      )}
    >
      <span className={`fi fi-${languagesData[language].icon}`}></span>
      <span className={twMerge('inline-block', small ? 'w-6' : 'w-auto')}>
        {small
          ? languagesData[language].shortName
          : languagesData[language].name}
      </span>
    </div>
  );
}
