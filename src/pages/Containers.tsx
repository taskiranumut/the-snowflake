import {
  ContainerTable,
  AddContainer,
  ContainerTableOperations,
} from '@/features/containers/components';
import { Heading, Row } from '@/components/shared';

export function Containers() {
  return (
    <>
      <Row
        type="horizontal"
        className="flex-col items-start gap-6 lg:flex-row lg:items-center"
      >
        <Heading as="h1">Containers</Heading>
        <ContainerTableOperations />
      </Row>
      <Row>
        <ContainerTable />
        <AddContainer />
      </Row>
    </>
  );
}
