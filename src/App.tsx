import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import { ReactQueryProvider, ToasterProvider } from './providers';

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
      <ToasterProvider />
    </ReactQueryProvider>
  );
}

export default App;
