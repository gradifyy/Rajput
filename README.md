# Rajput · India, in Busan

The rebuilt cinematic Korean/English website for 라즈뿟 인도요리 in Deokcheon, Busan: full-screen food imagery, scroll-driven tandoor/naan/curry chapters, a searchable menu, dish details, location links and printable QR artwork.

## Run and verify

Node.js 20 or later. No dependency installation required.

```sh
npm run dev
```

Open http://localhost:4173. Set `PORT` if needed.

```sh
npm run check
```

This checks module syntax, builds `dist/`, then runs the test suite. `npm run build` builds only. Upload `dist/` to a static host; repository changes alone do not enable hosting.

For hosting under a project path:

```sh
BASE_PATH=/Rajput/ npm run build
```

Routes: `/`, `/menu/`, `/qr/`. The menu QR is generated locally from the visitor's current origin and configured base path; it never points to the private design-preview host. Print customer cards only from the approved final public domain after a signed-out access test.

## Source

- `src/index.html` — page shell and metadata
- `src/app.js` — renderers, motion, search, filters, dialogs and QR interactions
- `src/menu-data.js` — nine bilingual menu records with evidence and confirmation status
- `src/i18n.js` — Korean/English interface labels
- `src/style.css` — responsive compositions, motion, focus and print styles
- `src/utils.js` — path, search, storage and QR URL helpers
- `public/assets/` — three new concept food images and proposed favicon
- `public/vendor/qrcode.js` — existing MIT-licensed QR encoder, retained
- `scripts/` — dependency-free build/server, retaining base-path support
- `tests/` — behavior, content-integrity and build checks
- `docs/` — research, design rationale, approval checklist and QA

The design includes reduced-motion support. Language persists when storage is available and falls back safely when storage is blocked. The generated food images and proposed wordmark are concept assets, not authentic restaurant photography or an official logo.

## Approval status

This is a private client demonstration by Ayro. Current prices, hours, contact details, menu availability and real photography require owner approval. No booking or payment is collected. Search indexing stays disabled. No official public launch is authorized by this source transfer.

See [content status](docs/CONTENT_STATUS.md), [research](docs/RESEARCH.md), [design](docs/DESIGN.md), [owner approval](docs/OWNER_APPROVAL.md), [third-party notices](docs/THIRD_PARTY_NOTICES.md) and [testing](docs/TESTING.md).
