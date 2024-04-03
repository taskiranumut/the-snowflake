import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';
import supabase from '@/services/supabase';

import { subtractDates } from '@/utils';
import { containers } from '@/data/data-containers';
import { guests } from '@/data/data-guests';
import { bookings } from '@/data/data-bookings';
import { Button } from '@/components/shared';

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteContainers() {
  const { error } = await supabase.from('containers').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createContainers() {
  const { error } = await supabase.from('containers').insert(containers);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  const allGuestIds = guestsIds?.map((container) => container.id) || [];
  const { data: containerIds } = await supabase
    .from('containers')
    .select('id')
    .order('id');
  const allContainerIds = containerIds?.map((container) => container.id) || [];

  const finalBookings = bookings.map((booking) => {
    const container = containers.at(booking.container_id - 1)!;
    const nigths_num = subtractDates(booking.end_date, booking.start_date);
    const container_price =
      nigths_num * (container.regular_price - container.discount);
    const extras_price = booking.has_breakfast
      ? nigths_num * 15 * booking.guests_num
      : 0;
    const total_price = container_price + extras_price;

    let status;
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

  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteContainers();

    await createGuests();
    await createContainers();
    await createBookings();

    setIsLoading(false);

    window.location.reload();
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);

    window.location.reload();
  }

  return (
    <div className="flex h-full flex-col items-center justify-end gap-2">
      <Button
        onClick={uploadBookings}
        disabled={isLoading}
        color="secondary"
        className="w-full"
        constantSize
      >
        Upload bookings
      </Button>
      <Button
        onClick={uploadAll}
        disabled={isLoading}
        color="secondary"
        className="w-full"
        constantSize
      >
        Upload all samples
      </Button>
    </div>
  );
}
