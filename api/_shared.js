import crypto from 'node:crypto';
import { list, put } from '@vercel/blob';

export const CONFIG_PATH = 'fg-radio/config.json';

export const DEFAULT_CONFIG = {
  brandName: 'Mi Radio',
  tagline: 'Música que te acompaña',
  streamUrl: '',
  metadataUrl: '',
  metadataTitlePath: 'title',
  metadataArtistPath: 'artist',
  metadataArtworkPath: 'artwork',
  showMetadataTicker: true,
  metadataTickerSpeed: 18,
  metadataTickerSize: 17,
  fallbackTitle: 'Programación en vivo',
  fallbackArtist: '',
  logoData: '',
  backgroundData: '',
  accent: '#ffb703',
  accentSoft: '#ffe59a',
  waveColor1: '#d9a441',
  waveColor2: '#2f80ed',
  logoAnimation: 'elegant',
  logoAnimationIntensity: 38,
  stationTitleSizeDesktop: 52,
  stationTitleSizeMobile: 30,
  playerVisualSizeDesktop: 390,
  playerVisualSizeMobile: 320,
  showStationTitleMobile: true,
  panel: '#111417',
  text: '#f6f1e7',
  muted: '#aaa39a',
  liveLabel: 'EN VIVO',
  requestLabel: 'Pedir canción',
  requestUrl: '',
  whatsapp: '',
  facebook: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  website: '',
  showHistory: true,
  historyLimit: 6,
  showLocalInfo: true,
  autoUserLocation: true,
  timeFormat: '12h',
  temperatureUnit: 'celsius',
  showLocalDate: true,
  showDeveloperCredit: true,
  developerCredit: 'Diseñado por FG Media Studios',
  pwaName: 'Mi Radio',
  pwaShortName: 'Mi Radio',
  pwaDescription: 'Escucha nuestra radio en vivo.',
  pwaIcon192Data: '',
  pwaIcon512Data: '',
  themeColor: '#090b16',
  adminNote: ''
};

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN);
}

export async function readConfig() {
  if (!blobEnabled()) return { ...DEFAULT_CONFIG, _storage: 'defaults' };
  try {
    const result = await list({ prefix: CONFIG_PATH, limit: 5 });
    const exact = result.blobs.find((b) => b.pathname === CONFIG_PATH) || result.blobs[0];
    if (!exact?.url) return { ...DEFAULT_CONFIG, _storage: 'blob-empty' };
    const response = await fetch(exact.url, { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo leer la configuración');
    const saved = await response.json();
    // Migración automática de valores heredados del diseño Elegance.
    // Si el usuario ya cambió la marca, no dejamos que el nombre antiguo
    // vuelva a aparecer como artista o nombre de la PWA.
    const legacyName = 'Radio Elegance FM';
    const legacyShort = 'Elegance FM';
    const brand = String(saved.brandName || '').trim();
    if (brand && brand !== legacyName) {
      if (!saved.fallbackArtist || saved.fallbackArtist === legacyName) saved.fallbackArtist = '';
      if (!saved.pwaName || saved.pwaName === legacyName) saved.pwaName = brand;
      if (!saved.pwaShortName || saved.pwaShortName === legacyShort) saved.pwaShortName = brand.slice(0, 24);
    }
    return { ...DEFAULT_CONFIG, ...saved, _storage: 'blob' };
  } catch (error) {
    console.error('readConfig', error);
    return { ...DEFAULT_CONFIG, _storage: 'blob-error' };
  }
}

export async function writeConfig(config) {
  if (!blobEnabled()) {
    throw new Error('Vercel Blob no está conectado. Conecta un Blob Store en Vercel para guardar cambios.');
  }
  const clean = { ...DEFAULT_CONFIG, ...config };
  delete clean._storage;
  const body = JSON.stringify(clean, null, 2);
  await put(CONFIG_PATH, body, {
    access: 'public',
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8'
  });
  return clean;
}

function secret() {
  return process.env.SESSION_SECRET || 'dev-only-secret-change-me';
}

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

export function createSessionToken() {
  const payload = JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 12 });
  const encoded = b64url(payload);
  const sig = crypto.createHmac('sha256', secret()).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token) {
  try {
    if (!token || !token.includes('.')) return false;
    const [encoded, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', secret()).update(encoded).digest('base64url');
    if (sig.length !== expected.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    return Number(payload.exp) > Date.now();
  } catch {
    return false;
  }
}

export function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export function isAdmin(req) {
  return verifySessionToken(parseCookies(req).fg_radio_session);
}

export function safeJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

export function getByPath(obj, path) {
  if (!path) return undefined;
  return String(path).split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}
