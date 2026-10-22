# Verification · 22 October 2026

## Completed automated checks

- JavaScript syntax checks for all four modules; dependency-free production build; **18/18 Node tests pass**.
- Root build and `/Rajput/` base-path build both pass the full suite. Tests cover bilingual labels, content provenance/status, unknown-price safeguards, verified-price formatting, category/Unicode search, safe HTML escaping, URL normalization, blocked storage, real QR matrix/SVG generation and route shells.
- `git diff --check` clean. No runtime package dependency was introduced. Existing Vercel build/output configuration retained.
- Initial deployment comparison: live Vercel and the old repository build matched byte-for-byte for the HTML and five application/style/data modules. The old cinematic presentation was visibly confirmed before replacement. See RESEARCH.md.

## Visual browser checks

Used the managed Chrome browser through the Sites preview supervisor. A temporary iframe harness exercised real layout viewport widths; large widths were scaled only for fitting screenshots, not for layout measurement. Scrollbars reduced the content area by 15px. These are browser layouts, not claims of physical-device testing.

| Nominal viewport | Homepage content/scroll | Menu content/scroll | QR content/scroll |
| --- | --- | --- | --- |
| 320 | 305 / 305 | 305 / 305 | 305 / 305 |
| 375 | 360 / 360 | 360 / 360 | 360 / 360 |
| 390 | 375 / 375 | 375 / 375 | 375 / 375 |
| 768 | 753 / 753 | 753 / 753 | 753 / 753 |
| 1024 | 1009 / 1009 | 1009 / 1009 | 1009 / 1009 |
| 1440 | 1425 / 1425 | 1425 / 1425 | 1425 / 1425 |
| 1920 | 1905 / 1905 | 1905 / 1905 | 1905 / 1905 |

No document-level horizontal overflow was found. Home/menu width sweeps used Korean; the QR sweep used English. Additional English menu, Korean detail, English detail, English visiting information and Korean shared-table compositions were inspected. All three home images loaded successfully. Secondary lazy images were also inspected after navigation.

Saved representative views in `docs/qa/`: home mobile/desktop, menu mobile/desktop, mobile detail, mobile navigation, QR, and final desktop homepage. Screenshots include the test harness where relevant. Full-page screenshot capture timed out in this environment; viewport screenshots were used. The temporary QA harness, error fixture and subpath fixture are removed by the final clean production build.

## Actual interactions exercised

- Menu: ` GARLIC ` returns garlic naan; switching to curry with that search yields the useful empty state; reset restores all nine records.
- English interface: Korean `사모사` finds samosa. Categories, clear, reset and language switching work; UI language persists between actual route loads.
- Tandoori detail opens from the menu. Escape and close work; focus returns to the originating dish button. Native modal semantics are used. `/menu/?dish=garlic-naan` opens the matching Korean detail with the correct conceptual image.
- Mobile navigation opens, shows actual links, and dismisses with Escape while restoring focus to its toggle.
- FAQ disclosure opens its answer. Home/table/visit anchors navigate to the intended content.
- Clipboard: this browser did not complete the write; the new bounded fallback displays “Could not copy. Select and copy the address below.” The plain address remains selectable. A successful clipboard permission flow was not observed.
- Naver/Kakao/Google link values were inspected: each encodes the cross-checked restaurant name plus exact Busan address. They are location searches, not claimed verified place pins. External app launch and current map-provider listings were not exhaustively tested.
- QR: real SVG renders. Independent ZXing-C++ decoding of the rendered QR screenshot returned `http://terminal.local:4173/menu/`. A separate actual subpath page decoded to `http://terminal.local:4173/Rajput/menu/`; following that destination opened the functioning menu. Header/home/menu links also kept `/Rajput/`.
- QR fault fixture: removing the encoder displays the localized alert, disables download and print, and preserves the direct menu link. Unknown route displays the custom 404 with a working home action.

## Issues found and corrected

1. Initial dictionary line-break escaping produced a module syntax error; corrected before final syntax/build/browser checks.
2. Display-font descender collided with hero supporting copy; line-height/spacing adjusted and inspected at mobile/tablet/desktop widths.
3. Legacy menu source contained another restaurant's descriptions; questionable items removed, additional independent evidence recorded, no copied prices.
4. Copy action could wait indefinitely for a browser response; added a bounded selectable-address fallback.
5. Price rendering had no approval gate; added a tested verified-price formatter, retaining pending states for every current provisional record.
6. QR download uses a direct self-contained SVG link rather than a transient programmatic click. Generation failure also disables printing an invalid card.

## Remaining limits

The browser's download event never reported a completed file for the SVG link, including tests with Blob and self-contained SVG URLs. The final link's MIME type, SVG payload and download filename were inspected, but an actual saved-file download is **not claimed as passed**. The print action was clicked; the automation did not expose a native print preview. A5 print CSS was inspected; no paper print was made. Confirm both on a normal browser before distributing any cards.

Reduced-motion behavior was checked in source/tests: media query disables transitions/animations, reveal content is visible, and JavaScript bypasses reveal setup. An actual operating-system reduced-motion setting was not emulated by the available browser API. No Safari/Firefox, real touchscreen, screen-reader, physical QR scan, reservation, ordering or payment test was performed. No Lighthouse score is claimed.

Current prices, phone, hours, full menu and actual photography still require restaurant-owner approval. The demo remains unofficial and noindex. Private preview access is preserved; no official restaurant launch or table-card distribution is authorized by these checks.
