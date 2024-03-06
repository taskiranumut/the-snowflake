import { Heading, Row } from '@/components/shared';
import { UpdateSettingsForm } from '@/features/settings/components';

export function Settings() {
  return (
    <Row>
      <Heading as="h1" className="mb-4">
        Update Hotel Settings
      </Heading>
      <UpdateSettingsForm />
    </Row>
  );
}
