import { type DataContainer } from '@/services/api/containers.types';
import ContainerTableRow from '@/features/containers/components/ContainerTableRow';
import Spinner from '@/components/shared/Spinner';
import { useContainers } from '../hooks/useContainers';
import GridTable from '@/components/shared/GridTable';

function ContainerTable() {
  const { isLoading, containers } = useContainers();

  if (isLoading) return <Spinner />;

  return (
    <GridTable columns="6">
      <GridTable.Header>
        <GridTable.Cell></GridTable.Cell>
        <GridTable.Cell>Container</GridTable.Cell>
        <GridTable.Cell>Capacity</GridTable.Cell>
        <GridTable.Cell>Price</GridTable.Cell>
        <GridTable.Cell>Discount</GridTable.Cell>
        <GridTable.Cell></GridTable.Cell>
      </GridTable.Header>
      <GridTable.Body
        data={containers}
        render={(container: DataContainer) => (
          <ContainerTableRow container={container} key={container.id} />
        )}
      />
    </GridTable>
  );
}

export default ContainerTable;
