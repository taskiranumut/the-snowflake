import { deleteContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useDeleteContainer() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: mutationDeleteContainer } =
    useMutation({
      mutationFn: deleteContainer,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['containers'],
        });
        toast.success(t('message.api.containers.deleteContainer.success'));
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDeleting, mutationDeleteContainer };
}
