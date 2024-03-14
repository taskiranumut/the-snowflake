import { getBookingsAfterDate } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { subDays, formatISO } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const daysNum = !searchParams.get('last')
    ? 7
    : parseInt(searchParams.get('last')!);
  const queryDate = formatISO(subDays(new Date(), daysNum));

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', queryDate],
    retry: false,
  });

  return { isLoading, bookings };
}
