# Claude Handoff: Offline Study Guide Navigation

Date: 2026-05-22
Repo: `/Users/efazzari/Dropbox/claude_work/elisa-language-tutor`

## User report

Elisa tested airplane mode and could not move from Flashcards back to Study Guide, or from Study Guide back to Flashcards. Flashcards could keep advancing, but navigation between the offline study surfaces was stuck. She wants the full offline study set to stay navigable.

## What Codex changed

- Updated `public/sw.js` from cache `lingua-v3` to `lingua-v5`.
- Added `/` to the offline precache, alongside `/study-guide` and `/study-guide/flashcards`.
- Changed the service worker to normalize pathnames, ignore route query strings for cache lookup, cache offline route documents by pathname, and return cached route documents when navigation fetches fail.
- Added `components/OfflineNavigationLink.tsx`.
- Replaced the Study Guide to Flashcards link, the Flashcards back to Study Guide link, and the dashboard Study Guide entry with `OfflineNavigationLink`.
- `OfflineNavigationLink` keeps normal Next navigation online, but when `navigator.onLine` is false it forces a document navigation so the service worker can serve the cached offline route instead of waiting on an unavailable Next route payload.
- Follow-up fix after Elisa reported the first patch still missed the real workflow:
  - Replaced the old single Review Pile behavior with explicit persistent Yes and No piles.
  - Added visible `Yes (n)` and `No (n)` pile tabs on the flashcards page.
  - Added `Yes` and `No` grading buttons after a card is flipped.
  - Made the Flashcards back link a plain cached document link to `/study-guide`, so it does not depend on Next client-side routing while offline.

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
  - Marked one card `Yes` and one card `No`.
  - Confirmed `Yes (1)` and `No (1)` appeared.
  - Opened the Yes pile and confirmed it showed `1 / 1`.
  - Opened the No pile and confirmed it showed `1 / 1`.
  - Stopped the production server and confirmed Flashcards -> Study Guide -> Flashcards still worked offline, with Yes/No pile counts preserved.

## Known issue

- `npm run lint` currently fails before linting because the script runs `next lint`, and this Next 16 setup reports `Invalid project directory provided ... /lint`.
- This was not introduced by the offline navigation patch.

## Files changed

- `public/sw.js`
- `components/OfflineNavigationLink.tsx`
- `app/page.tsx`
- `app/study-guide/page.tsx`
- `app/study-guide/flashcards/page.tsx`

## Suggested Claude follow-up

- If Claude continues this project, consider replacing the `lint` script with a supported ESLint command for this Next version.
- If Elisa wants more routes to work in airplane mode, add them deliberately to `OFFLINE_ROUTES` and verify them with the same server-stopped browser flow.
