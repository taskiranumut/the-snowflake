import { signUp } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useSignUp() {
  const { t } = useTranslation();
  const { isPending: isLoading, mutate: mutateSignUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(t('message.api.auth.signUp.success'));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, mutateSignUp };
}
