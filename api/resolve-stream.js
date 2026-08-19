import { readConfig, safeJson } from './_shared.js';

function parsePlaylist(text, source) {
  const trimmed = text.trim();
  if (/\[playlist\]/i.test(trimmed) || /File\d+=/i.test(trimmed)) {
    const match = trimmed.match(/File\d+=(https?:\/\/[^\r\n]+)/i);
    if (match) return match[1].trim();
  }
  const lines = trimmed.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const direct = lines.find((line) => !line.startsWith('#') && /^https?:\/\//i.test(line));
  return direct || source;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return safeJson(res, 405, { error: 'Método no permitido' });
  const config = await readConfig();
  const source = String(config.streamUrl || '').trim();
  if (!source) return safeJson(res, 200, { url: '' });
  if (!/\.(m3u|pls)(\?|$)/i.test(source)) return safeJson(res, 200, { url: source });
  try {
    const response = await fetch(source, { cache: 'no-store', redirect: 'follow' });
    if (!response.ok) throw new Error(`Playlist HTTP ${response.status}`);
    const text = await response.text();
    return safeJson(res, 200, { url: parsePlaylist(text, source) });
  } catch (error) {
    return safeJson(res, 200, { url: source, warning: error.message });
  }
}
