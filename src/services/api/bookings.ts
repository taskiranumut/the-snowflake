import supabase from '@/services/supabase';
import { convertRawBookingData } from '@/services/api/utils';
import {
  type DataBooking,
  type GetBookingsTypes,
  type DataBookingsWithCount,
  type UpdateBookingTypes,
} from '@/services/api/bookings.types';
import { PAGE_SIZE } from '@/utils/constants';
import { getToday } from '@/utils';
import { isSameDay } from 'date-fns';
import { t } from 'i18next';

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
    throw new Error(t('message.api.bookings.common.error'));
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
    throw new Error(t('message.api.bookings.getBooking.error'));
  }

  return convertRawBookingData(data);
}

export async function updateBooking({
  id,
  updatedValues,
}: UpdateBookingTypes): Promise<DataBooking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedValues)
    .eq('id', id)
    .select('*, containers(*), guests(*)')
    .single();

  if (error) {
    throw new Error(t('message.api.bookings.updateBooking.error'));
  }

  return convertRawBookingData(data);
}

export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    throw new Error(t('message.api.bookings.deleteBooking.error'));
  }
}

export async function getBookingsAfterDate(
  date: string,
): Promise<DataBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(*), containers(*)')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(t('message.api.bookings.common.error'));
  }

  return data.map((item) => convertRawBookingData(item));
}

export async function getStaysAfterDate(date: string): Promise<DataBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(*), containers(*)')
    .gte('start_date', date)
    .lte('start_date', getToday());

  if (error) {
    throw new Error(t('message.api.bookings.common.error'));
  }

  return data.map((item) => convertRawBookingData(item));
}

export async function getStaysTodayActivity(): Promise<DataBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(*), containers(*)')
    .order('created_at');

  if (error) {
    throw new Error(t('message.api.bookings.common.error'));
  }

  const filteredData = data.filter((booking) => {
    if (!booking.start_date || !booking.end_date) return false;

    const isUnconfirmedAndStartToday =
      booking.status === 'unconfirmed' &&
      isSameDay(new Date(booking.start_date), new Date(getToday()));

    const isCheckedInAndEndToday =
      booking.status === 'checked-in' &&
      isSameDay(new Date(booking.end_date), new Date(getToday({ end: true })));

    return isUnconfirmedAndStartToday || isCheckedInAndEndToday;
  });

  return filteredData.map((item) => convertRawBookingData(item));
}
