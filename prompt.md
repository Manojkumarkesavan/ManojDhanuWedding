# Master Prompt: Recreate the "Manoj ❤️ Dhanushri" HTML Wedding Invitation

Give this whole document to an AI coding assistant, or follow it yourself. It describes every file in the `WeddingHTML/` folder, the exact content, layout values and behaviour, and every bug found and fixed during development. The result must be a static, frontend-only site that works the first time.

---

## 0. Role and goal

You are a senior frontend engineer and illustrator-minded designer. Build a **premium, cinematic, illustrated South Indian wedding invitation** as a **plain static website**: HTML, CSS and vanilla ES-module JavaScript. Use no framework, no build step, no package manager and no backend.

The site must feel like connected scenes from one illustrated film, not a template or a stack of cards. It is mainly opened from WhatsApp on phones (iPhone Safari, Android Chrome), so it is **mobile-first**, but it must look intentional on tablets, laptops and 2560px monitors.

Deliver **every file listed in §3** with complete content. Do not leave stubs, "TODO: implement" functions or placeholder lorem ipsum. Optional assets the couple has not supplied yet are configured as `null` and must hide gracefully (see §4).

> **Planned features:** §15 has prompts for three features that are **not built yet**: a story timeline, an envelope or curtain opening, and a celebration effect. Do **not** implement them while recreating the site. Use those prompts only when the couple asks for a feature, and implement one feature per request.

---

## 1. Hard constraints

1. **Frontend only.** No Node/Express/Spring server, database, Firebase, Supabase, S3, Cloudinary, auth, upload dashboard or server API.
2. **Local assets only.** Fonts, GSAP, artwork, music and photos all live inside the folder. No CDN links, including Google Fonts and unpkg.
3. **Deployable to any static host** (Netlify, Vercel, GitHub Pages, S3 static, a subdirectory). Use only **relative** URLs and never a leading `/`.
4. **Allowed third-party code:** GSAP 3 core and the ScrollTrigger plugin, copied into `vendor/` with license headers kept. Nothing else.
5. **Never invent personal data:** no parents' names, phone numbers, RSVP numbers, coordinates, place IDs or family details. If something is missing, hide the feature.
6. **Never fabricate gallery photos.** Use no stock or AI images in the gallery. If no photos are configured, the gallery section stays hidden.
7. **Honesty about protection:** the copy-deterrents only discourage casual saving. Never claim screenshots are blocked.
8. **Accessibility:** semantic landmarks, a skip link, visible focus, 44px or larger touch targets, `aria` attributes on interactive widgets, `prefers-reduced-motion` support, and fully readable content if JS animation fails.

---

## 2. Wedding content (use exactly)

| Field | Value |
|---|---|
| Groom (full) | K. Manojkumar |
| Bride (full) | S. V. Dhanushri |
| Display names | Manoj & Dhanushri (headline shows "Manoj / weds / Dhanushri") |
| Reception | 13 December 2026, 6:30 PM onwards |
| Muhurtham | 14 December 2026, 6:30 AM onwards, ISO `2026-12-14T06:30:00+05:30` |
| Venue | Sri Lakshmi Aandal Maaligai |
| Locality | Chromepet, Chennai |
| Address (calendar) | Chromepet, Chennai, Tamil Nadu, India |
| Time zone | Asia/Kolkata (+05:30) |
| Maps URL | `https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Aandal+Maaligai%2C+Chromepet%2C+Chennai%2C+Tamil+Nadu%2C+India` (a search URL, not invented coordinates) |

**No-repetition rule.** Each fact appears in exactly one scene:
- Names appear only in Welcome.
- Dates, the countdown and the calendar appear only in Save the Date.
- The venue appears only in Venue.
- The closing scene is message-only.

Do not add a separate "Event details" section that repeats dates or venue.

---

## 3. File tree (create all of these)

```
WeddingHTML/
├── index.html
├── styles.css
├── main.js                  (ES module, entry point)
├── config.js                (ES module, all editable content)
├── gallery.js               (ES module, exports initGallery)
├── gallery.css
├── README.md                (run, deploy, configure, artwork guidance, illustration prompts)
├── prompt.md                (this document)
├── vendor/
│   ├── gsap.min.js          (GSAP 3.x, UMD build, exposes window.gsap)
│   └── ScrollTrigger.min.js (exposes window.ScrollTrigger)
└── assets/
    ├── fonts/
    │   ├── cormorant-garamond-latin.woff2          (variable, normal, weights 400–500)
    │   ├── cormorant-garamond-italic-latin.woff2   (italic 400)
    │   ├── playfair-display-latin.woff2            (normal 400)
    │   ├── great-vibes-latin.woff2                 (normal 400)
    │   ├── OFL-cormorantgaramond.txt
    │   ├── OFL-playfairdisplay.txt
    │   └── OFL-greatvibes.txt
    ├── images/
    │   ├── backgrounds/
    │   │   ├── beach.svg              beach-mobile.svg
    │   │   ├── mandapam.svg           mandapam-mobile.svg
    │   │   ├── countryside.svg        countryside-mobile.svg
    │   │   └── botanical.svg          botanical-mobile.svg
    │   └── couple/.gitkeep            (future couple and motorcycle art)
    ├── gallery/{featured,prewedding,portraits,candid,memories}/.gitkeep
    └── music/.gitkeep                 (future wedding-background.mp3)
```

Fonts are the **Latin subsets** of Cormorant Garamond, Playfair Display and Great Vibes, which are SIL Open Font License fonts from the google/fonts repository. Download the woff2 files once and commit them with their OFL.txt files. Do not link to fonts.googleapis.com at runtime.

---

## 4. `config.js` (exact)

```js
export const wedding = {
  groom: 'K. Manojkumar',
  bride: 'S. V. Dhanushri',
  names: 'Manoj & Dhanushri',
  venue: 'Sri Lakshmi Aandal Maaligai',
  locality: 'Chromepet, Chennai',
  address: 'Chromepet, Chennai, Tamil Nadu, India',
  // TODO: Confirm the Google Maps search result with the venue before sharing.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Aandal+Maaligai%2C+Chromepet%2C+Chennai%2C+Tamil+Nadu%2C+India',
  reception: { day: '13', month: 'December', year: '2026', time: '6:30 PM onwards' },
  muhurtham: { day: '14', month: 'December', year: '2026', time: '6:30 AM onwards', iso: '2026-12-14T06:30:00+05:30' },
  // TODO: Supply licensed assets under assets/ and set these relative paths.
  music: null, // e.g. 'music/wedding-background.mp3'
  coupleBeach: null, // e.g. 'images/couple/beach.webp'
  coupleWedding: null,
  couplePortrait: null,
  motorcycle: null,
  // TODO: Replace the decorative scene backgrounds with the final artwork.
  backgrounds: {
    beach: 'images/backgrounds/beach.svg',
    mandapam: 'images/backgrounds/mandapam.svg',
    countryside: 'images/backgrounds/countryside.svg',
    botanical: 'images/backgrounds/botanical.svg',
  },
  mobileBackgrounds: {
    beach: 'images/backgrounds/beach-mobile.svg',
    mandapam: 'images/backgrounds/mandapam-mobile.svg',
    countryside: 'images/backgrounds/countryside-mobile.svg',
    botanical: 'images/backgrounds/botanical-mobile.svg',
  },
};

export const gallery = {
  // Keep supplied photo originals, WebP images and thumbnails together in assets/gallery/.
  // Example: { id: 'photo-01', image: 'gallery/photo-01.webp',
  // thumbnail: 'gallery/photo-01-thumb.webp', caption: 'A moment to remember',
  // alt: 'Manoj and Dhanushri together', displayOrder: 1, orientation: 'portrait' }
  entries: [],
  watermark: '', // Optional subtle watermark, e.g. 'Manoj & Dhanushri'
};
```

All asset paths are **relative to `assets/`**.

---

## 5. `index.html` (exact structure)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#f5e9d3">
  <meta name="description" content="Join Manoj and Dhanushri as they begin their forever in Chennai.">
  <title>Manoj &amp; Dhanushri | A celebration of love</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='31' fill='%23174f4c'/%3E%3Cpath d='M32 47S15 37 15 25c0-6 5-10 10-10 3 0 6 2 7 5 1-3 4-5 7-5 5 0 10 4 10 10 0 12-17 22-17 22Z' fill='%23d6b56f'/%3E%3C/svg%3E">
  <link rel="preload" href="assets/images/backgrounds/beach.svg" as="image" media="(min-aspect-ratio: 5/4)">
  <link rel="preload" href="assets/images/backgrounds/beach-mobile.svg" as="image" media="(max-aspect-ratio: 5/4)">
  <link rel="preload" href="assets/fonts/cormorant-garamond-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="gallery.css">
  <script defer src="vendor/gsap.min.js"></script>
  <script defer src="vendor/ScrollTrigger.min.js"></script>
  <script type="module" src="main.js"></script>
