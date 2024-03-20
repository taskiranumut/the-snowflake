import { Link } from 'react-router-dom';
import { Tag, Flag, Button } from '@/components/shared';
import { CheckoutButton } from '@/features/check-in-out/components';
import { DataBooking } from '@/services/api/bookings.types';
import { useScreenSizeContext } from '@/context';
import { twMerge } from 'tailwind-merge';

type TodayItemsProps = {
  activity: DataBooking;
};

export function TodayItem({ activity }: TodayItemsProps) {
  const { id, status, guests, nigthsNum } = activity;
  const { isSm, isLg } = useScreenSizeContext();

  return (
    <li
      className={twMerge(
        'grid items-center gap-1 border-b border-gray-100 px-0 py-2 text-base first-of-type:border-t md:gap-3 dark:border-gray-800',
        isSm || isLg
          ? 'grid-cols-[6rem_1fr_5.5rem]'
          : 'grid-cols-[6rem_2rem_1fr_5.5rem]',
      )}
    >
      {status === 'unconfirmed' && <Tag color="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag color="blue">Departing</Tag>}

      {guests?.countryFlag && !isSm && !isLg && (
        <Flag
          src={guests?.countryFlag}
          alt={`Flag of ${guests?.nationality}`}
        />
      )}

      <div className="w-max font-normal">{nigthsNum} nights</div>

      <div className="flex basis-full items-center justify-end pr-1">
        {status === 'unconfirmed' && (
          <Link to={`/checkin/${id}`}>
            <Button size="sm">Check in</Button>
          </Link>
        )}
        {status === 'checked-in' && <CheckoutButton bookingId={id} />}
      </div>
    </li>
  );
}
