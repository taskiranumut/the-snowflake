import supabase from '@/services/supabase';
import { convertRawBookingData } from '@/services/api/utils';
import {
  type DataBooking,
  type GetBookingsTypes,
} from '@/services/api/bookings.types';

export async function getBookings(
  queryParams: GetBookingsTypes,
): Promise<DataBooking[]> {
  const { filter, sort } = queryParams;

  const query = supabase.from('bookings').select('*, containers(*), guests(*)');

  if (filter) {
    if (!filter.method || filter.method === 'eq') {
      query.eq(filter.field, filter.value);
    }
  }

  if (sort) {
    query.order(sort.field, { ascending: sort.direction === 'asc' });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Bookings could not be loaded!');
  }

  return data.map((item) => convertRawBookingData(item));
}

export async function getBooking(id: number): Promise<DataBooking> {
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
