// supabase-config.js
//
// Fill in your own Supabase project's URL and public "anon" key below.
// Both values are safe to expose in client-side code — Supabase is
// designed to work this way. Access control is enforced server-side by
// Row Level Security policies (see README.md), not by hiding this key.
//
// Where to find these values:
//   1. Go to supabase.com and create a free project.
//   2. In your project, go to Project Settings → API.
//   3. Copy "Project URL" and the "anon public" key below.

const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabaseClient = (SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

if (!supabaseClient) {
  console.warn('Supabase is not configured yet — accounts and saved requests will not work until supabase-config.js is filled in. See README.md.');
}
