import { Menus, Language } from '@/components/shared';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageType = 'en' | 'tr';

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
