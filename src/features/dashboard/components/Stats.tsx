import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { Stat } from '@/features/dashboard/components';
import { formatCurrency } from '@/utils';
import { DataBooking } from '@/services/api/bookings.types';

type StatsProps = {
  bookings: DataBooking[];
  confirmedStays: DataBooking[];
  daysNum: number;
  containerCount: number;
};

export function Stats({
  bookings,
  confirmedStays,
  daysNum,
  containerCount,
}: StatsProps) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice!, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.nigthsNum!, 0) /
    (daysNum * containerCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="pink"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}
