# Manoj & Dhanushri — HTML invitation

A static, React-free version of the invitation using HTML, CSS and JavaScript. GSAP and ScrollTrigger are included locally; no backend, package installation or build is required.

The bundled GSAP files retain their license headers; their use is subject to the [GSAP standard license](https://gsap.com/standard-license).

See `prompt.md` for a complete specification to recreate this site from scratch, including every file, layout value and previously fixed bug.

## Run and deploy

Serve this folder with any static web server, for example run `python3 -m http.server 8000` from this folder, then open `http://localhost:8000/`. JavaScript modules may not load when the page is opened directly as a `file://` URL. Deploy the contents of this folder to any static host, including a subdirectory.

## Configure

The invitation uses four content-led scenes: Welcome, Save the Date (including the countdown and calendar download), Find the Venue, and the closing invitation. When gallery entries are supplied, Memories becomes the fifth scene and its navigation link appears automatically. Empty gallery placeholders are not shown to guests.

- Edit `config.js` for wedding details, local background images and optional artwork paths. The current SVG scenes are decorative fallbacks, not portraits of the couple.
- Each background has a landscape and a portrait composition, configured in `backgrounds` and `mobileBackgrounds`. The choice depends on each section's own shape, not the device: portrait art is used when a section is taller than 80% of its width. As a result, a short section on a portrait tablet still uses landscape art.
  - The portrait mandapam and botanical scenes are responsive SVG frames with no `viewBox`. The roof, pillars, lamps, branches and vases stay pinned to the edges at their natural size and are never stretched. The smallest details are hidden below 480px.
  - On very wide screens, scenes anchor their key artwork: the mandapam roof at the top, the countryside road near the bottom and the closing vases at the bottom.
  - If you replace `beach.svg`, `beach-mobile.svg`, `mandapam.svg` or `mandapam-mobile.svg`, update the waterline, roof and garland measurements at the top of `main.js` (`beachArt`, `MANDAPAM_ROOF`). The animated shimmer and the heading clearance depend on them.
- **Placeholder assets are currently installed.** Replace them before guest release:
  - **Couple art:** `assets/images/couple/couple-beach.svg`, `couple-wedding.svg`, `couple-portrait.svg` and `motorcycle.svg` are original, generic flat illustrations. Replace them with flat-style illustrations of the couple (see "Couple artwork" below), keeping the same file names or updating the paths in `config.js`. Couple art is capped at 28% of the viewport height so the closing scene fits on one screen.
  - **Gallery:** 21 pre-wedding photos of Manoj and Dhanushri live together in `assets/gallery/`. Original JPGs are kept alongside optimized WebP display and thumbnail files; no stock photos are used.
  - **Music:** `assets/music/wedding-background.m4a` is an original synthesized veena-and-tanpura loop in raga Mohanam (58 seconds, royalty-free). To use a different licensed track, change `music` in `config.js`. The player never autoplays.
- **Gallery layout:** `1Q7A0233` always comes first; the remaining photos are randomized each time the gallery loads. The polaroid board adapts its columns and card size to the photo count and available space. On desktop and tablet the photos are scattered and tilted; hovering lifts one, tapping opens it full screen and "Shuffle photos" re-scatters them. On phones (and short landscape screens) they form a stack: swipe the top photo away or tap "Next photo", and tap to open. Keep captions to a few words; they appear on the polaroid strip. Previews are square crops of the thumbnail; the full photo is shown uncropped in the viewer.
- Confirm the Google Maps search result with the venue before sharing; no unverified place ID or coordinates have been supplied.

### Remove gallery photos

1. In `config.js`, remove the entire unwanted photo entry from `gallery.entries`. The gallery layout adjusts automatically to the remaining photos.
2. Optionally remove that photo's files from `assets/gallery/`: its original `.JPG`, full-size `.webp` and `-thumb.webp` thumbnail. Keep them if you may want to add the photo back later.
3. If you delete the files, make sure no remaining entry in `gallery.entries` refers to them.

## Couple artwork: illustrations vs. original photos

Use **illustrations** for the scene art and your **original photos** in the gallery.

- The backgrounds (beach, mandapam, countryside, botanical) are flat vector art. A cut-out photo placed on them looks pasted: the light, shadows and sharpness don't match.
- Couple art is small (at most 360px wide and capped at 28% of the screen height), so photographic detail is lost anyway.
- The gallery is built for real photos: polaroid previews that open full size in the viewer.

| Spot | Use |
|---|---|
| Welcome (beach), Save the Date (wedding), Invitation (portrait), motorcycle | Illustrated versions of the couple |
| Gallery (6–15 photos) | Original photos |

### Illustration files

| File | Size (2×) | Notes |
|---|---|---|
| `couple-beach.webp` | ~720×880 | full length, standing |
| `couple-wedding.webp` | ~720×880 | full length, wedding attire |
| `couple-portrait.webp` | ~720×608 | waist-up |
| `motorcycle.webp` | ~840×608 | side view, riding left → right |

- Use transparent PNG or WebP, trimmed tight, with the feet (or tyres) touching the bottom edge. The art sits on the bottom of its box.
- Save the files in `assets/images/couple/` and update the paths in `config.js`, relative to `assets/` (for example `coupleBeach: 'images/couple/couple-beach.webp'`). The layout adapts to any size.

### Gallery photos

- WebP, full size (~1600px on the long side) plus a `-thumb` version (~600px).
- Previews are square crops, so keep faces near the centre; the viewer shows the full photo.
- Captions: 2–4 words.

## Create couple illustrations with ChatGPT

Use these prompts with an image generator such as ChatGPT. They produce **flat vector-style** art that matches the illustrated scenes. Use the images only with the couple's permission, and review faces, hands, jewellery and clothing with them before publishing.

Workflow:
1. Generate one image, approve it, then attach it with later requests so every scene stays consistent.
2. Image generators cannot guarantee an exact likeness, so expect a couple of tries per image. If a face drifts, reply: "The face does not match the photo. Keep the original facial features exactly and regenerate."
3. Use sharp, well-lit, front-facing photos. Several angles help.

### 1. Convert any photo into a matching illustration

Use this for the beach, wedding and portrait art: upload the photo of that moment (or outfit), then paste:

> Convert the uploaded photograph into a flat vector-style illustration for a South Indian wedding invitation website.
>
> **Keep exactly the same:**
> - each person's face: shape, eyes, nose, lips, eyebrows, jawline, smile, facial hair and expression;
> - natural skin tone, matched precisely, with no lightening, darkening or colour shift;
> - body shape, height, build and proportions, with no slimming, reshaping or posture change;
> - hairstyle, clothing, jewellery, accessories and pose, exactly as in the photo;
> - age, so no one looks younger or older.
>
> **Style:**
> - clean, modern flat vector illustration with soft shapes and gentle shading (2–3 tones per area) and no harsh outlines;
> - a warm, elegant palette that suits ivory, sage green, antique gold, terracotta and blush pink, while keeping the original clothing colours recognisable;
> - soft, warm lighting with a subtle contact shadow under the feet.
>
> **Output:**
> - only the people, isolated on a fully transparent background, with no scenery, floor, frame or border;
> - full length, head to toe, nothing cropped, tightly framed, with the feet at the bottom edge;
> - high resolution, at least 1440px tall, as a PNG.
>
> **Do not:** beautify, airbrush, idealise, change the face or merge features between people; add text, a watermark, extra people or extra limbs; use anime, cartoon or chibi exaggeration, 3D or a photorealistic render.

For the closing portrait, change "full length, head to toe" to "waist-up portrait, both people fully visible" and ask for about 1440×1216px.

### 2. Couple riding a motorcycle (from any photo)

Upload one or more photos of the couple (and optionally the bike), replace `[NAME 1]` and `[NAME 2]`, then paste:

> Using the uploaded photograph(s) as exact identity references, create a flat vector-style illustration of this couple riding a motorcycle together, for a wedding invitation website.
>
> **Keep exactly the same:**
> - each person's face, features, expression, natural skin tone, hairstyle, facial hair, body shape and proportions, as in the photos;
> - their clothing from the photos; if the photos don't show riding clothes, use simple, modest casual outfits in matching colours.
>
> **Scene:**
> - a strict side view with the motorcycle travelling **left to right**;
> - [NAME 1] rides in front, [NAME 2] sits behind, holding on naturally (hands on the rider's waist or shoulder);
> - both wear open-face helmets in colours that suit the outfits; faces stay fully visible and unchanged;
> - a realistic classic motorcycle with two round wheels, correct proportions, headlight, mirror and exhaust; if a bike photo is uploaded, match its model and colour;
> - a relaxed, happy, natural pose with a slight lean and hair or a dupatta moving gently in the wind;
> - a subtle contact shadow under the tyres.
>
> **Style:**
> - clean flat vector illustration with soft shading (2–3 tones), no harsh outlines, and warm golden-hour light;
> - a palette that suits ivory, sage green, antique gold, terracotta and blush pink.
>
> **Output:**
> - the bike and both riders only, on a fully transparent background, with no road, scenery or frame;
> - everything in frame, tightly cropped, tyres touching the bottom edge;
> - landscape, about 1680×1216px, as a PNG.
>
> **Do not:** change or beautify the faces, alter skin tone or body shape, add extra riders, limbs or wheels, distort the wheels, add text or a watermark, or use anime, cartoon, 3D or a photorealistic render.

Save the result as `assets/images/couple/motorcycle.webp` (and set `motorcycle` in `config.js`). The site animates it across the Save the Date screen as you scroll.

If the generator cannot provide transparency, remove the background separately and inspect the edges.

## Responsive layout and motion

Fonts are self-hosted in `assets/fonts/` (Latin subsets, `font-display: swap`):

- Cormorant Garamond for headings and editorial text.
- Playfair Display for supporting headings and numerals.
- Great Vibes for script accents.

All three are licensed under the SIL Open Font License, and their licence files are included. No font CDN is used.

Every section is at least one full screen tall, so the navigation links, "Join Our Journey" and "Scroll to explore" land on exactly one scene. Sections with more content, such as Save the Date on most devices, grow taller and scroll on. Portrait layouts switch to dedicated mobile SVG compositions; the narrowest screens stack the event dates. Navigation and the photo viewer account for short viewports, touch controls and safe areas. Optional character artwork occupies its own layout space rather than covering the text.

On load, a layered envelope invitation opens with a slow flap-and-card reveal when tapped; guests can skip the intro or press Escape. The page remains available if JavaScript or native dialog support is unavailable.

GSAP respects `prefers-reduced-motion`, with a readable static layout if animation libraries are unavailable. The motorcycle uses one scroll-linked timeline for its entrance, travel and fade-out; reduced-motion mode leaves it centered and visible. A single flattened motorcycle image cannot animate its wheels independently: separate wheel layers would be needed for that effect.

On page load, a full-screen, decorative heart shower starts and continues while guests scroll, stopping at the end of the page. It never blocks controls and is skipped when reduced motion is enabled.

Browser verification covers viewport sizes from 320px to 2560px wide, including phone landscape. With the placeholder assets, headed Chrome checks at six sizes confirm that every menu link lands at the top of a full-screen section, the polaroid gallery (shuffle, hover, swipe stack) and lightbox work, the music plays, and there are no console errors or failed requests. Physical iPhone Safari and Android Chrome checks, and the final couple artwork, photos and music, should still be verified before guest release.

The gallery watermark and context-menu, drag and copy deterrents only discourage casual copying. They cannot prevent screenshots, screen recording or developer-tools access.
