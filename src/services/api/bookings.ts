import supabase from '@/services/supabase';
import { convertRawBookingData } from '@/services/api/utils';
import {
  type DataBooking,
  type GetBookingsTypes,
  type DataBookingsWithCount,
} from '@/services/api/bookings.types';
import { PAGE_SIZE } from '@/utils/constants';

export async function getBookings(
  queryParams: GetBookingsTypes,
): Promise<DataBookingsWithCount> {
  const { filter, sort, page } = queryParams;

  const query = supabase
    .from('bookings')
    .select('*, containers(*), guests(*)', { count: 'exact' });

  if (filter) {
    if (!filter.method || filter.method === 'eq') {
      query.eq(filter.field, filter.value);
    }
  }

  if (sort) {
    query.order(sort.field, { ascending: sort.direction === 'asc' });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error('Bookings could not be loaded!');
  }

  return {
    data: data.map((item) => convertRawBookingData(item)),
    count,
  };
}

export async function getBooking(id: number | string): Promise<DataBooking> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, containers(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Booking not found!');
  }

  return convertRawBookingData(data);
}
