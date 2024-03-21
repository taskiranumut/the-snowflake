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
import { getTagColorForBookingStatus } from '@/features/bookings/helpers';
import { useMoveBack } from '@/hooks';
import { BookingDetailData } from '@/features/bookings/components';
import { CheckoutButton } from '@/features/check-in-out/components';
import { HiTrash, HiArrowDownOnSquare } from 'react-icons/hi2';
import { useScreenSizeContext } from '@/context';

export function BookingDetail() {
  const { isSm } = useScreenSizeContext();
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { mutationDeleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  function handleDeleteBooking() {
    if (booking?.id) {
      mutationDeleteBooking(booking?.id, {
        onSettled: () => navigate('/bookings'),
      });
    }
  }

  const tagColor = getTagColorForBookingStatus(booking?.status);

  return (
    <>
      <Row type="horizontal" className="items-start md:items-center">
        <div className="flex flex-col items-start justify-between gap-2 sm:basis-auto sm:justify-start sm:gap-4 md:flex-row md:items-center md:gap-6">
          <Heading as="h1" className="text-2xl sm:text-3xl">
            Booking #{booking?.id}
          </Heading>
          <Tag color={tagColor}>{booking?.status?.replace('-', ' ')}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDetailData booking={booking} />

      <div className="flex justify-end gap-3">
        {booking?.status === 'unconfirmed' && (
          <Button
            onClick={() => navigate(`/checkin/${booking?.id}`)}
            icon={<HiArrowDownOnSquare size="1.25rem" />}
          >
            Check in
          </Button>
        )}

        {booking?.status === 'checked-in' && (
          <CheckoutButton bookingId={booking?.id} withIcon />
        )}

        <Modal>
          <Modal.Open name="delete">
            <Button color="danger" icon={<HiTrash size="1.25rem" />}>
              Delete
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
            Back
          </Button>
        )}
      </div>
    </>
  );
}
