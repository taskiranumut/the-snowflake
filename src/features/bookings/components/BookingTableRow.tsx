import { type DataBooking } from '@/services/api/bookings.types';
import { formatCurrency, formatDistanceFromNow } from '@/utils';
import { format, isToday } from 'date-fns';
import GridTable from '@/components/shared/GridTable';

type BookingsTableRowProps = {
  booking: DataBooking;
};

type StatusToTagMap = {
  [key: string]: string;
};

export function BookingTableRow({ booking }: BookingsTableRowProps) {
  const { startDate, endDate, nigthsNum, totalPrice, status, guests } = booking;

  const statusToTagName: StatusToTagMap = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'gray',
  };

  return (
    <GridTable.Row>
      <GridTable.Cell className="font-sono text-base font-semibold text-gray-600"></GridTable.Cell>
      <GridTable.Cell className="flex flex-col items-start gap-1">
        <span>{guests?.fullName}</span>
        <span className="text-sm text-gray-500">{guests?.email}</span>
      </GridTable.Cell>
      <GridTable.Cell className="flex flex-col items-start gap-1">
        <span>
          {' '}
          {isToday(new Date(startDate || ''))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {nigthsNum} night stay
        </span>
        <span className="text-sm text-gray-500">
          {' '}
          {format(new Date(startDate || ''), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate || ''), 'MMM dd yyyy')}
        </span>
      </GridTable.Cell>
      <GridTable.Cell className="font-sono">
        {formatCurrency(totalPrice)}
      </GridTable.Cell>
    </GridTable.Row>
  );
}
