import { ButtonIcon } from '@/components/shared';
import { useThemeContext } from '@/context';
import { useTranslation } from 'react-i18next';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export function DarkModeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <ButtonIcon
      onClick={toggleTheme}
      title={
        theme === 'dark' ? t('tooltip.lightTheme') : t('tooltip.darkTheme')
      }
    >
      {theme === 'dark' ? (
        <HiOutlineSun size="1.5rem" className="text-emerald-600" />
      ) : (
        <HiOutlineMoon size="1.5rem" className="text-emerald-600" />
      )}
    </ButtonIcon>
  );
}
