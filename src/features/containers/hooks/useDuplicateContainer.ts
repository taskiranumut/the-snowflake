import { dupliateContainer } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDuplicateContainer() {
  const queryClient = useQueryClient();

  const { isPending: isDuplicating, mutate: mutateDuplciateContainer } =
    useMutation({
      mutationFn: dupliateContainer,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['containers'],
        });
        toast.success('Container successfully duplicated!');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDuplicating, mutateDuplciateContainer };
}
