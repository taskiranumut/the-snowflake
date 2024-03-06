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

export function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();


  if (isLoading) return <Spinner />;

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

    </>
  );
}
