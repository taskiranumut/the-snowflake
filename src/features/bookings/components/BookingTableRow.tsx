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
import {
  getTagColorForBookingStatus,
  getFormattedStatus,
} from '@/features/bookings/helpers';
import { useCheckout } from '@/features/check-in-out/hooks';
import { useDeleteBooking } from '@/features/bookings/hooks';
import { useLocaleDateFormat } from '@/hooks';
import { useTranslation } from 'react-i18next';

type BookingsTableRowProps = {
  booking: DataBooking;
};

export function BookingTableRow({ booking }: BookingsTableRowProps) {
  const { t } = useTranslation();
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

  const { formats, locale } = useLocaleDateFormat();

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

  const stayTiming = isToday(new Date(startDate || ''))
    ? t('label.common.today')
    : t('message.bookingData.nightStay', {
        start: formatDistanceFromNow(startDate, locale),
        count: nigthsNum || 0,
      });

  const stayDateRange = t('message.bookingData.dateRange', {
    start: format(new Date(startDate || ''), formats.long, {
      locale,
    }),
    end: format(new Date(endDate || ''), formats.long, {
      locale,
    }),
  });

  const tagColor = getTagColorForBookingStatus(status);
  const formattedStatus = getFormattedStatus(status);

  return (
    <GridTable.Row className="w-[300vw] sm:w-[180vw] md:w-[120vw]">
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
        <span className="text-left">{stayTiming}</span>
        <span className="text-left text-sm text-gray-500 dark:text-gray-400">
          {stayDateRange}
        </span>
      </GridTable.Cell>
      <GridTable.Cell>
        <Tag color={tagColor}>{formattedStatus}</Tag>
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
                {t('action.bookings.details')}
              </Menus.Button>

              {status === 'unconfirmed' && (
                <Menus.Button
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                  icon={<HiArrowDownOnSquare />}
                >
                  {t('action.bookings.checkIn')}
                </Menus.Button>
              )}

              {status === 'checked-in' && (
                <Menus.Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  icon={<HiArrowUpOnSquare />}
                >
                  {t('action.bookings.checkOut')}
                </Menus.Button>
              )}

              <Modal.Open name="delete">
                <Menus.Button icon={<HiTrash />}>
                  {t('action.delete')}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              resource={t('message.empty.resource.booking')}
              onConfirm={handleDeleteBooking}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </GridTable.Cell>
    </GridTable.Row>
  );
}
