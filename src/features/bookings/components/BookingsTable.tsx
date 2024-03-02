import { type DataBooking } from '@/services/api/bookings.types';
import Spinner from '@/components/shared/Spinner';
import GridTable from '@/components/shared/GridTable';
import Menus from '@/components/shared/Menus';
import { useBookings } from '@/features/bookings/hooks';
import { BookingTableRow } from '@/features/bookings/components';

export function BookingsTable() {
  const { isLoading, bookings } = useBookings();

  if (isLoading) return <Spinner />;


  return (
    <Menus>
      <GridTable columns="6">
        <GridTable.Header>
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
      </GridTable>
    </Menus>
  );
}
