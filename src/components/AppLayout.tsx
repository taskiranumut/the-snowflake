import { Outlet } from 'react-router-dom';
import { Sidebar, Header, Main } from '@/components';
import { Box } from '@/components/shared';
import { useToggleSidebarContext } from '@/context';
import { twMerge } from 'tailwind-merge';

export function AppLayout() {
  const { isOpen } = useToggleSidebarContext();

  const layout = {
    openSidebar: 'grid-cols-1 sm:grid-cols-[16rem_1fr]',
    closeSidebar: 'grid-cols-1 sm:grid-cols-[auto_1fr]',
  };

  return (
    <div
      className={twMerge(
        'grid h-dvh grid-rows-[auto_1fr]',
        layout[isOpen ? 'openSidebar' : 'closeSidebar'],
      )}
    >
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
