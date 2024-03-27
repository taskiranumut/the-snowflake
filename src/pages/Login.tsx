import { MainLogo } from '@/components';
import { Heading, Spinner } from '@/components/shared';
import { LoginForm } from '@/features/auth/components';
import { useUser } from '@/features/auth/hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { t } = useTranslation();
  const { isLoading, isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth, navigate]);

  return (
    <div className="grid min-h-screen grid-cols-1 content-start justify-center gap-8 bg-gray-50 px-8 pt-20 sm:grid-cols-[32rem] sm:content-center sm:px-0 sm:pt-0 dark:bg-gray-900">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MainLogo />
          <Heading as="h4" className="text-center">
            {t('title.page.login')}
          </Heading>
          <LoginForm />
        </>
      )}
    </div>
  );
}
