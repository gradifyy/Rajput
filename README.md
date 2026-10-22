# Rajput · Indian Cuisine

A responsive Korean/English restaurant website for Rajput in Deokcheon, Busan. Includes an editorial homepage, searchable digital menu, dish details, location links and a printable table-menu QR.

## Run locally

Requires Node.js 20 or later. No dependency install is required.

```sh
npm run dev
```

Open `http://localhost:4173`. Set `PORT` to use a different port.

```sh
npm run build
npm run check
```

The production output is `dist/`. The check command validates JavaScript syntax and runs the Node test suite. Run the build before running checks from a fresh checkout.

## Deploy

Upload `dist/` to any static host. The site has no server, accounts, paid service dependencies or external QR API. All three routes are generated as independent HTML documents:

- `/` — restaurant homepage
- `/menu/` — bilingual digital menu
- `/qr/` — QR download and printable table card

For a project subdirectory, set the base path when building:

```sh
BASE_PATH=/Rajput/ npm run build
```

The QR always uses the active domain and configured base path. Generate customer QR cards from the final public website, not a local or restricted preview. A custom domain is managed by the chosen host; adding source to a repository does not automatically enable hosting.

## Edit content

- `src/data.js` — menu entries, categories, business information and photo provenance. Data shapes are documented with JSDoc.
- `src/i18n.js` — complete Korean and English interface text.
- `src/app.js` — rendering, navigation, language persistence, search, dialog, clipboard and QR behavior.
- `src/style.css` — responsive layouts, keyboard focus, reduced motion and print styles.
- `src/index.html` — page shell, fonts and metadata.
- `public/assets/` — local photos and favicon.
- `public/vendor/qrcode.js` — bundled QR encoder, MIT licensed.
- `scripts/` — static build and local server.
- `tests/` — behavior and content-integrity checks.
- `docs/` — research, asset rights, testing and launch requirements.

The interface defaults to Korean and remembers language locally. Search works across both languages and supports category filtering. QR generation is local. No form collects personal data; map and listing links open their respective services.

## Content status

This is a restaurant design preview. Menu entries, prices, opening hours, contact details and photography need restaurant approval before official launch. Unconfirmed prices and contact numbers are not fabricated. Stock photography is labeled as illustrative. Search indexing remains disabled until launch approval.

See [content status](docs/CONTENT_STATUS.md), [owner approval](docs/OWNER_APPROVAL.md), [research](docs/RESEARCH.md), [third-party notices](docs/THIRD_PARTY_NOTICES.md) and [validation](docs/TESTING.md).