</head>
<body>
  <a class="skip-link" href="#save-the-date">Skip to invitation</a>
  <header class="site-header">
    <a class="monogram" href="#welcome" aria-label="Manoj and Dhanushri, home">M <span>&amp;</span> D</a>
    <span class="header-note">A LITTLE LOVE STORY</span>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open navigation">☰</button>
    <nav id="site-menu" class="site-menu" aria-label="Main navigation">
      <a href="#welcome">The beginning</a><a href="#save-the-date">The celebration</a><a href="#venue">The venue</a><a href="#gallery" data-gallery-link hidden>Our memories</a><a href="#invitation">The invitation</a>
    </nav>
  </header>
  <main>
    <section class="welcome scene" id="welcome">
      <div class="welcome-wash"></div>
      <svg class="birds" viewBox="0 0 120 50" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22q9-10 17-1 8-9 17 1"/><path d="M52 38q6-7 12-1 6-6 12 1"/><path d="M92 9q5-5 9-1 4-4 9 1"/></g></svg>
      <div class="welcome-content">
        <p class="eyebrow hero-reveal">A CELEBRATION OF LOVE</p>
        <p class="hero-intro hero-reveal">Together with our families,</p>
        <h1 class="hero-reveal"><span>Manoj</span><em>weds</em><span>Dhanushri</span></h1>
        <p class="full-names hero-reveal" data-full-names></p>
        <div class="flourish" aria-hidden="true"><span></span>✦<span></span></div>
        <a class="primary-button hero-reveal" href="#save-the-date">Join Our Journey <span aria-hidden="true">→</span></a>
      </div>
      <div class="shoreline shoreline-one" aria-hidden="true"></div><div class="shoreline shoreline-two" aria-hidden="true"></div>
      <a class="scroll-cue" href="#save-the-date"><span>SCROLL TO EXPLORE</span>↓</a>
      <div class="hero-side-note" aria-hidden="true">TWO HEARTS, ONE BEAUTIFUL BEGINNING</div>
    </section>

    <section class="save-date scene" id="save-the-date">
      <div class="scene-overlay mandapam-overlay"></div>
      <div class="save-content reveal-group">
        <div class="scene-number"><span>01</span><i></i>THE CELEBRATION</div>
        <p class="eyebrow">A DATE WITH DESTINY</p><h2>Save <em>the</em> Date</h2>
        <p class="section-lead">Two beautiful days. A lifetime of memories.</p>
        <div class="flourish" aria-hidden="true"><span></span>✦<span></span></div>
        <div class="date-pair">
          <div class="date-block"><p>RECEPTION</p><strong data-reception-day></strong><span><span data-reception-month></span> <small data-reception-year></small></span><i></i><b data-reception-time></b></div>
          <div class="date-divider"><span>✦</span></div>
          <div class="date-block"><p>MUHURTHAM</p><strong data-muhurtham-day></strong><span><span data-muhurtham-month></span> <small data-muhurtham-year></small></span><i></i><b data-muhurtham-time></b></div>
        </div>
        <div class="countdown-wrap">
          <p class="eyebrow">COUNTING DOWN TO THE MUHURTHAM</p>
          <div class="countdown" id="countdown"></div>
          <button class="outline-button" id="calendar" type="button">▣ &nbsp; Add muhurtham to calendar</button>
        </div>
        <a class="text-link" href="#venue">Take Me There <span aria-hidden="true">→</span></a>
      </div>
    </section>

    <section class="venue scene" id="venue">
      <div class="scene-overlay venue-overlay"></div>
      <div class="venue-content reveal-group">
        <div class="scene-number"><span>02</span><i></i>THE JOURNEY</div>
        <p class="eyebrow">COME CELEBRATE WITH US</p><h2>Find <em>the</em> Venue</h2>
        <p class="section-lead">We can't wait to celebrate this special day with you.</p>
        <div class="flourish" aria-hidden="true"><span></span>✦<span></span></div>
        <div class="venue-detail"><span aria-hidden="true">⌖</span><div><h3 data-venue></h3><p data-locality></p></div></div>
        <a class="outline-button" data-maps target="_blank" rel="noopener noreferrer">Open in Maps <span aria-hidden="true">→</span></a>
      </div>
      <p class="venue-caption">THE ROAD TO <em>forever</em></p>
    </section>

    <section id="gallery" hidden></section>

    <section class="final scene" id="invitation">
      <div class="final-content reveal-group">
        <div class="scene-number"><span data-closing-number>03</span><i></i>THE INVITATION</div>
        <p class="eyebrow">THE BEGINNING OF ALWAYS</p><h2>With Love,<br><em>We Invite You</em></h2>
        <div class="flourish" aria-hidden="true"><span></span>✦<span></span></div>
        <p>Your presence will make our celebration even more meaningful. We look forward to celebrating this beautiful beginning with you.</p>
      </div>
      <footer>WITH LOVE <span>✦</span> ALWAYS &amp; FOREVER</footer>
    </section>
  </main>
  <noscript><p class="noscript-notice">Please enable JavaScript to view the wedding dates, venue directions and interactive invitation.</p></noscript>
  <div class="music-control" id="music-control" hidden><span id="music-error" role="status" hidden></span><button class="music-button" type="button" aria-label="Background music" aria-pressed="false">♫</button><audio id="music" loop preload="none"></audio></div>
</body>
</html>
```

Notes:
- Birds are **inline SVG strokes**, not Unicode glyphs such as `⌁`, which render as empty boxes on many Android fonts.
- Preloads use **aspect-ratio** media queries matching the JS portrait rule, not `orientation` or `max-width`.
- The font preload needs `crossorigin`, or the browser downloads the font twice.
- The inline data-URI favicon prevents a `/favicon.ico` 404.

---

## 6. Design system

### Palette

| Token | Hex | Use |
|---|---|---|
| Deep teal | `#174F4C` | headings, buttons, music button |
| Champagne gold | `#D6B56F` | accents, borders |
| Warm ivory | `#FFF8E9` | page background |
| Soft cream | `#F5E9D3` | hover fills, theme colour |
| Botanical yellow | `#E8D18B` | art |
| Dark brown | `#60442F` | body text |
| Sunset peach | `#EBC9B0` | art |
| Supporting tones | `#B68B53`, `#BD975D`, `#846032`, `#7E705E`, `#557069` | script, numerals, eyebrows, leads, labels |

### Typography (`styles.css` top)

```css
@font-face { font-family: "Cormorant Garamond"; font-style: normal; font-weight: 400 500; font-display: swap; src: url("assets/fonts/cormorant-garamond-latin.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 400; font-display: swap; src: url("assets/fonts/cormorant-garamond-italic-latin.woff2") format("woff2"); }
@font-face { font-family: "Playfair Display"; font-style: normal; font-weight: 400; font-display: swap; src: url("assets/fonts/playfair-display-latin.woff2") format("woff2"); }
@font-face { font-family: "Great Vibes"; font-style: normal; font-weight: 400; font-display: swap; src: url("assets/fonts/great-vibes-latin.woff2") format("woff2"); }
:root {
  --font-display: "Cormorant Garamond", Georgia, serif;   /* h1, h2, h3, leads, numerals, closing copy */
  --font-support: "Playfair Display", Georgia, serif;      /* months, countdown digits, venue name, scene numbers */
  --font-script: "Great Vibes", "Snell Roundhand", cursive;/* "weds", "forever" */
  --font-body: var(--font-support);                        /* gallery body */
  font-family: "Avenir Next", Avenir, "Segoe UI", Roboto, "Helvetica Neue", sans-serif; /* UI labels */
  color: #60442f; background: #fff8e9; font-synthesis: none; -webkit-font-smoothing: antialiased; scroll-behavior: smooth;
}
```

Never rely on system script fonts alone. Without Great Vibes, Windows falls back to Comic Sans.

### Recurring components

- `.eyebrow`: 10px, weight 700, letter-spacing .24em, uppercase, `#846032`.
- `.scene-number`: centred flex with a Playfair 15px numeral, a 28×1px gold rule (`<i>`) and a 10px uppercase label. Use 01, 02 and 03, or 04 when the gallery is visible.
- `h2`: 48–88px (`clamp(48px, 6vw, 88px)`), line-height .98, letter-spacing -.04em, teal. `h2 em` is gold `#b78b54`.
- `.flourish`: two 54×1px gradient rules around a `✦`.
- `.primary-button` / `.outline-button`: min-height 50px, padding 0 25px, 11px semibold, letter-spacing .09em. The primary button is solid teal; the outline button is transparent with a teal border and fills on hover.
- `.text-link`: 11px bold with a gold underline border.
- Focus: `outline: 2px solid #174f4c; outline-offset: 4px`.
- Global rules: `body { min-width: 320px }`, `body { overflow-x: clip }`, `[hidden] { display: none !important }`.

---

## 7. Scenes, layout and art

All four visible scenes are `<section class="… scene">` with:

```css
.scene { position: relative; isolation: isolate; overflow: hidden; background-image: var(--scene-desktop); background-size: cover; background-position: center; }
.scene.is-portrait { background-image: var(--scene-mobile); background-position: center; }
.save-date.is-portrait, .final.is-portrait { background-size: 100% 100%; }
```

`main.js` sets `--scene-desktop` and `--scene-mobile` from `config.js` and toggles `.is-portrait` (see §8). **Do not choose artwork with `@media (orientation: portrait)`.** A short-wide section on a portrait tablet would get tall art and distort or crop badly.

