# FG Radio Elegance Admin V1.3.2 — PWA completa

Versión marca blanca del reproductor de radio para Vercel con diseño elegante de **2 colores editables**, panel `/admin` privado, Vercel Blob y PWA instalable.

## Novedades V1.3.2

- Service Worker real (`/sw.js`).
- Manifest dinámico según cada cliente.
- Instalación como PWA en navegadores compatibles.
- En iPhone muestra la indicación para agregar a pantalla de inicio.
- Nombre, nombre corto, descripción, color e icono de la PWA editables desde `/admin`.
- Generación automática de iconos PNG 192×192 y 512×512 desde el panel.
- `apple-touch-icon` y metadatos para iPhone/iPad.
- Página de respaldo offline para la interfaz (la transmisión de radio siempre requiere internet).
- El administrador continúa sin enlace visible en la página pública.

## Variables de entorno

- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `BLOB_READ_WRITE_TOKEN` (creada al conectar Vercel Blob)

## Instalación

1. Sube todos los archivos a GitHub respetando la estructura.
2. Importa el repositorio en Vercel.
3. Conecta un Blob Store público al proyecto.
4. Configura `ADMIN_PASSWORD` y `SESSION_SECRET`.
5. Haz un Redeploy.
6. Entra manualmente a `https://TU-DOMINIO/admin`.
7. En la pestaña **PWA**, configura nombre, descripción e icono cuadrado y guarda.

> Nota: una PWA puede abrir su interfaz sin conexión si ya fue cacheada, pero el audio en vivo y los metadatos necesitan internet.
