import { createClient } from '@supabase/supabase-js';

console.log('Environment Variables:', process.env);
// 環境変数の読み取り
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// 環境変数の存在確認
if (!SUPABASE_URL) {
  throw new Error('supabaseUrl is required.');
}

if (!SUPABASE_ANON_KEY) {
  throw new Error('supabaseAnonKey is required.');
}

console.log("Supabase URL: ", SUPABASE_URL);
console.log("Supabase Anon Key: ", SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);