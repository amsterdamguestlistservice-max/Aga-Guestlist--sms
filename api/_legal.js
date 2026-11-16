// api/legal.js
//
// Privacy Policy, Terms of Use and Support pages (needed for the App Store
// and the GDPR). Served at /privacy, /terms and /support via rewrites in
// vercel.json. The contact address comes from SUPPORT_EMAIL (falls back to
// GUEST_REPLY_TO), so it is never hard-coded in the repository.

const LOGO = require('./_logo');

const UPDATED = '15 November 2026';
const WHATSAPP = 'https://wa.me/31644948562';
const APP = 'https://www.amsterdamguestlistservice.website/app/';

function esc(v) {
  return String(v || '').replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function shell(title, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + esc(title) + ' — Amsterdam Guestlist Service</title>' +
    '<meta name="description" content="' + esc(title) + ' for the Amsterdam Guestlist Service app.">' +
    '<style>' +
    ':root{color-scheme:dark}' +
    'body{margin:0;background:#050505;color:#E9E9E9;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;line-height:1.65}' +
    '.wrap{max-width:720px;margin:0 auto;padding:28px 18px 64px}' +
    'header{display:flex;align-items:center;gap:12px;padding-bottom:18px;border-bottom:1px solid #2A2418;margin-bottom:26px}' +
    'header img{width:44px;height:44px;border-radius:50%}' +
    'header a{color:#E6C875;text-decoration:none;font-size:13px;letter-spacing:.12em;text-transform:uppercase}' +
    '.eyebrow{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#C9A24A;margin:0 0 6px}' +
    'h1{font-family:Georgia,"Times New Roman",serif;font-weight:normal;font-size:34px;line-height:1.15;margin:0 0 6px;color:#fff}' +
    '.updated{color:#8A8A8A;font-size:13px;margin:0 0 26px}' +
    'h2{font-family:Georgia,serif;font-weight:normal;font-size:22px;color:#fff;margin:34px 0 8px}' +
    'h3{font-size:15px;color:#E6C875;margin:20px 0 4px}' +
    'p,li{font-size:15.5px;color:#CFCFCF}ul{padding-left:20px}li{margin:4px 0}' +
    'a{color:#E6C875}strong{color:#fff}' +
    '.card{background:#0B0B0B;border:1px solid #2A2418;border-top:2px solid #C9A24A;padding:18px 18px 8px;margin:18px 0}' +
    '.btn{display:inline-block;margin:6px 8px 6px 0;padding:13px 20px;border:1px solid #C9A24A;color:#E6C875;text-decoration:none;font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;min-height:20px}' +
    '.btn--solid{background:#C9A24A;color:#000}' +
    'footer{margin-top:44px;padding-top:18px;border-top:1px solid #2A2418;font-size:13px;color:#8A8A8A}' +
    'footer a{color:#8A8A8A;margin-right:14px}' +
    '</style></head><body><div class="wrap">' +
    '<header><img src="' + LOGO + '" alt="AGS"><a href="' + APP + '">Amsterdam Guestlist Service</a></header>' +
    body +
    '<footer><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a><a href="/support">Support</a><br>© 2026 Amsterdam Guestlist Service · Amsterdam, the Netherlands</footer>' +
    '</div></body></html>';
}

function contactLine(email) {
  return (email ? 'email <a href="mailto:' + esc(email) + '">' + esc(email) + '</a> or ' : '') +
    'message us on <a href="' + WHATSAPP + '">WhatsApp</a>';
}

function privacy(email) {
  return shell('Privacy Policy',
    '<p class="eyebrow">Legal</p><h1>Privacy Policy</h1><p class="updated">Last updated: ' + UPDATED + '</p>' +
    '<p>Amsterdam Guestlist Service (“AGS”, “we”) runs the AGS app and website, where you can discover nightlife events in Amsterdam, request guestlist spots, find tickets and tables, and chat with other members in the Backroom. This policy explains what personal data we collect, why, and what your rights are. We follow the EU General Data Protection Regulation (GDPR).</p>' +

    '<h2>Who is responsible</h2>' +
    '<p>Amsterdam Guestlist Service, Amsterdam, the Netherlands, is the controller of your personal data. Questions or requests: ' + contactLine(email) + '.</p>' +

    '<h2>What we collect</h2>' +
    '<h3>Your account</h3><ul><li>Email address and password (the password is stored encrypted by our authentication provider; we never see it).</li><li>Your name, if you add it.</li></ul>' +
    '<h3>Guestlist requests</h3><ul><li>First and last name, age, phone number, email address and, optionally, your Instagram handle.</li><li>For some events: man/woman, because the venue applies a different door policy or age limit.</li><li>The names and ages (and for some events the email address) of the friends you add to your request. Only add friends who agree to this.</li><li>The status of your request (pending, approved, declined, cancelled, no-show).</li></ul>' +
    '<h3>Points and invites</h3><ul><li>Your points, member level and personal invite code, and which account invited you.</li></ul>' +
    '<h3>Notifications</h3><ul><li>If you turn on notifications: a technical notification token for your device. You can turn this off at any time in your device settings.</li></ul>' +
    '<h3>Backroom</h3><ul><li>The display name you choose, your messages, the members you block and the reports you send or receive.</li></ul>' +
    '<h3>Usage</h3><ul><li>When you tap a ticket or table link, we record which event and which link was tapped, so we know which nights are popular.</li><li>We use your device’s local storage only for app settings (for example sounds on/off and whether you have seen the intro). We do not use advertising or tracking cookies, and we do not track you across other apps or websites.</li></ul>' +

    '<h2>Why we use it</h2><ul>' +
    '<li><strong>To handle your guestlist requests</strong> and send you updates by email and notification (performance of our agreement with you).</li>' +
    '<li><strong>To share the guest list with the venue or organiser</strong> of the event you request, so you can get in at the door. We only share the names (and, where the venue needs it, age, gender or email for personal tickets) of you and your guests for that event.</li>' +
    '<li><strong>To keep the guestlist fair:</strong> people with two no-shows for the same event series are temporarily blocked from that guestlist (legitimate interest).</li>' +
    '<li><strong>To run points, invites and the Backroom</strong>, including handling reports of abuse (performance of our agreement and legitimate interest in a safe community).</li>' +
    '<li><strong>To send notifications</strong>, only if you turn them on (consent).</li>' +
    '<li><strong>To understand which events and features are used</strong>, in aggregate (legitimate interest).</li>' +
    '</ul><p>We do not sell your personal data and we do not use it for advertising.</p>' +

    '<h2>Who processes it for us</h2><ul>' +
    '<li><strong>Supabase</strong> — database and login.</li>' +
    '<li><strong>Vercel</strong> — hosting of the app and website.</li>' +
    '<li><strong>Resend</strong> — sending emails.</li>' +
    '<li><strong>Apple, Google and Mozilla push services</strong> — delivering notifications, if you turn them on.</li>' +
    '</ul><p>These providers only process data on our instructions. Some of them may process data outside the EU; in that case appropriate safeguards such as the EU Standard Contractual Clauses apply.</p>' +

    '<h2>How long we keep it</h2>' +
    '<p>We keep your data as long as you have an account. When you delete your account, we delete your account, points, waitlist spots, notification tokens and Backroom messages. Upcoming guestlist requests are cancelled. Past guestlist requests are anonymised: your name, contact details and guests are removed and only the event, date, party size and status remain as anonymous statistics. Guest lists already shared with a venue are handled by that venue under its own policy.</p>' +

    '<h2>Your rights</h2>' +
    '<p>You can ask us to access, correct, delete or export your data, to restrict its use, or object to it. You can withdraw consent (such as notifications) at any time.</p>' +
    '<p><strong>Delete your account in the app:</strong> Account → “Delete my account”. This works immediately. You can also ask us via ' + contactLine(email) + '.</p>' +
    '<p>If you think we handle your data incorrectly, please contact us first. You also have the right to file a complaint with the Dutch data protection authority, the <a href="https://autoriteitpersoonsgegevens.nl">Autoriteit Persoonsgegevens</a>.</p>' +

    '<h2>Age</h2><p>AGS is only for people aged 18 or older. Some events have a higher minimum age. We do not knowingly collect data from anyone under 18.</p>' +

    '<h2>Security</h2><p>Data is sent over encrypted connections and stored with access controls. Only AGS staff who need it can see guestlist requests.</p>' +

    '<h2>Changes</h2><p>We may update this policy. The date at the top shows the latest version. For important changes we will let you know in the app.</p>');
}

function terms(email) {
  return shell('Terms of Use',
    '<p class="eyebrow">Legal</p><h1>Terms of Use</h1><p class="updated">Last updated: ' + UPDATED + '</p>' +
    '<p>These terms apply to the Amsterdam Guestlist Service app and website (“AGS”). By creating an account or using AGS you agree to them.</p>' +

    '<h2>1. Who can use AGS</h2><ul><li>You must be at least 18 years old. Some events have a higher minimum age or a different age for men and women; this is shown with the event.</li><li>The details you give must be correct and your own. Only add friends to a request who agree to it and meet the age limit.</li><li>Keep your login to yourself. You are responsible for what happens with your account.</li></ul>' +

    '<h2>2. Guestlist</h2><ul><li>A request is not a guarantee. AGS and the venue decide whether a request is approved.</li><li>An approved guestlist spot still depends on the venue’s door policy, dress code, capacity and arrival time. The venue’s decision at the door is final.</li><li>Can’t make it? Release your spot in the app or through the link in your email, so someone else can go.</li><li>Two no-shows for the same event series means you can’t request that guestlist for 14 days. You can still buy tickets.</li></ul>' +

    '<h2>3. Tickets and tables</h2><p>Tickets and tables are sold by the venue, the organiser or their ticket shop, not by AGS. Their terms, prices and refund rules apply. AGS is not a party to that purchase.</p>' +

    '<h2>4. Points and perks</h2><p>Points and member levels are a free loyalty programme. They have no cash value, cannot be sold or transferred, and may be changed or ended. Points obtained by fake accounts, fake invites or abuse can be removed.</p>' +

    '<h2 id="backroom">5. The Backroom</h2><p><strong>AGS has zero tolerance for objectionable content and abusive users.</strong> The Backroom is a members-only chat. When you use it you agree that you will not post or send:</p><ul><li>harassment, threats, bullying or hate based on race, ethnicity, religion, gender, sexual orientation, disability or any other characteristic;</li><li>sexual content, nudity, or unwanted advances;</li><li>spam, advertising, or offers to sell tickets, drugs or anything else;</li><li>other people’s personal data, or anything illegal.</li></ul>' +
    '<p>You can <strong>block</strong> any member and <strong>report</strong> any message or member from the chat. Reports go straight to AGS and are reviewed within 24 hours. We may remove content and suspend or remove anyone who breaks these rules, without warning. When you leave the Backroom or delete your account, your conversations are deleted.</p>' +

    '<h2>6. Ending your account</h2><p>You can delete your account at any time in the app (Account → “Delete my account”). We may suspend or end accounts that break these terms.</p>' +

    '<h2>7. Liability</h2><p>Events are organised by third parties. AGS is not responsible for changes, cancellations or what happens at an event. AGS is provided “as is”; we do our best to keep it available and correct but cannot guarantee it. Nothing in these terms limits rights you have under Dutch or EU consumer law.</p>' +

    '<h2>8. Law</h2><p>These terms are governed by Dutch law. Questions? ' + contactLine(email) + '.</p>');
}

function support(email) {
  return shell('Support',
    '<p class="eyebrow">Help</p><h1>Support</h1><p class="updated">We usually reply within a few hours, and always within 24 hours.</p>' +
    '<div class="card"><p><strong>Contact AGS</strong></p><p>' +
    (email ? '<a class="btn btn--solid" href="mailto:' + esc(email) + '?subject=AGS%20app%20support">Email us</a>' : '') +
    '<a class="btn" href="' + WHATSAPP + '">WhatsApp</a></p>' +
    (email ? '<p style="font-size:14px;color:#8A8A8A">' + esc(email) + '</p>' : '') + '</div>' +

    '<h2>Frequently asked</h2>' +
    '<h3>How do I get on a guestlist?</h3><p>Open an event and tap “Get on the Guestlist”. The first time you fill in your details; after that it’s one tap. You get an email and a notification when you’re approved.</p>' +
    '<h3>I can’t make it anymore</h3><p>Open the app and tap “Can’t make it? Release your spot”, or use the link in your confirmation email. You don’t lose any points.</p>' +
    '<h3>I didn’t receive my login code</h3><p>Check your spam or promotions folder. The code has 8 digits and is valid for a short time — request a new one if it expired.</p>' +
    '<h3>Notifications don’t arrive</h3><p>Tap the bell at the top of the app and allow notifications. On iPhone, the web version only supports notifications after you add it to your home screen.</p>' +
    '<h3>Someone is bothering me in the Backroom</h3><p>Open the chat, tap ⋯ and choose Block or Report. Reports are reviewed within 24 hours.</p>' +
    '<h3>How do I delete my account?</h3><p>In the app: Account → “Delete my account”. Your data is removed right away. See the <a href="/privacy">Privacy Policy</a> for details.</p>' +
    '<p style="margin-top:28px"><a class="btn" href="' + APP + '">Open the app</a></p>');
}

module.exports = function handler(req, res) {
  const p = String((req.query && req.query.p) || '');
  const email = process.env.SUPPORT_EMAIL || process.env.GUEST_REPLY_TO || '';
  const page = p === 'terms' ? terms(email) : p === 'support' ? support(email) : privacy(email);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
  res.status(200).send(page);
};
