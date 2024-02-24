import Form from '@/components/shared/Form';
import FormRow from '@/components/shared/FormRow';
import FormInput from '@/components/shared/FormInput';
import Spinner from '@/components/shared/Spinner';
import { useSettings } from '@/features/settings/hooks/useSettings';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow>
        <FormInput
          id="min-nights"
          label="Minimum nights/booking"
          defaultValue={settings?.minBookingLength || ''}
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="max-nights"
          label="Maximum nights/booking"
          defaultValue={settings?.maxBookingLength || ''}
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="max-guests"
          label="Maximum guests/booking"
          defaultValue={settings?.maxGuestNum || ''}
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="breakfast-price"
          label="Breakfast price"
          defaultValue={settings?.breakfastPrice || ''}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
