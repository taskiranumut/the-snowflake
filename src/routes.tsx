import { createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import AppLayout from '@/ui/AppLayout';
import Dashboard from '@/pages/Dashboard';

const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<Navigate replace to="/dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>,
);

export default routes;
