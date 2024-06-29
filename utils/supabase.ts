import { createClient } from '@supabase/supabase-js';

// Ensure that the environment variables are correctly accessed
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error('supabaseUrl is required.');
}

if (!SUPABASE_ANON_KEY) {
  throw new Error('supabaseAnonKey is required.');
}

console.log("Supabase URL: ", SUPABASE_URL);
console.log("Supabase Anon Key: ", SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);