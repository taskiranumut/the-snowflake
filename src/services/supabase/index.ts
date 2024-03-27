import { createClient } from '@supabase/supabase-js';
import { Database } from '@/services/supabase/schema.types';
import { t } from 'i18next';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (typeof supabaseKey !== 'string') {
  throw new Error(t('message.api.supabase.key.error'));
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
