# FG Radio Elegance Admin V1

Reproductor de radio **marca blanca**, elegante, administrable y preparado para Vercel.

## Incluye

- Reproductor responsive con estilo negro/dorado tipo premium.
- Logo circular con **ondas animadas** y anillos en movimiento.
- Play/Pausa, silencio y volumen.
- Stream editable desde `/admin`.
- Resolución automática básica de archivos `.m3u` y `.pls` hacia la URL de audio contenida.
- Metadatos configurables por URL JSON o texto.
- Historial local de últimas canciones.
- Fondo, logo, colores, nombre, eslogan, enlaces y textos editables.
- Redes sociales y botón de pedir canción.
- Panel `/admin` protegido por contraseña.
- Exportar / importar configuración para duplicar un cliente.
- PWA con nombre e icono dinámicos.
- Persistencia con **Vercel Blob**.

## 1. Subir a GitHub

Sube todos los archivos del proyecto a un repositorio.

## 2. Importar en Vercel

Crea un proyecto nuevo en Vercel importando el repositorio.

## 3. Configurar variables

En Vercel agrega:

```env
ADMIN_PASSWORD=una-contrasena-fuerte
SESSION_SECRET=un-texto-largo-aleatorio-y-secreto
```

No publiques estos valores en GitHub.

## 4. Conectar Vercel Blob

En el proyecto de Vercel abre **Storage**, crea/conecta un **Blob Store** y vincúlalo al proyecto. El SDK de Blob usará las credenciales del proyecto; cuando corresponda, Vercel también puede proporcionar `BLOB_READ_WRITE_TOKEN`.

Sin Blob el reproductor abre con la configuración predeterminada, pero `/admin` no podrá persistir los cambios.

## 5. Administrar

Visita:

```text
https://TU-PROYECTO.vercel.app/admin
```

Entra con el valor de `ADMIN_PASSWORD`.

## Stream

Para máxima compatibilidad usa una URL **HTTPS** que entregue audio compatible con navegador. El proyecto puede leer una playlist `.m3u` o `.pls` sencilla y extraer la primera URL HTTP/HTTPS encontrada.

Importante: una página HTTPS normalmente no puede reproducir un stream HTTP por las reglas de contenido mixto del navegador. Este proyecto no convierte automáticamente HTTP a HTTPS.

## Metadatos

Si tu proveedor tiene un endpoint JSON, colócalo en **Audio > URL de metadatos** y configura rutas como:

```text
title
artist
artwork
```

También acepta rutas anidadas, por ejemplo:

```text
now_playing.song.title
now_playing.song.artist
now_playing.song.art
```

Si no configuras metadatos, muestra el título y artista de respaldo.

## Imágenes

El administrador comprime logo y fondo en el navegador antes de guardarlos dentro del JSON de configuración. Esto mantiene el proyecto sencillo y evita una ruta de carga separada. Para logos muy grandes se reduce el tamaño automáticamente.

## Venta a clientes

Puedes duplicar el repositorio por cliente o usar **Exportar configuración** y luego **Importar** en otro deployment. Todos los textos principales y la identidad visual son editables.

## Estructura

```text
/
├─ index.html
├─ admin.html
├─ styles.css
├─ vercel.json
├─ package.json
├─ .env.example
├─ assets/
│  └─ logo-placeholder.svg
└─ api/
   ├─ _shared.js
   ├─ config.js
   ├─ icon.js
   ├─ login.js
   ├─ logout.js
   ├─ manifest.js
   ├─ metadata.js
   ├─ resolve-stream.js
   └─ session.js
```

## Seguridad

- Cambia `ADMIN_PASSWORD` y `SESSION_SECRET` antes de usarlo.
- El panel usa una cookie HTTP-only firmada y con caducidad.
- No pongas claves privadas en el HTML ni en la configuración pública.
- Este V1 está pensado para **una radio por deployment**. Una versión SaaS multi-radio requeriría cuentas y almacenamiento por cliente.
