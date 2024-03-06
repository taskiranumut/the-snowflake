import { AddContainerForm } from '@/features/containers/components';
import { Button, Modal } from '@/components/shared';

export function AddContainer() {
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
