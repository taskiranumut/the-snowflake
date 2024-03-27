import { Button, Heading } from '@/components/shared';
import { useTranslation } from 'react-i18next';

type ConfirmDeleteProps = {
  resource: string | null;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
};

export function ConfirmDelete({
  resource,
  onCloseModal,
  onConfirm,
  disabled,
}: ConfirmDeleteProps) {
  const { t } = useTranslation();
  function handleConfirm() {
    onConfirm();
  }

  return (
    <div className="flex w-72 flex-col gap-4 p-4 sm:w-96">
      <Heading as="h3">{t('message.modal.delete.title', { resource })}</Heading>
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        {' '}
        {t('message.modal.delete.content', { resource })}
      </p>

      <div className="flex justify-end gap-4">
        <Button
          color="secondary"
          type="button"
          onClick={() => onCloseModal?.()}
          disabled={disabled}
        >
          {t('action.cancel')}
        </Button>
        <Button
          color="danger"
          type="button"
          onClick={handleConfirm}
          disabled={disabled}
          className="min-w-16"
        >
          {t('action.delete')}
        </Button>
      </div>
    </div>
  );
}
