import { MainLogo } from '@/components';
import { Heading, Spinner } from '@/components/shared';
import { LoginForm } from '@/features/auth/components';
import { useUser } from '@/features/auth/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { isLoading, isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth, navigate]);

  return (
    <>
      <div className="hidden md:block">
        <div className="grid min-h-screen grid-cols-[32rem] content-center justify-center gap-8 bg-gray-50 dark:bg-gray-900">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <MainLogo />
              <Heading as="h4" className="text-center">
                Log in to your account
              </Heading>
              <LoginForm />
            </>
          )}
        </div>
      </div>
      <div className="flex h-screen flex-col items-center px-8 pt-40 text-gray-900 md:hidden">
        <div className="mb-12">
          <MainLogo />
        </div>
        <Heading as="h3" className="text-center font-sono leading-8">
          Mobile screens are in development. Please use the app from desktop
          devices.
        </Heading>
      </div>
    </>
  );
}
