import { AddContainerForm } from '@/features/containers/components';
import { Button, Modal } from '@/components/shared';
import { useContainers } from '@/features/containers/hooks';
import { useTranslation } from 'react-i18next';

export function AddContainer() {
  const { t } = useTranslation();
  const { containers } = useContainers({ getCachedData: true });

  if (!containers) return null;

  return (
    <div>
      <Modal>
        <Modal.Open name="container-form">
          <Button>{t('action.containers.add')}</Button>
        </Modal.Open>
        <Modal.Window name="container-form" closeOutsideClick>
          <AddContainerForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
