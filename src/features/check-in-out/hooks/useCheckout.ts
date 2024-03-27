import { updateBooking } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useCheckout() {
  const { t } = useTranslation();
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
      toast.success(
        t('message.api.bookings.updateBooking.success.checkOut', {
          id: data.id,
        }),
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingOut, mutateCheckout };
}
