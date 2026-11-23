import { wedding, gallery } from './config.js';
import { initGallery } from './gallery.js';

const assetUrl = (path) => {
  if (!path || /[\\?#]/.test(path) || path.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(path) ||
      path.split('/').some((part) => {
        const decoded = decodeURIComponent(part);
        return decoded === '..' || /[/\\]/.test(decoded);
      })) {
    throw new Error(`Asset paths must be relative to assets/: ${path}`);
  }
  return `assets/${path}`;
};

const setText = (selector, value) => document.querySelectorAll(selector).forEach((el) => { el.textContent = value; });
for (const [key, event] of Object.entries({ reception: wedding.reception, muhurtham: wedding.muhurtham })) {
  for (const field of ['day', 'month', 'year', 'time']) setText(`[data-${key}-${field}]`, event[field]);
}
setText('[data-venue]', wedding.venue);
setText('[data-locality]', wedding.locality);
setText('[data-full-names]', `${wedding.groom} & ${wedding.bride}`);
document.querySelector('[data-maps]').href = wedding.mapsUrl;

let startWeddingMusic = () => {};
const invitationIntro = document.querySelector('#invitation-intro');
if (invitationIntro && typeof invitationIntro.showModal === 'function') {
  const envelope = invitationIntro.querySelector('.invitation-envelope');
  const skipIntro = invitationIntro.querySelector('.invitation-intro__skip');
  invitationIntro.addEventListener('close', () => invitationIntro.remove(), { once: true });
  const closeIntro = () => {
    if (invitationIntro.open) invitationIntro.close();
    else invitationIntro.remove();
  };
  const dismissOnEscape = (event) => {
    event.preventDefault();
    startWeddingMusic();
    closeIntro();
  };
  invitationIntro.addEventListener('cancel', dismissOnEscape);
  invitationIntro.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismissOnEscape(event);
  });
  envelope.addEventListener('click', () => {
    startWeddingMusic();
    if (invitationIntro.classList.contains('is-opening')) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return closeIntro();
    invitationIntro.classList.add('is-opening');
    envelope.disabled = true;
    skipIntro.disabled = true;
    window.setTimeout(closeIntro, 3800);
  });
  skipIntro.addEventListener('click', () => {
    startWeddingMusic();
    closeIntro();
  });
  invitationIntro.showModal();
}

// Artwork is chosen from each section's own shape, so a short landscape section on a portrait tablet
// still gets landscape art. Portrait art is used once a section is taller than 80% of its width.
const PORTRAIT_RATIO = 1.25;
// Beach artwork geometry (viewBox units) used to keep the animated shimmer on the painted waterline.
const beachArt = {
  desktop: { width: 1600, height: 1000, foam: 808, sea: 690 },
  mobile: { width: 600, height: 1000, foam: 795, sea: 730 },
};
const sceneElements = [];
for (const [selector, name] of [['.welcome', 'beach'], ['.save-date', 'mandapam'], ['.venue', 'countryside'], ['.final', 'botanical']]) {
  const scene = document.querySelector(selector);
  scene.style.setProperty('--scene-desktop', `url("${assetUrl(wedding.backgrounds[name])}")`);
  scene.style.setProperty('--scene-mobile', `url("${assetUrl(wedding.mobileBackgrounds[name])}")`);
  sceneElements.push(scene);
}
// Painted roof depth: 191 of 1000 viewBox units in mandapam.svg. In mandapam-mobile.svg the centre of
// the garland hangs lowest, at a fixed 154px (roof is 105px), so clear the garland there.
const MANDAPAM_ROOF = { desktop: 0.191, mobile: 154 };
const ROOF_GAP = 26;
function clearMandapamRoof(scene, width, height) {
  const content = scene.querySelector('.save-content');
  // Measure without the roof padding so the padding cannot feed back into the portrait decision.
  const restHeight = height - (parseFloat(getComputedStyle(content).paddingTop) || 0);
  const portrait = width / (restHeight + 110) < PORTRAIT_RATIO;
  let padding = MANDAPAM_ROOF.mobile + ROOF_GAP;
  if (!portrait) {
    const byWidth = (MANDAPAM_ROOF.desktop * 1000 * width) / 1600 + ROOF_GAP;
    padding = (restHeight + byWidth) / 1000 <= width / 1600
      ? byWidth
      : (MANDAPAM_ROOF.desktop * restHeight + ROOF_GAP) / (1 - MANDAPAM_ROOF.desktop);
  }
  scene.style.setProperty('--roof-clear', `${Math.ceil(padding)}px`);
  return portrait;
}
function fitScene(scene) {
  const width = scene.offsetWidth;
  const height = scene.offsetHeight;
  if (!width || !height) return;
  const portrait = scene.classList.contains('save-date')
    ? clearMandapamRoof(scene, width, height)
    : width / height < PORTRAIT_RATIO;
  scene.classList.toggle('is-portrait', portrait);
  if (!scene.classList.contains('welcome')) return;
  const art = portrait ? beachArt.mobile : beachArt.desktop;
  const scale = Math.max(width / art.width, height / art.height);
  const offset = (height - art.height * scale) / 2;
  scene.style.setProperty('--shore-foam', `${Math.round(offset + art.foam * scale)}px`);
  scene.style.setProperty('--shore-sea', `${Math.round(offset + art.sea * scale)}px`);
}
sceneElements.forEach(fitScene);
if ('ResizeObserver' in window) {
  const observer = new ResizeObserver((entries) => entries.forEach((entry) => fitScene(entry.target)));
  sceneElements.forEach((scene) => observer.observe(scene));
} else {
  window.addEventListener('resize', () => sceneElements.forEach(fitScene), { passive: true });
}

