import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import { ReactQueryProvider, ToasterProvider } from './providers';
import { ThemeContextProvider } from '@/context';

function App() {
  return (
    <ReactQueryProvider>
      <ThemeContextProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
        <ToasterProvider />
      </ThemeContextProvider>
    </ReactQueryProvider>
  );
}

export default App;
