import Heading from '@/components/shared/Heading';
import Row from '@/components/shared/Row';
import {
  BookingsTable,
  BookingTableOperations,
} from '@/features/bookings/components';

export function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}
