import { type DataContainer } from '@/services/api/containers.types';
import { ContainerTableRow } from '@/features/containers/components';
import { Spinner, Menus, GridTable, Empty } from '@/components/shared';
import { useContainers } from '@/features/containers/hooks/useContainers';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ContainerTable() {
  const { isLoading, containers } = useContainers();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  if (!containers?.length)
    return <Empty resource={t('message.empty.resource.container')} />;

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

  const sortValue = searchParams.get('sort-by') || 'name-asc';
  const [field, direction] = sortValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedAndFilteredContainers = filteredContainers
    ? filteredContainers.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * modifier;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * modifier;
        } else {
          return 0;
        }
      })
    : [];

  return (
    <Menus>
      <GridTable template="1.1fr 1.2fr 1.5fr 1.2fr 1fr 3.2rem">
        <GridTable.Header className="w-[180vw] sm:w-[120vw] md:w-[100vw]">
          <GridTable.Cell></GridTable.Cell>
          <GridTable.Cell>
            {t('label.containers.table.header.container')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.containers.table.header.capacity')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.containers.table.header.price')}
          </GridTable.Cell>
          <GridTable.Cell>
            {t('label.containers.table.header.discount')}
          </GridTable.Cell>
          <GridTable.Cell></GridTable.Cell>
        </GridTable.Header>
        <GridTable.Body
          data={sortedAndFilteredContainers}
          render={(container: DataContainer) => (
            <ContainerTableRow container={container} key={container.id} />
          )}
        />
      </GridTable>
    </Menus>
  );
}
