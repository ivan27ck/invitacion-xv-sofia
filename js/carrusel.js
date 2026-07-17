/** Carrusel · galería con marco + peek lateral */

import { GALERIA_FOTOS } from './config.js';

const POS_CLASSES = [
  'is-active',
  'is-left-1', 'is-left-2',
  'is-right-1', 'is-right-2',
];

function buildSrcset(photo) {
  if (!photo.src2x) return undefined;
  return `${photo.src} 1x, ${photo.src2x} 2x`;
}

function posClassFor(diff) {
  switch (diff) {
    case 0: return 'is-active';
    case -1: return 'is-left-1';
    case -2: return 'is-left-2';
    case 1: return 'is-right-1';
    case 2: return 'is-right-2';
    default: return null;
  }
}

function initCarruselIn(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const viewport = section.querySelector('.carrusel__viewport');
  const dotsWrap = section.querySelector('.carrusel__dots');
  const btnPrev = section.querySelector('.carrusel__btn--prev');
  const btnNext = section.querySelector('.carrusel__btn--next');
  const carrusel = section.querySelector('.carrusel');

  if (!viewport || !dotsWrap || !GALERIA_FOTOS.length) return;

  viewport.innerHTML = '';
  dotsWrap.innerHTML = '';

  const slides = GALERIA_FOTOS.map((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'carrusel__slide';
    slide.dataset.index = String(i);

    const img = document.createElement('img');
    img.className = 'carrusel__photo';
    img.src = item.src;
    img.alt = item.alt;
    img.decoding = 'async';
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.draggable = false;
    img.sizes = '(max-width: 480px) 45vw, 400px';

    const srcset = buildSrcset(item);
    if (srcset) img.srcset = srcset;

    slide.appendChild(img);
    viewport.appendChild(slide);
    return slide;
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
  let autoPlay = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function wrapDiff(index) {
    let diff = index - current;
    if (diff > slides.length / 2) diff -= slides.length;
    if (diff < -slides.length / 2) diff += slides.length;
    return diff;
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      const next = posClassFor(wrapDiff(index));
      POS_CLASSES.forEach((cls) => {
        if (cls !== next) slide.classList.remove(cls);
      });
      if (next) slide.classList.add(next);
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function goTo(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    updateSlides();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    if (reduced || slides.length < 2) return;
    window.clearInterval(autoPlay);
    autoPlay = window.setInterval(next, 4000);
  }

  function restartAutoplay() {
    window.clearInterval(autoPlay);
    startAutoplay();
  }

  btnPrev?.addEventListener('click', () => { prev(); restartAutoplay(); });
  btnNext?.addEventListener('click', () => { next(); restartAutoplay(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
  });
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => { goTo(i); restartAutoplay(); });
  });

  carrusel?.addEventListener('touchstart', (e) => {
    carrusel._startX = e.changedTouches[0].clientX;
  }, { passive: true });

  carrusel?.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - (carrusel._startX ?? 0);
    if (Math.abs(diff) < 40) return;
    if (diff < 0) next();
    else prev();
    restartAutoplay();
  }, { passive: true });

  carrusel?.addEventListener('mouseenter', () => window.clearInterval(autoPlay));
  carrusel?.addEventListener('mouseleave', startAutoplay);

  const viewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) startAutoplay();
        else window.clearInterval(autoPlay);
      });
    },
    { threshold: 0.35 },
  );
  viewObserver.observe(section);

  updateSlides();
}

export function initCarrusel() {
  initCarruselIn('galeria2');
}
