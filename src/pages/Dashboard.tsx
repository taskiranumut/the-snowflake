import { Row, Heading } from '@/components/shared';
import {
  DashboardLayout,
  DashboardOperations,
} from '@/features/dashboard/components';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <Row type="horizontal" responsive>
        <Heading as="h1">{t('title.page.dashboard')}</Heading>
        <DashboardOperations />
      </Row>

      <DashboardLayout />
    </>
  );
}
