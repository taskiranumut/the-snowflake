import { HeaderMenu, SidebarToggleButton, UserAvatar } from '@/components';

export function Header() {
  return (
    <header className="dark:bg-dark flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-10 py-4 dark:border-gray-800">
      <SidebarToggleButton />
      <div className="flex gap-4">
        <UserAvatar />
        <HeaderMenu />
      </div>
    </header>
  );
}
