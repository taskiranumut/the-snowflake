import { deleteContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteContainer() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: mutationDeleteContainer } =
    useMutation({
      mutationFn: deleteContainer,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['containers'],
        });
        toast.success('Container successfully deleted!');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDeleting, mutationDeleteContainer };
}
