import { useState } from 'react';
import ContainerTable from '@/features/containers/components/ContainerTable';
import Heading from '@/components/shared/Heading';
import Row from '@/components/shared/Row';
import AddContainerForm from '@/features/containers/components/AddContainerForm';
import Button from '@/components/shared/Button';

function Containers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Containers</Heading>
        <Heading as="h3">Filter / Sort</Heading>
      </Row>
      <Row>
        <ContainerTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add New Container
        </Button>
        {showForm && <AddContainerForm />}
      </Row>
    </>
  );
}

export default Containers;
