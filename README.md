# FG Radio Elegance Admin V1.3.7 — Estable + PWA completa

Versión marca blanca del reproductor de radio para Vercel con diseño elegante de **2 colores editables**, panel `/admin` privado, Vercel Blob y PWA instalable.

## Novedades V1.3.7

- Se eliminó el movimiento ambiental del fondo, título, anillos, logo, tarjetas e historial.
- Solo se mueven las **ondas de audio** y el punto de **EN VIVO**.
- El botón Play tiene únicamente una respuesta breve al presionarlo.
- Las ondas siguen usando exactamente **2 colores editables** desde `/admin`.
- Se conserva toda la PWA, el administrador privado, Vercel Blob y la configuración de metadatos.

## Funciones PWA heredadas de V1.3.2

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


## Novedades V1.3.7
- Logo con animación administrable: Elegante, Pulso, Flotante, Brillo o Ninguna.
- Intensidad del movimiento del logo configurable desde `/admin`.
- La opción predeterminada es **Elegante**, con respiración suave + halo + destello discreto.
- Control de volumen rediseñado con barra de dos colores, indicador visual por niveles, halo del deslizador y microanimación únicamente mientras se ajusta.
- El resto de la interfaz continúa estable: no se mueve el fondo ni las tarjetas.


## V1.3.7 — Iconos sociales
El reproductor muestra iconos SVG profesionales para Facebook, Instagram, TikTok, YouTube, WhatsApp y sitio web. Solo aparecen los iconos cuyo enlace esté configurado en `/admin` → Redes. Los iconos usan los dos colores editables del diseño.


## V1.3.7 — Menú PWA + tamaño del nombre
- Corrige el caché antiguo del Service Worker que podía dejar una versión vieja al instalar la PWA.
- El menú ☰ queda visible en móvil y en modo PWA instalado.
- Respeta las áreas seguras de iPhone.
- Desde `/admin > Diseño` puedes elegir el tamaño del nombre en PC y el tamaño en móvil/PWA.
- También puedes ocultar el nombre grande en móvil/PWA si prefieres dejar solo el logo y el menú.
- El CSS del reproductor usa versionado para que los cambios nuevos se actualicen mejor después de un redeploy.


## Clima, hora y ubicación del oyente

La V1.3.7 reemplaza las tarjetas de Calidad / Ubicación / Estado por tres módulos: clima actual, hora/fecha local y ubicación aproximada del oyente. El navegador solicita permiso de ubicación. Si el usuario lo rechaza, el reproductor sigue funcionando normalmente y puede volver a intentarlo tocando la tarjeta de ubicación.

- El clima se obtiene según las coordenadas del dispositivo.
- La hora usa la zona horaria detectada para esas coordenadas.
- La ubicación mostrada es aproximada (ciudad/municipio/región) y no muestra coordenadas al público.
- Desde `/admin → Extras` puedes activar/desactivar el módulo, elegir 12/24 h, °C/°F y mostrar/ocultar la fecha.
