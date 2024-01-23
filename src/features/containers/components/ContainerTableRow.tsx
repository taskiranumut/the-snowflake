import { type DataContainer } from '@/services/api/containers.types';
import { formatCurrency } from '@/utils';

type ContainerTableRowProps = {
  container: DataContainer;
};

function ContainerTableRow({ container }: ContainerTableRowProps) {
  const { name, maxCapacity, regularPrice, discount, image } = container;

  return (
    <div
      className="grid grid-cols-6 items-center gap-12 border-b border-gray-100 px-3 py-4 last:border-0"
      role="row"
    >
      <img
        src={image || ''}
        alt={`${name || 'Container'} image`}
        className="aspect-[3/2] w-20 min-w-16 scale-150 object-cover object-center text-xs"
      />
      <div className="font-sono font-semibold text-gray-600">{name}</div>
      <div className="font-sono">{`${maxCapacity} guests`}</div>
      <div className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      <div className="font-sono text-green-700">{formatCurrency(discount)}</div>
      <button>Delete</button>
    </div>
  );
}

export default ContainerTableRow;
