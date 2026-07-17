/** Lluvia de sobres · entrada al estilo presentación */

export function initLluviaSobres() {
  const section = document.getElementById('lluvia-sobres');
  if (!section) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const title = section.querySelector('.ls__title');
  const sobreWrap = section.querySelector('.ls__sobre-wrap');
  const desc = section.querySelector('.ls__desc');

  if (reduced) {
    title?.classList.add('is-in');
    sobreWrap?.classList.add('is-in');
    desc?.classList.add('is-in');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const visible = entry.isIntersecting;
      title?.classList.toggle('is-in', visible);
      sobreWrap?.classList.toggle('is-in', visible);
      desc?.classList.toggle('is-in', visible);
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}
