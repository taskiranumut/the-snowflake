import { login } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();

  const { isPending: isLoading, mutate: mutateLogin } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/dashboard');
      toast.success('Successfully logged in!');
    },
    onError: () => {
      toast.error('Provided email or password are incorrect!');
    },
  });

  return { isLoading, mutateLogin };
}
