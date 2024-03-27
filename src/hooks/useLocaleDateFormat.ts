import { type Locale } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

type Language = 'tr' | 'en';

type DateFormat = {
  formats: {
    short: string;
    long: string;
    longWithDay: string;
    longWithDayAndTime: string;
  };
  locale: Locale;
};

type DateFormats = {
  tr: DateFormat;
  en: DateFormat;
};

const dateFormats: DateFormats = {
  tr: {
    formats: {
      short: 'dd MMM',
      long: 'dd MMM yyyy',
      longWithDay: 'dd MMM yyyy, EEE',
      longWithDayAndTime: 'dd MMM yyyy EEE, p',
    },
    locale: tr,
  } as DateFormat,
  en: {
    formats: {
      short: 'MMM dd',
      long: 'MMM dd yyyy',
      longWithDay: 'EEE, MMM dd yyyy',
      longWithDayAndTime: 'EEE, MMM dd yyyy, p',
    },
    locale: enUS,
  } as DateFormat,
};

export function useLocaleDateFormat() {
  const { i18n } = useTranslation();

  const currLanguage = i18n.language.split('-')[0] as Language;
  const currFormat = dateFormats[currLanguage] ?? dateFormats.en;

  return currFormat;
}
