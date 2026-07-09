import { animateDrawTitle } from './text-draw.js';

export function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('draw-title')) {
          animateDrawTitle(entry.target);
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  revealEls.forEach((el) => revealObserver.observe(el));
}
