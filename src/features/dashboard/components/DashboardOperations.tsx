import { Filter } from '@/components/shared';
import { useTranslation } from 'react-i18next';

export function DashboardOperations() {
  const { t } = useTranslation();

  return (
    <Filter
      queryField="last"
      options={[
        { value: '7', label: t('label.dashboard.filter.last7') },
        { value: '30', label: t('label.dashboard.filter.last30') },
        { value: '90', label: t('label.dashboard.filter.last90') },
      ]}
    />
  );
}
