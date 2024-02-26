import Heading from '@/components/shared/Heading';
import Button from '@/components/shared/Button';

type ConfirmDeleteProps = {
  resource: string | null;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
};

function ConfirmDelete({
  resource,
  onCloseModal,
  onConfirm,
  disabled,
}: ConfirmDeleteProps) {
  function handleConfirm() {
    onConfirm();
  }

  return (
    <div className="flex w-96 flex-col gap-4 p-4">
      <Heading as="h3">Delete {resource}</Heading>
      <p className="mb-4 text-gray-500">
        {' '}
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <Button
          color="secondary"
          type="button"
          onClick={() => onCloseModal?.()}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          color="danger"
          type="button"
          onClick={handleConfirm}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
