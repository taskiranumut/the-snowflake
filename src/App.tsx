import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
