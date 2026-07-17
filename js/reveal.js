import { animateDrawTitle, resetDrawTitle } from './text-draw.js';

export function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    revealEls.forEach((el) => {
      el.classList.add('is-visible');
      if (el.classList.contains('draw-title')) animateDrawTitle(el);
    });
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        if (el.classList.contains('draw-title')) {
          animateDrawTitle(el);
        }
      } else {
        el.classList.remove('is-visible');
        if (el.classList.contains('draw-title')) {
          resetDrawTitle(el);
        }
      }
    });
  }, { threshold: 0.25 });

  revealEls.forEach((el) => revealObserver.observe(el));
}
