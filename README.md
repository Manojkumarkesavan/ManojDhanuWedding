# Manoj & Dhanushri — HTML invitation

A static, React-free version of the invitation using HTML, CSS and JavaScript. GSAP and ScrollTrigger are included locally; no backend, package installation or build is required.

The bundled GSAP files retain their license headers; their use is subject to the [GSAP standard license](https://gsap.com/standard-license).

## Run and deploy

Serve this folder with any static web server, for example `python3 -m http.server 8000 --directory WeddingHTML`, then open `http://localhost:8000/`. JavaScript modules may not load when the page is opened directly as a `file://` URL. Deploy the contents of this folder to any static host, including a subdirectory.

## Configure

- Edit `config.js` for wedding details, local background images and optional artwork paths. The current SVG scenes are decorative fallbacks, not portraits of the couple.
- Place supplied couple and motorcycle illustrations in `assets/images/couple/`, and set the matching paths in `config.js`.
- Add the real photos to `assets/gallery/` and populate the gallery entries in `config.js`; an example is included there. Use WebP or AVIF thumbnails and full-size images. Empty categories are hidden and no substitute images are displayed.
- Put licensed music in `assets/music/wedding-background.mp3` and set `music` to `music/wedding-background.mp3` in `config.js`. The player appears only when a track is configured and never autoplays.
- Confirm the Google Maps search result with the venue before sharing; no unverified place ID or coordinates have been supplied.

## Create realistic couple illustrations

Use the following prompts with an image generator such as ChatGPT. Upload clear, well-lit reference photographs of both people, preferably showing their faces from more than one angle, along with outfit references if available. Create the first image, then attach it alongside the original photos when generating the other scenes to help maintain consistent likenesses. Review the results with the couple: generated faces, hands, jewelry and clothing may need correction.

These are **illustrations for the invitation**, not replacements for the real pre-wedding photographs in the gallery. Use the images only with the couple's permission.

### 1. Wedding-attire couple

> Using the uploaded photographs as the primary identity references, create an original, photorealistic full-length digital illustration of this couple standing together for a traditional South Indian wedding invitation. Preserve each person's recognizable facial structure, facial features, natural skin tone, hairstyle, body proportions and, where present in the references, facial hair. Do not beautify, change their age, lighten their skin or merge their features. Use the uploaded outfit references where provided; otherwise dress them in elegant, understated traditional South Indian wedding attire without inventing family or religious details. Render realistic fabric texture and folds, jewelry, hands, natural expressions, accurate anatomy, soft shadows and warm golden light. Show both people clearly from head to toe in a natural pose. Isolate the couple on a transparent background with clean edges and no cast-off body parts. No text, lettering, watermark, extra people, cartoon, anime, plastic skin or exaggerated features.

### 2. Beach welcome couple

> Using the uploaded photographs and the approved wedding-attire couple illustration as identity references, create an original, photorealistic full-length digital illustration of the same couple standing close together naturally for a dreamy beach wedding invitation. Match their recognizable faces, natural skin tones, hairstyles, facial hair and body proportions to the references. Keep their clothing and appearance consistent with the approved illustration unless an uploaded outfit reference specifies otherwise. Use gentle sunset light, subtle coastal warmth, realistic hands, detailed fabric, natural shadows and photographic detail. Compose them from head to toe, facing slightly toward the viewer, with space around their silhouettes. Output the couple as an isolated transparent-background layer, with clean edges and no beach background, text, lettering, watermark, extra limbs, cartoon or anime styling.

### 3. Motorcycle journey

> Using the uploaded photographs and the approved couple illustration as identity references, create an original, photorealistic digital illustration of the same couple riding together on a realistic motorcycle, shown in a clear side view travelling from left to right. Preserve their recognizable faces, natural skin tones, hairstyles, facial hair and body proportions. Give both riders natural, anatomically correct seated poses and hands; show appropriate helmets and safe, realistic clothing. Depict accurate motorcycle proportions, two circular wheels, tires, detailed bodywork, mirrors, headlight and a subtle contact shadow. Use warm countryside sunset lighting, realistic reflections and detailed textures. Keep the entire motorcycle and both riders in frame as a single isolated transparent-background layer, without a road or background. No text, lettering, watermark, extra riders, extra limbs, distorted wheels, cartoon or anime styling.

### 4. Closing couple portrait

> Using the uploaded photographs and the approved couple illustration as identity references, create an original, photorealistic portrait of the same couple for the closing scene of a South Indian wedding invitation. Preserve their recognizable facial features, natural skin tones, hairstyles, facial hair, ages and proportions; do not alter or blend their identities. Keep their attire and jewelry consistent with the approved wedding illustration or uploaded outfit references. Show natural expressions and realistic hands, skin texture, fabric and soft golden lighting. Compose a generous waist-up portrait with both people fully visible and isolate it on a transparent background with clean edges. No text, lettering, watermark, extra people, cartoon, anime or overly airbrushed skin.

Save approved images as local WebP or PNG files under `assets/images/couple/`. If the generator cannot provide transparency, remove the background separately and inspect the edges. Set the corresponding `coupleWedding`, `coupleBeach`, `motorcycle` and `couplePortrait` paths in `config.js`, relative to `assets/`.

The gallery watermark and context-menu, drag and copy deterrents only discourage casual copying. They cannot prevent screenshots, screen recording or developer-tools access.