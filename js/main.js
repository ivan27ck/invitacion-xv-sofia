import { initIntro } from './intro.js';
import { initMusicToggle } from './music.js';
import { initReveal } from './reveal.js';
import { initPresentacionAnim } from './presentacion.js';
import { initPadresPadrinos } from './padres-padrinos.js';
import { initCountdown } from './countdown.js';
import { initCarrusel } from './carrusel.js';
import { initItinerario2 } from './itinerario2.js';
import { initUbicaciones } from './ubicaciones.js';
import { initLluviaSobres } from './lluvia-sobres.js';
import { initConfirmacion } from './confirmacion.js';

// Fondo de la sección 1 se prepara temprano (sin flash crema).
// El nombre "Sofia" y sus textos animan recién cuando el overlay ya cerró.
initIntro({
  onBackdropReady() {
    document.querySelector('#presentacion .bg')?.classList.add('is-visible');
  },
  onOpen() {
    initReveal();
    initPresentacionAnim();
  },
});

initMusicToggle();
initPadresPadrinos();
initCountdown();
initCarrusel();
initItinerario2();
initUbicaciones();
initLluviaSobres();
initConfirmacion();
