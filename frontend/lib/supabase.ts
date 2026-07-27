import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sbxuheqnhjwnfslabtzh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_8mPcSC1grbc9xbJsb4DBHA_6RASlXuI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
