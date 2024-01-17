import { createBrowserRouter, Navigate } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/dashboard" />,
  },
  {
    path: '/dashboard',
    async lazy() {
      const Dashboard = await import('@/pages/Dashboard');
      return { Component: Dashboard.default };
    },
  },
]);

export default routes;
