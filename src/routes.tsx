import { createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { AppLayout } from '@/components';
import {
  Dashboard,
  Containers,
  Settings,
  Bookings,
  Booking,
  Checkin,
  Login,
  Users,
} from '@/pages';
import { UserProvider } from '@/providers';

const routes = createRoutesFromElements(
  <>
    <Route
      element={
        <UserProvider>
          <AppLayout />
        </UserProvider>
      }
    >
      <Route index element={<Navigate replace to="/dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:bookingId" element={<Booking />} />
      <Route path="checkin/:bookingId" element={<Checkin />} />
      <Route path="containers" element={<Containers />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    <Route path="login" element={<Login />} />
  </>,
);

export default routes;
