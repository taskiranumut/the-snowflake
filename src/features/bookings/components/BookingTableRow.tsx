import { type DataBooking } from '@/services/api/bookings.types';
import { formatCurrency, formatDistanceFromNow } from '@/utils';
import { format, isToday } from 'date-fns';
import {
  GridTable,
  Tag,
  Modal,
  Menus,
  ConfirmDelete,
} from '@/components/shared';
import { useNavigate } from 'react-router-dom';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { getTagColorForBookingStatus } from '@/features/bookings/helpers';
import { useCheckout } from '@/features/check-in-out/hooks';
import { useDeleteBooking } from '@/features/bookings/hooks';

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

  const { mutateCheckout, isCheckingOut } = useCheckout();
  const { mutationDeleteBooking, isDeleting } = useDeleteBooking();

  function handleCheckout() {
    mutateCheckout(bookingId);
  }

  function handleDeleteBooking() {
    mutationDeleteBooking(bookingId, {
      onSettled: () => navigate('/bookings'),
    });
  }

  const tagColor = getTagColorForBookingStatus(status);

  return (
    <GridTable.Row>
      <GridTable.Cell className="font-sono text-base font-semibold text-gray-600 dark:text-gray-300">
        {containers?.name}
      </GridTable.Cell>
      <GridTable.Cell className="flex flex-col items-start gap-1">
        <span>{guests?.fullName}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {guests?.email}
        </span>
      </GridTable.Cell>
      <GridTable.Cell className="flex flex-col items-start gap-1">
        <span>
          {' '}
          {isToday(new Date(startDate || ''))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {nigthsNum} night stay
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
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
      <GridTable.Cell>
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

              {status === 'checked-in' && (
                <Menus.Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  icon={<HiArrowUpOnSquare />}
                >
                  Check out
                </Menus.Button>
              )}

              <Modal.Open name="delete">
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              onConfirm={handleDeleteBooking}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </GridTable.Cell>
    </GridTable.Row>
  );
}
