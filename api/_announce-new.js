// api/_announce-new.js — admin button: announce new parties right now.
// GET = preview (dry run), POST = send. Same access as the other admin endpoints.
const { createClient } = require('@supabase/supabase-js');
const { isAdmin } = require('./_admin-auth');
const { sendNewEventsPush } = require('./_last-spots');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await isAdmin(req)).ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const result = await sendNewEventsPush(sb, { dryRun: req.method !== 'POST' });
  res.status(200).json(result);
};
