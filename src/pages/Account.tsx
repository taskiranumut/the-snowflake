import { Row, Heading } from '@/components/shared';
import {
  UpdateUserDataForm,
  UpdatePasswordForm,
} from '@/features/auth/components';
import { useTranslation } from 'react-i18next';

export function Account() {
  const { t } = useTranslation();

  return (
    <>
      <Heading as="h1" className="mb-4">
        {t('title.page.account.main')}
      </Heading>

      <Row className="mb-4">
        <Heading as="h3">{t('title.page.account.userData')}</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">{t('title.page.account.password')}</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}
