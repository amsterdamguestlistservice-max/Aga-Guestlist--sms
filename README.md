# Amsterdam Guestlist Service — Backend Setup

Two things happen whenever someone submits the guestlist form on your site:

1. **WhatsApp confirmation** — after submitting, the guest sees a "Send
   via WhatsApp" button. Clicking it opens WhatsApp (already on their own
   phone) with the full request pre-filled as a message to
   **+31644948562** — they just tap send. This needs **no setup at all**
   on your end — no account, no server, no API keys, nothing to configure.
2. **Saved to Airtable** — the same request is also saved as a row in an
   Airtable base, a spreadsheet you can open, sort, and search anytime.
   This part *does* need a small backend, set up below.

## What's in this folder

- `index.html`, `about.html` — your site, unchanged
- `hero-video.mp4`, `hero-video.webm` — the homepage background video
- `api/save-guestlist-request.js` — the function that saves each request
  to Airtable
- `package.json` — no dependencies needed (Airtable is called with plain
  `fetch`, which is built into the Vercel runtime)
- `.env.example` — the environment variable names you'll need to set

---

## 1. Set up Airtable (the spreadsheet)

1. Go to **airtable.com** and create a free account.
2. Create a new base. Rename the default table to **Guestlist Requests**
   (or whatever name you want — just make sure it matches
   `AIRTABLE_TABLE_NAME` in step 4).
3. In that table, create these columns — **the names must match exactly**,
   including capitalization:

   | Column name         | Type              |
   |----------------------|-------------------|
   | Event                | Single line text  |
   | Venue                | Single line text  |
   | Event Date           | Single line text  |
   | First Name           | Single line text  |
   | Last Name            | Single line text  |
   | Age                  | Single line text  |
   | Instagram             | Single line text  |
   | Phone                | Single line text  |
   | Email                | Single line text  |
   | Additional Guests    | Long text         |
   | Total Guests         | Number            |
   | Consent              | Checkbox          |
   | Request Time         | Single line text  |

4. Get your **Base ID**: open the base, look at the URL — it starts with
   `app` followed by letters/numbers, e.g. `appAbCdEfGhIjKlMn`. Copy that.
5. Get a **Personal Access Token** (this is what Airtable now calls an
   API key — the old "API key" system was retired):
   - Go to **airtable.com/create/tokens**
   - Click **Create new token**
   - Give it a name, e.g. "AGS Guestlist"
   - Under **Scopes**, add `data.records:read` and `data.records:write`
   - Under **Access**, select the specific base you just created
   - Click **Create token** and **copy it immediately** — it's only shown once

## 2. Deploy to Vercel

1. Create a free account at **vercel.com** (sign in with GitHub is easiest).
2. Install the CLI once: `npm install -g vercel`
3. From inside this folder, run:
   ```
   vercel
   ```
   Accept the defaults when prompted. Vercel automatically serves
   `index.html`/`about.html` as your site and `api/save-guestlist-request.js`
   as a live API route — no config file needed.

## 3. Add your credentials to Vercel

Never put these in the code — only in Vercel's dashboard:

1. Open your project on vercel.com → **Settings** → **Environment Variables**.
2. Add all three:
   - `AIRTABLE_TOKEN` — your Personal Access Token from step 1.5
   - `AIRTABLE_BASE_ID` — from step 1.4
   - `AIRTABLE_TABLE_NAME` — `Guestlist Requests` (or whatever you named it)
3. Redeploy so the function picks them up:
   ```
   vercel --prod
   ```

## 4. Test it

1. Open your live site.
2. Submit a guestlist request with the consent box checked.
3. On the confirmation screen, click **Send via WhatsApp** — it should
   open WhatsApp with the full request ready to send. Tap send, and it
   should land in the chat with +31644948562.
4. A few seconds after submitting (regardless of whether you click the
   WhatsApp button), a new row should appear in your Airtable base.
5. If the Airtable row doesn't appear: Vercel dashboard → your project →
   **Deployments** → open the latest one → **Functions** → check the
   logs for `save-guestlist-request`. The response tells you exactly
   what happened — for example:
   ```json
   { "ok": false, "error": "Airtable responded with 422: Unknown field name: Event" }
   ```
   That kind of message tells you precisely what to fix — in this
   example, a column name in Airtable doesn't match exactly.

## Notes

- The WhatsApp button works on both phones (opens the WhatsApp app) and
  desktop (opens WhatsApp Web) — no difference in setup either way.
- **Airtable**: the free plan comfortably handles a guestlist service —
  upgrade only if you need more records or advanced automations later.
