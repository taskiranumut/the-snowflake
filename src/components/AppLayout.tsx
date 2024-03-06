import { Outlet } from 'react-router-dom';
import { Sidebar, Header, Main } from '@/components';
import { Box } from '@/components/shared';

export function AppLayout() {
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
