# Project Progress — Meridian

Source of truth for build state. Starting a fresh chat? Paste this file
and say: "continue at Step N".

## Locked decisions
- Brand: Meridian (digital studio). All copy lives in client/src/data/.
- Theme 60/30/10 (dark): base #0E100F · surface #161917 · line #262B27 ·
  paper #F6F8F6 · ink #0E100F · accent #00DC82 (hover #3BF09B, soft #10241B) ·
  muted #9BA69F. Tokens defined ONLY in client/src/index.css @theme.
- Green = accents only (buttons, icons, eyebrows, focus, metrics). Never body text/bg.
- Type: Sora Variable (display) / Inter Variable (body), via Fontsource.
- Radii: --radius-btn 0.75rem, --radius-card 1.25rem — no others.
- Motion: Framer Motion only. Grammar in client/src/lib/motion.js
  (fade + 24px rise, once, EASE [0.22,1,0.36,1]). MotionConfig reducedMotion="user".
- Tailwind v4: prefer canonical utilities (z-60 not z-[60]; h-120 not h-[480px]).
- State: local useState (+ AuthModalContext later). No router — one page, anchors:
  #services #work #process #testimonials #faq #contact.
- Lint: oxlint (npm run lint inside client/). Conventional Commits.
- GitHub: repo "Site-clone", remote origin. NEVER edit files on github.com
  (caused a non-fast-forward rejection once). Solo repo: force-with-lease OK.

## Structure
client/ (React + Vite + Tailwind v4) · server/ (Express + Prisma + SQLite, later).
Section order: Header, Hero, Services, Work, Process/Stats, Testimonials,
FAQ, CtaBanner, Contact, Footer.

## Steps
1. ✅ Scaffold Vite + React, boilerplate cleaned
2. ✅ Tailwind v4 + self-hosted fonts + design tokens
3. ✅ GitHub repo connected, pushed
4. ✅ Primitives (Container, Button, SectionHeading, Card, Reveal) + motion.js
4b. ✅ Theme switched to dark charcoal / electric green
5. ✅ Header: scroll-aware bar, desktop nav, mobile drawer, CTA, sign-in stub
6. ✅ Hero: masked headline reveal, CTAs, meridian-horizon SVG
7. ✅ Services: data-driven 6-card grid, staggered reveal
8. ✅ Work: case studies, gradient artwork, category filters (AnimatePresence)
9. ⏳ NEXT: Process + Stats band
10. ⬜ Testimonials · 11. ⬜ FAQ accordion · 12. ⬜ CTA banner + Contact form
13. ⬜ Footer · 14. ⬜ Auth modal (mocked) · 15. ⬜ Express /api/contact + Prisma
16. ⬜ Integration · 17. ⬜ Polish (a11y/SEO/perf) · 18. ⬜ Deploy (Vercel)

## Component contracts worth remembering
- Button: as | variant primary/secondary | size md/lg. Primary = green bg + INK text.
- Card: interactive | padded=false (Work artwork uses it — never stack p-* overrides).
- Reveal: as | delay | y. Wraps any block for one-time scroll reveal.
- SectionHeading: eyebrow/title/description/align.
- Header "Sign in" is an inert stub → wired to AuthModalContext in Step 14.

## Environment
- Windows / PowerShell · Node 22 · VS Code + Tailwind IntelliSense + oxlint
- .vscode/settings.json: css.lint.unknownAtRules ignore (Tailwind v4 at-rules)