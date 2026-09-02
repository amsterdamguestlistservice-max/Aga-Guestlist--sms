# Amsterdam Guestlist Service — App Accounts Setup

The app now has real accounts (email + password) and a "My Requests" tab
where signed-in guests can see their own guestlist history. This needs a
free Supabase project — no custom server required.

## 1. Create a Supabase project

1. Go to **supabase.com** and create a free account.
2. Click **New Project**. Pick any name and a database password (save it
   somewhere safe, you won't need it day-to-day).
3. Wait a minute or two for the project to finish setting up.

## 2. Create the requests table

1. In your project, open the **SQL Editor** (left sidebar).
2. Paste in the SQL below and click **Run**:

```sql
create table guestlist_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  event_name text not null,
  event_venue text not null,
  event_date date not null,
  first_name text not null,
  last_name text not null,
  age text,
  instagram text,
  phone text,
  email text,
  additional_guests jsonb,
  total_guests int,
  status text default 'Pending',
  created_at timestamptz default now()
);

alter table guestlist_requests enable row level security;

create policy "Users can view own requests"
  on guestlist_requests for select
  using (auth.uid() = user_id);

create policy "Users can insert own requests"
  on guestlist_requests for insert
  with check (auth.uid() = user_id);
```

This creates the table AND locks it down with Row Level Security, so each
guest can only ever see and insert their own requests — never anyone
else's, even though the app talks to Supabase directly from the browser.

## 3. Turn off email confirmation (optional, recommended for now)

By default, Supabase requires guests to click a confirmation link in
their email before they can log in. For a nightlife guestlist app, you
probably want instant access instead:

1. Go to **Authentication → Providers → Email**.
2. Turn off **"Confirm email"**.
3. Save.

(You can turn this back on later if you'd prefer email verification.)

## 4. Connect the app to your project

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. Open `supabase-config.js` in this folder and replace the two
   placeholder values:

```js
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

with your real values. Both are safe to use directly in the app's code —
Supabase is designed to work this way, since real access control happens
through the Row Level Security policies from step 2, not by hiding this
key.

## 5. Upload and test

1. Upload all files (including the updated `supabase-config.js`) to the
   `app/` folder on GitHub, same as before.
2. Once deployed, open the app, go to **Account → Sign Up**, create a
   test account, and submit a guestlist request.
3. Go to **Account** — your request should appear there. Sign out and
   log back in — it should still be there.

## How it fits together

- **Sign up / Log in** — handled entirely by Supabase Auth (secure
  password storage, sessions) — no passwords ever touch your own code.
- **Submitting a guestlist request** now requires being signed in. On
  submit, the request is saved to your Supabase table AND the existing
  "Send via WhatsApp" flow still happens exactly as before — nothing
  about the WhatsApp notification changes.
- **My Requests** shows everything tied to the signed-in guest's
  account, newest first.

## What I could not test myself

I don't have a live Supabase project or internet access in the
environment I build in, so everything above was built and verified
against a realistic simulation of Supabase's behaviour — sign up, log
in, submitting a request, it appearing in "My Requests", signing out and
back in. Once you've connected your real project (step 4), it's worth
doing that same walk-through yourself once to confirm it end-to-end.