Every scene (`.scene`) and the gallery is **at least one screen tall** (`min-height: 100vh; min-height: 100svh`), so in-page links land on exactly one scene with none of the next one showing. Scenes with more content (Save the Date on most devices) grow taller and scroll on.

### 7.1 Welcome (`#welcome`, beach)

- **Layout:** `padding: 120px 0 100px; display: grid; place-items: center; background-color: #e9d7c0`.
- **Wash:** `.welcome-wash` is an absolute, very light vertical ivory gradient behind the content (`z-index: -1`).
- **Content:** `.welcome-content` is `width: min(88%, 760px)`, centred.
- **Headline:** h1 is `clamp(65px, 10vw, 144px)`, line-height .87, letter-spacing -.055em, teal. Each `<span>` is a block. `em` is Great Vibes .36em, gold `#b68b53`, `font-style: normal`, letter-spacing 0.
- **Full names:** `.full-names` shows "K. Manojkumar & S. V. Dhanushri" (12px, letter-spacing .08em).
- **Birds:** `.birds` sits at `top: 20%; right: 16%`, width `clamp(72px, 8vw, 120px)`, colour `#4a7774`, opacity .7, with an 18s alternating drift keyframe.
- **Shoreline shimmer:** `.shoreline` is two 1px glowing lines (`box-shadow: 0 0 14px 4px #f8f6df`) running from `left: -10%` to `right: -10%`, animated 7s alternating with `translateX(±3%) scaleX`. Their `top` is `var(--shore-foam)` / `var(--shore-sea)`, computed by JS so they sit on the painted waterline. Never hard-code a percentage; it lands on the sand at other aspect ratios.
- **Side note:** `.hero-side-note` uses vertical text (`writing-mode: vertical-rl; rotate(180deg)`) at `top: 50%; right: max(3%, safe-area)`. Style it 10px bold, `#2c5a53`, with an ivory text-shadow halo. Hide it at ≤900px. Keep it on the right, over open sky; on the left it overlaps the palm trunk.
- **Scroll cue:** `.scroll-cue` is absolute at the bottom centre.

**Artwork, `beach.svg`:** viewBox `0 0 1600 1000`, `preserveAspectRatio="xMidYMid slice"`.
- Pastel sky gradient (`#bfd5d8`→peach), a soft sun glow at about (1210, 488) and soft cloud strokes.
- Sea from y≈582 down, with a sun reflection and wave strokes.
- Sand from y≈800 down; the bright **foam line averages y≈808**.
- A leaning palm at the left (trunk x≈39–155), frond clusters at top-right and grass tufts in the bottom corners.

**`beach-mobile.svg`:** viewBox `0 0 600 1000`, slice.
- Sky to y 680, sun glow at (440, 610).
- Sea starts at y≈658; **open-sea mid at y≈730** and **foam at y≈795**.
- A partial palm on the left.
- No baked-in birds; HTML birds handle that, so they are not duplicated.

### 7.2 Save the Date (`#save-the-date`, mandapam)

- **Layout:** `display: grid; place-items: center; background-color: #ebd8af; background-position: center top`. On ultra-wide screens the top anchor keeps the roof in view.
- **Overlay:** `.mandapam-overlay` is a radial ivory gradient so text stays readable: .93 at the centre, .8 at 37%, .08 at 75%.
- **Content:** `.save-content` is `width: min(88%, 630px)` with padding `clamp(72px, 8vw, 110px) 0`. **Its `padding-top` must be `var(--roof-clear, …)`**, set by JS so the heading always starts below the painted roof.
- **Dates:** `.date-pair` is a grid `1fr 40px 1fr`.
  - Each `.date-block` holds an uppercase label, a numeral (`strong`, Cormorant `clamp(80px, 10vw, 120px)`, `#bd975d`), "December 2026" (Playfair 18px, year in `small`), a 24px gold rule and the time (`b`).
  - `.date-divider` is a 1px vertical line with a ✦ centred on a `#f8efdc` pill.
- **Countdown:** `.countdown-wrap` has a top border and contains the eyebrow, the `#countdown` units (Playfair `clamp(30px, 4vw, 45px)`, tabular numerals, 10px uppercase labels) and the calendar button.
- "Take Me There →" links to `#venue`.

**Artwork, `mandapam.svg`:** viewBox `0 0 1600 1000`, slice.
- Teal roof band at y 0–128 with gold zig-zag lines, then gold beams; **the painted roof ends at y≈191**.
- Carved stone pillars at x 85 and 1345 (capital, shaft and stepped base).
- A leaf garland with hanging jasmine strands, and brass standing lamps with flames.
- Soft foliage clouds at both sides and a floor with perspective lines from y 781.

**`mandapam-mobile.svg`:** a responsive frame; see §7.6.

### 7.3 Venue (`#venue`, countryside)

- **Layout:** `display: flex; align-items: center; background-color: #d8c28e; background-position: center 75%`. The 75% anchor keeps the road and sun visible on wide screens.
- **Overlay:** `.venue-overlay` is a left-to-right ivory gradient: .96, then .79 at 42%, then .08 at 82%.
- **Content:** `.venue-content` is `width: min(55%, 600px); margin-left: 7%; padding: 90px 0; text-align: left`; the scene number and flourish are left-aligned.
- **Venue details:** `.venue-detail` shows a ⌖ glyph, the venue name as an h3 (Playfair 23px) and the locality (13px).
- "Open in Maps →" is an `<a target="_blank" rel="noopener noreferrer">` whose href is set from config.
- **Caption:** `.venue-caption` "THE ROAD TO *forever*" sits absolute at the bottom-right, ivory with a brown text-shadow; `em` is Great Vibes 24px. Use `white-space: nowrap`.
- **Motorcycle:** `.motorcycle` is optional (only if `config.motorcycle`): absolute, `bottom: 6%`, `width: min(40vw, 450px)`, `z-index: 3`, `pointer-events: none`.

**Artwork, `countryside.svg`:** viewBox `0 0 1600 1000`, slice.
- Golden sky and sun, layered hills, and fields from y≈574.
- A winding road with a dashed centre line, a large tree at top-left, and cypress rows receding on the right.
- Wheat strokes and golden leaves.

**`countryside-mobile.svg`:** viewBox `0 0 600 1000`, slice.
- Sky gradient `#f5e9cf`→`#d7ae6a`, a sun at (420, 590) and two hill layers from y 680.
- A winding road from y 664 to the bottom with a dashed line, two tall trees, small distant trees and fallen leaves.

### 7.4 Gallery (`#gallery`)

The section is hidden unless `gallery.entries.length > 0`. When shown, it un-hides the nav link and changes `[data-closing-number]` to `04`. The full spec is in §10.

### 7.5 Final invitation (`#invitation`, botanical)

- **Layout:** `display: grid; place-items: center; background-color: #eee2c6; background-position: center bottom`. The bottom anchor keeps the vases visible on 1440×625 and 2560-wide screens.
- **Overlay:** `.final::before` is a radial ivory overlay.
- **Content:** `.final-content` is `width: min(88%, 550px); padding: 110px 0 140px`; the paragraph is Cormorant 20px, line-height 1.7, `#7e6a53`.
- **Footer:** "WITH LOVE ✦ ALWAYS & FOREVER" is absolute at the bottom with a top border.

**Artwork, `botanical.svg`:** viewBox `0 0 1600 1000`, slice.
- A warm cream wall gradient, paneled pilasters and a central arched alcove with light.
- A teal vase of leafy sprigs at bottom-left (around x 180, y 720–930) and a gold vase of peach flowers with fan leaves at bottom-right (around x 1412).
- Floor shadows.

**`botanical-mobile.svg`:** a responsive frame; see §7.6.

### 7.6 Portrait frames: no stretching, ever

**Bug to avoid:** `viewBox="0 0 600 1000" preserveAspectRatio="none"` stretched to `100% 100%`. On a 320×1224 section, circles become ovals at half width; on a 768×549 tablet section, art is squashed 2.3×.

**Correct technique (`mandapam-mobile.svg`, `botanical-mobile.svg`):**
- The root `<svg>` has **no viewBox**: `width="100%" height="100%"`. CSS uses `background-size: 100% 100%`, so the SVG viewport equals the section box and user units are real CSS pixels.
- Full-bleed shapes use percentages: `<rect width="100%" height="100%">` and `<rect y="88" width="100%" height="17">`.
- **Edge anchoring with nested viewports:**
  - Right edge: `<svg x="100%" overflow="visible">`, with children drawn at negative x.
  - Bottom edge: `<svg y="100%" overflow="visible">`, with children at negative y.
  - Bottom-right: `x="100%" y="100%"`.
  - Centre: `x="50%"`.
