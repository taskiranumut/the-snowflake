import { type DataContainer } from '@/services/api/containers.types';
import ContainerTableRow from '@/features/containers/components/ContainerTableRow';
import Spinner from '@/components/shared/Spinner';
import { useContainers } from '../hooks/useContainers';
import GridTable from '@/components/shared/GridTable';
import Menus from '@/components/shared/Menus';
import { useSearchParams } from 'react-router-dom';

function ContainerTable() {
  const { isLoading, containers } = useContainers();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || 'all';

  let filteredContainers: DataContainer[] | undefined;
  if (filterValue === 'all') {
    filteredContainers = containers;
  } else if (filterValue === 'no-discount') {
    filteredContainers = containers?.filter(
      (container) => container.discount === 0,
    );
  } else if (filterValue === 'with-discount') {
    filteredContainers = containers?.filter((container) => container.discount);
  } else {
    filteredContainers = containers;
  }

  return (
    <Menus>
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
          data={filteredContainers}
          render={(container: DataContainer) => (
            <ContainerTableRow container={container} key={container.id} />
          )}
        />
      </GridTable>
    </Menus>
  );
}

export default ContainerTable;
