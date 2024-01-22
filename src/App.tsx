import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import ReactQueryProvider from './providers/ReactQueryProvider';

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ReactQueryProvider>
  );
}

export default App;
