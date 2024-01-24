import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import ReactQueryProvider from './providers/ReactQueryProvider';
import ToasterProvider from '@/providers/ToasterProvider';

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
      <ToasterProvider />
    </ReactQueryProvider>
  );
}

export default App;
