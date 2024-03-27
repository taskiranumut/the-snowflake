import { dupliateContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useDuplicateContainer() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isDuplicating, mutate: mutateDuplciateContainer } =
    useMutation({
      mutationFn: dupliateContainer,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['containers'],
        });
        toast.success(t('message.api.containers.dupliateContainer.success'));
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDuplicating, mutateDuplciateContainer };
}
