# Rajput · 라즈뿟 인도요리

A Korean-first restaurant website and digital menu for Rajput in Deokcheon, Busan. The new direction uses cream, wine, expressive restaurant typography and daylight food imagery. This is an **unofficial design demonstration**, not an owner-approved restaurant launch.

## Run

Node.js 20+. No runtime dependencies or installation step.

```sh
npm run dev
```

Open `http://localhost:4173`. `PORT` changes the port.

```sh
npm run check
```

Checks JavaScript syntax, builds `dist/`, and runs 18 tests. Build only with `npm run build`. Vercel uses the retained root `vercel.json`: Other framework, build `npm run build`, output `dist`. The repository's default branch is `buy`.

For a project subpath:

```sh
BASE_PATH=/Rajput/ npm run build
BASE_PATH=/Rajput/ npm test
```

Use the same base path in development. Root routes are `/`, `/menu/`, `/qr/`; unknown routes receive the custom 404 experience. Static hosting must serve the generated route directories and `404.html`.

## Features

- Bilingual Korean/English interface, bilingual dish names and persistent language preference with blocked-storage fallback.
- Nine curated provisional records across five categories; category filters, Unicode-normalized search, clear/reset and empty states.
- Accessible native dish dialogs, keyboard close and focus restoration; deep links such as `/menu/?dish=garlic-naan`.
- Naver, Kakao and Google map searches using the cross-checked name/address, plus address copying with an error fallback.
- Locally generated QR, native SVG download link and A5 print styles. The destination always uses the current origin plus configured base and `/menu/`; no third-party QR service.
- Responsive compositions, optimized WebP, lazy secondary images, modest reveals and reduced-motion support.

## Edit

| File | Responsibility |
| --- | --- |
| `src/menu-data.js` | Dish content, evidence, category, price/status, visibility and image association |
| `src/i18n.js` | Korean/English interface copy |
| `src/app.js` | Page compositions and interactions |
| `src/style.css` | Visual system, responsive rules, focus and print styles |
| `src/utils.js` | Escaping, search, base paths, safe storage and menu URLs |
| `src/index.html` | Shared shell and preview metadata |
| `public/assets/` | Concept food photographs and proposed favicon |
| `public/vendor/qrcode.js` | Retained MIT QR encoder |
| `scripts/` | Dependency-free build and local server |

Dish prices are `null`, availability is unconfirmed, and tags are empty deliberately. Owner-approved data should replace provisional records; the nine records are not a complete menu. No ordering, payment, booking, analytics, or customer-data collection is implied. Contact numbers and opening hours are withheld because sources conflict. Font requests use Google Fonts with system fallbacks.

All food photographs and the proposed wordmark are concept assets, not authentic Rajput photography or its official logo. The demo retains robots/meta/header noindex directives. These directives discourage indexing; they are not access control. Do not distribute table cards until owner approval and a signed-out physical phone scan succeed.

See [research](docs/RESEARCH.md), [content status](docs/CONTENT_STATUS.md), [design](docs/DESIGN.md), [owner approval](docs/OWNER_APPROVAL.md), [testing](docs/TESTING.md) and [third-party notices](docs/THIRD_PARTY_NOTICES.md).
