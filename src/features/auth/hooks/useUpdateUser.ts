import { updateCurrentUser } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useUpdateUser() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: mutateUpdateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success(
        t('message.api.auth.updateCurrentUser.success', {
          resource: data?.resource || t('label.common.userData'),
        }),
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, mutateUpdateUser };
}
