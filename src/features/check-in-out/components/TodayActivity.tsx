import { Heading, Row, Spinner } from '@/components/shared';
import { TodayItem } from '@/features/check-in-out/components';
import { useTodayActivity } from '@/features/check-in-out/hooks';

export function TodayActivity() {
  const { activities = [], isLoading } = useTodayActivity();

  if (isLoading) return <Spinner />;

  return (
    <div className="flex max-h-[22rem] flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 md:gap-6 md:p-8 md:pt-6 dark:border-gray-800 dark:bg-dark">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {activities?.length > 0 ? (
        <ul className="overflow-auto">
          {activities.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-center text-xl font-normal">
          No activity today...
        </p>
      )}
    </div>
  );
}
