import { Row, Heading } from '@/components/shared';
import { SignUpForm } from '@/features/auth/components';
import { useTranslation } from 'react-i18next';

export function Users() {
  const { t } = useTranslation();

  return (
    <Row>
      <Heading as="h1" className="mb-4">
        {t('title.page.users')}
      </Heading>
      <SignUpForm />
    </Row>
  );
}
