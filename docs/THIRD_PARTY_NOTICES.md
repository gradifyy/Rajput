# Assets and third-party notices

## QR encoder

The existing `public/vendor/qrcode.js` is retained: QR Code Generator for JavaScript, Copyright (c) 2009 Kazuhiko Arase, MIT licence. Its copyright/licence header remains intact. No external QR service receives the menu URL.

## Fonts

DM Serif Display, DM Sans and Noto Sans KR are requested from the official Google Fonts CSS/CDN service, with system fallbacks. The families are distributed under the SIL Open Font License through Google Fonts. No font binary is bundled.

## Concept images and identity

`table.webp`, `tandoori.webp`, `naan.webp` were newly generated for this design and converted to WebP. They are not photographs of actual Rajput food or interiors. The original proposed type wordmark/favicon are not asserted to be official registered business artwork. See DESIGN.md for direction and replacement requirements.

No review/directory photographs were reused. The rejected cinematic v2 assets were removed from the current build. Research quotations are limited to the short source-contamination identifiers needed to document the discrepancy.

Prettier was used as a development formatting tool; ZXing-C++ was used outside the project for independent QR image decoding. Neither adds a runtime dependency or ships in the website.
