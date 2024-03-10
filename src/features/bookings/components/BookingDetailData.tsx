import { DataItem, Flag } from '@/components/shared';
import { type DataBooking } from '@/services/api/bookings.types';
import { formatCurrency, formatDistanceFromNow } from '@/utils';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi2';
import { AiFillBuild } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

type BookingDetailData = {
  booking: DataBooking | undefined;
};

export function BookingDetailData({ booking }: BookingDetailData) {
  if (!booking) return null;

  const {
    createdAt,
    startDate,
    endDate,
    nigthsNum,
    guestsNum,
    containerPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    containers,
  } = booking;

  return (
    <>
      <section className="overflow-hidden px-10 py-4">
        <header className="flex items-center justify-between rounded-t-lg bg-sky-500 px-10 py-6 text-lg text-gray-100">
          <div className="flex items-center gap-4 text-lg font-semibold">
            <AiFillBuild size="2.25rem" />
            <p>
              {nigthsNum} nights in Container{' '}
              <span className="ml-2 font-sono text-xl">{containers?.name}</span>
            </p>
          </div>
          <p>
            {format(new Date(startDate || ''), 'EEE, MMM dd yyyy')} (
            {isToday(new Date(startDate || ''))
              ? 'Today'
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate || ''), 'EEE, MMM dd yyyy')}
          </p>
        </header>

        <section className="bg-white px-10 py-8">
          <div className="mb-4 flex items-center gap-3 text-gray-500">
            {guests?.countryFlag && (
              <Flag
                src={guests?.countryFlag}
                alt={`Flag of ${guests?.nationality}`}
              />
            )}
            <p className="text-gray-700">
              {guests?.fullName}{' '}
              {guestsNum && guestsNum > 1 ? `+ ${guestsNum - 1} guests` : ''}
            </p>
            <span>&bull;</span>
            <p>{guests?.email}</p>
            <span>&bull;</span>
            <p>National ID {guests?.nationalId}</p>
          </div>

          {observations && (
            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label="Observations"
            >
              {observations}
            </DataItem>
          )}

          <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
            {hasBreakfast ? 'Yes' : 'No'}
          </DataItem>

          <div
            className={twMerge(
              'mt-6 flex items-center justify-between rounded-md px-8 py-4',
              isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700',
            )}
          >
            <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
              {formatCurrency(totalPrice)}

              {hasBreakfast &&
                ` (${formatCurrency(containerPrice)} container + ${formatCurrency(
                  extrasPrice,
                )} breakfast)`}
            </DataItem>

            <p className="text-base font-semibold">
              {isPaid ? 'Paid' : 'Will pay at property'}
            </p>
          </div>
        </section>

        <footer className="rounded-b-lg bg-white px-10 pb-6 text-right text-sm text-gray-500">
          <p>Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}</p>
        </footer>
      </section>
    </>
  );
}
