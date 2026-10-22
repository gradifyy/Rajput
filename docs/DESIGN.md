# Rajput · a warm neighbourhood table

## Three directions evaluated

| Direction | Composition and character | Decision |
| --- | --- | --- |
| Warm neighbourhood table | Cream and wine; a strong restaurant-name masthead; daylight shared food; printed-menu rules and calm useful navigation | Selected: welcoming, recognizably a restaurant, coherent in Korean and English, useful after a table scan |
| Cobalt graphic canteen | White/cobalt, compact poster typography, cropped dish studies, energetic tiled menu | Distinct, but the louder graphic treatment had weak grounding in Rajput's documented public identity |
| Dark theatrical tasting sequence | Near-black, cinematic spotlit food, large moving titles and pinned chapters | Rejected: repeats the prior design's hierarchy and places the scroll performance ahead of the restaurant |

The chosen design is a **proposed identity**, not a claim to reproduce the existing sign. It replaces the previous black presentation's full-screen scroll mechanism, generic hero copy, and repetitive staging. It also avoids recolouring the earlier green split-hero layout: the new masthead, wide table photograph, numbered dish index and printed-menu treatment form a different composition.

## Visual system

- Paper `#f8f3e9`, wine `#682d37`, dark body ink `#382b29`, muted brown `#75675f`, rules `#d9cabe`, soft paper `#eee6d8`, small olive accents `#555b3e`. Wine is the identity, not a generic saffron theme.
- DM Serif Display gives the Rajput name a distinctive restaurant masthead. DM Sans handles English UI; Noto Sans KR handles Korean. Display headings in Korean use moderate weight and careful line breaks. System fallbacks remain available.
- A 1440px maximum content grid, fluid 22–80px gutters, two-column useful sections on desktop, stacked compositions on phones. Main food banner may extend to 1800px. The type name, not generic marketing copy, is the hero.
- Square, restrained button treatments; underlined text actions; hairline separators. No floating glass navigation, arbitrary gradient, rounded card grid, fabricated badge or fake award.
- Menu rows use consistent text-first presentation, names in both languages, compact pending-price status and an unmistakable detail action. Dish imagery appears only in relevant details. Category filters and search stay near the top during browsing.
- Navigation becomes a readable dropdown on tablet/mobile; the actual menu is one clear action away. QR landing goes directly to the menu, without a gate or installation.
- Visiting information prioritizes the corroborated address/floor and local map providers. Conflicting contact/hours are handled once, without fake call buttons.

## Photography

Three newly generated daylight compositions: `table.webp` (curry, tandoori and naan on ivory linen), `tandoori.webp` (chicken on a burgundy plate), `naan.webp` (bread in a woven basket with a wine napkin). All use a warm window-light direction, restrained props and consistent natural tones. WebP quality 84; secondary images lazy-load, explicit dimensions reserve space. The hero loads with high priority.

These are illustrative food images, not the restaurant's dishes or interior. No diner-review photos were copied. Captions and the footer/about disclosure make that distinction. The owner must supply approved real photographs before an official launch. The food-sharing section suggests a meal combination without inventing a chef story, interior aesthetic, heritage, recipe or service promise.

## Motion and accessibility

Normal document scrolling; no pinned chapters or scroll interception. A modest initial photograph settle and 22px section reveal support the hierarchy. Small hover responses clarify actions. Reduced motion removes animation/transitions and leaves content visible; unsupported IntersectionObserver also leaves content visible. Native dialogs supply modal keyboard containment, Escape and focus restoration. Visible focus rings, semantic headings, named controls, result announcements and target sizes support keyboard and touch use.

## QR artwork

The wine/cream double-rule card repeats the actual bilingual identity. The QR itself remains black on white with a four-module quiet zone. It is generated locally with medium correction from the current origin plus the configured base and `menu/`. A native SVG link exports vector artwork; the print stylesheet isolates the card on A5. The card is visibly marked demo, with release dependent on owner approval and an actual signed-out phone scan.
