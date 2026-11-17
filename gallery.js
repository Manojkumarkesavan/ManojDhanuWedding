let gallerySequence = 0;
const instances = new WeakMap();
const orientations = new Set(['portrait', 'landscape', 'square']);
const svgPaths = {
 leaf: 'M20 4C12 2 3 6 4 14c1 7 11 8 15 1 2-4 1-8 1-11ZM4 21 16 9',
 camera: 'M14 4h-4L8 7H3v13h18V7h-5ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
 close: 'm6 6 12 12M6 18 18 6',
 previous: 'm15 5-7 7 7 7',
 next: 'm9 5 7 7-7 7',
};

function element(tag, className, text) {
 const node = document.createElement(tag);
 if (className) node.className = className;
 if (text !== undefined) node.textContent = text;
 return node;
}

function icon(name) {
 const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 svg.setAttribute('viewBox', '0 0 24 24');
 svg.setAttribute('width', '28');
 svg.setAttribute('height', '28');
 svg.setAttribute('fill', 'none');
 svg.setAttribute('stroke', 'currentColor');
 svg.setAttribute('stroke-width', '1.2');
 svg.setAttribute('stroke-linecap', 'round');
 svg.setAttribute('stroke-linejoin', 'round');
 svg.setAttribute('aria-hidden', 'true');
 const path = document.createElementNS(svg.namespaceURI, 'path');
 path.setAttribute('d', svgPaths[name]);
 svg.append(path);
 return svg;
}

function button(className, label, iconName) {
 const node = element('button', className, iconName ? undefined : label);
 node.type = 'button';
 if (iconName) {
 node.setAttribute('aria-label', label);
 node.append(icon(iconName));
 }
 return node;
}

