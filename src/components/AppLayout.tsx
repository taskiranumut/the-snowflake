import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Main from '@/components/Main';

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
