/** Itinerario 2 · timeline alternado izquierda / derecha */

import { ITINERARIO } from './config.js';

const STAGGER_MS = 450;

export function initItinerario2() {
  const section = document.getElementById('itinerario2');
  const timeline = document.getElementById('itinerario2-timeline');
  const wrap = document.getElementById('itinerario2-items');
  const line = timeline?.querySelector('.it2__line');

  if (!section || !timeline || !wrap || !line || !ITINERARIO.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  wrap.innerHTML = '';
  ITINERARIO.forEach((act, i) => {
    const side = i % 2 === 0 ? 'right' : 'left';
    const el = document.createElement('article');
    el.className = `it2__item it2__item--${side}` + (act.special ? ' it2__item--special' : '');

    const time = `<time class="it2__time">${act.time}</time>`;
    const node = `
      <div class="it2__node">
        <i class="fa-solid ${act.icon}" aria-hidden="true"></i>
      </div>`;
    const body = `
      <div class="it2__body">
        <h3 class="it2__item-title">${act.title}</h3>
        <p class="it2__desc">${act.desc}</p>
      </div>`;

    /* Orden DOM = orden visual → evita desalineación del grid */
    el.innerHTML = side === 'right'
      ? `${time}${node}${body}`
      : `${body}${node}${time}`;

    wrap.appendChild(el);
  });

  const items = [...wrap.querySelectorAll('.it2__item')];
  const scroller = section.querySelector('.content');
  let lastVisible = -1;

  function growLineTo(index) {
    const item = items[index];
    const node = item?.querySelector('.it2__node');
    if (!node) return;

    const timelineTop = timeline.getBoundingClientRect().top;
    const nodeRect = node.getBoundingClientRect();
    const isLast = index === items.length - 1;
    const height = isLast
      ? timeline.scrollHeight
      : nodeRect.top + nodeRect.height / 2 - timelineTop;

    line.style.height = `${Math.max(0, height)}px`;
    lastVisible = index;
  }

  if (reduced) {
    items.forEach((item) => item.classList.add('is-visible'));
    line.style.height = `${timeline.scrollHeight}px`;
    return;
  }

  let nextRevealAt = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const item = entry.target;
      const index = items.indexOf(item);
      observer.unobserve(item);

      const now = performance.now();
      const delay = Math.max(0, nextRevealAt - now);
      nextRevealAt = Math.max(now, nextRevealAt) + STAGGER_MS;

      window.setTimeout(() => {
        item.classList.add('is-visible');
        growLineTo(index);
      }, delay);
    });
  }, {
    root: scroller,
    threshold: 0.35,
    rootMargin: '0px 0px -8% 0px',
  });

  items.forEach((item) => observer.observe(item));

  /* Mantener el scroll dentro del itinerario hasta llegar al final (o al inicio) */
  if (scroller) {
    scroller.addEventListener('wheel', (e) => {
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll <= 0) return;

      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop >= maxScroll - 2;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        return;
      }

      e.preventDefault();
      scroller.scrollTop += e.deltaY;
    }, { passive: false });
  }

  window.addEventListener('resize', () => {
    if (lastVisible >= 0) growLineTo(lastVisible);
  });
}
