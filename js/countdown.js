import { EVENT_DATE } from './config.js';

function pad(num) {
  return String(num).padStart(2, '0');
}

function updateField(el, newValue) {
  if (el.textContent !== newValue) {
    el.textContent = newValue;
    el.classList.remove('tick');
    void el.offsetWidth;
    el.classList.add('tick');
  }
}

export function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function tick() {
    const now = new Date();
    let diff = EVENT_DATE - now;

    if (diff <= 0) {
      updateField(daysEl, '00');
      updateField(hoursEl, '00');
      updateField(minsEl, '00');
      updateField(secsEl, '00');
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    const secs = Math.floor(diff / 1000);

    updateField(daysEl, pad(days));
    updateField(hoursEl, pad(hours));
    updateField(minsEl, pad(mins));
    updateField(secsEl, pad(secs));
  }

  tick();
  const timer = setInterval(tick, 1000);
}
