import AddContainerForm from '@/features/containers/components/AddContainerForm';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';

function AddContainer() {
  return (
    <div>
      <Modal>
        <Modal.Open name="container-form">
          <Button>Add New Container</Button>
        </Modal.Open>
        <Modal.Window name="container-form">
          <AddContainerForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddContainer;
