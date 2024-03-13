import { updateCurrentUser } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: mutateUpdateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success(`${data?.resource || 'User data'} successfully updated!`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, mutateUpdateUser };
}
