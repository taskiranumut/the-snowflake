import { editContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useEditContainer() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: mutateEditContainer } = useMutation({
    mutationFn: editContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['containers'],
      });
      toast.success('Container successfully edited!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, mutateEditContainer };
}
