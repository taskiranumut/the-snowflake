import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import { ReactQueryProvider, ToasterProvider } from './providers';
import {
  ThemeContextProvider,
  ToggleSidebarContextProvider,
  ScreenSizeContextProvider,
} from '@/context';

function App() {
  return (
    <ReactQueryProvider>
      <ScreenSizeContextProvider>
        <ToggleSidebarContextProvider>
          <ThemeContextProvider>
            <RouterProvider router={createBrowserRouter(routes)} />
            <ToasterProvider />
          </ThemeContextProvider>
        </ToggleSidebarContextProvider>
      </ScreenSizeContextProvider>
    </ReactQueryProvider>
  );
}

export default App;
