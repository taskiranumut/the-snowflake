import { Button, Form, FormRow, FormInput } from '@/components/shared';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@/features/auth/hooks';
import { useTranslation } from 'react-i18next';

type FormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const { t } = useTranslation();
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
          label={t('label.forms.signUp.fullName')}
          id="fullName"
          disabled={isLoading}
          {...register('fullName', {
            required: t('label.forms.signUp.errors.fullName.required'),
          })}
        />
      </FormRow>

      <FormRow error={errors?.email?.message}>
        <FormInput
          label={t('label.forms.signUp.emailAddress')}
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: t('label.forms.signUp.errors.emailAddress.required'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('label.forms.signUp.errors.emailAddress.valid'),
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.password?.message}>
        <FormInput
          label={t('label.forms.signUp.password')}
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: t('label.forms.signUp.errors.password.required'),
            minLength: {
              value: 8,
              message: t('label.forms.signUp.errors.password.minlength'),
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.confirmPassword?.message}>
        <FormInput
          label={t('label.forms.signUp.confirmPassword')}
          type="password"
          id="confirmPassword"
          disabled={!password || isLoading}
          {...register('confirmPassword', {
            required: t('label.forms.signUp.errors.confirmPassword.required'),
            validate: (value) =>
              value === getValues().password ||
              t('label.forms.signUp.errors.confirmPassword.mustMatch'),
          })}
        />
      </FormRow>

      <FormRow className="mt-2 md:mt-1">
        <Button
          color="secondary"
          onClick={handleCancelForm}
          disabled={isLoading}
        >
          {t('action.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {t('action.user.addUser')}
        </Button>
      </FormRow>
    </Form>
  );
}
