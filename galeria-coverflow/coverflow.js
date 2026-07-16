/** Galería coverflow */

import { GALERIA_FOTOS } from '../js/config.js';

const POS_CLASSES = [
  'is-active',
  'is-left-1', 'is-left-2', 'is-left-3',
  'is-right-1', 'is-right-2', 'is-right-3',
];

const TRANSITION_MS = 1100;

function posClassFor(diff) {
  switch (diff) {
    case 0: return 'is-active';
    case -1: return 'is-left-1';
    case -2: return 'is-left-2';
    case -3: return 'is-left-3';
    case 1: return 'is-right-1';
    case 2: return 'is-right-2';
    case 3: return 'is-right-3';
    default: return null;
  }
}

export function initCoverflow() {
  const section = document.getElementById('galeria-coverflow');
  if (!section || !GALERIA_FOTOS.length) return;

  const track = section.querySelector('.gcv__track');
  const indicatorsWrap = section.querySelector('.gcv__indicators');
  const coverflow = section.querySelector('.gcv__coverflow');
  const prevBtn = section.querySelector('.gcv__nav--prev');
  const nextBtn = section.querySelector('.gcv__nav--next');

  if (!track || !indicatorsWrap || !coverflow) return;

  track.innerHTML = '';
  indicatorsWrap.innerHTML = '';

  const slides = GALERIA_FOTOS.map((foto, i) => {
    const slide = document.createElement('div');
    slide.className = 'gcv__slide';
    slide.dataset.index = String(i);

    const card = document.createElement('article');
    card.className = 'gcv__card';

    const img = document.createElement('img');
    img.className = 'gcv__photo';
    img.src = foto.src;
    img.alt = foto.alt || `Foto ${i + 1}`;
    img.decoding = 'async';
    img.draggable = false;
    img.loading = i === 0 ? 'eager' : 'lazy';
    card.appendChild(img);

    const reflect = document.createElement('div');
    reflect.className = 'gcv__reflect';
    reflect.setAttribute('aria-hidden', 'true');

    const reflectImg = document.createElement('img');
    reflectImg.src = foto.src;
    reflectImg.alt = '';
    reflectImg.draggable = false;
    reflectImg.loading = i === 0 ? 'eager' : 'lazy';
    reflect.appendChild(reflectImg);

    slide.appendChild(card);
    slide.appendChild(reflect);
    track.appendChild(slide);
    return slide;
  });

  const dots = GALERIA_FOTOS.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gcv__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Ir a foto ${i + 1}`);
    indicatorsWrap.appendChild(dot);
    return dot;
  });

  let current = 0;
  let autoPlay = null;
  let locked = false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function wrapDiff(index) {
    let diff = index - current;
    if (diff > slides.length / 2) diff -= slides.length;
    if (diff < -slides.length / 2) diff += slides.length;
    return diff;
  }

  function updateCoverflow() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });

    slides.forEach((slide, index) => {
      const next = posClassFor(wrapDiff(index));

      POS_CLASSES.forEach((cls) => {
        if (cls !== next) slide.classList.remove(cls);
      });

      if (next) slide.classList.add(next);
    });
  }

  function goTo(index) {
    if (locked || index === current || !slides.length) return;

    locked = true;
    current = (index + slides.length) % slides.length;
    updateCoverflow();

    window.setTimeout(() => {
      locked = false;
    }, reduced ? 0 : TRANSITION_MS);
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    if (reduced || slides.length < 2) return;
    autoPlay = window.setInterval(next, 4000);
  }

  function restartAutoplay() {
    window.clearInterval(autoPlay);
    startAutoplay();
  }

  nextBtn?.addEventListener('click', () => { next(); restartAutoplay(); });
  prevBtn?.addEventListener('click', () => { prev(); restartAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
  });

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => { goTo(i); restartAutoplay(); });
  });

  coverflow.addEventListener('mouseenter', () => window.clearInterval(autoPlay));
  coverflow.addEventListener('mouseleave', startAutoplay);

  let startX = 0;
  let endX = 0;

  coverflow.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    endX = startX;
  }, { passive: true });

  coverflow.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  coverflow.addEventListener('touchend', () => {
    const distance = startX - endX;
    if (Math.abs(distance) < 40) return;
    if (distance > 0) next();
    else prev();
    restartAutoplay();
  });

  let mouseDown = false;
  let mouseStart = 0;

  coverflow.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseStart = e.clientX;
  });

  window.addEventListener('mouseup', () => { mouseDown = false; });

  coverflow.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;
    const distance = mouseStart - e.clientX;
    if (Math.abs(distance) < 80) return;
    mouseDown = false;
    if (distance > 0) next();
    else prev();
    restartAutoplay();
  });

  document.addEventListener('keydown', (e) => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
    if (!inView) return;
    if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
    if (e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
  });

  updateCoverflow();
  startAutoplay();
}
