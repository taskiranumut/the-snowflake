import ContainerTable from '@/features/containers/components/ContainerTable';
import AddContainer from '@/features/containers/components/AddContainer';
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
        <AddContainer />
      </Row>
    </>
  );
}

export default Containers;
