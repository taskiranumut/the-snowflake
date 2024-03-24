import { Menus } from '@/components/shared';
import { useState, useEffect } from 'react';
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

function Language({ language, small = false }: LanguageProps) {
  const languagesData: LanguagesDataType = {
    en: { icon: 'gb', shortName: 'En', name: 'English' },
    tr: { icon: 'tr', shortName: 'Tr', name: 'Turkish' },
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

export function LanguageSelect() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    const language = i18n.language.split('-')[0] as LanguageType;
    setSelectedLanguage(language);
  }, [i18n]);

  function handleChangeLanguage(language: LanguageType) {
    if (selectedLanguage === language) return;

    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  }

  return (
    <Menus>
      <Menus.Toggle
        className="pl-3 pr-2 text-gray-600 dark:text-gray-300"
        menuId="language"
      >
        <Language language={selectedLanguage} small />
      </Menus.Toggle>
      <Menus.List menuId="language">
        <Menus.Button onClick={() => handleChangeLanguage('en')}>
          <Language language="en" />
        </Menus.Button>
        <Menus.Button onClick={() => handleChangeLanguage('tr')}>
          <Language language="tr" />
        </Menus.Button>
      </Menus.List>
    </Menus>
  );
}