function localSource(path, assetUrl) {
 if (typeof path !== 'string' || !path.trim() || /[\\?#]/.test(path)) {
 throw new TypeError('Gallery images must use a local public-directory path.');
 }
 const relative = path.replace(/^\/+/, '');
 if (!relative || path.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(relative) ||
 relative.split('/').some((part) => {
 const decoded = decodeURIComponent(part);
 return decoded === '..' || /[/\\]/.test(decoded);
 })) {
 throw new TypeError(`Invalid local gallery image path: ${path}`);
 }
 const resolved = assetUrl(path);
 const url = new URL(resolved, document.baseURI);
 if (typeof resolved !== 'string' || !resolved.trim() ||
 url.origin !== window.location.origin || !['http:', 'https:', 'file:'].includes(url.protocol)) {
 throw new TypeError('The gallery asset resolver must return a local URL.');
 }
 return url.href;
}

/**
 * Mount a dependency-free gallery. Categories and entries follow src/data/gallery.ts.
 * Optional heading, subtitle, label and closingLine override the original copy.
 * Returns a cleanup function; initializing the same section again cleans it up first.
 */
export function initGallery(root, config, assetUrl) {
 if (!(root instanceof HTMLElement) || root.tagName !== 'SECTION') {
 throw new TypeError('initGallery requires a section element.');
 }
 if (!config || !Array.isArray(config.categories) || !Array.isArray(config.entries) ||
 typeof assetUrl !== 'function') {
 throw new TypeError('initGallery requires categories, entries and an assetUrl function.');
 }
 const ids = new Set();
 for (const entry of config.entries) {
 if (!entry || typeof entry.id !== 'string' || ids.has(entry.id) ||
 typeof entry.category !== 'string' || typeof entry.alt !== 'string' ||
 !Number.isFinite(entry.displayOrder) || !orientations.has(entry.orientation)) {
 throw new TypeError('Gallery entries require unique IDs, category, alt, displayOrder and orientation.');
 }
 ids.add(entry.id);
 }
 const categoryIds = new Set();
 for (const category of config.categories) {
 if (!category || typeof category.id !== 'string' || typeof category.label !== 'string' ||
 categoryIds.has(category.id)) {
 throw new TypeError('Gallery categories require unique IDs and labels.');
 }
 categoryIds.add(category.id);
 }

 instances.get(root)?.();
 const prefix = `vanilla-gallery-${++gallerySequence}`;
 const events = new AbortController();
 const listen = (node, type, callback, options = {}) =>
 node.addEventListener(type, callback, { ...options, signal: events.signal });
 const entries = [...config.entries].sort((a, b) => a.displayOrder - b.displayOrder);
 const categories = config.categories.filter((category) =>
 entries.some((entry) => entry.category === category.id));
 const oldLabel = root.getAttribute('aria-labelledby');
 const hadClass = root.classList.contains('wedding-gallery');
 root.classList.add('wedding-gallery');
 root.setAttribute('aria-labelledby', `${prefix}-heading`);

 const inner = element('div', 'gallery-inner');
 const header = element('header', 'gallery-header');
 header.dataset.galleryReveal = '';
 const ornament = element('span', 'gallery-ornament');
 ornament.append(icon('leaf'));
 const heading = element('h2', '', config.heading ?? 'Moments Before Forever');
 heading.id = `${prefix}-heading`;
 header.append(
 ornament,
 element('p', 'gallery-eyebrow', config.label ?? 'Our Pre-Wedding Memories'),
 heading,
 element('p', '', config.subtitle ??
 'A little glimpse into our journey, the laughter, the love and the memories we\u2019ll cherish forever.'),
 );
 const filters = element('div', 'gallery-filters');
 filters.setAttribute('role', 'group');
 filters.setAttribute('aria-label', 'Filter photographs');
 const status = element('p', 'gallery-sr-only');
 status.setAttribute('role', 'status');
 status.setAttribute('aria-atomic', 'true');
 const results = element('div', 'gallery-results');
 results.id = `${prefix}-results`;
 const closing = element('p', 'gallery-closing', config.closingLine ??
 'Every picture holds a memory. Every memory brings us closer to forever.');
 closing.dataset.galleryReveal = '';
 inner.append(header, filters, status, results, closing);
 root.replaceChildren(inner);

 const modal = element('dialog', 'gallery-lightbox');
 modal.setAttribute('aria-modal', 'true');
 modal.setAttribute('aria-labelledby', `${prefix}-viewer-title`);
 modal.setAttribute('aria-describedby', `${prefix}-instructions`);
 const dialog = element('div', 'gallery-lightbox__dialog');
 const title = element('h2', 'gallery-sr-only', 'Wedding photograph viewer');
 title.id = `${prefix}-viewer-title`;
 const instructions = element('p', 'gallery-sr-only',
 'Use the left and right arrow keys or swipe to browse. Press Escape to close.');
 instructions.id = `${prefix}-instructions`;
 const toolbar = element('div', 'gallery-lightbox__toolbar');
 const counter = element('span', 'gallery-lightbox__counter');
 counter.setAttribute('aria-live', 'polite');
 counter.setAttribute('aria-atomic', 'true');
 const closeButton = button('gallery-icon-button', 'Close photograph viewer', 'close');
 closeButton.autofocus = true;
 toolbar.append(counter, closeButton);
 const stage = element('div', 'gallery-lightbox__stage');
 const previous = button('gallery-icon-button gallery-lightbox__previous', 'Previous photograph', 'previous');
 const next = button('gallery-icon-button gallery-lightbox__next', 'Next photograph', 'next');
 const figure = element('figure', 'gallery-lightbox__figure');
 const imageWrap = element('div', 'gallery-lightbox__image-wrap');
 const caption = element('figcaption', 'gallery-lightbox__caption');
 caption.setAttribute('aria-live', 'polite');
 caption.setAttribute('aria-atomic', 'true');
 figure.append(imageWrap, caption);
 stage.append(previous, figure, next);
 dialog.append(title, instructions, toolbar, stage);
 modal.append(dialog);
 document.body.append(modal);

 let visible = entries;
 let activeIndex = 0;
 let opener = null;
 let overflow = '';
 let overflowPriority = '';
 let scrollLocked = false;
 let imageRequest = 0;
 let touchStart = null;
 let revealContext = null;
 let destroyed = false;
 const filterCategories = new Map();
 const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

 function report(error, entry, kind) {
 console.error(`Gallery ${kind} failed${entry ? ` (${entry.id})` : ''}:`, error);
 }

 function addWatermark(container, entry) {
 const text = entry.watermark ?? config.watermark;
 if (!text) return;
 const watermark = element('span', 'gallery-watermark', text);
 watermark.setAttribute('aria-hidden', 'true');
 container.append(watermark);
 }

 function stopReveals() {
 revealContext?.revert();
 revealContext = null;
 }

 function reveal() {
 stopReveals();
 const gsap = window.gsap;
 const plugin = window.ScrollTrigger || gsap?.plugins?.ScrollTrigger;
 if (motion?.matches || !gsap?.context || !gsap?.fromTo || !plugin) return;
 try {
 gsap.registerPlugin(plugin);
 revealContext = gsap.context(() => {
 root.querySelectorAll('[data-gallery-reveal]').forEach((node) => {
 const photograph = node.classList.contains('gallery-card');
 gsap.fromTo(node, {
 autoAlpha: 0,
 y: 24,
 ...(photograph ? { clipPath: 'inset(0 0 100% 0)' } : {}),
 }, {
 autoAlpha: 1,
 y: 0,
 duration: 0.8,
 ease: 'power2.out',
 ...(photograph ? { clipPath: 'inset(0 0 0% 0)' } : {}),
 scrollTrigger: { trigger: node, start: 'top 94%', once: true },
 });
 });
 }, root);
 } catch (error) {
 stopReveals();
 root.querySelectorAll('[data-gallery-reveal]').forEach((node) => {
 ['opacity', 'visibility', 'transform', 'clip-path'].forEach((property) => node.style.removeProperty(property));
 });
 report(error, null, 'animation');
 }
 }

 function restorePage() {
 if (!scrollLocked) return;
 scrollLocked = false;
 imageRequest++;
 imageWrap.replaceChildren();
 document.body.style.setProperty('overflow', overflow, overflowPriority);
 if (opener?.isConnected) opener.focus({ preventScroll: true });
 opener = null;
 touchStart = null;
 }

 function close() {
 if (modal.open) modal.close();
 restorePage();
 }

 function showImage() {
 const request = ++imageRequest;
 const entry = visible[activeIndex];
 imageWrap.replaceChildren();
 imageWrap.setAttribute('aria-busy', 'true');
 counter.textContent = `${activeIndex + 1} / ${visible.length}`;
 caption.textContent = entry.caption || entry.alt;
 previous.hidden = next.hidden = visible.length < 2;
 const loading = element('span', 'gallery-lightbox__loading', 'Loading photograph');
 loading.setAttribute('role', 'status');
 imageWrap.append(loading);
 const image = element('img');
 image.alt = entry.alt;
 image.draggable = false;
 image.decoding = 'async';
 const fail = (error) => {
 if (request !== imageRequest) return;
 imageWrap.setAttribute('aria-busy', 'false');
 const message = element('p', 'gallery-lightbox__error',
 'This photograph could not be loaded. Please try another photograph or close the viewer and try again.');
 message.setAttribute('role', 'alert');
 imageWrap.replaceChildren(message);
 report(error, entry, 'photograph');
 };
 image.onload = () => {
 if (request !== imageRequest) return;
 loading.remove();
 imageWrap.setAttribute('aria-busy', 'false');
 };
 image.onerror = () => fail(new Error('Image could not be loaded.'));
 try {
 const source = localSource(entry.image, assetUrl);
 imageWrap.append(image);
 addWatermark(imageWrap, entry);
 image.src = source;
 } catch (error) {
 fail(error);
 }
 }

 function open(index, trigger) {
 opener = trigger;
 activeIndex = index;
 overflow = document.body.style.getPropertyValue('overflow');
 overflowPriority = document.body.style.getPropertyPriority('overflow');
 try {
 modal.showModal();
 scrollLocked = true;
 document.body.style.setProperty('overflow', 'hidden');
 showImage();
 closeButton.focus({ preventScroll: true });
 } catch (error) {
 close();
 status.textContent = 'The photograph viewer could not be opened.';
 report(error, visible[index], 'viewer');
 }
 }

 function navigate(direction) {
 if (visible.length < 2) return;
 activeIndex = (activeIndex + direction + visible.length) % visible.length;
 showImage();
 }

 function render(categoryId) {
 close();
 stopReveals();
 visible = entries.filter((entry) => categoryId === null || entry.category === categoryId);
 filters.querySelectorAll('button').forEach((filter) => {
 filter.setAttribute('aria-pressed', String(filterCategories.get(filter) === categoryId));
 });
 status.textContent = `${visible.length} ${visible.length === 1 ? 'photograph' : 'photographs'} shown.`;
 results.replaceChildren();
 if (!visible.length) {
 const empty = element('div', 'gallery-empty');
 empty.dataset.galleryReveal = '';
 const camera = element('span', 'gallery-empty__icon');
 camera.append(icon('camera'));
 empty.append(camera,
 element('p', 'gallery-eyebrow', 'A story still unfolding'),
 element('h3', '', entries.length ? 'More moments to discover' : 'Our memories are on their way'),
 element('p', '', entries.length
 ? 'There are no photographs in this collection yet. Explore All Moments for a little more of our story.'
 : 'Our pre-wedding photographs will be shared here soon: the laughter, the love, and all the moments in between.'),
 icon('leaf'));
 results.append(empty);
 } else {
 const grid = element('div', 'gallery-grid');
 visible.forEach((entry, index) => {
 const card = element('figure',
 `gallery-card gallery-card--${entry.orientation}${entry.featured ? ' gallery-card--featured' : ''}`);
 card.dataset.galleryReveal = '';
 const trigger = button('gallery-card__button', `Open photograph: ${entry.alt}`);
 trigger.textContent = '';
 trigger.setAttribute('aria-label', `Open photograph: ${entry.alt}`);
 trigger.setAttribute('aria-haspopup', 'dialog');
 trigger.dataset.galleryIndex = String(index);
 trigger.style.aspectRatio = Number.isFinite(entry.width) && entry.width > 0 &&
 Number.isFinite(entry.height) && entry.height > 0
 ? `${entry.width} / ${entry.height}`
 : { portrait: '3 / 4', landscape: '4 / 3', square: '1 / 1' }[entry.orientation];
 const image = element('img');
 image.alt = entry.alt;
 image.loading = 'lazy';
 image.decoding = 'async';
 image.draggable = false;
 if (Number.isFinite(entry.width) && entry.width > 0) image.width = entry.width;
 if (Number.isFinite(entry.height) && entry.height > 0) image.height = entry.height;
 const fail = (error) => {
 image.remove();
 if (trigger.querySelector('.gallery-card__unavailable')) return;
 const message = element('span', 'gallery-card__unavailable', 'Preview unavailable. Open photograph.');
 message.setAttribute('role', 'img');
 message.setAttribute('aria-label', `${entry.alt}. Preview unavailable. Open photograph.`);
 trigger.prepend(message);
 report(error, entry, 'thumbnail');
 };
 image.onerror = () => fail(new Error('Thumbnail could not be loaded.'));
 trigger.append(image);
 addWatermark(trigger, entry);
 const expand = element('span', 'gallery-card__expand');
 expand.setAttribute('aria-hidden', 'true');
 expand.append(icon('expand'));
 trigger.append(expand);
 card.append(trigger);
 if (entry.caption) card.append(element('figcaption', 'gallery-card__caption', entry.caption));
 grid.append(card);
 try {
 image.src = localSource(entry.thumbnail, assetUrl);
 } catch (error) {
 fail(error);
 }
 });
 results.append(grid);
 }
 reveal();
 }

 for (const category of [{ id: null, label: 'All Moments' }, ...categories]) {
 const filter = button('gallery-filter', category.label);
 filterCategories.set(filter, category.id);
 filter.setAttribute('aria-controls', results.id);
 listen(filter, 'click', () => render(category.id));
 filters.append(filter);
 }
 listen(results, 'click', (event) => {
 const trigger = event.target.closest('.gallery-card__button');
 if (trigger && results.contains(trigger)) open(Number(trigger.dataset.galleryIndex), trigger);
 });
 listen(closeButton, 'click', close);
 listen(previous, 'click', () => navigate(-1));
 listen(next, 'click', () => navigate(1));
 listen(modal, 'cancel', (event) => { event.preventDefault(); close(); });
 listen(modal, 'close', () => { if (!modal.open) restorePage(); });
 listen(modal, 'click', (event) => { if (event.target === modal) close(); });
 listen(modal, 'keydown', (event) => {
 if (event.key === 'Escape') {
 event.preventDefault();
 close();
 } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
 event.preventDefault();
 navigate(event.key === 'ArrowLeft' ? -1 : 1);
 } else if (event.key === 'Tab') {
 const controls = [...modal.querySelectorAll('button')].filter((control) => !control.hidden);
 const first = controls[0];
 const last = controls[controls.length - 1];
 if (event.shiftKey && document.activeElement === first) {
 event.preventDefault();
 last.focus();
 } else if (!event.shiftKey && document.activeElement === last) {
 event.preventDefault();
 first.focus();
 }
 }
 });
 listen(stage, 'touchstart', (event) => {
 const touch = event.touches.length === 1 ? event.touches[0] : null;
 touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
 }, { passive: true });
 listen(stage, 'touchcancel', () => { touchStart = null; }, { passive: true });
 listen(stage, 'touchend', (event) => {
 const start = touchStart;
 touchStart = null;
 const touch = event.changedTouches[0];
 if (!start || !touch || event.touches.length) return;
 const dx = touch.clientX - start.x;
 const dy = touch.clientY - start.y;
 if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) navigate(dx < 0 ? 1 : -1);
 }, { passive: true });
 for (const type of ['contextmenu', 'dragstart', 'copy', 'cut']) {
 listen(root, type, (event) => {
 const target = event.target;
 const selection = document.getSelection();
 const anchor = selection?.anchorNode;
 const anchorElement = anchor?.nodeType === Node.ELEMENT_NODE ? anchor : anchor?.parentElement;
 if ((target instanceof Element && target.closest('.gallery-card')) ||
 ((type === 'copy' || type === 'cut') && anchorElement?.closest('.gallery-card') &&
 root.contains(anchorElement))) event.preventDefault();
 });
 listen(modal, type, (event) => event.preventDefault());
 }
 if (motion) listen(motion, 'change', reveal);

 function destroy() {
 if (destroyed) return;
 destroyed = true;
 close();
 stopReveals();
 events.abort();
 modal.remove();
 inner.remove();
 if (!hadClass) root.classList.remove('wedding-gallery');
 if (oldLabel === null) root.removeAttribute('aria-labelledby');
 else root.setAttribute('aria-labelledby', oldLabel);
 instances.delete(root);
 }
 instances.set(root, destroy);
 render(null);
 return destroy;
}