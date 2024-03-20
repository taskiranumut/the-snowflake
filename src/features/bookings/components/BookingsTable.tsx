import { type DataBooking } from '@/services/api/bookings.types';
import {
  Spinner,
  GridTable,
  Menus,
  Empty,
  Pagination,
} from '@/components/shared';
import { useBookings } from '@/features/bookings/hooks';
import { BookingTableRow } from '@/features/bookings/components';

export function BookingsTable() {
  const { isLoading, bookings, count = null } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <GridTable template="0.8fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <GridTable.Header className="w-[300vw] sm:w-[180vw] md:w-[120vw]">
          <GridTable.Cell>Container</GridTable.Cell>
          <GridTable.Cell>Guest</GridTable.Cell>
          <GridTable.Cell>Dates</GridTable.Cell>
          <GridTable.Cell>Status</GridTable.Cell>
          <GridTable.Cell>Amount</GridTable.Cell>
          <GridTable.Cell></GridTable.Cell>
        </GridTable.Header>
        <GridTable.Body
          data={bookings}
          render={(booking: DataBooking) => (
            <BookingTableRow booking={booking} key={booking.id} />
          )}
        />
        <GridTable.Footer>
          <Pagination count={count} />
        </GridTable.Footer>
      </GridTable>
    </Menus>
  );
}
