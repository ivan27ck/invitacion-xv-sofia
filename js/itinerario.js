/** Itinerario · línea de tiempo animada */

import { ITINERARIO } from './config.js';

export function initItinerario() {
  const section = document.getElementById('itinerario');
  const itemsWrap = document.getElementById('itinerario-items');
  const timeline = document.getElementById('itinerario-timeline');
  const svg = document.getElementById('itinerario-thread');
  const path = document.getElementById('itinerario-thread-path');

  if (!section || !itemsWrap || !timeline || !svg || !path || !ITINERARIO.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let threadLen = 0;

  itemsWrap.innerHTML = '';
  ITINERARIO.forEach((act, i) => {
    const el = document.createElement('article');
    el.className = 'itinerario__item' + (act.special ? ' itinerario__item--special' : '');
    el.style.transitionDelay = reduced ? '0s' : `${i * 0.08}s`;
    el.innerHTML = `
      <div class="itinerario__node">
        <i class="fa-solid ${act.icon}" aria-hidden="true"></i>
      </div>
      <p class="itinerario__time">${act.time}</p>
      <h3 class="itinerario__item-title">${act.title}</h3>
      <p class="itinerario__desc">${act.desc}</p>`;
    itemsWrap.appendChild(el);
  });

  const items = [...itemsWrap.querySelectorAll('.itinerario__item')];

  function sizeThread() {
    const h = timeline.offsetHeight;
    svg.setAttribute('viewBox', `0 0 4 ${h}`);
    svg.style.height = `${h}px`;
    path.setAttribute('d', `M2,0 L2,${h}`);
    threadLen = path.getTotalLength();

    if (reduced) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
    } else {
      path.style.strokeDasharray = String(threadLen);
      path.style.strokeDashoffset = String(threadLen);
    }
    updateThread();
  }

  function updateThread() {
    if (reduced || !threadLen) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = Math.min(Math.max(vh * 0.65 - rect.top, 0), rect.height);
    const progress = rect.height ? scrolled / rect.height : 0;
    path.style.strokeDashoffset = String(threadLen * (1 - progress));
  }

  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });

  items.forEach((item) => {
    if (reduced) item.classList.add('is-visible');
    else itemObserver.observe(item);
  });

  sizeThread();
  window.addEventListener('resize', sizeThread);
  window.addEventListener('scroll', updateThread, { passive: true });

  const conejo = section.querySelector('.conejo');
  if (conejo) {
    const conejoObs = new IntersectionObserver(([entry]) => {
      conejo.classList.toggle('conejo--visible', entry.isIntersecting);
    }, { threshold: 0.05 });
    conejoObs.observe(section);
  }
}
