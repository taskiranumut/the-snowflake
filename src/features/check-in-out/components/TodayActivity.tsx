import { Heading, Row, Spinner } from '@/components/shared';
import { TodayItem } from '@/features/check-in-out/components';
import { useTodayActivity } from '@/features/check-in-out/hooks';
import { useTranslation } from 'react-i18next';

export function TodayActivity() {
  const { t } = useTranslation();
  const { activities = [], isLoading } = useTodayActivity();

  if (isLoading) return <Spinner />;

  return (
    <div className="flex max-h-[22rem] flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 md:gap-6 md:p-8 md:pt-6 dark:border-gray-800 dark:bg-dark">
      <Row type="horizontal">
        <Heading as="h2">{t('label.common.today')}</Heading>
      </Row>

      {activities?.length > 0 ? (
        <ul className="overflow-auto">
          {activities.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-center text-xl font-normal">
          {t('message.dashboard.todayActivity.empty')}
        </p>
      )}
    </div>
  );
}
