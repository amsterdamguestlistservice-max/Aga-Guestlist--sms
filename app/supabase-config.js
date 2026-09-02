// supabase-config.js
//
// Connected to the Amsterdam Guestlist Service Supabase project.
// Both values below are safe to expose in client-side code — Supabase
// is designed to work this way. Access control is enforced server-side
// by Row Level Security policies, not by hiding this key.

const SUPABASE_URL = 'https://ogyvzgkykyesjozwmkds.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neXZ6Z2t5a3llc2pvendta2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjQzMTEsImV4cCI6MjEwMzk0MDMxMX0.gdCIAz4ZZNXxzdDA4gYt4R3NoEbkc5pYb_vrvFC7A-c';

const supabaseClient = (SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

if (!supabaseClient) {
  console.warn('Supabase is not configured yet — accounts and saved requests will not work until supabase-config.js is filled in. See README.md.');
}
