import { useNavigate } from 'react-router-dom';
import {
  Row,
  Heading,
  Tag,
  Button,
  ButtonText,
  Modal,
  Spinner,
} from '@/components/shared';
import { useBooking } from '@/features/bookings/hooks';
import { getTagColorForBookingStatus } from '@/features/bookings/helpers';
import { useMoveBack } from '@/hooks';
import { BookingDetailData } from '@/features/bookings/components';
import { useCheckout } from '@/features/check-in-out/hooks';

export function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { mutateCheckout, isCheckingOut } = useCheckout();

  if (isLoading) return <Spinner />;

  function handleCheckout() {
    if (booking?.id) {
      mutateCheckout(booking?.id);
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
          <Button onClick={() => navigate(`/checkin/${booking?.id}`)}>
            Check in
          </Button>
        )}

        {booking?.status === 'checked-in' && (
          <Button onClick={handleCheckout} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Button onClick={moveBack} color="secondary">
          Back
        </Button>
      </div>
    </>
  );
}
