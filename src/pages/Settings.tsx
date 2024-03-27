import { Heading, Row } from '@/components/shared';
import { UpdateSettingsForm } from '@/features/settings/components';
import { useTranslation } from 'react-i18next';

export function Settings() {
  const { t } = useTranslation();

  return (
    <Row>
      <Heading as="h1" className="mb-4">
        {t('title.page.settings')}
      </Heading>
      <UpdateSettingsForm />
    </Row>
  );
}
