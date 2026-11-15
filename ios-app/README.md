# AGS — iPhone app (App Store)

Native wrapper around the web app in `../app`, built with Capacitor 7.
Bundle id: `website.amsterdamguestlistservice.app` · Display name: **AGS** · iPhone only, portrait.

## What is native here
- **Apple Push Notifications** (`@capacitor/push-notifications`). Device tokens are saved in
  `push_subscriptions` as `endpoint = "apns:<token>"`; every server-side sender goes through
  `api/_push.js`, which sends those via APNs and the rest via web push.
- Splash screen, dark status bar, app icon, external links open in Safari.
- The app ships its own copy of `../app` (no remote URL); it talks to
  `https://www.amsterdamguestlistservice.website/api/...` (CORS in `api/_cors.js`).

## One-time setup (needs an Apple Developer account, €99/year)
1. developer.apple.com → Certificates, IDs & Profiles → **Identifiers** → App ID
   `website.amsterdamguestlistservice.app` with **Push Notifications** enabled.
2. **Keys** → create a key with *Apple Push Notifications service (APNs)*. Download the `.p8`.
3. Add to Vercel (Production): `APNS_KEY` (contents of the .p8), `APNS_KEY_ID`, `APNS_TEAM_ID`,
   `APNS_BUNDLE_ID=website.amsterdamguestlistservice.app`. For development builds also `APNS_SANDBOX=1`.
4. App Store Connect → new app, name *Amsterdam Guestlist Service*, SKU `ags-ios`.

## Build (Mac with Xcode 16+, or a cloud Mac such as Codemagic / Xcode Cloud)
```bash
cd ios-app
npm install
npm run sync          # copies ../app into www and syncs the iOS project
npm run open          # opens Xcode
```
In Xcode: select the *App* target → Signing & Capabilities → choose your Team,
make sure **Push Notifications** and **Background Modes → Remote notifications** are on.
Product → Archive → Distribute App → App Store Connect.

Every time the web app changes: `npm run sync` and archive a new build (bump the build number).

## App Review checklist
- [x] Account deletion in the app (Account → Delete my account) — guideline 5.1.1(v)
- [x] Privacy Policy: https://www.amsterdamguestlistservice.website/privacy
- [x] Terms of Use (incl. Backroom rules): https://www.amsterdamguestlistservice.website/terms
- [x] Support URL: https://www.amsterdamguestlistservice.website/support
- [x] User-generated content (Backroom): rules to accept, report, block, admin email with
      one-tap removal, banned members can't post — guideline 1.2
- [x] No in-app purchases; tickets/tables are physical events sold by third parties — 3.1.3(e)
- [x] No third-party login, so Sign in with Apple is not required — 4.8
- [x] Native push notifications — helps with 4.2 (minimum functionality)
- [x] `ITSAppUsesNonExemptEncryption = false` (HTTPS only)
- [ ] Demo account for the reviewer (create one and put it in *App Review Information*)
- [ ] Age rating questionnaire: alcohol/nightlife references → expect 18+
- [ ] App Privacy questionnaire (see `APP_STORE_LISTING.md`)
- [ ] Screenshots 6.9" (1320×2868) and 6.5" (1242×2688)
