# Rajput — design replacement, version 2

This replaces the rejected warm editorial design. The owner's brief remains authoritative for identity and content; the user's follow-up asks for a much more ambitious visual composition and motion, with the clarity and polish of an Apple product presentation.

## Visual direction

A cinematic culinary product experience: black and near-white, oversized Manrope/Noto Sans KR typography, close studio food images, a restrained vivid orange detail, generous changes of scale and full-screen compositions. The earlier green/paper palette, serif wordmark, numbered editorial index and stamp motif are removed. The proposed RAJPUT wordmark uses a simple orange dot; it is not an official restaurant logo.

Three possible resets were considered: a bright gallery of isolated dishes, an expressive kinetic poster, and the selected cinematic product presentation. The selected direction gives food the strongest presence, supports meaningful scroll transitions and remains legible in Korean and English. The bright gallery felt too close to a conventional menu landing page; the poster risked obscuring navigation.

## Composition

1. Full-viewport curry image and large location-led headline.
2. Quiet light section with a large statement; its final phrase darkens as the reader scrolls.
3. Pinned food sequence: tandoor, naan, curry. Images crossfade and ease into scale while the active chapter and progress respond to scrolling. Chapter buttons move directly to the corresponding position in the sequence.
4. A contrasting light menu invitation: large image and compact browse action.
5. Clear address and arrival information, then an oversized wordmark footer.

The menu and QR pages use the same typography and control language. Search, filters, item details, language persistence, source disclosures, address copying and map searches remain functional. The homepage avoids a permanent bottom action overlay; the menu retains compact mobile navigation.

## Motion and accessibility

Entrance motion, restrained hero parallax/fade, reveal transitions, the scroll-driven pinned sequence, active chapter progress and dialog transitions create a continuous experience. Scroll work is requestAnimationFrame gated. Navigation and category controls are semantic links/buttons; dialogs preserve focus and support Escape. Inactive food slides are inert. Reduced-motion visitors get static images and three sequential food panels with no pinning or animated transitions. Browser tests cannot substitute for a real-device or assistive-technology audit.

## Assets

Three new conceptual raster images were created using the built-in image generation tool, then converted to WebP without substantive edits:

- `dist/assets/hero-v2.webp`: rich curry in a low black ceramic bowl, near-black studio, warm spotlight and negative space on the left.
- `dist/assets/tandoor-v2.webp`: tandoori chicken on a dark plate, charred texture, warm directional light and subtle smoke.
- `dist/assets/naan-v2.webp`: torn blistered naan on a sculptural dark plate, cream stone surface, grazing light.

Prompts specified photorealistic premium food campaign imagery, no people, text, watermarks or graphics, and explicitly described conceptual food rather than authentic Rajput dishes. Each image is labelled conceptual in the interface. Replace all three with owner-authorized restaurant photography before an official launch. The curry is not asserted to be a photograph of lamb do piaza; its alt text says it is a concept image, not an actual menu dish. No interior image was invented.

Fonts load from the official Google Fonts CSS endpoint with system fallbacks. The QR asset and exact production menu destination are preserved. Hosting remains owner-private.
