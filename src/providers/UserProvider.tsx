import { Spinner } from '@/components/shared';
import { useUser } from '@/features/auth/hooks';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const { isLoading, isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate('/login');
    }
  }, [isAuth, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );

  return isAuth ? children : null;
}