- Relative placement: `<use href="#flowers" x="19%" y="122"/>`.
- Repeating ornaments use `<pattern patternUnits="userSpaceOnUse">` fills; zig-zags never stretch.
- Vertical pillar shafts are `<rect height="100%">` placed under fixed-size capitals and bases.
- Curves that must span the width (garland, arch) go in a nested `<svg width="100%" height="…" viewBox="…" preserveAspectRatio="none">` with **`vector-effect="non-scaling-stroke"`**, so stroke weight and dashes stay true.
- Hide fine details on tiny screens with a style block **inside the SVG**: `<style>@media (max-width: 480px) { .detail { display: none; } }</style>`. In an SVG used as an image, media queries evaluate against the image's own viewport.

**`mandapam-mobile.svg` content:**
- Air gradient (`#ede1c5`→`#fff7e5`→`#e4d0aa`).
- **Teal roof:** a 92px band (`#28544a`) with gold 1px lines at y 19.5 and 64.5, a zig-zag pattern band at y 25–49, and a gold band at y 88–105. **The roof depth is a fixed 105px; the garland centre hangs to ≈154px, which is what the heading must clear.**
- **Pillars:** at x 12 and at the right edge offset -58. Each is a 46px-wide capital at y 105, a 26px shaft running full height, and a 46px stepped base sitting at bottom -122.
- **Garland:** spans 6%–94% at y 96–186, green 10px under a dashed ivory 7px stroke, both non-scaling.
- **Jasmine strands:** large at 19% and 81% (y 122); small `.detail` strands at 32% and 68% (y 138).
- **Brass lamps:** `.detail` standing lamps at x 88 and right -88, base on the floor.
- **Floor:** 122px tall (bands at -122, -110 and -49), with a lotus rangoli outline at the bottom centre.

**`botanical-mobile.svg` content:**
- Wall gradient.
- **Arch:** two strokes plus a translucent alcove in a nested `viewBox="0 0 600 1000" preserveAspectRatio="none"` with non-scaling strokes.
- **Branches:** hanging leafy branches at the top-left (scale .85 and .58) and mirrored at the top-right inside `x="100%"`.
- Gold sparkle dots at percentage positions.
- **Floor:** a band in the bottom 118px.
- **Vases:** small teal vases with three sprigs at bottom-left (`translate(40 -100) scale(.85)`) and bottom-right (`translate(-40 -100) scale(.85)`).
- Perspective floor lines from the bottom centre.

---

## 8. `main.js` (behaviour, in this order)

```js
import { wedding, gallery } from './config.js';
import { initGallery } from './gallery.js';
```

### 8.1 Safe asset URLs

```js
const assetUrl = (path) => {
  if (!path || /[\\?#]/.test(path) || path.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(path) ||
      path.split('/').some((part) => { const d = decodeURIComponent(part); return d === '..' || /[/\\]/.test(d); })) {
    throw new Error(`Asset paths must be relative to assets/: ${path}`);
  }
  return `assets/${path}`;
};
```

### 8.2 Text population

Populate text with `textContent` only, never `innerHTML`:
- `[data-reception-day|month|year|time]` and `[data-muhurtham-…]`
- `[data-venue]` and `[data-locality]`
- `[data-full-names]` = `${groom} & ${bride}`
- `[data-maps].href = wedding.mapsUrl`

### 8.3 Shape-aware scene art (critical)

```js
const PORTRAIT_RATIO = 1.25; // portrait art when width / height < 1.25
const beachArt = {
  desktop: { width: 1600, height: 1000, foam: 808, sea: 690 },
  mobile:  { width: 600,  height: 1000, foam: 795, sea: 730 },
};
const MANDAPAM_ROOF = { desktop: 0.191, mobile: 154 }; // fraction of viewBox height / fixed px (mobile: lowest point of the garland)
const ROOF_GAP = 26;
```

- For each scene (`.welcome`→beach, `.save-date`→mandapam, `.venue`→countryside, `.final`→botanical), set `--scene-desktop` and `--scene-mobile` to `url("assets/…")`.
- `fitScene(scene)`:
  1. Read `offsetWidth` and `offsetHeight`, and bail out if either is 0.
  2. **Save the Date only (`clearMandapamRoof`):**
     - Compute `restHeight = height − current computed padding-top of .save-content`.
     - Decide portrait as `width / (restHeight + 110) < PORTRAIT_RATIO`. Using `restHeight` stops the roof padding from feeding back into the decision; without it, the section flips between portrait and landscape at the threshold.
     - Portrait: padding = 105 + 26.
     - Landscape: the art is `cover`-scaled by `max(w/1600, h/1000)`.
       - `byWidth = 0.191·1000·w/1600 + 26`.
       - If `(restHeight + byWidth)/1000 ≤ w/1600`, use `byWidth`.
       - Otherwise solve the fixed point `pad = (0.191·restHeight + 26)/(1 − 0.191)`.
     - Set `--roof-clear` to `ceil(pad)` px.
  3. Other scenes: `portrait = width / height < PORTRAIT_RATIO`.
  4. Toggle `.is-portrait`.
  5. **Welcome only:**
     - Pick the beach geometry for the current variant and compute `scale = max(w/art.width, h/art.height)` and `offset = (h − art.height·scale)/2`.
     - Set `--shore-foam = round(offset + foam·scale)px` and `--shore-sea = round(offset + sea·scale)px`.
- Run `fitScene` on every scene immediately to avoid a flash of wrong art.
- Observe every scene with `ResizeObserver`. Fall back to a passive `resize` listener if `ResizeObserver` is unavailable.

### 8.4 Optional artwork

Only when a path is non-null:
- `coupleBeach` goes in `.welcome`, `coupleWedding` in `.save-date` and `couplePortrait` in `.final`.
  - Create `<img class="couple-art …" alt="">`, add `.has-couple-art` to the scene, and append the image.
  - Log `console.error` on load error.
- `motorcycle` creates `<div class="motorcycle"><img alt=""></div>` in `.venue` and adds `.has-motorcycle`.

### 8.5 Menu

- `setMenu(open)` toggles `.is-open`, `aria-expanded` and the `aria-label` ("Open navigation" / "Close navigation"), and swaps the icon text (☰ / ×).
- The menu closes when:
  - a menu link is clicked;
  - Escape is pressed (then focus returns to the button);
  - the user clicks outside the menu and the button.
- The menu button and menu are `position: fixed` (top `var(--header-top)`, right 6%), so navigation stays reachable after scrolling; a 44px `::after` spacer on `.site-header` keeps the header row balanced.
- The menu is height-limited and scrollable: `max-height: calc(100svh - 96px - env(safe-area-inset-bottom)); overflow-y: auto; overscroll-behavior: contain`.

### 8.6 Countdown (Asia/Kolkata-correct)

- `target = Date.parse(wedding.muhurtham.iso)`. The +05:30 offset makes it correct in every visitor time zone.
- If `target` is not finite, show "Countdown unavailable: invalid wedding date." and log the error.
- Build four `.countdown-unit` elements once (`span[data-unit]` + `small` label: days, hours, minutes, seconds). Update every second with zero-padded values and an `aria-label` that reads the whole sentence.
- When the remaining time is ≤ 0: `clearInterval`, swap the class to `countdown-finished`, remove `aria-label` and show "Our forever has begun."
- Only start `setInterval` if the target is in the future.

### 8.7 Calendar (.ics, client-side)

On click, build CRLF-joined lines:
- `BEGIN:VCALENDAR`, `VERSION:2.0`, `PRODID:-//Manoj and Dhanushri//Wedding Invitation//EN`
- `BEGIN:VEVENT`, `UID:manoj-dhanushri-muhurtham-20261214@wedding.local`
- `DTSTAMP` = now, and `DTSTART` = target, both in **UTC** basic format via `toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')`. The start must be `20261214T010000Z`.
- `SUMMARY:Manoj & Dhanushri - Muhurtham`
- `LOCATION` = venue + address
- `DESCRIPTION` = "Muhurtham at 6:30 AM onwards. Time zone: Asia/Kolkata."
- `END:VEVENT`, `END:VCALENDAR`, then a trailing empty line.

Escape `\ , ;` and newlines in text fields. Download as a `text/calendar;charset=utf-8` Blob named `manoj-dhanushri-muhurtham.ics`, then revoke the object URL after 1s. If the date is invalid, alert instead.

### 8.8 Music (single shared audio, never autoplay)

Only when `wedding.music` is set:
- Un-hide `#music-control` and set `audio.src`.
- The button toggles play and pause. `await audio.play()` inside try/catch; on failure, show "Music could not be played." in the status span.
- Keep the `aria-label` fixed as "Background music"; sync `aria-pressed` and the icon (♫ / Ⅱ) on the `play` and `pause` events. Handle the `error` event.
- The control is fixed at the bottom-right with safe-area offsets: a 50px teal circle with a gold border.

### 8.9 Gallery bootstrap

```js
if (gallery.entries.length) {
  const section = document.querySelector('#gallery');
  section.hidden = false;
  document.querySelector('[data-gallery-link]').hidden = false;
  setText('[data-closing-number]', '04');
  initGallery(section, gallery, assetUrl);
}
```

### 8.10 Animation (GSAP; content is visible without it)

