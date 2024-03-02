import Heading from '@/components/shared/Heading';
import Row from '@/components/shared/Row';
import { BookingsTable } from '@/features/bookings/components';

export function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}
