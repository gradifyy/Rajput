# Verification report — version 2 replacement

23 October 2026, Korea. The existing Site has been rebuilt in place. This is a buildless static website; there is no TypeScript compiler or configured lint/build pipeline.

## Checks completed

- Node syntax checks for both ES modules passed.
- Desktop browser screenshots inspected for the full-screen hero, pinned naan/curry chapters and redesigned menu.
- Mobile hero inspected in Korean at 390px and English at 320px. Final touch-target adjustments preserve the composition.
- Homepage and menu document bounds checked in browser iframes at widths 320, 390, 768, 1024, 1440 and 1920px. No horizontal document overflow observed. Iframe content width is 15px smaller because of desktop scrollbars; these are responsive layout checks, not physical-device emulation.
- Three new images loaded successfully in the browser, including every scroll chapter and the menu invitation.
- Chapter button navigation changed the active slide to naan and curry, updated the progress/count, and pinned the stage at viewport top. Corrected hidden-container focus scrolling by using overflow:clip; retest showed internal scrollTop zero.
- Scroll handlers update hero movement/fade, statement colour and chapter progress using requestAnimationFrame. Entrance/reveal and image crossfade/scale transitions observed during review.
- English filter/search returned one garlic naan result; detail dialog opened with source and confirmation notice.
- Escape closed the dialog; empty search state appeared; reset restored all nine dishes.
- Korean search for 사모사 returned one result. Language persisted into the QR route.
- QR destination and artwork remain unchanged, pointing at the exact deployed `/menu/` route. Private sign-in requirement remains visible.
- Source inspection confirms reduced-motion CSS disables animation and pinning, and the JavaScript fallback exposes all three food panels without inert content. OS reduced-motion preference was not simulated in this browser.
- Local asset/route and noindex audit run before packaging. Temporary QA harness removed before publication.

## Preserved verification / limitations

Address copying and contact-dialog Escape/focus restoration were verified in the prior version; those implementations were retained. Version 2 also explicitly restores the target section after a full-page arrival with #visit or #table. External map links remain exact-name/address searches rather than claimed verified place IDs or turn-by-turn routes.

No physical device, camera scan, independent QR decoder, printed-page inspection or public signed-out access test has been performed. QR printing/download capability is implemented. This Site stays owner-private, so public no-login customer scanning still needs owner approval and access testing. Business details and photography remain pending owner approval; see CONTENT_STATUS.md.

The workspace originally contained the brief, with no previous Rajput checkout or editor. The new Site's own source repository is used; the possible original GitHub repository was not modified. Existing Site identity and audience were preserved during this replacement.

## GitHub repository integration

The repo's dependency-free build/server and bundled QR encoder were preserved. The v2 frontend, images and documentation replaced the old design. The integration adds root/project-base URL handling and safe storage fallback, and generates QR artwork dynamically for the actual deployment. The old six-item sample menu was replaced by the nine evidence-linked records from the rebuilt Site. Node syntax, root build, project-subpath build and updated behavioral/content tests were run during integration. The GitHub copy was not separately subjected to the full browser visual audit; its design/motion assets are the same v2 files inspected above.
