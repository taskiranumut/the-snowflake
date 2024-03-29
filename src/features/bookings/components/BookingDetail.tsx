import { useNavigate } from 'react-router-dom';
import {
  Row,
  Heading,
  Tag,
  Button,
  ButtonText,
  Modal,
  ConfirmDelete,
  Spinner,
  Empty,
} from '@/components/shared';
import { useBooking, useDeleteBooking } from '@/features/bookings/hooks';
import {
  getFormattedStatus,
  getTagColorForBookingStatus,
} from '@/features/bookings/helpers';
import { useMoveBack } from '@/hooks';
import { BookingDetailData } from '@/features/bookings/components';
import { CheckoutButton } from '@/features/check-in-out/components';
import { HiTrash, HiArrowDownOnSquare } from 'react-icons/hi2';
import { useScreenSizeContext } from '@/context';
import { useTranslation } from 'react-i18next';

export function BookingDetail() {
  const { t } = useTranslation();
  const { isSm } = useScreenSizeContext();
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { mutationDeleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource={t('message.empty.resource.booking')} />;

  function handleDeleteBooking() {
    if (booking?.id) {
      mutationDeleteBooking(booking?.id, {
        onSettled: () => navigate('/bookings'),
      });
    }
  }

  const tagColor = getTagColorForBookingStatus(booking?.status);
  const formattedStatus = getFormattedStatus(booking?.status);

  return (
    <>
      <Row type="horizontal" className="items-start md:items-center">
        <div className="flex flex-col items-start justify-between gap-2 sm:basis-auto sm:justify-start sm:gap-4 md:flex-row md:items-center md:gap-6">
          <Heading as="h1" className="text-2xl sm:text-3xl">
            {t('title.page.bookingDetail', { id: booking?.id })}
          </Heading>
          <Tag color={tagColor}>{formattedStatus}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; {t('action.back')}</ButtonText>
      </Row>

      <BookingDetailData booking={booking} />

      <div className="flex justify-end gap-3">
        {booking?.status === 'unconfirmed' && (
          <Button
            onClick={() => navigate(`/checkin/${booking?.id}`)}
            icon={<HiArrowDownOnSquare size="1.25rem" />}
          >
            {t('action.bookings.checkIn')}
          </Button>
        )}

        {booking?.status === 'checked-in' && (
          <CheckoutButton bookingId={booking?.id} withIcon />
        )}

        <Modal>
          <Modal.Open name="delete">
            <Button color="danger" icon={<HiTrash size="1.25rem" />}>
              {t('action.delete')}
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              onConfirm={handleDeleteBooking}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        {!isSm && (
          <Button onClick={moveBack} color="secondary">
            {t('action.back')}
          </Button>
        )}
      </div>
    </>
  );
}
