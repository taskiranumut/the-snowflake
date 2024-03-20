import { Spinner } from '@/components/shared';
import { useRecentBookings, useRecentStays } from '@/features/dashboard/hooks';
import {
  Stats,
  SalesChart,
  DurationChart,
} from '@/features/dashboard/components';
import { TodayActivity } from '@/features/check-in-out/components';
import { useContainers } from '@/features/containers/hooks';

export function DashboardLayout() {
  const { containers, isLoading: isLoadingBookings } = useContainers();
  const { bookings, isLoading: isLoadingRecentBookings } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    daysNum,
  } = useRecentStays();

  if (isLoadingRecentBookings || isLoadingStays || isLoadingBookings)
    return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedStays || []}
        daysNum={daysNum}
        containerCount={containers?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays || []} />
      <SalesChart bookings={bookings || []} daysNum={daysNum} />
    </div>
  );
}
