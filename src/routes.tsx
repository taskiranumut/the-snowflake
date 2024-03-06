import { createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { AppLayout } from '@/components';
import { Dashboard, Containers, Settings, Bookings } from '@/pages';

const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<Navigate replace to="/dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="bookings" element={<Bookings />} />
    <Route path="containers" element={<Containers />} />
    <Route path="users" element={<div>Users</div>} />
    <Route path="settings" element={<Settings />} />
  </Route>,
);

export default routes;
