import { getBookings } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return { isLoading, bookings };
}
