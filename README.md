# elisa-language-tutor

Adaptive Italian and Spanish drilling for travel prep. Heritage-speaker focused.

Live at **language.elisafazzari.com**.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind v3
- Auth: single password gate (HMAC-signed cookie)
- Persistence: Vercel KV (server) + IndexedDB (offline mirror)
- AI: Claude Haiku 4.5 (grading), Sonnet 4.6 (scenarios)
- TTS: Pre-generated OpenAI tts-1 MP3s served from Vercel Blob
- SRS: ts-fsrs

## Mobile-first
iPhone Safari is the target. Desktop works but is not optimized.

## Local dev
```
cp .env.local.example .env.local
# fill in AUTH_PASSWORD, AUTH_SECRET, ANTHROPIC_API_KEY, OPENAI_API_KEY, KV_*, BLOB_READ_WRITE_TOKEN
npm install
npm run dev
```

## Health check
After login, hit `/api/health` to confirm KV + env vars are wired.

## Deploy
Auto-deploys to Vercel on push to `main`. Per `~/.claude/rules/vercel-apps-critical.md`:
1. `npm run build` must pass clean
2. `git status` clean
3. Ask before push
4. After deploy: `curl -s https://language.elisafazzari.com/ | grep '<new-build-marker>'`

## Project file
Architecture, decisions, and session log live in `~/Dropbox/claude/language-tutor/PROJECT.md`.

## Skill
Edit via `/edit-language-tutor` slash command in Claude Code.
