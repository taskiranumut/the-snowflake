import { MainLogo, Navbar } from '@/components';

export function Sidebar() {
  return (
    <aside className="dark:bg-dark row-span-2 row-start-1 flex flex-col gap-8 border-r border-gray-100 bg-white px-6 py-4 dark:border-gray-800">
      <MainLogo redirect />
      <Navbar />
    </aside>
  );
}
