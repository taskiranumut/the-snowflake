import { useState } from 'react';
import AddContainerForm from '@/features/containers/components/AddContainerForm';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';

function AddContainer() {
  const [openModal, setOpenModal] = useState(false);

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal((open) => !open)}>
        Add New Container
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <AddContainerForm onCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}

export default AddContainer;
