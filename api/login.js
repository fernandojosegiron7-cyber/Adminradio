import { createSessionToken, safeJson } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return safeJson(res, 405, { error: 'Método no permitido' });
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return safeJson(res, 500, { error: 'Falta ADMIN_PASSWORD en Vercel.' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (String(body.password || '') !== String(expected)) {
    return safeJson(res, 401, { error: 'Contraseña incorrecta' });
  }
  const token = createSessionToken();
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `fg_radio_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200${secure}`);
  return safeJson(res, 200, { ok: true });
}
