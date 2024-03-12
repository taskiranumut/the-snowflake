import { login } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: mutateLogin } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
      toast.success('Successfully logged in!');
    },
    onError: () => {
      toast.error('Provided email or password are incorrect!');
    },
  });

  return { isLoading, mutateLogin };
}
