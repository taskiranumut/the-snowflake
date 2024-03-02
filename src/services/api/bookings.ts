import supabase from '@/services/supabase';
import { convertRawBookingData } from '@/services/api/utils';
import { type DataBooking } from '@/services/api/bookings.types';

export async function getBookings(): Promise<DataBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, containers(*), guests(*)');

  if (error) {
    throw new Error('Bookings could not be loaded!');
  }

  return data.map((item) => convertRawBookingData(item));
}

