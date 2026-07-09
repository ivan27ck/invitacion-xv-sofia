/** Fecha y hora del evento (hora local). */
export const EVENT_DATE = new Date('2026-11-14T19:00:00');

/**
 * Fotos de galería.
 * Para buena calidad: usa imágenes de al menos 800×800 px (ideal 1200 px o más).
 * Reemplaza los archivos en assets/galeria/ conservando el mismo nombre.
 * src2x es opcional (versión retina, el doble de tamaño).
 */
export const GALERIA_FOTOS = [
  { src: 'assets/galeria/download.jpg', alt: 'Sofia' },
  { src: 'assets/galeria/download (1).jpg', alt: 'Sofia' },
];

/** Itinerario del evento · edita horarios, textos e iconos (Font Awesome) */
export const ITINERARIO = [
  { time: '5:00 pm', title: 'Bienvenida', desc: 'Recepción de invitados en el jardín.', icon: 'fa-door-open' },
  { time: '5:30 pm', title: 'Ceremonia', desc: 'Misa de acción de gracias.', icon: 'fa-church' },
  { time: '6:30 pm', title: 'Sesión de fotos', desc: 'Retrato familiar y con amigos.', icon: 'fa-camera' },
  { time: '7:30 pm', title: 'Recepción', desc: 'Cóctel de bienvenida al salón.', icon: 'fa-champagne-glasses' },
  { time: '8:00 pm', title: 'Vals', desc: 'Entrada y baile sorpresa.', icon: 'fa-music', special: true },
  { time: '9:00 pm', title: 'Cena', desc: 'Se sirve el banquete.', icon: 'fa-utensils' },
  { time: '9:30 pm', title: 'Brindis', desc: 'Palabras y celebración.', icon: 'fa-wine-glass' },
  { time: '10:30 pm', title: 'Fiesta', desc: 'Pista abierta hasta el final.', icon: 'fa-star' },
];
