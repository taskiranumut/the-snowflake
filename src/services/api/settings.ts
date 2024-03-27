import supabase from '@/services/supabase';
import { convertRawSettingsData } from '@/services/api/utils';
import {
  type RawSettingsData,
  type SettingsData,
} from '@/services/api/settings.type';
import { t } from 'i18next';

export async function getSettings(): Promise<SettingsData> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    throw new Error(t('message.api.settings.getSettings.error'));
  }

  return convertRawSettingsData(data);
}

export async function updateSettings(
  newSetting: RawSettingsData,
): Promise<void> {
  const { error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .single();

  if (error) {
    throw new Error(t('message.api.settings.updateSettings.error'));
  }
}
