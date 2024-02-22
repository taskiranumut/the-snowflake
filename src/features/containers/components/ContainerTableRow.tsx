import Row from '@/components/shared/Row';
import { type DataContainer } from '@/services/api/containers.types';
import { formatCurrency } from '@/utils';
import { useState } from 'react';
import AddContainerForm from '@/features/containers/components/AddContainerForm';
import { useDeleteContainer } from '@/features/containers/hooks';

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

  const { isDeleting, mutationDeleteContainer } = useDeleteContainer();

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
