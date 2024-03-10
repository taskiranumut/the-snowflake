import { updateBooking } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: mutateCheckout } = useMutation({
    mutationFn: (id: number | string) =>
      updateBooking({
        id,
        updatedValues: { status: 'checked-out' },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success(`Booking #${data.id} successfully checked out!`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingOut, mutateCheckout };
}
