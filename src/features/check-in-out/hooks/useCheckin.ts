import { updateBooking } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type UpdateArgs = {
  id: number | string;
  breakfast?:
    | {
        has_breakfast: boolean;
        extras_price: number;
        total_price: number;
      }
    | NonNullable<unknown>;
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: mutateCheckin } = useMutation({
    mutationFn: ({ id, breakfast = {} }: UpdateArgs) =>
      updateBooking({
        id,
        updatedValues: { status: 'checked-in', is_paid: true, ...breakfast },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success(`Booking #${data.id} successfully checked in!`);
      navigate('/bookings');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingIn, mutateCheckin };
}
