/** Itinerario 2 · timeline alternado izquierda / derecha */

import { ITINERARIO } from './config.js';

export function initItinerario2() {
  const section = document.getElementById('itinerario2');
  const wrap = document.getElementById('itinerario2-items');

  if (!section || !wrap || !ITINERARIO.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  wrap.innerHTML = '';
  ITINERARIO.forEach((act, i) => {
    const side = i % 2 === 0 ? 'right' : 'left';
    const el = document.createElement('article');
    el.className = `it2__item it2__item--${side}` + (act.special ? ' it2__item--special' : '');
    if (!reduced) el.style.transitionDelay = `${i * 0.07}s`;
    el.innerHTML = `
      <time class="it2__time">${act.time}</time>
      <div class="it2__node">
        <i class="fa-solid ${act.icon}" aria-hidden="true"></i>
      </div>
      <div class="it2__body">
        <h3 class="it2__item-title">${act.title}</h3>
        <p class="it2__desc">${act.desc}</p>
      </div>`;
    wrap.appendChild(el);
  });

  const items = [...wrap.querySelectorAll('.it2__item')];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -6% 0px' });

  items.forEach((item) => {
    if (reduced) item.classList.add('is-visible');
    else observer.observe(item);
  });
}
