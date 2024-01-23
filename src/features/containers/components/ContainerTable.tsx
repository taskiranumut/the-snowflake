import { getContainers } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import ContainerTableHeader from '@/features/containers/components/ContainerTableHeader';
import ContainerTableRow from '@/features/containers/components/ContainerTableRow';

function ContainerTable() {
  const {
    data: containers,
    isLoading,
    error,
  } = useQuery({ queryKey: ['containers'], queryFn: getContainers });

  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white text-lg"
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
