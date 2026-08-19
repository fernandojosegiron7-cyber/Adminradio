import { readConfig, safeJson } from './_shared.js';
export default async function handler(req, res) {
  const c = await readConfig();
  const manifest = {
    name: c.pwaName || c.brandName,
    short_name: c.pwaShortName || c.brandName,
    description: c.pwaDescription || c.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: c.themeColor || '#0b0d0f',
    theme_color: c.themeColor || '#0b0d0f',
    icons: [
      { src: '/api/icon?size=192', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/api/icon?size=512', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  };
  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(manifest));
}
