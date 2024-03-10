import { type DataBooking } from '@/services/api/bookings.types';
import { formatCurrency, formatDistanceFromNow } from '@/utils';
import { format, isToday } from 'date-fns';
import { GridTable, Tag, Modal, Menus } from '@/components/shared';
import { useNavigate } from 'react-router-dom';
import {
  HiArrowDownOnSquare,
  HiEye,
} from 'react-icons/hi2';
import { getTagColorForBookingStatus } from '@/features/bookings/helpers';

type BookingsTableRowProps = {
  booking: DataBooking;
};

export function BookingTableRow({ booking }: BookingsTableRowProps) {
  const {
    id: bookingId,
    startDate,
    endDate,
    nigthsNum,
    totalPrice,
    status,
    guests,
    containers,
  } = booking;

  const navigate = useNavigate();

  const tagColor = getTagColorForBookingStatus(status);

  return (
    <GridTable.Row>
      <GridTable.Cell className="font-sono text-base font-semibold text-gray-600">
        {containers?.name}
      </GridTable.Cell>
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
      <GridTable.Cell>
        <Tag color={tagColor}>{status?.replace('-', ' ')}</Tag>
      </GridTable.Cell>
      <GridTable.Cell className="font-sono">
        {formatCurrency(totalPrice)}
      </GridTable.Cell>
      <GridTable.Cell className="justify-end">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle menuId={bookingId} />
            <Menus.List menuId={bookingId}>
              <Menus.Button
                onClick={() => navigate(`/bookings/${bookingId}`)}
                icon={<HiEye />}
              >
                See details
              </Menus.Button>

              {status === 'unconfirmed' && (
                <Menus.Button
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                  icon={<HiArrowDownOnSquare />}
                >
                  Check in
                </Menus.Button>
              )}
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </GridTable.Cell>
    </GridTable.Row>
  );
}
