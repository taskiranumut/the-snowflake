import { Link } from 'react-router-dom';
import { Tag, Flag, Button } from '@/components/shared';
import { CheckoutButton } from '@/features/check-in-out/components';
import { DataBooking } from '@/services/api/bookings.types';
import { useScreenSizeContext } from '@/context';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

type TodayItemsProps = {
  activity: DataBooking;
};

export function TodayItem({ activity }: TodayItemsProps) {
  const { t } = useTranslation();
  const { id, status, guests, nigthsNum } = activity;
  const { isSm, isLg } = useScreenSizeContext();

  return (
    <li
      className={twMerge(
        'grid items-center gap-1 border-b border-gray-100 px-0 py-2 text-base first-of-type:border-t md:gap-3 dark:border-gray-800',
        isSm || isLg
          ? 'grid-cols-[6.5rem_1fr_6rem]'
          : 'grid-cols-[6.5rem_2rem_1fr_6rem]',
      )}
    >
      {status === 'unconfirmed' && (
        <Tag color="green">{t('label.dashboard.todayActivity.arriving')}</Tag>
      )}
      {status === 'checked-in' && (
        <Tag color="blue">{t('label.dashboard.todayActivity.departing')}</Tag>
      )}

      {guests?.countryFlag && !isSm && !isLg && (
        <Flag
          src={guests?.countryFlag}
          title={guests?.nationality || ''}
          alt={t('message.common.flag', {
            country: guests?.nationality,
          })}
        />
      )}

      <div className="w-max font-normal">
        {t('message.common.nights', { count: nigthsNum || 0 })}
      </div>

      <div className="flex basis-full items-center justify-end pr-1">
        {status === 'unconfirmed' && (
          <Link to={`/checkin/${id}`}>
            <Button size="sm" constantSize>
              {t('action.bookings.checkIn')}
            </Button>
          </Link>
        )}
        {status === 'checked-in' && (
          <CheckoutButton
            bookingId={id}
            size="sm"
            constantSize
            className="bg-sky-500 hover:bg-sky-600"
          />
        )}
      </div>
    </li>
  );
}
