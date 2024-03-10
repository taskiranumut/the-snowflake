import { deleteBooking } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: mutationDeleteBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success('Booking successfully deleted!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, mutationDeleteBooking };
}
