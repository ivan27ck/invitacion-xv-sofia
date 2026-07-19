/**
 * Pantalla de bienvenida: el sobre se debe abrir con un click para
 * revelar la invitación y activar la música de fondo.
 *
 * @param {{ onBackdropReady?: () => void, onOpen?: () => void } | (() => void)} [hooks]
 *   - onBackdropReady: al empezar a abrir (para mostrar el fondo y evitar el flash crema)
 *   - onOpen: cuando el overlay ya terminó (para animar el nombre y textos)
 */
export function initIntro(hooks = {}) {
  const { onBackdropReady, onOpen } =
    typeof hooks === 'function' ? { onOpen: hooks } : hooks;

  const intro = document.getElementById('intro');
  const envelope = document.getElementById('intro-envelope');
  const audio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');

  if (!intro || !envelope) {
    onBackdropReady?.();
    onOpen?.();
    return;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let opened = false;
  let backdropReady = false;
  let invitationReady = false;

  const unlockScroll = () => {
    document.documentElement.classList.remove('intro-locked');
    document.body.classList.remove('intro-locked');
  };

  /** Muestra el fondo de la sección 1 (sin animar aún el nombre). */
  const prepareBackdrop = () => {
    if (backdropReady) return;
    backdropReady = true;
    onBackdropReady?.();
  };

  /** Arranca animaciones de textos cuando ya se ve la invitación. */
  const revealInvitation = () => {
    if (invitationReady) return;
    invitationReady = true;
    onOpen?.();
  };

  const finishIntro = () => {
    intro.setAttribute('hidden', '');
    intro.setAttribute('aria-hidden', 'true');
    unlockScroll();
    musicToggle?.classList.add('is-visible');
    revealInvitation();
  };

  const openInvitation = () => {
    if (opened) return;
    opened = true;

    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.3;
      audio.play().catch(() => {
        /* Algunos navegadores bloquean el audio; no es crítico. */
      });
    }

    envelope.disabled = true;
    envelope.setAttribute('aria-hidden', 'true');
    envelope.setAttribute('tabindex', '-1');

    if (reduced) {
      prepareBackdrop();
      envelope.classList.add('is-vanishing');
      intro.classList.add('is-opening', 'is-closing');
      setTimeout(finishIntro, 450);
      return;
    }

    envelope.classList.add('is-pressed');

    setTimeout(() => {
      envelope.classList.remove('is-pressed');
      envelope.classList.add('is-vanishing');
      intro.classList.add('is-opening');
      // Fondo listo detrás del destello (evita el flash crema), pero el nombre
      // todavía no anima: eso espera a finishIntro.
      prepareBackdrop();
    }, 320);

    setTimeout(() => {
      intro.classList.add('is-closing');
    }, 320 + 900);

    setTimeout(finishIntro, 320 + 900 + 900);
  };

  envelope.addEventListener('click', openInvitation);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openInvitation();
    }
  });
}
