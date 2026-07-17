/** Padres y Padrinos · nombres apareciendo como magia, luego se desvanecen y aparece la invitación
 *  La secuencia completa se reinicia cada vez que la sección vuelve a entrar en pantalla. */

function envolverPalabras(elemento, delayInicial, delayEntrePalabras) {
  if (!elemento.dataset.original) {
    elemento.dataset.original = elemento.textContent.trim();
  }
  const palabras = elemento.dataset.original.split(/\s+/);
  elemento.innerHTML = palabras
    .map((palabra, i) => {
      const sep = i < palabras.length - 1 ? '&nbsp;' : '';
      return `<span style="animation-delay:${delayInicial + i * delayEntrePalabras}s">${palabra}${sep}</span>`;
    })
    .join('');
  elemento.classList.add('animar-palabras');
}

function restaurarMensaje(elemento) {
  if (!elemento || !elemento.dataset.original) return;
  elemento.classList.remove('animar-palabras', 'is-visible');
  elemento.textContent = elemento.dataset.original;
}

export function initPadresPadrinos() {
  const section = document.getElementById('padres-padrinos');
  if (!section) return;

  const mirror = document.getElementById('pp-mirror');
  if (!mirror) return;

  const names = document.getElementById('pp-names');
  const message = document.getElementById('pp-message');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    mirror.classList.add('is-in');
    message?.classList.add('is-visible');
    return;
  }

  let timers = [];
  const clearTimers = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers = [];
  };

  const play = () => {
    mirror.classList.add('is-in');

    if (names && message) {
      // Los 4 nombres terminan de aparecer ~5.5s después de is-in; se les da un respiro
      // para leerlos y luego se desvanecen como si el espejo los "guardara".
      timers.push(window.setTimeout(() => names.classList.add('pp-fade'), 7300));

      timers.push(
        window.setTimeout(() => {
          names.classList.add('pp-hidden');
          message.classList.add('is-visible');
          envolverPalabras(message, 0.1, 0.16);
        }, 8400),
      );
    }
  };

  const reset = () => {
    clearTimers();
    mirror.classList.remove('is-in');
    names?.classList.remove('pp-fade', 'pp-hidden');
    restaurarMensaje(message);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play();
        } else {
          reset();
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(mirror);

  mirror.querySelectorAll('.pp__sparkle').forEach((sparkle) => {
    let angle = Math.random() * 360;
    const radius = 6 + Math.random() * 10;

    const animate = () => {
      angle += 0.25;
      sparkle.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  });
}
