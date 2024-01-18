import { Outlet } from 'react-router-dom';
import Sidebar from '@/ui/Sidebar';
import Header from '@/ui/Header';
import Main from '@/ui/Main';

function AppLayout() {
  return (
    <div className="grid min-h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
