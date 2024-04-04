import { getCurrentUser } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuth: user?.role === 'authenticated',
    isAdmin: user?.user_metadata?.role === 'admin',
  };
}
