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
 setText(`[data-${key}-date]`, `${event.day} ${event.month} ${event.year}`);
}
setText('[data-header-date]', `${wedding.muhurtham.day} ${wedding.muhurtham.month.toUpperCase()} ${wedding.muhurtham.year}`);
setText('[data-hero-date]', `${wedding.reception.month.toUpperCase()} ${wedding.reception.day} & ${wedding.muhurtham.day}, ${wedding.muhurtham.year}`);
setText('[data-final-date]', `${wedding.reception.day} & ${wedding.muhurtham.day} ${wedding.muhurtham.month.toUpperCase()} ${wedding.muhurtham.year} ✦ CHENNAI`);
setText('[data-venue]', wedding.venue);
setText('[data-locality]', wedding.locality);
setText('[data-names]', wedding.names);
setText('[data-full-names]', `${wedding.groom} & ${wedding.bride}`);
document.querySelector('[data-maps]').href = wedding.mapsUrl;

for (const [selector, name] of [['.welcome', 'beach'], ['.save-date', 'mandapam'], ['.venue', 'countryside'], ['.forever', 'botanical'], ['.final', 'botanical']]) {
 document.querySelector(selector).style.backgroundImage = `url("${assetUrl(wedding.backgrounds[name])}")`;
}

for (const [selector, path, className] of [
 ['.welcome', wedding.coupleBeach, 'beach-couple'],
 ['.save-date', wedding.coupleWedding, 'wedding-couple'],
 ['.forever', wedding.couplePortrait, 'forever-couple'],
 ['.final', wedding.couplePortrait, 'final-couple'],
]) {
 if (!path) continue;
 const image = document.createElement('img');
 image.className = `couple-art ${className}`;
 image.alt = '';
 image.src = assetUrl(path);
 image.addEventListener('error', () => console.error(`Unable to load artwork: ${path}`));
 document.querySelector(selector).append(image);
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
}

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

const countdown = document.querySelector('#countdown');
const target = Date.parse(wedding.muhurtham.iso);
function updateCountdown() {
 if (!Number.isFinite(target)) {
 countdown.textContent = 'Countdown unavailable: invalid wedding date.';
 console.error('Invalid muhurtham date in config.js');
 return;
 }
 const remaining = Math.max(0, target - Date.now());
 if (!remaining) {
 countdown.className = 'countdown-finished';
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
window.setInterval(updateCountdown, 1000);

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
 const updateMusic = () => {
 button.setAttribute('aria-pressed', String(!audio.paused));
 button.setAttribute('aria-label', audio.paused ? 'Play music' : 'Pause music');
 button.textContent = audio.paused ? '♫' : 'Ⅱ';
 };
 audio.addEventListener('play', updateMusic);
 audio.addEventListener('pause', updateMusic);
 audio.addEventListener('error', () => { error.hidden = false; error.textContent = 'Music could not be played.'; });
 button.addEventListener('click', async () => {
 if (!audio.paused) { audio.pause(); return; }
 try { await audio.play(); error.hidden = true; }
 catch { error.hidden = false; error.textContent = 'Music could not be played.'; }
 });
}

initGallery(document.querySelector('#gallery'), gallery, assetUrl);

if (window.gsap && window.ScrollTrigger) {
 window.gsap.registerPlugin(window.ScrollTrigger);
 window.gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
 window.gsap.from('.hero-reveal', { opacity: 0, y: 22, duration: 1.1, stagger: 0.16, ease: 'power2.out', delay: 0.2 });
 document.querySelectorAll('.reveal-group').forEach((group) => {
 window.gsap.from(group.children, { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: group, start: 'top 83%', once: true } });
 });
 if (wedding.motorcycle) {
 window.gsap.fromTo('.motorcycle', { x: '-120vw', opacity: 0 }, { x: '120vw', opacity: 1, ease: 'power1.inOut', scrollTrigger: { trigger: '.venue', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
 window.gsap.to('.motorcycle', { opacity: 0, scrollTrigger: { trigger: '.venue', start: 'center center', end: 'bottom top', scrub: true } });
 }
 });
}