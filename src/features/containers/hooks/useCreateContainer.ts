import { addNewContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateContainer() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: mutateAddNewContainer } = useMutation({
    mutationFn: addNewContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['containers'],
      });
      toast.success('Container successfully added!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding, mutateAddNewContainer };
}
