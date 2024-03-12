import { signUp } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { isPending: isLoading, mutate: mutateSignUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "User successfully created! Please verify the new account from the user's email address.",
      );
    },
    onError: () => {
      toast.error('There was an error. Please try again a few minutes later.');
    },
  });

  return { isLoading, mutateSignUp };
}
