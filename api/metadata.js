import { getByPath, readConfig, safeJson } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return safeJson(res, 405, { error: 'Método no permitido' });
  const config = await readConfig();
  if (!config.metadataUrl) {
    return safeJson(res, 200, {
      title: config.fallbackTitle,
      artist: config.fallbackArtist,
      artwork: config.logoData || ''
    });
  }
  try {
    const response = await fetch(config.metadataUrl, {
      headers: { 'User-Agent': 'FG-Radio-Player/1.0', Accept: 'application/json,text/plain,*/*' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Metadata HTTP ${response.status}`);
    const type = response.headers.get('content-type') || '';
    let title = '';
    let artist = '';
    let artwork = '';
    if (type.includes('json')) {
      const data = await response.json();
      title = getByPath(data, config.metadataTitlePath) ?? data.title ?? data.song ?? data.now_playing?.song?.title ?? '';
      artist = getByPath(data, config.metadataArtistPath) ?? data.artist ?? data.now_playing?.song?.artist ?? '';
      artwork = getByPath(data, config.metadataArtworkPath) ?? data.artwork ?? data.cover ?? data.now_playing?.song?.art ?? '';
    } else {
      const text = (await response.text()).trim();
      const parts = text.split(' - ');
      if (parts.length > 1) {
        artist = parts.shift().trim();
        title = parts.join(' - ').trim();
      } else title = text;
    }
    return safeJson(res, 200, {
      title: String(title || config.fallbackTitle),
      artist: String(artist || config.fallbackArtist),
      artwork: String(artwork || config.logoData || '')
    });
  } catch (error) {
    return safeJson(res, 200, {
      title: config.fallbackTitle,
      artist: config.fallbackArtist,
      artwork: config.logoData || '',
      warning: error.message
    });
  }
}
