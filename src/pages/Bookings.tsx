import { Heading, Row } from '@/components/shared';
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