```js
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero-reveal', { opacity: 0, y: 22, duration: 1.1, stagger: 0.16, ease: 'power2.out', delay: 0.2 });
    document.querySelectorAll('.reveal-group').forEach((group) => {
      gsap.from(group.children, { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 83%', once: true } });
    });
    if (wedding.motorcycle) {
      const vehicle = document.querySelector('.motorcycle');
      gsap.timeline({ scrollTrigger: { trigger: '.venue', start: 'top 80%', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } })
        .fromTo(vehicle, { x: () => -innerWidth - vehicle.offsetWidth, autoAlpha: 0 },
                         { x: () => innerWidth + vehicle.offsetWidth, duration: 5, ease: 'power1.inOut' }, 0)
        .to(vehicle, { autoAlpha: 1, duration: 0.6 }, 0)
        .to(vehicle, { autoAlpha: 0, duration: 0.8 }, 4.2);
    }
  });
}
```

- Use `from` tweens so that **if GSAP fails to load, everything is already visible**.
- `matchMedia` reverts all tweens automatically when reduced motion is turned on.
- Use function-based `x` values with `invalidateOnRefresh` so resizing recalculates the motorcycle path.
- A flattened motorcycle image cannot spin its wheels. Note this in the README; separate wheel layers would be required.

---

## 9. Responsive rules (`styles.css` media queries)

**`@media (max-width: 900px)`:**
- Header padding becomes `max(20px, safe-top) 6% 15px` (via `--header-top`, which the fixed menu button also uses); hide `.header-note` and `.hero-side-note`.
- Use a stronger mandapam overlay; set `.save-content { width: min(78%, 630px); padding: 90px 0 72px }` and `h2` to `clamp(38px, 7vw, 56px)`.
- Venue:
  - Make the overlay a vertical top-to-bottom ivory gradient.
  - Centre the content at `width: min(86%, 600px)` with padding `80px 0 110px` (280px bottom when a motorcycle is present).
- **Centre `.venue-caption`** (`left: 50%; transform: translateX(-50%); bottom: 28px`) so it never sits under the fixed music button.
- `.motorcycle { width: min(75%, 450px); bottom: 55px }`.

**`@media (max-width: 600px)`:** `.final-content { padding: 100px 0 235px }`, which reserves room above the corner vases.

**`@media (max-width: 360px)`:**
- h1 becomes `clamp(52px, 16vw, 65px)` and h2 42px.
- **Stack the date pair**: one column, gap 25px, and the divider becomes a horizontal 70% line.
- Countdown gap 10px, units `min-width: 0`, label letter-spacing .06em, so it fits between the pillars at 320px.

**`@media (max-height: 500px) and (orientation: landscape)`:** Welcome padding `110px 0 90px` and h1 64px.

**`@media (prefers-reduced-motion: reduce)`:** all animations and transitions run at .01ms with one iteration, and smooth scrolling is turned off.

**Keyframes:**
- `water`: `translateX(-3%) scaleX(.9)` at opacity .2, to `translateX(3%) scaleX(1.05)` at opacity .6.
- `birds-drift`: drifts 60px left and 8px up with a -8° rotation.

**Optional couple-art rules:**
- `.couple-art`: `width: min(70%, 360px); max-height: min(380px, 28svh); object-fit: contain; object-position: bottom`, with a `28vh` fallback. The height cap keeps the closing scene within one screen.
- `.has-couple-art` turns the scene into a flex column, so the art takes layout space and never covers text.

---

## 10. Gallery (`gallery.js` + `gallery.css`)

Export `initGallery(root, config, assetUrl)`, which returns a `destroy()` cleanup. Calling it again on the same section destroys the previous instance first; track instances in a `WeakMap`.

### Validation

- `root` must be a `<section>`.
- Every entry needs a unique string `id`, a string `category` and `alt`, a finite `displayOrder`, and an `orientation` of `portrait`, `landscape` or `square`.
- Categories need unique `id` and `label` values.
- Throw a `TypeError` on invalid data.
- `localSource(path)` rejects:
  - empty values, `\`, `?` and `#`;
  - protocol URLs, `//` and `..`;
  - encoded slashes;
  - any resolved URL whose origin differs from `location.origin`.

### Markup built in JS

- **Header** (`data-gallery-reveal`):
  - a leaf icon;
  - the eyebrow "Our Pre-Wedding Memories";
  - the h2 "Moments Before Forever" with a unique id used for `aria-labelledby`;
  - the subtitle "A little glimpse into our journey, the laughter, the love and the memories we'll cherish forever."
- **No filters or categories.** Every configured entry is shown together. Each entry requires a unique id, alt text, display order and orientation.
- **Status:** a `role="status"` live region reading "N photographs shown."
- **Polaroid board** (`.gallery-board`, `data-gallery-reveal`), laid out by `layoutBoard()`:
  - On gallery initialization, `1Q7A0233` remains first and the other entries are Fisher–Yates shuffled.
  - **Scatter mode** (default): a jittered grid. JS checks column counts from 1 to the photo count and chooses the arrangement that allows the largest cards within the board dimensions; the last row is centred. A seeded PRNG (`seeded()`, Park–Miller) keeps layouts stable until shuffled.
  - Board CSS: `--board-w: min(100vw − 2.5rem, 1200px)`; `--board-h: clamp(300px, 100svh − 460px, 640px)`. Card width is bounded by the chosen column count, row count, board dimensions and a 210px cap. Positions leave room for the cards' ±9° rotation so their bounds stay inside the board.
  - Cards use the individual `translate: -50% -50%` and `rotate: var(--r)` properties (not `transform`), so GSAP reveals cannot clobber them. Hover or focus-within (scatter mode only) sets `rotate: 0`, `scale: 1.1` and `z-index: 50 !important`. `left`, `top` and `rotate` transition over 0.7s so shuffling glides.
  - **Stack mode** when `(max-width: 600px), (max-height: 500px)` matches: cards pile in the centre (`--card-w: min(72vw, 290px, 100svh − 120px)`), the top card straight and the rest tilted ±6°; only 4 are visible (`.is-buried`) and only the top card is tabbable. Pointer-drag the top card horizontally (8px threshold, `touch-action: pan-y`, pointer capture); beyond 70px it is flung off (`.is-flung`, 0.32s, instant under reduced motion) and moved to the bottom. Suppress the click for 400ms after a drag so a swipe never opens the lightbox. Re-layout on the media-query `change` event.
  - **Controls:** a pill button `.gallery-shuffle` ("Shuffle photos" re-seeds and Fisher–Yates shuffles; in stack mode it reads "Next photo") and a hint (`aria-live`): "Tap a photo to open it" or "Swipe or tap · N of M".
- **Card (polaroid):** a `<figure class="gallery-card">` with an ivory `#fffdf8` frame, `padding: 8px 8px 0`, `border-radius: 12px` and a soft two-layer shadow, holding a `<button class="gallery-card__button" aria-haspopup="dialog">`.
  - The button is square (`aspect-ratio: 1 / 1`, `border-radius: 8px`) and contains an `<img loading="lazy" decoding="async" draggable="false">` with `object-fit: cover`, plus an optional watermark span. The full, uncropped photo is shown in the lightbox.
  - An optional `<figcaption>` is the polaroid strip: Cormorant italic 0.85rem, centred, one line with an ellipsis. Without a caption the card gets a 28px bottom border instead.
  - If a thumbnail fails, show "Preview unavailable. Open photograph." with `role="img"`.
  - **Do not use `<a href>` to the raw image.**
- **Empty state** (no entries, e.g. during development): an arched panel with a camera icon and a friendly message.
- **Closing line** (`data-gallery-reveal`): "Every picture holds a memory. Every memory brings us closer to forever."

### Lightbox

A native `<dialog class="gallery-lightbox">` appended to `<body>`:
- Labels: `aria-modal="true"`, a visually hidden title and instructions.
- Toolbar: counter "3 / 12" (`aria-live`) and a close button.
- Stage: previous/next buttons around the figure; the caption (`aria-live`) defaults to the alt text.
- **Opening:**
  - `showModal()`.
  - Save the body's inline `overflow` value and priority, then set `overflow: hidden`.
  - Load the **full-size `image`** (thumbnails are used only in the grid) with a "Loading photograph" status.
  - Keep a request counter so stale `onload` or `onerror` callbacks from fast navigation are ignored.
  - On error, show a `role="alert"` message.
  - Focus the close button.
- **Closing** (close button, Escape, backdrop click, or the `cancel` event, which is prevented and handled):
  - Restore the body overflow exactly as saved.
  - Clear the image.
  - Return focus to the card that opened it, using `preventScroll`.
- **Navigation:**
  - ←/→ keys and the buttons wrap around; hide the buttons when only one photo is visible.
  - **Swipe** on `.gallery-lightbox__stage`: passive touchstart, touchend and touchcancel. Navigate when `|dx| > 50` and `|dx| > 1.4·|dy|`. The stage has `touch-action: pan-y pinch-zoom`.
  - **Focus trap:** Tab and Shift+Tab cycle through the visible buttons.
- **Sizing:**
  - Use `height: 100dvh`, with safe-area padding on all sides.
  - The image uses `max-height: calc(100dvh - 11rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))`, with a `100vh` fallback.
  - On mobile (≤540px) the previous/next buttons overlay the image edges at 44px.
- **Fade:** use a 0.3s fade-in keyframe for each image as the cross-fade.

