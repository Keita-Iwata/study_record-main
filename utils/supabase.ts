import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database

console.log("supabaseURL");
console.log(process.env.VITE_SUPABASE_URL);
const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);