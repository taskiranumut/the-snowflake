import { useToggleSidebarContext } from '@/context';
import { logout } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { onClose } = useToggleSidebarContext();

  const { isPending: isLoading, mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      onClose();
    },
    onError: () => {
      toast.error('There was an error. Please try again a few minutes later.');
    },
  });

  return { isLoading, mutateLogout };
}
