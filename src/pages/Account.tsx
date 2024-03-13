import { Row, Heading } from '@/components/shared';
import {
  UpdateUserDataForm,
  UpdatePasswordForm,
} from '@/features/auth/components';

export function Account() {
  return (
    <>
      <Heading as="h1" className="mb-4">
        Update your account
      </Heading>

      <Row className="mb-4">
        <Heading as="h3"> Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3"> Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}
