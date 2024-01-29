import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Box from '@/components/shared/Box';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Header />
      <Main>
        <Box>
          <Outlet />
        </Box>
      </Main>
    </div>
  );
}

export default AppLayout;
