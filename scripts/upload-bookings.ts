import { createClient } from '@supabase/supabase-js';
import { isFuture, isPast, isToday, differenceInCalendarDays } from 'date-fns';

import { bookings } from '../src/data/data-bookings';
import { containers } from '../src/data/data-containers';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function calcNights(end: string, start: string) {
  return differenceInCalendarDays(new Date(end), new Date(start));
}

async function main() {
  {
    const { error } = await supabase.from('bookings').delete().gt('id', 0);
    if (error) throw error;
  }

  const { data: guestsIds, error: gErr } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  if (gErr) throw gErr;

  const { data: containerIds, error: cErr } = await supabase
    .from('containers')
    .select('id')
    .order('id');
  if (cErr) throw cErr;

  const allGuestIds = (guestsIds ?? []).map((x) => x.id);
  const allContainerIds = (containerIds ?? []).map((x) => x.id);

  const finalBookings = bookings.map((booking) => {
    const container = containers.at(booking.container_id - 1)!;

    const nigths_num = calcNights(booking.end_date, booking.start_date);
    const container_price =
      nigths_num * (container.regular_price - container.discount);
    const extras_price = booking.has_breakfast
      ? nigths_num * 15 * booking.guests_num
      : 0;
    const total_price = container_price + extras_price;

    let status: 'checked-out' | 'unconfirmed' | 'checked-in' | undefined;

    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = 'checked-out';

    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = 'unconfirmed';

    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = 'checked-in';

    return {
      ...booking,
      nigths_num,
      container_price,
      extras_price,
      total_price,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      container_id: allContainerIds.at(booking.container_id - 1),
      status,
    };
  });

  {
    const { error } = await supabase.from('bookings').insert(finalBookings);
    if (error) throw error;
  }

  console.log(`OK: inserted ${finalBookings.length} bookings`);
}

main().catch((e) => {
  console.error('FAILED:', e?.message ?? e);
  process.exit(1);
});
