import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import { ReactQueryProvider, ToasterProvider } from './providers';
import { ThemeContextProvider, ToggleSidebarContextProvider } from '@/context';

function App() {
  return (
    <ReactQueryProvider>
      <ToggleSidebarContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
          <ToasterProvider />
        </ThemeContextProvider>
      </ToggleSidebarContextProvider>
    </ReactQueryProvider>
  );
}

export default App;
