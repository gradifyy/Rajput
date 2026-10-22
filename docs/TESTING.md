# Validation — redesign

## Automated checks
`npm run build` and `npm run check` passed. The 20 Node tests cover bilingual translation completeness, content/data integrity, image availability, category/search combinations, Korean and English queries, aliases, empty results, HTML escaping, root/subdirectory paths, QR destinations, language persistence/blocked storage, absence of assistant branding in rendered source, QR matrix generation and route shells.

The vendored QR encoder output was independently decoded with zxing-cpp. A custom-domain/subdirectory destination decoded exactly as encoded.

## Browser checks
- Desktop homepage, menu and QR layouts inspected.
- Korean and English switching works; language remains selected after route navigation.
- Two curries shown for Curries; Korean search `새우` finds Prawn makhani while using English.
- Drinks returns one item; impossible queries show empty state; reset restores all six entries.
- Dish modal opens; Escape closes it. Native dialog provides focus containment.
- Mobile navigation opens and closes with Escape. Menu filter remains selected when switching language.
- Phone and tablet viewport frames at nominal widths 320, 390 and 768 pixels were inspected. Actual content viewports were 305, 375 and 753 pixels because of browser scrollbars. Each document's content width equalled its viewport width: no horizontal page overflow.
- QR renders on its independent route; current-origin/base-path URL is used. SVG includes an opaque white background for reliable printing.
- Menu-link copying produced a success confirmation after a synchronous clipboard fallback was added.
- Map links inspected for the exact restaurant/address query. No invented coordinates or place IDs are used.

## Limits
Browser automation's download capture timed out for the generated SVG despite the native downloadable link and generated blob being present. Do not claim end-to-end download capture was verified. The QR encoding/decoding itself passed independent verification. Print stylesheet and print action are implemented; physical printing and physical camera scanning were not performed. External map applications, Safari and physical phones were not exercised. No automated accessibility audit or business-owner content approval has occurred.

The site is a reviewable design, not an approved official restaurant launch. Source deployment instructions include custom-domain and subdirectory support.
