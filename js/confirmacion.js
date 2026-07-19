import { CONFIRM_FORM_URL } from './config.js';

/** Confirmación de asistencia · animaciones y enlace a Google Forms */
export function initConfirmacion() {
  const section = document.getElementById('confirmacion');
  if (!section) return;

  const card = section.querySelector('.cf__card');
  const button = section.querySelector('.cf__btn');
  const shine = section.querySelector('.cf__shine');
  const sparkles = section.querySelectorAll('.cf__sparkle');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (button) {
    if (CONFIRM_FORM_URL) {
      button.href = CONFIRM_FORM_URL;
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      button.removeAttribute('aria-disabled');
    } else {
      button.href = '#';
      button.removeAttribute('target');
      button.removeAttribute('rel');
      button.setAttribute('aria-disabled', 'true');
      button.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  }

  if (!card) return;

  if (reduced) {
    card.classList.add('is-in');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        card.classList.toggle('is-in', entry.isIntersecting);
      });
    },
    { threshold: 0.25 },
  );

  observer.observe(card);

  if (shine) {
    const runShine = () => {
      shine.style.animation = 'none';
      void shine.offsetWidth;
      shine.style.animation = 'cf-shine 1.2s ease';
    };
    setInterval(runShine, 6000);
  }

  if (button) {
    button.addEventListener('click', (e) => {
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');

      circle.className = 'cf__ripple';
      circle.style.width = `${diameter}px`;
      circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;

      button.querySelector('.cf__ripple')?.remove();
      button.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove(), { once: true });
    });
  }

  sparkles.forEach((sparkle) => {
    let angle = Math.random() * 360;
    const radius = 10 + Math.random() * 18;

    const animate = () => {
      angle += 0.3;
      sparkle.style.transform = `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  });
}
