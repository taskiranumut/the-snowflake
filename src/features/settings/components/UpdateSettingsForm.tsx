import Form from '@/components/shared/Form';
import FormRow from '@/components/shared/FormRow';
import FormInput from '@/components/shared/FormInput';
import Spinner from '@/components/shared/Spinner';
import { useSettings, useUpdateSettings } from '@/features/settings/hooks';
import { type RawSettingsData } from '@/services/api/settings.type';
import { useDebounce } from '@/hooks';

type SettingsUpdate = {
  target:
    | 'breakfast_price'
    | 'max_booking_length'
    | 'max_guest_num'
    | 'min_booking_length';
  value: number | null;
};

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, mutateUpdateSettings } = useUpdateSettings();

  const debouncedUpdateSettings = useDebounce((data: RawSettingsData) => {
    mutateUpdateSettings(data);
  }, 500);

  function handleUpdateSettings({ target, value }: SettingsUpdate) {
    const data: RawSettingsData = {
      breakfast_price: settings?.breakfastPrice || null,
      max_booking_length: settings?.maxBookingLength || null,
      max_guest_num: settings?.maxGuestNum || null,
      min_booking_length: settings?.minBookingLength || null,
    };
    data[target] = value;
    debouncedUpdateSettings(data);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow>
        <FormInput
          id="min-nights"
          label="Minimum nights/booking"
          type="number"
          defaultValue={settings?.minBookingLength || ''}
          disabled={isUpdating}
          onChange={(e) =>
            handleUpdateSettings({
              target: 'min_booking_length',
              value: Number(e.target.value),
            })
          }
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="max-nights"
          label="Maximum nights/booking"
          defaultValue={settings?.maxBookingLength || ''}
          disabled={isUpdating}
          onChange={(e) =>
            handleUpdateSettings({
              target: 'max_booking_length',
              value: Number(e.target.value),
            })
          }
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="max-guests"
          label="Maximum guests/booking"
          defaultValue={settings?.maxGuestNum || ''}
          disabled={isUpdating}
          onChange={(e) =>
            handleUpdateSettings({
              target: 'max_guest_num',
              value: Number(e.target.value),
            })
          }
        />
      </FormRow>
      <FormRow>
        <FormInput
          id="breakfast-price"
          label="Breakfast price"
          type="number"
          defaultValue={settings?.breakfastPrice || ''}
          disabled={isUpdating}
          onChange={(e) =>
            handleUpdateSettings({
              target: 'breakfast_price',
              value: Number(e.target.value),
            })
          }
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