for (const [selector, path, className] of [
  ['.welcome', wedding.coupleBeach, 'beach-couple'],
  ['.save-date', wedding.coupleWedding, 'wedding-couple'],
  ['.final', wedding.couplePortrait, 'final-couple'],
]) {
  if (!path) continue;
  const image = document.createElement('img');
  image.className = `couple-art ${className}`;
  image.alt = '';
  image.src = assetUrl(path);
  image.addEventListener('error', () => console.error(`Unable to load artwork: ${path}`));
  const scene = document.querySelector(selector);
  scene.classList.add('has-couple-art');
  scene.append(image);
}
if (wedding.motorcycle) {
  const vehicle = document.createElement('div');
  vehicle.className = 'motorcycle';
  const image = document.createElement('img');
  image.src = assetUrl(wedding.motorcycle);
  image.alt = '';
  image.addEventListener('error', () => console.error(`Unable to load artwork: ${wedding.motorcycle}`));
  vehicle.append(image);
  document.querySelector('.venue').append(vehicle);
  document.querySelector('.venue').classList.add('has-motorcycle');
}

function startHeartShower() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
  const shower = document.createElement('div');
  shower.className = 'heart-shower';
  shower.setAttribute('aria-hidden', 'true');
  const colors = ['#b85c67', '#d8878e', '#bd985b', '#fff8e9'];
  const count = window.innerWidth < 600 ? 22 : 36;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-shower__heart';
    heart.textContent = '♥';
    const duration = 4.4 + Math.random() * 2.2;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--heart-size', `${12 + Math.random() * 13}px`);
    heart.style.setProperty('--heart-color', colors[Math.floor(Math.random() * colors.length)]);
    heart.style.setProperty('--heart-delay', `${-Math.random() * duration}s`);
    heart.style.setProperty('--heart-duration', `${duration}s`);
    heart.style.setProperty('--heart-drift', `${Math.round((Math.random() * 2 - 1) * 44)}px`);
    heart.style.setProperty('--heart-rotation', `${Math.round((Math.random() * 2 - 1) * 90)}deg`);
    shower.append(heart);
  }
  document.body.append(shower);
  const stopAtPageEnd = () => {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 2) return;
    shower.remove();
    window.removeEventListener('scroll', stopAtPageEnd);
    window.removeEventListener('resize', stopAtPageEnd);
  };
  window.addEventListener('scroll', stopAtPageEnd, { passive: true });
  window.addEventListener('resize', stopAtPageEnd, { passive: true });
  window.requestAnimationFrame(stopAtPageEnd);
}
startHeartShower();

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');
function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = open ? '×' : '☰';
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); } });
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
});

const countdown = document.querySelector('#countdown');
const target = Date.parse(wedding.muhurtham.iso);
let countdownTimer;
function updateCountdown() {
  if (!Number.isFinite(target)) {
    countdown.textContent = 'Countdown unavailable: invalid wedding date.';
    console.error('Invalid muhurtham date in config.js');
    return;
  }
  const remaining = Math.max(0, target - Date.now());
  if (!remaining) {
    window.clearInterval(countdownTimer);
    countdown.className = 'countdown-finished';
    countdown.removeAttribute('aria-label');
    countdown.textContent = 'Our forever has begun.';
    return;
  }
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
  countdown.setAttribute('aria-label', `${values.days} days, ${values.hours} hours, ${values.minutes} minutes and ${values.seconds} seconds until the muhurtham`);
  if (!countdown.children.length) {
    for (const name of Object.keys(values)) {
      const unit = document.createElement('div');
      unit.className = 'countdown-unit';
      const number = document.createElement('span');
      number.dataset.unit = name;
      const label = document.createElement('small');
      label.textContent = name;
      unit.append(number, label);
      countdown.append(unit);
    }
  }
  for (const [name, value] of Object.entries(values)) countdown.querySelector(`[data-unit="${name}"]`).textContent = String(value).padStart(2, '0');
}
updateCountdown();
if (Number.isFinite(target) && target > Date.now()) {
  countdownTimer = window.setInterval(updateCountdown, 1000);
}

