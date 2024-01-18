import MainLogo from '@/ui/MainLogo';
import Navbar from '@/ui/Navbar';

function Sidebar() {
  return (
    <aside className="row-span-2 row-start-1 flex flex-col gap-8 border-r border-gray-100 bg-white px-3 py-4">
      <MainLogo />
      <Navbar />
    </aside>
  );
}

export default Sidebar;
