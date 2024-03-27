import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { Stat } from '@/features/dashboard/components';
import { formatCurrency } from '@/utils';
import { DataBooking } from '@/services/api/bookings.types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice!, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.nigthsNum!, 0) /
    (daysNum * containerCount);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 md:col-start-1 md:gap-6 xl:grid-cols-4">
      <Stat
        title={t('label.dashboard.stats.header.bookings')}
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={t('label.dashboard.stats.header.sales')}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={t('label.dashboard.stats.header.checkIns')}
        color="pink"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={t('label.dashboard.stats.header.occupancyRate')}
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </div>
  );
}
