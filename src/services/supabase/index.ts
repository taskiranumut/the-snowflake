import { createClient } from '@supabase/supabase-js';
import { Database } from '@/services/supabase/schema.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (typeof supabaseKey !== 'string') {
  throw new Error('Supabase Key is not defined');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
