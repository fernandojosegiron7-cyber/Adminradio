import { readConfig } from './_shared.js';

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { type: match[1], buffer: Buffer.from(match[2], 'base64') };
}

const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#0b0d0f"/><circle cx="256" cy="256" r="162" fill="none" stroke="#d9a441" stroke-width="18"/><path d="M168 270c22-70 54-105 88-105s66 35 88 105" fill="none" stroke="#f3d285" stroke-width="24" stroke-linecap="round"/><circle cx="256" cy="286" r="46" fill="#d9a441"/><text x="256" y="410" text-anchor="middle" font-family="Arial" font-size="58" font-weight="700" fill="#f6f1e7">RADIO</text></svg>`;

export default async function handler(req, res) {
  const config = await readConfig();
  const parsed = parseDataUrl(config.logoData);
  res.setHeader('Cache-Control', 'public, max-age=300');
  if (parsed) {
    res.setHeader('Content-Type', parsed.type);
    return res.end(parsed.buffer);
  }
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  return res.end(fallbackSvg);
}
