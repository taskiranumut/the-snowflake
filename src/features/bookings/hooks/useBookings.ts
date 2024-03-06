import { getBookings } from '@/services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { type GetBookingsTypes } from '@/services/api/bookings.types';
import { PAGE_SIZE } from '@/utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
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

  if (data?.count) {
    const pageCount = Math.ceil(data?.count / PAGE_SIZE);
    if (page < pageCount) {
      const nextPageQueries = { ...queryParams, page: queryParams.page + 1 };
      queryClient.prefetchQuery({
        queryKey: ['bookings', nextPageQueries],
        queryFn: () => getBookings(nextPageQueries),
      });
    }

    if (page > 1) {
      const prevPageQueries = { ...queryParams, page: queryParams.page - 1 };
      queryClient.prefetchQuery({
        queryKey: ['bookings', prevPageQueries],
        queryFn: () => getBookings(prevPageQueries),
      });
    }
  }

  return { isLoading, bookings: data?.data, count: data?.count };
}
