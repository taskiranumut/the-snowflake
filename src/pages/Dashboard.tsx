import { Row, Heading } from '@/components/shared';
import {
  DashboardLayout,
  DashboardOperations,
} from '@/features/dashboard/components';

export function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardOperations />
      </Row>

      <DashboardLayout />
    </>
  );
}
