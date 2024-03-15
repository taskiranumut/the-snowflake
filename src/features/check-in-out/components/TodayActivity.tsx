import { Heading, Row, Spinner } from '@/components/shared';
import { TodayItem } from '@/features/check-in-out/components';
import { useTodayActivity } from '@/features/check-in-out/hooks';

export function TodayActivity() {
  const { activities = [], isLoading } = useTodayActivity();

  if (isLoading) return <Spinner />;

  return (
    <div className="col-span-2 col-start-1 flex flex-col gap-6 rounded-lg border border-gray-100 bg-white p-8 pt-6">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {activities?.length > 0 ? (
        <ul className="overflow-auto overflow-x-hidden">
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
