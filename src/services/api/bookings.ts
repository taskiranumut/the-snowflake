import supabase from '@/services/supabase';
import { convertRawBookingData } from '@/services/api/utils';
import {
  type DataBooking,
  type GetBookingsTypes,
} from '@/services/api/bookings.types';

export async function getBookings(
  queryParams: GetBookingsTypes,
): Promise<DataBooking[]> {
  const { filter } = queryParams;

  const query = supabase.from('bookings').select('*, containers(*), guests(*)');

  if (filter !== null) {
    if (!filter.method || filter.method === 'eq') {
      query.eq(filter.field, filter.value);
    }
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Bookings could not be loaded!');
  }

  return data.map((item) => convertRawBookingData(item));
}

