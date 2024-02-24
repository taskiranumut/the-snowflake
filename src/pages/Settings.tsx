import Heading from '@/components/shared/Heading';
import Row from '@/components/shared/Row';
import UpdateSettingsForm from '@/features/settings/components/UpdateSettingsForm';

function Settings() {
  return (
    <Row>
      <Heading as="h1" className="mb-4">
        Update Hotel Settings
      </Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
