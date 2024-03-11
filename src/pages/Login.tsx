import { MainLogo } from '@/components';
import { Heading } from '@/components/shared';
import { LoginForm } from '@/features/auth/components';

export function Login() {
  return (
    <div className="grid min-h-screen grid-cols-[32rem] content-center justify-center gap-8 bg-gray-50">
      <MainLogo />
      <Heading as="h4" className="text-center">
        Log in to your account
      </Heading>
      <LoginForm />
    </div>
  );
}
