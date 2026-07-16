/** Sección ubicaciones · imagen de mapa clickeable → Google Maps */

import { UBICACIONES } from './ubicaciones-data.js';

function mapsUrl(u) {
  if (u.mapsUrl) return u.mapsUrl;
  if (u.lat != null && u.lng != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${u.lat},${u.lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.address || u.name)}`;
}

/** Imagen propia, o preview estático (Yandex, sin API key) */
function mapImage(u) {
  if (u.image) return u.image;
  if (u.lat == null || u.lng == null) return '';
  return `https://static-maps.yandex.ru/1.x/?ll=${u.lng},${u.lat}&size=650,400&z=15&l=map&pt=${u.lng},${u.lat},pm2rdm`;
}

export function initUbicaciones() {
  const section = document.getElementById('ubicaciones');
  const list = document.getElementById('ubicaciones-list');
  if (!section || !list || !UBICACIONES.length) return;

  list.innerHTML = '';

  UBICACIONES.forEach((u) => {
    const card = document.createElement('article');
    card.className = 'ubicacion';

    const link = mapsUrl(u);
    const imgSrc = mapImage(u);

    card.innerHTML = `
      <header class="ubicacion__header">
        <p class="ubicacion__tipo">${u.type}</p>
        <h3 class="ubicacion__nombre">${u.name}</h3>
        ${u.address ? `<p class="ubicacion__dir">${u.address}</p>` : ''}
      </header>
      <a class="ubicacion__mapa" href="${link}" target="_blank" rel="noopener noreferrer"
         aria-label="Abrir ${u.name} en Google Maps">
        <img
          class="ubicacion__mapa-img"
          src="${imgSrc}"
          alt="Mapa de ${u.name}"
          loading="lazy"
          decoding="async"
        >
        <span class="ubicacion__cta">
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          Ver en Google Maps
        </span>
      </a>
    `;

    list.appendChild(card);
  });
}
