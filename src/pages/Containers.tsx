import ContainerTable from '@/features/containers/components/ContainerTable';
import AddContainer from '@/features/containers/components/AddContainer';
import Heading from '@/components/shared/Heading';
import Row from '@/components/shared/Row';
import ContainerTableOperations from '@/features/containers/components/ContainerTableOperations';

function Containers() {
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

export default Containers;
