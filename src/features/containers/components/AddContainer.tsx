import { AddContainerForm } from '@/features/containers/components';
import { Button, Modal } from '@/components/shared';
import { useContainers } from '@/features/containers/hooks';

export function AddContainer() {
  const { containers } = useContainers({ getCachedData: true });

  if (!containers) return null;

  return (
    <div>
      <Modal>
        <Modal.Open name="container-form">
          <Button>Add New Container</Button>
        </Modal.Open>
        <Modal.Window name="container-form" closeOutsideClick>
          <AddContainerForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
