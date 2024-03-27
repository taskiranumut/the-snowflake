import { useUpdateUser } from '@/features/auth/hooks';
import { Button, Form, FormInput, FormRow } from '@/components/shared';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormFields = {
  password: string;
  confirmPassword: string;
};

export function UpdatePasswordForm() {
  const { t } = useTranslation();
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
          label={t('label.forms.updatePassword.newPassword')}
          type="password"
          id="password"
          disabled={isUpdating}
          {...register('password', {
            required: t(
              'label.forms.updatePassword.errors.newPassword.required',
            ),
            minLength: {
              value: 8,
              message: t(
                'label.forms.updatePassword.errors.newPassword.minlength',
              ),
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.confirmPassword?.message}>
        <FormInput
          label={t('label.forms.updatePassword.confirmPassword')}
          type="password"
          id="confirmPassword"
          disabled={!password || isUpdating}
          {...register('confirmPassword', {
            required: t(
              'label.forms.updatePassword.errors.confirmPassword.required',
            ),
            validate: (value) =>
              value === getValues().password ||
              t('label.forms.updatePassword.errors.confirmPassword.mustMatch'),
          })}
        />
      </FormRow>

      <FormRow className="mt-2 md:mt-1">
        <Button onClick={handleCancel} color="secondary" disabled={isUpdating}>
          {t('action.cancel')}
        </Button>
        <Button type="submit" disabled={isUpdating}>
          {t('action.account.updatePassword')}
        </Button>
      </FormRow>
    </Form>
  );
}
