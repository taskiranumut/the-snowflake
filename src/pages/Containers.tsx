import {
  ContainerTable,
  AddContainer,
  ContainerTableOperations,
} from '@/features/containers/components';
import { Heading, Row } from '@/components/shared';

export function Containers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Containers</Heading>
        <ContainerTableOperations />
      </Row>
      <Row>
        <ContainerTable />
        <AddContainer />
      </Row>
    </>
  );
}
