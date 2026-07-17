/** Animación de títulos · letra por letra (repetible al reentrar en pantalla) */

function wrapLetters(el, text) {
  const cs = getComputedStyle(el);
  const displayText = cs.textTransform === 'uppercase' ? text.toUpperCase() : text;

  el.textContent = '';
  el.setAttribute('aria-label', text);

  [...displayText].forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'draw-letter';
    span.style.setProperty('--i', index);
    span.textContent = char === ' ' ? '\u00a0' : char;
    el.appendChild(span);
  });
}

export function animateDrawTitle(el) {
  if (el.classList.contains('draw-title--animating')) return;

  if (!el.dataset.drawOriginal) {
    el.dataset.drawOriginal = el.dataset.draw || el.textContent.trim();
  }
  const text = el.dataset.drawOriginal;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    el.textContent = text;
    el.setAttribute('aria-label', text);
    el.classList.add('draw-title--static');
    return;
  }

  wrapLetters(el, text);
  el.classList.add('draw-title--animating');
  requestAnimationFrame(() => {
    el.querySelectorAll('.draw-letter').forEach((letter) => {
      letter.classList.add('draw-letter--in');
    });
  });
}

/** Restaura el texto plano para que la próxima entrada en pantalla vuelva a dibujarlo. */
export function resetDrawTitle(el) {
  if (!el.classList.contains('draw-title--animating')) return;
  el.classList.remove('draw-title--animating');
  el.textContent = el.dataset.drawOriginal || el.textContent;
}