### Deterrents (gallery and lightbox only, never site-wide)

- Prevent `contextmenu`, `dragstart`, `copy` and `cut` when the target or selection is inside `.gallery-card`; prevent them everywhere inside the lightbox.
- Use `user-select: none` and `-webkit-touch-callout: none` on images, plus `draggable=false`.
- Optional watermark: an `entry.watermark` or `config.watermark` text overlay in white italic with a soft shadow, `pointer-events: none`, visible on cards and in the lightbox.
- Scrolling, navigation, browser controls and assistive technology must keep working.

### Reveal animation (GSAP, optional)

- Use `gsap.context` scoped to the root.
- Board: `autoAlpha 0→1`, `y 24→0`, `clipPath inset(0 0 100% 0)→inset(0 0 0% 0)`, 0.8s `power2.out`, ScrollTrigger `top 94%`, `once`.
- **Header and closing animate only once** (a separate `chromeContext`). The board animates as one unit.
- Call `ScrollTrigger.refresh()` after rendering.
- Skip all of this when reduced motion is on, re-evaluate on the media-query `change` event, and clear inline styles if GSAP throws.

### `destroy()`

Abort all listeners with one `AbortController`, revert the GSAP contexts, remove the dialog and inner markup, and restore the original classes and attributes.

### Gallery CSS tokens

- Ivory `#faf7ef`, green `#344c3c`, muted `#637064`, gold `#9c7d43`.
- Section: `display: flex` column, centred; padding `clamp(4.5rem, 9vh, 6rem) 1.25rem clamp(2rem, 5vh, 3.5rem)`; `min-height: 100svh`; no `scroll-margin-top` (the header is not a bar, so links land exactly on the section).
- Background blends with the illustrated scenes: radial glows `#f4e1c8` (top centre), `#e3e9da` (bottom right) and `#f2dcd2` (bottom left) over a `#fbf5ea`→`#f6ecdc` gradient. No flat white.
- Compact header: h2 `clamp(2rem, 4vw, 3.2rem)`, subtitle 0.9rem; header and closing margins `clamp(0.75rem, 2.5vh, 1.5rem)`.
- The shuffle button is a 44px pill with a green outline that fills on hover.
- Hover zoom of `scale(1.025)` applies only under `@media (hover: hover) and (pointer: fine)`.
- Under reduced motion there are no animations or transitions.

---

## 11. `README.md` must contain

1. **Run:** `python3 -m http.server 8000 --directory WeddingHTML`, then open `http://localhost:8000/`. **ES modules do not work from `file://`.**
2. **Deploy:** upload the folder contents to any static host; subdirectories work because all paths are relative.
3. **Configure:** everything is edited in `config.js`.
   - The art-selection rule and portrait-frame technique.
   - If `beach*.svg` or `mandapam.svg` is replaced, update `beachArt` and `MANDAPAM_ROOF` in `main.js`.
   - Where to place couple art, motorcycle art, gallery photos (WebP/AVIF thumbnail + full size, with width and height) and licensed music.
   - Confirm the Maps result with the venue.
4. **Couple artwork guidance and two ChatGPT prompts** (flat vector style, never photorealistic):
   - **Rule:** couple art must be flat vector-style illustrations on transparent backgrounds that match the scenes; original photos go only in the gallery. Explain why (photos look pasted on flat vector scenes; the art slot is at most 360px wide and 28% of the screen height).
   - A table of which spots use illustrations (beach, wedding, portrait, motorcycle) vs. original photos (gallery, 6–15).
   - File specs: `couple-beach`/`couple-wedding` ~720×880, `couple-portrait` ~720×608, `motorcycle` ~840×608 (2×), transparent PNG/WebP trimmed tight with feet or tyres on the bottom edge, saved in `assets/images/couple/` with paths set in `config.js`. Gallery: WebP full size ~1600px plus `-thumb` ~600px, faces centred (square previews), 2–4 word captions.
   - **Prompt 1, convert any photo into an illustration:** keep each face, the exact skin tone, body shape and proportions, hair, clothing, jewellery, pose and age unchanged; flat vector style with soft 2–3-tone shading, no harsh outlines, a palette that suits ivory, sage, gold, terracotta and blush; people only on a transparent background, full length, feet at the bottom edge, ≥1440px tall PNG; no beautifying, face changes, merged features, text, watermark, extra people or limbs, anime, cartoon, 3D or photorealism. Note the waist-up variant for the closing portrait.
   - **Prompt 2, couple riding a motorcycle from any photo:** same identity rules; strict side view travelling left to right; `[NAME 1]` riding, `[NAME 2]` behind holding on naturally; open-face helmets with faces visible; a realistic classic bike with two round wheels (match an uploaded bike photo); a gentle lean and wind movement; a contact shadow; bike and riders only on a transparent background, tyres at the bottom edge, ~1680×1216 PNG; no extra riders, limbs or wheels, distorted wheels, text or watermark.
   - Workflow tips: approve one image, then attach it to later requests for consistency; expect retries because likeness is not guaranteed; a re-prompt line for when a face drifts; get the couple's consent.
5. Font credits (OFL) and the GSAP licence note.
6. Honest limits:
   - The deterrents only discourage casual copying.
   - Wheel rotation needs layered art.
   - Real-device Safari and Chrome checks are still required.

---

## 12. Bugs found earlier: you must not reintroduce them

| # | Bug | Required fix |
|---|---|---|
| 1 | Art chosen by viewport orientation; tablets got tall art in short sections | Use JS `ResizeObserver` and the section's own `w/h < 1.25` |
| 2 | `preserveAspectRatio="none"` portrait SVGs distorted pillars and circles | Use viewBox-less responsive frames with percentage anchoring, nested `<svg x="100%" overflow="visible">` and `non-scaling-stroke` |
| 3 | Wide screens cropped the roof, road and vases | Anchor per scene: Save the Date `center top`, Venue `center 75%`, Final `center bottom` |
| 4 | Heading overlapped the painted mandapam roof (and, in portrait art, the garland) | Compute `--roof-clear` with the fixed-point maths; base the portrait decision on `restHeight + 110` to avoid oscillation |
| 5 | Fonts never loaded; "weds" fell back to Comic Sans | Self-host woff2 with `@font-face`, `font-display: swap`, and a preload with `crossorigin` |
| 6 | Wave shimmer floated on the sand | Map `--shore-foam` and `--shore-sea` from the art geometry and `cover` maths |
| 7 | `⌁` bird glyphs rendered as empty boxes on Android | Use inline SVG birds |
| 8 | Side note overlapped the palm trunk with poor contrast | Place it at the right middle with an ivory halo; hide at ≤900px |
| 9 | Music button covered the venue caption on mobile | Centre the caption at ≤900px |
| 10 | Corner vases sat behind the closing paragraph on phones | Add 235px bottom padding at ≤600px and use smaller sprigs |
| 11 | Countdown labels collided with the pillars at 320px | Use a 10px gap, `min-width: 0` and tighter letter-spacing at ≤360px |
| 12 | Lamps and strands crowded text below 480px | Use an in-SVG `@media` to hide `.detail` |
| 13 | Duplicate content (dates, venue, names in several scenes) | Apply the one-fact-one-scene rule from §2 |
| 14 | An empty gallery placeholder was shown to guests | Hide the section and nav link until entries exist |
| 15 | Gallery header re-animated on every filter click | Animate the header and closing once; re-animate only cards |
| 16 | Menu overflowed short landscape screens | Use a `max-height` with `svh` and safe area, plus internal scroll |
| 17 | `/favicon.ico` 404 | Use the inline data-URI icon |
| 18 | Countdown kept ticking after zero | Clear the interval and show the finished message |
| 19 | Stale `config.js` in a cached browser hid fixes during testing | Hard-reload or disable cache when verifying |
| 20 | Menu scrolled out of reach below the hero | Fix the menu button and menu to the viewport |
| 21 | Portrait garland crossed the Save the Date label | Clear the garland's lowest point (154px), not just the 105px roof |
| 22 | Landing on a short scene showed part of the next one | Give every scene and the gallery `min-height: 100svh` |
| 23 | Gallery grew to ~6,000px with large previews on a flat white page | Replace grid and filters with a one-screen polaroid scatter (stack on phones) on a blended gradient |

---

## 13. Verification checklist (run before calling it done)

Serve with `python3 -m http.server` and test in Chrome DevTools device mode, plus headless Chrome if possible.

**Viewports:** 320×568, 360×740, 375×667, 390×844, 430×932, 768×1024, 1024×768, 1440×900, 1440×625, 2560×1440 and 844×390 (phone landscape).

At each size:
- [ ] No horizontal scrolling (`scrollWidth ≤ innerWidth`), and no text or button extends past the viewport.
- [ ] Each section uses the expected art: phones use portrait art for all scenes; 768-wide Venue and Final use landscape art; 1024×768 Save the Date uses the portrait frame.
- [ ] No distorted circles, pillars or vases; the roof, lamps and vases are fully visible; the heading clears the roof.
- [ ] The shimmer sits on the waterline and the birds render.
- [ ] `document.fonts.check('16px "Great Vibes"')` and the other two families return true.
- [ ] The console shows no errors or 404s.

