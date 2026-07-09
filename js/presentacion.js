function envolverPalabras(elemento, delayInicial, delayEntrePalabras) {
  const palabras = elemento.textContent.trim().split(/\s+/);
  elemento.innerHTML = palabras
    .map((palabra, i) => {
      const sep = i < palabras.length - 1 ? '&nbsp;' : '';
      return `<span style="animation-delay:${delayInicial + i * delayEntrePalabras}s">${palabra}${sep}</span>`;
    })
    .join('');
  elemento.classList.add('animar-palabras');
}

export function initPresentacionAnim() {
  const section = document.getElementById('presentacion');
  if (!section) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const name = document.getElementById('presentacion-name');
  const subtitle = document.getElementById('presentacion-subtitle');
  const line = document.getElementById('presentacion-line');
  const lineBottom = document.getElementById('presentacion-line-bottom');
  const guarda = document.getElementById('presentacion-guarda');
  const fecha = document.getElementById('presentacion-fecha');

  if (reduced) {
    name?.classList.add('animar');
    subtitle?.classList.add('animar');
    line?.classList.add('animar');
    lineBottom?.classList.add('animar');
    if (guarda) guarda.style.opacity = '1';
    if (fecha) fecha.style.opacity = '1';
    return;
  }

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      name?.classList.add('animar');
      subtitle?.classList.add('animar');
      line?.classList.add('animar');
      lineBottom?.classList.add('animar');
      if (guarda) envolverPalabras(guarda, 1.9, 0.1);
      if (fecha) envolverPalabras(fecha, 2.3, 0.1);

      animObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  animObserver.observe(section);
}
