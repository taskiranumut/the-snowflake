import { DataItem, Flag } from '@/components/shared';
import { type DataBooking } from '@/services/api/bookings.types';
import { formatCurrency, formatDistanceFromNow } from '@/utils';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi2';
import { HiCube } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';
import { Trans, useTranslation } from 'react-i18next';

type BookingDetailData = {
  booking: DataBooking | undefined;
};

export function BookingDetailData({ booking }: BookingDetailData) {
  const { t } = useTranslation();
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

  const additionalGuestsText =
    guestsNum && guestsNum > 1
      ? ` + ${t('message.common.guestWithCount', { count: guestsNum - 1 })}`
      : '';

  return (
    <>
      <section className="overflow-hidden">
        <header className="flex flex-col items-start justify-between gap-4 rounded-t-lg bg-emerald-500 p-4 text-lg text-gray-100 sm:p-6 md:flex-row md:items-center md:gap-0 md:px-10 md:py-6 dark:text-gray-800">
          <div className="flex items-center gap-4 text-base font-semibold sm:text-lg">
            <HiCube size="2.25rem" />
            <p>
              <Trans
                i18nKey="message.bookingData.nightsInContainer"
                count={nigthsNum || 0}
                components={[<span className="font-sono text-lg sm:text-xl" />]}
                values={{ name: containers?.name }}
              ></Trans>
            </p>
          </div>
          <p className="text-base sm:text-lg">
            {format(new Date(startDate || ''), 'EEE, MMM dd yyyy')} (
            {isToday(new Date(startDate || ''))
              ? t('label.common.today')
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate || ''), 'EEE, MMM dd yyyy')}
          </p>
        </header>

        <section className="bg-white p-4 sm:p-6 md:px-10 md:py-8 dark:bg-dark">
          <div className="mb-4 flex flex-col items-start gap-3 text-gray-500 md:flex-row md:items-center dark:text-gray-400">
            <div className="flex basis-full gap-2 md:basis-auto">
              {guests?.countryFlag && (
                <Flag
                  src={guests?.countryFlag}
                  title={guests?.nationality || ''}
                  alt={t('message.common.flag', {
                    country: guests?.nationality,
                  })}
                />
              )}
              <p className="text-gray-700 dark:text-gray-200">
                {`${guests?.fullName}${additionalGuestsText}`}
              </p>
            </div>

            <span className="flex gap-2">
              <span>&bull;</span>
              <p>{guests?.email}</p>
            </span>

            <span className="flex gap-2">
              <span>&bull;</span>
              <p>
                {t('message.bookingData.nationalId')}: {guests?.nationalId}
              </p>
            </span>
          </div>

          {observations && (
            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label={t('message.bookingData.observations')}
            >
              {observations}
            </DataItem>
          )}

          <DataItem
            icon={<HiOutlineCheckCircle />}
            label={t('message.bookingData.hasBreakfast')}
          >
            {hasBreakfast ? t('common.yes') : t('common.no')}
          </DataItem>

          <div
            className={twMerge(
              'mt-4 flex flex-col items-start justify-between gap-4 rounded-md p-4 sm:p-6 md:mt-6 md:flex-row md:items-center md:gap-0 md:px-8 md:py-4',
              isPaid
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-yellow-100 text-yellow-700',
            )}
          >
            <DataItem
              icon={<HiOutlineCurrencyDollar />}
              label={t('message.bookingData.totalPrice')}
            >
              {formatCurrency(totalPrice)}{' '}
              {hasBreakfast &&
                t('message.bookingData.containerAndBreakfast', {
                  container: formatCurrency(containerPrice),
                  breakfast: formatCurrency(extrasPrice),
                })}
            </DataItem>

            <p className="text-base font-semibold">
              {isPaid
                ? t('message.bookingData.paid')
                : t('message.bookingData.willPay')}
            </p>
          </div>
        </section>

        <footer className="rounded-b-lg bg-white p-4 text-left text-sm text-gray-500 sm:p-6 sm:text-right md:px-10 md:pb-6 dark:bg-dark dark:text-gray-400">
          <p>
            {t('message.bookingData.booked', {
              date: format(new Date(createdAt), 'EEE, MMM dd yyyy, p'),
            })}
          </p>
        </footer>
      </section>
    </>
  );
}