**Interactions:**
- [ ] The menu opens and closes (click, Escape, outside click) and focus returns to the button.
- [ ] The countdown ticks; with a past date it shows "Our forever has begun." and stops.
- [ ] The calendar button downloads a valid `.ics` with `DTSTART:20261214T010000Z`.
- [ ] Maps opens in a new tab with the search URL.
- [ ] With `music` set, the control appears with no autoplay; play, pause and the aria states work, and a bad file shows the error.
- [ ] With temporary test gallery entries (not committed):
  - the board fits one screen on desktop and tablet; Shuffle moves the polaroids; hover lifts and straightens a card;
  - on a phone the stack swipes to the next photo without opening the lightbox, Next photo advances, and a tap opens the top photo;
  - the lightbox opens the full image;
  - arrows, swipe and the focus trap work;
  - Escape restores scroll and focus;
  - right-click and drag are blocked only on photos;
  - the watermark shows when configured.
- [ ] With `motorcycle` set, it enters from the left, crosses, fades out on scroll, and stays centred under reduced motion.
- [ ] With reduced motion emulated, there are no animations and all content is visible.
- [ ] With `vendor/gsap.min.js` blocked, all content is still visible.

---

## 14. Definition of done

The folder can be served by any static server or uploaded as-is. Every file in §3 exists with complete content, and all checks in §13 pass. No backend, CDN or invented personal data is present. Optional assets (couple art, motorcycle, music, gallery) switch on by editing only `config.js` and dropping files into `assets/`.

---

## 15. Planned feature prompts (not implemented yet)

Each prompt below is self-contained. Give **one at a time** to an AI coding assistant, together with this whole `prompt.md` and the current `WeddingHTML/` folder. Every rule in §1–§14 still applies:
- static files only, no CDN, no backend;
- no invented personal data, and no repeated facts across scenes;
- relative asset paths validated by `assetUrl`;
- accessibility, safe areas, `prefers-reduced-motion`, and content that stays usable if GSAP or JS fails;
- the §13 checklist must still pass afterwards.

### Shared rules for all three features

1. **Config-driven and off by default.** Add a new export or a new key in `config.js`. When it is disabled or has no content, the feature must not render any markup, nav link, placeholder or empty space.
2. **Never fabricate content.** Leave text, dates and photos as empty arrays or `null`, with commented `// TODO` examples. Do not invent milestones, dates, captions or quotes. Placeholder copy may appear only in code comments.
3. **Separate files.** Use new ES modules and stylesheets (`story.js` / `story.css`, `intro.js` / `intro.css`, `celebration.js`). Import modules from `main.js` and link stylesheets in `index.html`. Each module exports one `init…()` function that returns a cleanup function.
4. **Scene numbering stays correct.** Visible scenes are numbered automatically: replace the gallery's hard-coded `03`→`04` switch with a `renumberScenes()` helper. It walks `main > section:not([hidden]) .scene-number span` in DOM order, skips Welcome, and writes `01`, `02`, … as two-digit numbers.
5. **Visual language.** Use the existing tokens (§6), fonts, flourishes, eyebrows and gold rules. No new colours outside the palette, no stock imagery, no emoji in the UI.
6. **Update the docs.** Update `README.md` (how to configure the feature) and this file (§3 tree, §4 config, §12 bugs, §13 checklist) once the feature is built.

---

### 15.1 Prompt: "Our Story" timeline

> Add an optional **"Our Story" timeline** section to the plain HTML wedding invitation in `WeddingHTML/`, following every rule in `prompt.md`.
>
> **Configuration (`config.js`):**
> ```js
> export const story = {
>   heading: 'Our Story',               // h2; render "Our <em>Story</em>"
>   eyebrow: 'HOW IT ALL BEGAN',
>   lead: '',                            // optional one-line intro; omit the element when empty
>   // TODO: Add the couple's own milestones in chronological order.
>   // Example: { id: 'first-meeting', date: '2019-06', dateLabel: 'June 2019',
>   //   title: 'Where it all began', text: 'Your own words here.',
>   //   image: 'story/first-meeting.webp', thumbnail: 'story/first-meeting-thumb.webp',
>   //   alt: 'Manoj and Dhanushri at …', width: 1200, height: 1500 }
>   milestones: [],
> };
> ```
> - `id`, `title` and `dateLabel` are required.
> - `date` is an optional machine-readable value for `<time datetime>` (`YYYY`, `YYYY-MM` or `YYYY-MM-DD`).
> - `text` is optional; plain text with `\n` becomes separate paragraphs.
> - `image` and `thumbnail` are optional local paths under `assets/story/`. When an image is given, `alt` is required.
> - `width` and `height` are recommended to prevent layout shift.
> - Validate the entries: unique ids, required strings, and safe local paths via `assetUrl`. Log a clear `console.error` and skip invalid entries rather than crashing the page.
>
> **Placement and visibility:**
> - Insert `<section id="story" class="story" hidden></section>` between `#venue` and `#gallery`, plus a hidden nav link "Our story" between "The venue" and "Our memories".
> - Show both only when `story.milestones.length > 0`, then call `renumberScenes()`.
> - Do **not** add the wedding dates or venue as milestones; they belong to Save the Date and Venue. The final milestone may be an engagement or similar real event supplied by the couple.
>
> **Markup** (built with `createElement` and `textContent` only, never `innerHTML` with config data):
> - A scene number with the label "OUR STORY", the eyebrow, the h2, the optional lead and a flourish.
> - An `<ol class="story-timeline">` whose items each contain:
>   - a `<time>` (Playfair, gold, uppercase small caps);
>   - an `<h3>` title (Cormorant);
>   - paragraphs;
>   - an optional `<figure>` holding an `<img loading="lazy" decoding="async" draggable="false">` with an `aspect-ratio` from its width and height, and `object-fit: contain` so faces are never cropped.
> - A small gold ✦ node marks each item on the timeline line.
>
> **Layout:**
> - Background: warm ivory `#fff8e9` with a faint botanical texture. Reuse sparse `botanical-mobile.svg` motifs only if they never sit behind text; otherwise a subtle CSS radial glow is enough.
> - **≥900px:**
>   - A centred vertical 1px gold line (`#d6c3a0`), with items alternating left and right of it.
>   - Each card holds its date, title and text; a photo sits on the opposite side.
>   - Maximum content width 1100px.
> - **<900px:**
>   - A single column with the line at the left, at `left: 20px` plus the safe-area inset.
>   - Content is indented 52px, and the photo appears under the text at full card width.
> - Text needs at least AA contrast. At 320px there must be no horizontal overflow and nothing past the viewport.
>
> **Photo behaviour:**
> - Apply the same casual-copy deterrents as the gallery to story images only: `contextmenu` and `dragstart` prevention, `user-select: none`, `-webkit-touch-callout: none`, and the optional `gallery.watermark` overlay.
> - Story photos are not links. Tapping a photo may optionally open the existing gallery lightbox if the same image id exists in `gallery.entries`; otherwise do nothing.
>
> **Animation (GSAP, with reduced-motion fallback):**
> - The timeline line draws with `scaleY: 0→1` (`transform-origin: top`), scrubbed by ScrollTrigger from `top 75%` to `bottom 60%`.
> - Each item reveals once at `top 85%`: opacity, `y: 28→0` and a `clip-path` mask on the photo, 0.9s `power2.out`. Items on the left drift in slightly from the left and items on the right from the right, by 24px at most.
> - Under reduced motion or without GSAP, everything is visible and static. Animate with `from`/`fromTo` only inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
>
> **Tests:**
> - The section is hidden with `milestones: []`.
> - With 3–5 temporary test milestones (not committed): alternating layout on desktop, single column on phones.
> - Numbering is Celebration 01, Journey 02, Story 03, Memories 04 (when the gallery is on), Invitation 05.
> - No CLS from images.
> - Keyboard and screen reader read the dates as `<time>` in an ordered list.
> - All §13 viewports pass.

---

### 15.2 Prompt: Opening envelope or curtain reveal

