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
- **New account notification** — fully automatic, no tap required from
  the new guest. See section 6 below for setup.
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

---

## 6. Get an email notification when someone creates an account

This happens fully automatically — the new guest never has to tap
anything. Three things need to be wired together: Supabase detects the
new account → calls a small function on your site → that function emails
you via Resend (a free email-sending service).

### 6a. Get a free Resend account

1. Go to **resend.com** and create a free account (100 emails/day free).
2. Go to **API Keys** → **Create API Key**. Copy it — you'll need it below.
3. For now, sending works out of the box from `onboarding@resend.dev`
   (no domain setup needed) — good enough for internal notifications
   like this. You can verify your own domain later if you want the
   "from" address to look more official.

### 6b. Add the notify function to your MAIN site's repo

This is different from the `app/` folder — this file goes in the
**existing `api/` folder at the root of your repo**, right next to
`save-guestlist-request.js`, because Vercel only recognises serverless
functions there, not inside `app/`.

1. Upload `api/notify-new-account.js` (from this delivery) to your
   repo's existing `api/` folder.

### 6c. Add the environment variables in Vercel

Same place as your other environment variables (Project → Settings →
Environment Variables):

- `RESEND_API_KEY` — from step 6a
- `NOTIFY_EMAIL_TO` — `amsterdamguestlistservice@outlook.com`
- `WEBHOOK_SECRET` — make up any random long string yourself (e.g.
  `ags-webhook-8f3k2m9x`) — this stops random people on the internet
  from calling this URL and generating fake emails. You'll enter the
  exact same string again in step 6d.

Redeploy after adding these so they take effect.

### 6d. Connect Supabase to call it automatically

1. In Supabase, go to **Database → Webhooks** (or **Integrations →
   Database Webhooks**, depending on your project).
2. Click **Create a new hook**.
3. **Table**: choose `auth` schema → `users` table.
4. **Events**: tick **Insert** only.
5. **Type**: HTTP Request.
6. **URL**: `https://amsterdamguestlistservice.website/api/notify-new-account`
7. **HTTP Headers**: add one header —
   - Name: `x-webhook-secret`
   - Value: the exact same string you set as `WEBHOOK_SECRET` in step 6c
8. Save.

### 6e. Test it

Sign up for a new test account in the app. Within a few seconds, an
email should land at amsterdamguestlistservice@outlook.com with the new
guest's name and email — no button, no tap, nothing required from them.

If it doesn't arrive: Vercel dashboard → your project → Deployments →
latest deployment → Functions → check the logs for
`notify-new-account`. The response there tells you exactly what
happened, the same way it does for the guestlist-saving function.

