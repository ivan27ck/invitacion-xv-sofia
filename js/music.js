/** Botón flotante para pausar/reproducir la música de fondo. */
export function initMusicToggle() {
  const button = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-audio');
  if (!button || !audio) return;

  const icon = button.querySelector('i');

  const setPlayingState = (isPlaying) => {
    button.classList.toggle('is-playing', isPlaying);
    button.setAttribute('aria-pressed', String(isPlaying));
    button.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');

    if (icon) {
      icon.classList.toggle('fa-pause', isPlaying);
      icon.classList.toggle('fa-play', !isPlaying);
    }
  };

  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {
        /* Algunos navegadores bloquean el audio; el botón vuelve a mostrar "play". */
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));

  setPlayingState(!audio.paused);
}
