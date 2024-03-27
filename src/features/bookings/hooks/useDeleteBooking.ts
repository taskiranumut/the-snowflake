import { deleteBooking } from '@/services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useDeleteBooking() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: mutationDeleteBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success(t('message.api.bookings.deleteBooking.success'));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, mutationDeleteBooking };
}
