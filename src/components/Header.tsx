import {
  HeaderMenu,
  SidebarToggleButton,
  UserAvatar,
  LanguageSelect,
} from '@/components';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 py-2 sm:px-10 sm:py-4 dark:border-gray-800 dark:bg-dark">
      <SidebarToggleButton />
      <div className="flex gap-4">
        <UserAvatar />
        <LanguageSelect />
        <HeaderMenu />
      </div>
    </header>
  );
}
