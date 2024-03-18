import { FormEvent, useState } from 'react';
import { Button, Form, FormRow, FormInput, Spinner } from '@/components/shared';
import { useLogin } from '@/features/auth/hooks';

export function LoginForm() {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123123123');

  const { isLoading, mutateLogin } = useLogin();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading || !email || !password) return;

    mutateLogin(
      { email, password },
      {
        onError: () => {
          setPassword('');
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="p-8">
      <FormRow type="vertical">
        <FormInput
          label="Email address"
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow type="vertical">
        <FormInput
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow type="vertical" className="pt-6">
        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-3"
          size="lg"
          disabled={isLoading}
        >
          Login
          {isLoading && <Spinner mini />}
        </Button>
      </FormRow>
    </Form>
  );
}
