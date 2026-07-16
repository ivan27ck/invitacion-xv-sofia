/** Carrusel · galerías con marco */

import { GALERIA_FOTOS } from './config.js';

function buildSrcset(photo) {
  if (!photo.src2x) return undefined;
  return `${photo.src} 1x, ${photo.src2x} 2x`;
}

function initCarruselIn(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const viewport = section.querySelector('.carrusel__viewport');
  const dotsWrap = section.querySelector('.carrusel__dots');
  const btnPrev = section.querySelector('.carrusel__btn--prev');
  const btnNext = section.querySelector('.carrusel__btn--next');

  if (!viewport || !dotsWrap || !GALERIA_FOTOS.length) return;

  viewport.innerHTML = '';
  dotsWrap.innerHTML = '';

  const photos = GALERIA_FOTOS.map((item, i) => {
    const img = document.createElement('img');
    img.className = 'carrusel__photo' + (i === 0 ? ' is-active' : '');
    img.src = item.src;
    img.alt = item.alt;
    img.decoding = 'async';
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.sizes = '(max-width: 480px) 45vw, 400px';

    const srcset = buildSrcset(item);
    if (srcset) img.srcset = srcset;

    viewport.appendChild(img);
    return img;
  });

  const dots = GALERIA_FOTOS.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carrusel__dot' + (i === 0 ? ' is-active' : '');
    dot.role = 'tab';
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dotsWrap.appendChild(dot);
    return dot;
  });

  let current = 0;

  function goTo(index) {
    current = (index + photos.length) % photos.length;

    photos.forEach((photo, i) => {
      photo.classList.toggle('is-active', i === current);
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  btnPrev?.addEventListener('click', () => goTo(current - 1));
  btnNext?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  viewport.addEventListener('touchstart', (e) => {
    viewport._startX = e.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - (viewport._startX ?? 0);
    if (Math.abs(diff) < 40) return;
    goTo(diff < 0 ? current + 1 : current - 1);
  }, { passive: true });
}

export function initCarrusel() {
  initCarruselIn('galeria2');
}
