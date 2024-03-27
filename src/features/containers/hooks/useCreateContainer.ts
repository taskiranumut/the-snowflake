import { addNewContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useCreateContainer() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: mutateAddNewContainer } = useMutation({
    mutationFn: addNewContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['containers'],
      });
      toast.success(t('message.api.containers.addNewContainer.success'));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding, mutateAddNewContainer };
}