function escapeIcs(value) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
function icsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}
document.querySelector('#calendar').addEventListener('click', () => {
  if (!Number.isFinite(target)) {
    window.alert('The calendar event is unavailable because the wedding date is invalid.');
    return;
  }
  const content = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Manoj and Dhanushri//Wedding Invitation//EN',
    'BEGIN:VEVENT', 'UID:manoj-dhanushri-muhurtham-20261214@wedding.local',
    `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(new Date(target))}`,
    `SUMMARY:${escapeIcs(`${wedding.names} - Muhurtham`)}`,
    `LOCATION:${escapeIcs(`${wedding.venue}, ${wedding.address}`)}`,
    `DESCRIPTION:${escapeIcs(`Muhurtham at ${wedding.muhurtham.time}. Time zone: Asia/Kolkata.`)}`,
    'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'manoj-dhanushri-muhurtham.ics';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
});

if (wedding.music) {
  const control = document.querySelector('#music-control');
  const audio = document.querySelector('#music');
  const button = control.querySelector('button');
  const error = document.querySelector('#music-error');
  control.hidden = false;
  audio.src = assetUrl(wedding.music);
  audio.loop = true;
  audio.preload = 'auto';
  const updateMusic = () => {
    button.setAttribute('aria-pressed', String(!audio.paused));
    button.textContent = audio.paused ? '♫' : 'Ⅱ';
  };
  const showMusicError = () => {
    error.hidden = false;
    error.textContent = 'Music could not be played.';
  };
  audio.addEventListener('play', updateMusic);
  audio.addEventListener('pause', updateMusic);
  audio.addEventListener('error', showMusicError);
  startWeddingMusic = () => {
    let playback;
    try {
      playback = audio.play();
    } catch (cause) {
      if (cause?.name !== 'NotAllowedError') showMusicError();
      return;
    }
    if (playback && typeof playback.then === 'function') {
      playback.then(() => { error.hidden = true; }).catch((cause) => {
        if (cause?.name !== 'NotAllowedError') showMusicError();
      });
    }
  };
  startWeddingMusic();
  button.addEventListener('click', () => {
    if (!audio.paused) { audio.pause(); return; }
    startWeddingMusic();
  });
}

if (gallery.entries.length) {
  const gallerySection = document.querySelector('#gallery');
  gallerySection.hidden = false;
  document.querySelector('[data-gallery-link]').hidden = false;
  setText('[data-closing-number]', '04');
  initGallery(gallerySection, gallery, assetUrl);
  const setGalleryVisibility = (visible) => {
    document.body.classList.toggle('gallery-in-view', visible);
    if (visible) {
      const top = gallerySection.getBoundingClientRect().top + window.scrollY;
      document.body.style.setProperty('--gallery-music-top', `${top}px`);
    } else {
      document.body.style.removeProperty('--gallery-music-top');
    }
  };
  if ('IntersectionObserver' in window) {
    const galleryObserver = new IntersectionObserver(([entry]) => {
      setGalleryVisibility(entry.isIntersecting);
    });
    galleryObserver.observe(gallerySection);
    window.addEventListener('resize', () => {
      if (document.body.classList.contains('gallery-in-view')) setGalleryVisibility(true);
    }, { passive: true });
  } else {
    const updateGalleryVisibility = () => {
      const bounds = gallerySection.getBoundingClientRect();
      setGalleryVisibility(bounds.bottom > 0 && bounds.top < window.innerHeight);
    };
    window.addEventListener('scroll', updateGalleryVisibility, { passive: true });
    window.addEventListener('resize', updateGalleryVisibility, { passive: true });
    updateGalleryVisibility();
  }
}

if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    window.gsap.from('.hero-reveal', { opacity: 0, y: 22, duration: 1.1, stagger: 0.16, ease: 'power2.out', delay: 0.2 });
    document.querySelectorAll('.reveal-group').forEach((group) => {
      window.gsap.from(group.children, { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: group, start: 'top 83%', once: true } });
    });
    if (wedding.motorcycle) {
      const vehicle = document.querySelector('.motorcycle');
      window.gsap.timeline({
        scrollTrigger: { trigger: '.venue', start: 'top 80%', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
      })
        .fromTo(vehicle, { x: () => -window.innerWidth - vehicle.offsetWidth, autoAlpha: 0 }, { x: () => window.innerWidth + vehicle.offsetWidth, duration: 5, ease: 'power1.inOut' }, 0)
        .to(vehicle, { autoAlpha: 1, duration: 0.6 }, 0)
        .to(vehicle, { autoAlpha: 0, duration: 0.8 }, 4.2);
    }
  });
}
