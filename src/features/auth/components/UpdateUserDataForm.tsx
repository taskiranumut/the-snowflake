import { ChangeEvent, FormEvent, useState } from 'react';
import { useUpdateUser, useUser } from '@/features/auth/hooks';
import { Button, Form, FormInput, FormRow } from '@/components/shared';

export function UpdateUserDataForm() {
  const { user } = useUser();

  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name ?? '',
  );
  const [avatar, setAvatar] = useState<File | null>(null);

  const { mutateUpdateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName || (user?.user_metadata?.full_name === fullName && !avatar))
      return;

    mutateUpdateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(user?.user_metadata?.full_name || '');
    setAvatar(null);
  }

  function handleChangeFullName(e: ChangeEvent<HTMLInputElement>) {
    setFullName(e.target.value);
  }

  function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    setAvatar(e.target.files && e.target.files[0]);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <FormInput label="Email address" value={user?.email} disabled />
      </FormRow>

      <FormRow>
        <FormInput
          id="fullName"
          label="Full name"
          value={fullName}
          onChange={handleChangeFullName}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <FormInput
          id="avatar"
          type="file"
          accept="image/*"
          label="Avatar"
          onChange={handleChangeAvatar}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={handleCancel}
          type="reset"
          color="secondary"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}
