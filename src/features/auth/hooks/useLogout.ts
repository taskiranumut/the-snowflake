import { useToggleSidebarContext } from '@/context';
import { useIsMobileDevice } from '@/hooks';
import { logout } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const { onClose, onOpen } = useToggleSidebarContext();
  const isMobileDevice = useIsMobileDevice();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      isMobileDevice ? onClose() : onOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, mutateLogout };
}
