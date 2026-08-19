import { safeJson } from './_shared.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return safeJson(res, 405, { error: 'Método no permitido' });
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `fg_radio_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
  return safeJson(res, 200, { ok: true });
}
