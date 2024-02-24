import { updateSettings } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: mutateUpdateSettings } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
      toast.success('Settings successfully updated!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, mutateUpdateSettings };
}
