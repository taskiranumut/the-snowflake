import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '@/services/api';

export function useBooking() {
  const { bookingId } = useParams<{ bookingId: string }>();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => getBooking(bookingId!),
    retry: false,
  });

  return { isLoading, booking };
}
