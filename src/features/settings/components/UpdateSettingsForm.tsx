import { Form, FormRow, FormInput, Spinner } from '@/components/shared';
import { useSettings, useUpdateSettings } from '@/features/settings/hooks';
import { type RawSettingsData } from '@/services/api/settings.type';
import { useDebounce } from '@/hooks';
import { useTranslation } from 'react-i18next';

type SettingsUpdate = {
  target:
    | 'breakfast_price'
    | 'max_booking_length'
    | 'max_guest_num'
    | 'min_booking_length';
  value: number | null;
};

export function UpdateSettingsForm() {
  const { t } = useTranslation();
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
          label={t('label.forms.updateSettings.minNights')}
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
          label={t('label.forms.updateSettings.maxNights')}
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
          label={t('label.forms.updateSettings.maxGuests')}
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
          label={t('label.forms.updateSettings.breakfastPrice')}
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
