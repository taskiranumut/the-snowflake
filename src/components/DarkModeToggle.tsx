import { ButtonIcon } from '@/components/shared';
import { useThemeContext } from '@/context';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export function DarkModeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <ButtonIcon
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
    >
      {theme === 'dark' ? (
        <HiOutlineSun size="1.5rem" className="text-emerald-600" />
      ) : (
        <HiOutlineMoon size="1.5rem" className="text-emerald-600" />
      )}
    </ButtonIcon>
  );
}
