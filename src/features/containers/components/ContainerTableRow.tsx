import Row from '@/components/shared/Row';
import {
  type DataContainer,
  type RawNewDataContainerWithImagePath,
} from '@/services/api/containers.types';
import { formatCurrency } from '@/utils';
import AddContainerForm from '@/features/containers/components/AddContainerForm';
import {
  useDeleteContainer,
  useDuplicateContainer,
} from '@/features/containers/hooks';
import Modal from '@/components/shared/Modal';
import ConfirmDelete from '@/components/shared/ConfirmDelete';
import GridTable from '@/components/shared/GridTable';
import Menus from '@/components/shared/Menus';
import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2';

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
    description,
  } = container;

  const { isDeleting, mutationDeleteContainer } = useDeleteContainer();
  const { isDuplicating, mutateDuplciateContainer } = useDuplicateContainer();

  function handleDeleteContainer(id: number): void {
    mutationDeleteContainer(id);
  }

  function handleDuplicateContainer() {
    const data: RawNewDataContainerWithImagePath = {
      name: `Copy of ${name}`,
      max_capacity: maxCapacity,
      regular_price: regularPrice,
      discount,
      description,
      image,
    };
    mutateDuplciateContainer(data);
  }

  return (
    <GridTable.Row>
      <GridTable.Cell>
        <img
          src={image || ''}
          alt={`${name || 'Container'} image`}
          className="aspect-[3/2] w-20 min-w-16 translate-x-1 scale-150 object-cover object-center text-xs"
        />
      </GridTable.Cell>
      <GridTable.Cell className='text-gray-600" font-sono font-semibold'>
        {name}
      </GridTable.Cell>
      <GridTable.Cell className="font-sono">
        {`${maxCapacity} guests`}
      </GridTable.Cell>
      <GridTable.Cell className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </GridTable.Cell>
      <GridTable.Cell className="font-sono">
        {discount ? (
          <span className="text-green-700">{formatCurrency(discount)}</span>
        ) : (
          <span>—</span>
        )}
      </GridTable.Cell>
      <GridTable.Cell>
        <Row type="horizontal">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle
                menuId={containerId}
                disabled={isDeleting || isDuplicating}
              />

              <Menus.List menuId={containerId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicateContainer}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open name="edit-form">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open name="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit-form" closeOutsideClick>
                <AddContainerForm container={container} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resource={name}
                  onConfirm={() => handleDeleteContainer(containerId)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Row>
      </GridTable.Cell>
    </GridTable.Row>
  );
}

export default ContainerTableRow;