> Add an optional **opening reveal** to the plain HTML wedding invitation in `WeddingHTML/`, following every rule in `prompt.md`. Guests see a sealed envelope (or theatre curtain); one tap opens it, reveals the Welcome scene and, if configured, starts the background music.
>
> **Configuration (`config.js`):**
> ```js
> export const intro = {
>   enabled: false,           // TODO: set true to show the opening reveal
>   style: 'envelope',        // 'envelope' | 'curtain'
>   buttonLabel: 'Open the Invitation',
>   startMusicOnOpen: true,   // only has an effect when wedding.music is set
>   remember: 'session',      // 'session' (skip after the first open in this tab) | 'none'
> };
> ```
>
> **Rendering rules:**
> - Build the overlay entirely in `intro.js` and insert it as the first child of `<body>`. The static HTML must not contain it, so guests without JS (and search previews) see the normal page.
> - Skip the intro entirely when any of these is true:
>   - `enabled` is false;
>   - `remember === 'session'` and `sessionStorage.getItem('md-intro-opened') === '1'` (wrap storage access in try/catch for private mode);
>   - the URL has a hash pointing to an existing section other than `#welcome`, such as a shared `#venue` link.
> - The overlay is fixed and full-screen, using `100dvh` with a `100vh` fallback and padding on all four safe-area insets. It uses `role="dialog"`, `aria-modal="true"` and `aria-labelledby` pointing to its visible heading.
> - While it is open:
>   - Set `inert` on `<main>` and `<header>`. Where `inert` is unsupported, also set `aria-hidden="true"`; remove both afterwards.
>   - Lock body scroll by saving and restoring the inline `overflow`, exactly as the gallery does.
>   - Hide the music control.
> - Initial focus goes to the open button.
> - The guest can open it by clicking or tapping the button, pressing Enter or Space on it, or pressing **Escape**. Escape also opens, so keyboard users are never trapped.
> - A small "Skip" text button gives the same result without the animation.
>
> **Visual design (no images, only CSS and inline SVG, so it costs almost nothing to load):**
> - **Envelope:**
>   - The backdrop is the soft cream gradient `#f5e9d3`→`#fff8e9`, with faint gold particles drawn in CSS.
>   - Centre an envelope sized `width: min(86vw, 440px)` with `aspect-ratio: 1.45`. Use ivory paper (`#fffaf0`) with a subtle linen-like gradient, a deep teal liner (`#174f4c`) visible in the triangular top flap, gold edge rules and a soft drop shadow.
>   - A circular gold wax seal (radial gradient from `#e8d18b` to `#b68b53`) carries the "M & D" monogram in Cormorant, with the "&" in Great Vibes.
>   - Under the envelope: an eyebrow "YOU ARE INVITED", the names "Manoj & Dhanushri" as an h2 in Cormorant, and the open button styled as `.primary-button`.
> - **Curtain:**
>   - Two full-height deep-teal velvet panels: a vertical-stripe gradient with fold shading and a gold fringe along the bottom edge.
>   - A gold tie-back rope ornament in inline SVG.
>   - The monogram, eyebrow, names and button are centred over the seam.
> - Below 360px wide, scale the envelope down and keep the button fully visible. On landscape phones (height ≤500px), put the envelope and text side by side.
>
> **Opening sequence (GSAP timeline, about 2.2s; under reduced motion, a 250ms opacity fade only):**
> - **Envelope:**
>   1. The seal scales to 0.85 and fades out (0.35s).
>   2. The flap rotates open: `rotateX(0→180deg)`, `transform-origin: top`, perspective 900px, 0.6s `power2.inOut`.
>   3. An inner ivory card slides up 40% (0.6s).
>   4. The whole overlay scales to 1.04 and fades out (0.7s).
>   5. The overlay is removed.
> - **Curtain:** both panels slide apart (`xPercent: ±100`) with a slight `skewY` easing (1.4s `power3.inOut`), then the overlay fades out.
> - After removal:
>   - Remove `inert` and the scroll lock, and show the music control.
>   - Move focus to the `.monogram` link, using `preventScroll`.
>   - Store `md-intro-opened` in sessionStorage.
>   - Dispatch `document.dispatchEvent(new CustomEvent('invitation:opened'))`.
> - Change `main.js` so the existing Welcome `.hero-reveal` stagger animation starts on `invitation:opened` when the intro is active, and immediately otherwise. The hero must not animate unseen behind the overlay.
>
> **Music on open (iOS and Android autoplay rules):**
> - Call `audio.play()` **synchronously inside the click or keydown handler**, before any `await` or animation callback. Otherwise iOS Safari rejects playback because it is no longer a user gesture.
> - Reuse the single existing `<audio id="music">` element and let its existing `play` and `pause` listeners update the music button's `aria-pressed`, label and icon. Do not create a second `Audio` object.
> - Fade the volume from 0 to 0.6 over 1.5s with `requestAnimationFrame`. iOS ignores `volume`, so playback must still work there without the fade.
> - If `play()` rejects, show nothing alarming: the guest can still use the music button.
> - Only attempt playback when `wedding.music` is set and `startMusicOnOpen` is true.
>
> **Safety:**
> - If GSAP is missing or throws, open instantly with no animation.
> - If any error occurs, remove the overlay and restore the page. **Guests must never be locked out of the invitation.**
> - Add a failsafe: if the overlay is still present 15s after a click (for example, an animation got stuck), force-remove it.
>
> **Tests:**
> - Disabled means no overlay. Enabled means an overlay appears and page content cannot be focused behind it.
> - Click, Enter, Space, Escape and Skip all open it.
> - Focus then lands on the monogram; body scroll is restored and `inert` is removed.
> - Music starts on open in iOS Safari and Android Chrome (real devices) when configured, and the button is pressed (`aria-pressed="true"`, icon Ⅱ).
> - Reloading in the same tab skips the intro. A `#venue` deep link skips the intro.
> - Reduced motion gives a fade only. With GSAP blocked, it still opens. With JS disabled, the normal page shows.
> - It works at 320×568, 390×844, 844×390 and 1440×900, with no overflow.

---

### 15.3 Prompt: Celebration effect when the countdown ends

> Add an optional **celebration effect** to the plain HTML wedding invitation in `WeddingHTML/`, following every rule in `prompt.md`. When the muhurtham countdown reaches zero, a gentle shower of falling flower petals (or gold confetti) plays over the page.
>
> **Configuration (`config.js`):**
> ```js
> export const celebration = {
>   enabled: false,            // TODO: set true to enable
>   style: 'petals',           // 'petals' (jasmine, rose, marigold) | 'confetti' (gold and ivory flecks)
>   durationMs: 7000,
>   replayAfterEvent: true,    // also play once per session for visitors arriving after the muhurtham
> };
> ```
>
> **Triggers:**
> 1. **Live transition:** in `main.js`, the countdown already detects `remaining === 0`, clears its interval and shows "Our forever has begun." At that moment, call `celebrate()` once.
> 2. **Later visits:** if the page loads after the muhurtham and `replayAfterEvent` is true, play once per session (sessionStorage key `md-celebrated`, inside try/catch). Play the first time the Save the Date countdown area scrolls at least 40% into view, using an `IntersectionObserver` that disconnects after firing.
> - Never loop forever, and never play more than once per trigger.
> - Add an optional small "✦ Shower petals" `.text-link` button, shown only in the finished state, to replay manually. It must be throttled so it cannot stack effects.
>
> **Implementation (`celebration.js`, no libraries):**
> - Export `celebrate(options)`, which returns a Promise that resolves when the effect ends.
> - Create a single `<canvas aria-hidden="true">` that is fixed over the whole viewport: `inset: 0`, `pointer-events: none`, `z-index: 25`. That is above the scenes but below the music control (30) and the gallery lightbox.
> - Size the canvas to `innerWidth` × `innerHeight` × `min(devicePixelRatio, 2)`, and handle resize with a passive listener during the effect.
> - Particle count scales with area: about 28 below 600px wide, about 45 on tablets, and about 70 on desktop.
> - Each particle has a random x, starts above the viewport, and falls at 40–110 px/s with sinusoidal sway of amplitude 20–60px. It rotates slowly (and flips on the Y axis for petals, simulated with `scale(cos θ, 1)`), with opacity from 0.7 to 1.
> - Petals are teardrop and rounded-oval shapes drawn with `bezierCurveTo`. Use jasmine ivory `#fff4d8` with a `#e8d18b` centre tint, rose `#ebc9b0`, marigold `#e8a24a`/`#d6b56f`, and a few small leaf-green `#839062` pieces.
> - Confetti uses small rectangles and circles in `#d6b56f`, `#e8d18b`, `#fff8e9` and `#b68b53`.
> - Use `requestAnimationFrame` with delta-time movement. New particles stop spawning after `durationMs − 2000`, and the effect ends once every particle has left the screen. Then cancel the frame loop, remove the listeners and **remove the canvas from the DOM**.
> - Pause while `document.hidden` is true (`visibilitychange`), resume afterwards, and don't let elapsed time jump.
> - Respect `prefers-reduced-motion: reduce`: do not animate. Instead, briefly highlight the "Our forever has begun." text with a soft gold glow, made with a CSS class and no motion.
> - Keep the page scrollable and every control clickable while the effect plays. Do not change the layout, so there is no CLS.
>
> **Accessibility and performance:**
> - The canvas is decorative. The finished-state text is already in the DOM, so screen readers get no extra announcement.
> - Keep each frame under about 4ms on a mid-range phone, with no `shadowBlur` and only simple paths. If two consecutive frames take longer than 50ms, halve the particle count.
>
> **Tests:**
> - Temporarily set `muhurtham.iso` to about 20 seconds in the future, without committing it. The countdown reaches 00 and petals fall once, then the canvas is removed. Check that no frame loop keeps running and the DOM has no leftover canvas.
> - With a past date and `replayAfterEvent: true`, it plays once when the countdown scrolls into view and does not play again after a reload in the same tab.
> - Under reduced motion there is no canvas, only the glow.
> - The replay button cannot stack effects. Tabbing away pauses the effect.
> - It works at 320×568 and 2560×1440.
> - Nothing blocks taps on buttons, links, the menu or the music control while it plays.
