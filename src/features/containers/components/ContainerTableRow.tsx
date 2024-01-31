import { deleteContainer } from '@/services/api';
import { type DataContainer } from '@/services/api/containers.types';
import { formatCurrency } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type ContainerTableRowProps = {
  container: DataContainer;
};

function ContainerTableRow({ container }: ContainerTableRowProps) {
  const {
    id: containerId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = container;

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['containers'],
      });
      toast.success('Container successfully deleted!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleDeleteContainer(id: number): void {
    mutate(id);
  }

  return (
    <div
      className="grid grid-cols-6 items-center gap-12 border-b border-gray-100 px-3 py-4 last:border-0"
      role="row"
    >
      <img
        src={image || ''}
        alt={`${name || 'Container'} image`}
        className="aspect-[3/2] w-20 min-w-16 translate-x-2 scale-150 object-cover object-center text-xs"
      />
      <div className="font-sono font-semibold text-gray-600">{name}</div>
      <div className="font-sono">{`${maxCapacity} guests`}</div>
      <div className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      <div className="font-sono text-green-700">{formatCurrency(discount)}</div>
      <button
        onClick={() => handleDeleteContainer(containerId)}
        disabled={isPending}
      >
        Delete
      </button>
    </div>
  );
}

export default ContainerTableRow;
