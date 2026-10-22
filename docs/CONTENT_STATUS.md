# Content status

Updated 22 October 2026. Public-source corroboration is distinct from restaurant-owner approval.

| Content | Status | Display rule |
| --- | --- | --- |
| Name, Deokcheon/Busan locality, road address, second floor | Cross-checked public evidence | Displayed; final owner confirmation still requested |
| ARTBOX / Sulbing landmark | Corroborated visitor/listing evidence | Secondary cue |
| Current phone, hours, closing days | Conflicting | No phone number, call CTA, or invented schedule |
| Full current menu | Unavailable | Nine curated examples; one clear menu-preview notice |
| All nine dish records | Provisional, evidence linked per record | No implied complete offering or current availability |
| Half/whole serving sizes | Listing evidence only | Marked provisional; owner must confirm |
| Prices | Unverified | `null`; displayed as “가격 확인 중 / Price pending” |
| Ingredients, allergies, spice, dietary status | Unverified | No badges; ask-restaurant guidance in detail |
| Paneer tikka, papad | Excluded | Questionable bulk source; no production display |
| Specific lamb do piaza | Replaced | Broader evidenced lamb curry label |
| Signature / popularity / awards / history | Unverified | No claims |
| Actual interior and real food photos | Not supplied/licensed | No invented interior photograph or atmosphere claim |
| Food images | Generated concept images | Discreet per-photo label and footer/about disclosure |
| Wordmark/favicon | Proposed original identity | Not represented as the official registered logo |
| Reservation, takeaway, parking and pet policy | Unconfirmed | No promise, booking or ordering flow |
| Map destinations | Exact-address search links | Naver/Kakao/Google; owner should confirm place IDs |
| QR card | Functional demonstration | Current-origin menu destination, demo mark; no distribution |
| Official launch | Not approved | Unofficial preview, noindex retained |

## Data model

`menu-data.js` keeps stable IDs, categories, bilingual names/descriptions, display order, visibility, optional contextual image, source(s), currency, nullable price, price status, verification, availability and empty tags. Search runs over the visible records. Approved portion/price variants can be represented as separate stable records without changing the browser controls. Add approved categories to `categories` and provide both translations. After approval, enter a numeric price and set `priceStatus` to `VERIFIED`; only explicitly verified finite values become formatted currency in both list and detail. Do not replace null with an invented zero or guessed price.

Current curation: two curries, two tandoori portion records, three naan, one side, one drink. It deliberately excludes unverified set configurations and lassi flavours. These examples do not establish how many dishes the restaurant currently offers.
