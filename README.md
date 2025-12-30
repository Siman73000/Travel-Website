# Wanderlog (Neon Aurora)

A more colorful + interesting version:
- Aurora background + ribbons
- Sparkles
- Cursor spotlight
- Interactive tilt cards
- Elegant page transitions
- Static export for GitHub Pages

## Run locally
```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)
Repo Settings → Pages → Source: **GitHub Actions**, then push to `main`.

## Customize the vibe
- Background + aurora: `src/components/Background.tsx`
- Cursor spotlight: `src/components/CursorGlow.tsx` + `.cursor-glow` in `app/globals.css`
- Card tilt + highlight: `src/components/TiltCard.tsx`
- Region colors: `src/components/RegionChip.tsx`

## Optional (Windows Watchpack noise)
Create `.env.local`:
```
WATCHPACK_POLLING=true
```
