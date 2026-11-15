// api/ags.js
//
// One serverless function for several small endpoints (the Vercel plan
// allows max 12 functions). vercel.json rewrites the public URLs here:
//   /api/delete-account  -> _delete-account.js
//   /api/notify-report   -> _notify-report.js
//   /api/report-action   -> _report-action.js
//   /privacy /terms /support -> _legal.js
//   /api/calendar        -> _calendar.js

const ROUTES = {
  'delete-account': require('./_delete-account'),
  'notify-report': require('./_notify-report'),
  'report-action': require('./_report-action'),
  'legal': require('./_legal'),
  'calendar': require('./_calendar')
};

module.exports = function handler(req, res) {
  const fn = String((req.query && req.query.fn) || '');
  const route = ROUTES[fn];
  if (!route) { res.status(404).json({ ok: false }); return; }
  return route(req, res);
};
