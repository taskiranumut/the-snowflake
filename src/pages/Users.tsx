import { Row, Heading } from '@/components/shared';
import { SignUpForm } from '@/features/auth/components';

export function Users() {
  return (
    <Row>
      <Heading as="h1" className="mb-4">
        Create a new user
      </Heading>
      <SignUpForm />
    </Row>
  );
}
