import {
  Row,
  Modal,
  ConfirmDelete,
  GridTable,
  Menus,
} from '@/components/shared';
import {
  type DataContainer,
  type RawNewDataContainerWithImagePath,
} from '@/services/api/containers.types';
import { formatCurrency } from '@/utils';
import { AddContainerForm } from '@/features/containers/components';
import {
  useDeleteContainer,
  useDuplicateContainer,
} from '@/features/containers/hooks';
import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2';

type ContainerTableRowProps = {
  container: DataContainer;
};

export function ContainerTableRow({ container }: ContainerTableRowProps) {
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
    <GridTable.Row className="w-[180vw] sm:w-[120vw] md:w-[100vw]">
      <GridTable.Cell>
        <Modal>
          <Modal.Open name="imagePreview">
            <img
              src={image || ''}
              alt={`${name || 'Container'} image`}
              className="aspect-[3/2] w-20 min-w-16 scale-[1.3] cursor-zoom-in object-cover object-center text-xs"
            />
          </Modal.Open>
          <Modal.Window name="imagePreview" closeOutsideClick imagePreview>
            <img
              src={image || ''}
              alt={`${name || 'Container'} image`}
              className="aspect-[3/2] w-full min-w-16 rounded-lg object-cover object-center"
            />
          </Modal.Window>
        </Modal>
      </GridTable.Cell>
      <GridTable.Cell className="font-sono font-semibold text-gray-600 dark:text-gray-300">
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
          <span className="text-emerald-600">{formatCurrency(discount)}</span>
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
