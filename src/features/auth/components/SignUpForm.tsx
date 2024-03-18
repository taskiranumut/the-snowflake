import { Button, Form, FormRow, FormInput } from '@/components/shared';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@/features/auth/hooks';

type FormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutateSignUp, isLoading } = useSignUp();

  const password = watch('password');

  function onSubmit({ fullName, email, password }: FormFields) {
    mutateSignUp({ fullName, email, password }, { onSettled: () => reset() });
  }

  function handleCancelForm() {
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.fullName?.message}>
        <FormInput
          label="Full name"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', {
            required: 'Full name is required',
          })}
        />
      </FormRow>

      <FormRow error={errors?.email?.message}>
        <FormInput
          label="Email address"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.password?.message}>
        <FormInput
          label="Password (min 8 characters)"
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.confirmPassword?.message}>
        <FormInput
          label="Repeat password"
          type="password"
          id="confirmPassword"
          disabled={!password || isLoading}
          {...register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === getValues().password || 'Password needs to match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          color="secondary"
          onClick={handleCancelForm}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Add User
        </Button>
      </FormRow>
    </Form>
  );
}
