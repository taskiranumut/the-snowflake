import { createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Containers from '@/pages/Containers';

const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<Navigate replace to="/dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="bookings" element={<div>Bookings</div>} />
    <Route path="containers" element={<Containers />} />
    <Route path="users" element={<div>Users</div>} />
    <Route path="settings" element={<div>Settings</div>} />
  </Route>,
);

export default routes;
