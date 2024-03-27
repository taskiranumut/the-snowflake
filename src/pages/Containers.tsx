import {
  ContainerTable,
  AddContainer,
  ContainerTableOperations,
} from '@/features/containers/components';
import { Heading, Row } from '@/components/shared';
import { useTranslation } from 'react-i18next';

export function Containers() {
  const { t } = useTranslation();

  return (
    <>
      <Row
        type="horizontal"
        className="flex-col items-start gap-6 lg:flex-row lg:items-center"
      >
        <Heading as="h1">{t('title.page.containers')}</Heading>
        <ContainerTableOperations />
      </Row>
      <Row>
        <ContainerTable />
        <AddContainer />
      </Row>
    </>
  );
}
