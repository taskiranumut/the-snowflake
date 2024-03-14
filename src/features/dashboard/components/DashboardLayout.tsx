import { Spinner } from '@/components/shared';
import { useRecentBookings, useRecentStays } from '@/features/dashboard/hooks';
import { Stats } from '.';
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
    <div className="grid grid-cols-4 grid-rows-[auto_24rem_auto] gap-6">
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedStays || []}
        daysNum={daysNum}
        containerCount={containers?.length || 0}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </div>
  );
}
