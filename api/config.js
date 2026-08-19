import { isAdmin, readConfig, safeJson, writeConfig } from './_shared.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const config = await readConfig();
    return safeJson(res, 200, config);
  }
  if (req.method === 'POST') {
    if (!isAdmin(req)) return safeJson(res, 401, { error: 'No autorizado' });
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const saved = await writeConfig(body);
      return safeJson(res, 200, { ok: true, config: saved });
    } catch (error) {
      return safeJson(res, 500, { error: error.message || 'No se pudo guardar' });
    }
  }
  return safeJson(res, 405, { error: 'Método no permitido' });
}
