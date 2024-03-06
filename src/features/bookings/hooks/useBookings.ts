import { getBookings } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { type GetBookingsTypes } from '@/services/api/bookings.types';

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');

  const sortRaw = searchParams.get('sort-by') || 'start_date-desc';
  const [sortField, sortDirection] = sortRaw.split('-');

  const pageParams = searchParams.get('page');
  const page = pageParams ? Number(pageParams) : 1;

  const queryParams: GetBookingsTypes = {
    filter:
      !filterValue || filterValue === 'all'
        ? null
        : { field: 'status', value: filterValue },
    sort: {
      field: sortField,
      direction: sortDirection,
    },
    page,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', queryParams],
    queryFn: () => getBookings(queryParams),
  });

  return { isLoading, bookings: data?.data, count: data?.count };
}
