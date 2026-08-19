import { readConfig } from './_shared.js';
export default async function handler(req, res) {
  const c = await readConfig();
  const name = c.pwaName || c.brandName || 'Radio';
  const shortName = c.pwaShortName || c.brandName || 'Radio';
  const manifest = {
    id: '/',
    name,
    short_name: shortName,
    description: c.pwaDescription || c.tagline || 'Radio en vivo',
    lang: 'es',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: c.themeColor || '#0b0d0f',
    theme_color: c.themeColor || '#0b0d0f',
    categories: ['music', 'entertainment'],
    icons: [
      { src: '/api/icon?size=192', sizes: '192x192', purpose: 'any maskable' },
      { src: '/api/icon?size=512', sizes: '512x512', purpose: 'any maskable' }
    ]
  };
  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(manifest));
}
