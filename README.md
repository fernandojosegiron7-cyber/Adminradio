# FG Radio Elegance Admin V1.4.4 — Visual Pro

Versión Visual Pro del reproductor administrable para Vercel. Mantiene PWA, Vercel Blob, metadatos, redes bajo demanda, clima/hora/ubicación y panel privado.

## Novedades V1.4.4

- Fondo inteligente con desenfoque y oscurecimiento configurables.
- Halo del logo configurable.
- Mini ecualizador junto a **EN VIVO**, activo cuando reproduce.
- Transición suave al cambiar canción/metadatos.
- Botón Play con acabado glass premium.
- Control de volumen flotante que aparece al tocar el botón de volumen y se oculta solo.
- Historial más moderno con numeración, carátula y hora.
- Menú lateral refinado.
- **Modo ambiente**: toca el logo o entra desde el menú para una vista grande del logo, metadata y Play.
- Temas: Elegante, Oscuro, Claro, Neón suave y Minimalista.
- Nivel de animación: Sin animación decorativa, Suave o Normal.
- Conserva los dos colores editables de las ondas.

## Instalación

1. Sube el contenido de esta carpeta a GitHub.
2. Importa el repositorio en Vercel.
3. Conecta un Vercel Blob Store.
4. Configura `ADMIN_PASSWORD` y `SESSION_SECRET`.
5. Haz Deploy / Redeploy.
6. Entra a `/admin` y personaliza la radio.

Si actualizas desde una versión anterior, el Service Worker V1.4.4 usa una caché nueva para evitar que la PWA conserve estilos viejos.

> El acceso `/admin` no aparece en el reproductor público.
