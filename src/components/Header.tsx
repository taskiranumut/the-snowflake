import { Logout } from '@/features/auth/components';

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white px-3 py-4">
      Header
      <Logout />
    </header>
  );
}
