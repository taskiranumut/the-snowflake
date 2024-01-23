import ContainerTable from '@/features/containers/components/ContainerTable';
import Heading from '@/components/shared/Heading';
import Row from '@/components/shared/Row';

function Containers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Containers</Heading>
        <Heading as="h3">Filter / Sort</Heading>
      </Row>
      <Row>
        <ContainerTable />
      </Row>
    </>
  );
}

export default Containers;
