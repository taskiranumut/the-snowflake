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
  Account,
} from '@/pages';
import { UserProvider } from '@/providers';
import { ErrorFallback } from '@/components/shared';

const routes = createRoutesFromElements(
  <Route errorElement={<ErrorFallback />}>
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
      <Route path="account" element={<Account />} />
    </Route>

    <Route path="login" element={<Login />} />
    <Route path="*" element={<Navigate replace to="/dashboard" />} />
  </Route>,
);

export default routes;
