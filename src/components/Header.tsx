import { HeaderMenu, UserAvatar } from '@/components';

export function Header() {
  return (
    <header className="flex items-center justify-end gap-4 border-b border-gray-100 bg-white px-3 py-4">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}
