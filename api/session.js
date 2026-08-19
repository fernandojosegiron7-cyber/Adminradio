import { isAdmin, safeJson } from './_shared.js';
export default async function handler(req, res) {
  return safeJson(res, 200, { authenticated: isAdmin(req) });
}
