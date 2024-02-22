import Row from '@/components/shared/Row';
import { deleteContainer } from '@/services/api';
import { type DataContainer } from '@/services/api/containers.types';
import { formatCurrency } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AddContainerForm from '@/features/containers/components/AddContainerForm';

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

  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: mutationDeleteContainer } =
    useMutation({
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
    mutationDeleteContainer(id);
  }

  return (
    <>
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
        <div className="font-sono">
          {discount ? (
            <span className="text-green-700">{formatCurrency(discount)}</span>
          ) : (
            <span>—</span>
          )}
        </div>
        <Row type="horizontal">
          <button
            className="border border-gray-300 px-2 py-1"
            onClick={() => setShowForm((show) => !show)}
            disabled={isDeleting}
          >
            Edit
          </button>
          <button
            className="border border-gray-300 px-2 py-1"
            onClick={() => handleDeleteContainer(containerId)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </Row>
      </div>
      {showForm && <AddContainerForm container={container} />}
    </>
  );
}

export default ContainerTableRow;
