import { useUpdateUser } from '@/features/auth/hooks';
import { Button, Form, FormInput, FormRow } from '@/components/shared';
import { useForm } from 'react-hook-form';

type FormFields = {
  password: string;
  confirmPassword: string;
};

export function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutateUpdateUser, isUpdating } = useUpdateUser();

  const password = watch('password');

  function onSubmit({ password }: FormFields) {
    mutateUpdateUser({ password }, { onSettled: () => reset() });
  }

  function handleCancel() {
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.password?.message}>
        <FormInput
          label="New password (min 8 chars)"
          type="password"
          id="password"
          disabled={isUpdating}
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
          disabled={!password || isUpdating}
          {...register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === getValues().password || 'Password needs to match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={handleCancel} color="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}
