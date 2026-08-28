# Amsterdam Guestlist Service — SMS Backend Setup

This folder contains everything needed to make the "new guestlist request"
SMS to **+31644948562** actually send. The website (`index.html`) already
calls `/api/send-guestlist-sms` on every successful submission — this
guide makes that endpoint real.

## What's in this folder

- `index.html` — your site, unchanged
- `api/send-guestlist-sms.js` — the function that actually sends the SMS via Twilio
- `package.json` — declares the `twilio` dependency
- `.env.example` — the environment variable names you'll need to set

---

## 1. Create a Twilio account

1. Go to **twilio.com/try-twilio** and sign up. The free trial includes
   some credit, enough to test with.
2. On the Twilio Console dashboard, copy your **Account SID** and
   **Auth Token** — you'll need both in step 3.
3. Get a phone number that can send SMS: Console → **Phone Numbers** →
   **Buy a number**. Trial accounts get one number free.
4. **Trial accounts can only text numbers you've verified.** Go to
   Console → Phone Numbers → **Verified Caller IDs** and verify
   `+31644948562`, or upgrade to a paid account before going live —
   otherwise every send will fail with an "unverified number" error.
5. Make sure sending to the Netherlands is switched on: Console →
   **Messaging → Geo permissions** → confirm Netherlands is enabled.

## 2. Deploy to Vercel

1. Create a free account at **vercel.com** (sign in with GitHub is
   easiest).
2. Install the CLI once: `npm install -g vercel`
3. From inside this folder, run:
   ```
   vercel
   ```
   Accept the defaults when prompted (link or create a new project).
   Vercel automatically serves `index.html` as your site and
   `api/send-guestlist-sms.js` as a live API route — no config file
   needed.

## 3. Add your Twilio credentials to Vercel

Credentials go in Vercel's dashboard only — never in the code:

1. Open your project on vercel.com → **Settings** → **Environment
   Variables**.
2. Add these three:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM_NUMBER` — your Twilio number, e.g. `+1XXXXXXXXXX`
3. Redeploy so the function picks them up:
   ```
   vercel --prod
   ```

## 4. Test it

1. Open your live site (the URL Vercel gives you).
2. Submit a guestlist request with the consent box checked.
3. Check the phone at +31644948562 — the SMS (or, for longer requests,
   the numbered set of SMS parts) should arrive within a few seconds.
4. If nothing arrives: Vercel dashboard → your project → **Deployments**
   → open the latest one → **Functions** → check the logs for
   `send-guestlist-sms`. The two most common errors at this stage:
   - the destination number isn't verified (trial account restriction —
     see step 1.4)
   - Netherlands isn't enabled under Geo permissions (step 1.5)

## Going to production

Once testing looks good, upgrade from the Twilio trial to a paid
account — this removes the "verified numbers only" restriction, which
is what you want once real guests are submitting requests. If you'd
like messages to show a name like "AGS" instead of a phone number,
that requires registering an alphanumeric sender ID or a WhatsApp/
Messaging Service with Twilio, which involves some Dutch telecom
paperwork — worth doing later, not needed to get this working now.
