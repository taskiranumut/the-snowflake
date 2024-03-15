import { Link } from 'react-router-dom';
import { Tag, Flag, Button } from '@/components/shared';
import { CheckoutButton } from '@/features/check-in-out/components';
import { DataBooking } from '@/services/api/bookings.types';

type TodayItemsProps = {
  activity: DataBooking;
};

export function TodayItem({ activity }: TodayItemsProps) {
  const { id, status, guests, nigthsNum } = activity;

  return (
    <li className="grid grid-cols-[6rem_2rem_1fr_5.5rem] items-center gap-3 border-b border-gray-100 px-0 py-2 text-base first-of-type:border-t">
      {status === 'unconfirmed' && <Tag color="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag color="blue">Departing</Tag>}

      {guests?.countryFlag ? (
        <Flag
          src={guests?.countryFlag}
          alt={`Flag of ${guests?.nationality}`}
        />
      ) : (
        <div />
      )}

      <div className="font-normal">{nigthsNum} nights</div>

      {status === 'unconfirmed' && (
        <Link to={`/checkin/${id}`}>
          <Button size="sm">Check in</Button>
        </Link>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </li>
  );
}
