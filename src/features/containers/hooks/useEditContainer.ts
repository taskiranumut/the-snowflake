import { editContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useEditContainer() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: mutateEditContainer } = useMutation({
    mutationFn: editContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['containers'],
      });
      toast.success(t('message.api.containers.editContainer.success'));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, mutateEditContainer };
}
