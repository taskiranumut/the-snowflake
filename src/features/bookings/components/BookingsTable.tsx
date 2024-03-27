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
import { useTranslation } from 'react-i18next';

export function BookingsTable() {
  const { t } = useTranslation();
  const { isLoading, bookings, count = null } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length)
    return <Empty resource={t('message.empty.resource.booking')} />;

  return (
    <Menus>
      <GridTable template="0.8fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <GridTable.Header className="w-[300vw] sm:w-[180vw] md:w-[120vw]">
          <GridTable.Cell>
            {t('label.bookings.table.header.container')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.bookings.table.header.guest')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.bookings.table.header.dates')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.bookings.table.header.status')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.bookings.table.header.amount')}
          </GridTable.Cell>
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
