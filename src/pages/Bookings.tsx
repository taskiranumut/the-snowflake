import { Heading, Row } from '@/components/shared';
import {
  BookingsTable,
  BookingTableOperations,
} from '@/features/bookings/components';

export function Bookings() {
  return (
    <>
      <Row
        type="horizontal"
        className="flex-col items-start gap-6 lg:flex-row lg:items-center"
      >
        <Heading as="h1">Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}
