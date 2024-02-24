import supabase from '@/services/supabase';
import { convertRawSettingsData } from '@/services/api/utils';
import { type SettingsData } from '@/services/api/settings.type';

export async function getSettings(): Promise<SettingsData> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    throw new Error('Settings could not be loaded!');
  }

  return convertRawSettingsData(data);
}
