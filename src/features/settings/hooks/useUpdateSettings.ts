import { updateSettings } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useUpdateSettings() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: mutateUpdateSettings } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
      toast.success(t('message.api.settings.updateSettings.success'));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, mutateUpdateSettings };
}
