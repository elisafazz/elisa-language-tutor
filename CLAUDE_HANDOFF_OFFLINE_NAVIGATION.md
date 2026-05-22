# Claude Handoff: Offline Study Guide Navigation

Date: 2026-05-22
Repo: `/Users/efazzari/Dropbox/claude_work/elisa-language-tutor`

## User report

Elisa tested airplane mode and could not move from Flashcards back to Study Guide, or from Study Guide back to Flashcards. Flashcards could keep advancing, but navigation between the offline study surfaces was stuck. She wants the full offline study set to stay navigable.

## What Codex changed

- Updated `public/sw.js` from cache `lingua-v3` to `lingua-v6`.
- Added `/` to the offline precache, alongside `/study-guide` and `/study-guide/flashcards`.
- Changed the service worker to normalize pathnames, ignore route query strings for cache lookup, cache offline route documents by pathname, and return cached route documents when navigation fetches fail.
- Added `components/OfflineNavigationLink.tsx`.
- Replaced the Study Guide to Flashcards link, the Flashcards back to Study Guide link, and the dashboard Study Guide entry with `OfflineNavigationLink`.
- `OfflineNavigationLink` keeps normal Next navigation online, but when `navigator.onLine` is false it forces a document navigation so the service worker can serve the cached offline route instead of waiting on an unavailable Next route payload.
- Follow-up fix after Elisa reported the first patch still missed the real workflow:
  - Replaced the old single Review Pile behavior with explicit persistent `Got it` and `Review` piles.
  - Migrated existing legacy `Yes` marks into `Got it`, and legacy `No` marks into `Review`.
  - Added visible `Got it (n)` and `Review (n)` pile tabs on the flashcards page.
  - Added `Got it` and `Review` grading buttons after a card is flipped.
  - Made the Flashcards back link a plain cached document link to `/study-guide`, so it does not depend on Next client-side routing while offline.
  - Made the Study Guide -> Flashcards card a plain cached document link to `/study-guide/flashcards`.
  - Updated `components/SwRegister.tsx` to warm `/study-guide` and `/study-guide/flashcards` into the service-worker cache after login/authenticated page load. This fixes the case where Study Guide is available offline but Flashcards was never cached.

## Verification

- `npm run build` passed.
- Production server was started with `npm run start`.
- Browser visited `/`, `/study-guide`, and `/study-guide/flashcards` to warm the service worker cache.
- Production server was stopped to simulate the app losing network/server access.
- With the server stopped, browser verification succeeded:
  - Flashcards -> Study Guide loaded the cached Study Guide page.
  - Study Guide -> Flashcards loaded the cached Flashcards page.
  - Flashcards content remained usable, including the card controls and category selector.
- Follow-up browser verification succeeded:
  - Confirmed the flashcard UI shows `Got it` and `Review`, with no `Yes` / `No` labels.
  - Confirmed legacy marked cards appeared as `Got it (1)` and `Review (1)`.
  - Stopped the production server while sitting on Study Guide.
  - Clicked Study Guide -> Flashcards offline and confirmed Flashcards loaded from cache.
  - Clicked Flashcards -> Study Guide offline and confirmed Study Guide loaded from cache.
  - Confirmed `Got it` / `Review` pile counts remained visible offline.

## Known issue

- `npm run lint` currently fails before linting because the script runs `next lint`, and this Next 16 setup reports `Invalid project directory provided ... /lint`.
- This was not introduced by the offline navigation patch.

## Files changed

- `public/sw.js`
- `components/SwRegister.tsx`
- `components/OfflineNavigationLink.tsx`
- `app/page.tsx`
- `app/study-guide/page.tsx`
- `app/study-guide/flashcards/page.tsx`

## Suggested Claude follow-up

- If Claude continues this project, consider replacing the `lint` script with a supported ESLint command for this Next version.
- If Elisa wants more routes to work in airplane mode, add them deliberately to `OFFLINE_ROUTES` and verify them with the same server-stopped browser flow.
