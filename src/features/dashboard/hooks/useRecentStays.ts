import { getStaysAfterDate } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { subDays, formatISO } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const daysNum = !searchParams.get('last')
    ? 7
    : parseInt(searchParams.get('last')!);
  const queryDate = formatISO(subDays(new Date(), daysNum));

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', queryDate],
    retry: false,
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  return { isLoading, stays, confirmedStays, daysNum };
}
