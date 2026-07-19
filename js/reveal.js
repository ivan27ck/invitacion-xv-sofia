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

  revealEls.forEach((el) => {
    // Si ya está en viewport (p. ej. sección 1 detrás del intro), revelar ya
    // para no mostrar el fondo crema vacío al cerrar el overlay.
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.75 &&
      rect.bottom > window.innerHeight * 0.25;

    if (inView) {
      el.classList.add('is-visible');
      if (el.classList.contains('draw-title')) animateDrawTitle(el);
    }

    revealObserver.observe(el);
  });
}
