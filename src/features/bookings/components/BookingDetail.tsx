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
import { HiTrash, HiArrowUpOnSquare } from 'react-icons/hi2';

export function BookingDetail() {
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
      <Row type="horizontal">
        <div className="flex items-center gap-6">
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag color={tagColor}>{booking?.status?.replace('-', ' ')}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDetailData booking={booking} />

      <div className="flex justify-end gap-3">
        {booking?.status === 'unconfirmed' && (
          <Button
            onClick={() => navigate(`/checkin/${booking?.id}`)}
            icon={<HiArrowUpOnSquare size="1.25rem" />}
          >
            Check in
          </Button>
        )}

        {booking?.status === 'checked-in' && (
          <CheckoutButton bookingId={booking?.id} />
        )}

        <Modal>
          <Modal.Open name="delete">
            <Button color="danger" icon={<HiTrash size="1.25rem" />}>
              Delete booking
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

        <Button onClick={moveBack} color="secondary">
          Back
        </Button>
      </div>
    </>
  );
}
