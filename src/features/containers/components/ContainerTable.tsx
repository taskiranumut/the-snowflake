import ContainerTableHeader from '@/features/containers/components/ContainerTableHeader';
import ContainerTableRow from '@/features/containers/components/ContainerTableRow';
import Spinner from '@/components/shared/Spinner';
import { useContainers } from '../hooks/useContainers';

function ContainerTable() {
  const { isLoading, containers } = useContainers();

  if (isLoading) return <Spinner />;

  return (
    <div
      className="overflow-hidden rounded-md border border-gray-200 bg-white text-base"
      role="table"
    >
      <ContainerTableHeader />
      {containers?.map((container) => (
        <ContainerTableRow container={container} key={container.id} />
      ))}
    </div>
  );
}

export default ContainerTable;
