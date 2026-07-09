/** Galería · marcos que aparecen uno por uno y se quedan */

const STEP_MS = 1100;

export function initGaleria() {
  const section = document.getElementById('galeria');
  if (!section) return;

  const frames = [...section.querySelectorAll('.g-frame')];
  if (!frames.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    frames.forEach((frame) => frame.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      frames.forEach((frame, i) => {
        setTimeout(() => frame.classList.add('is-in'), i * STEP_MS);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}
