# Project Progress — Meridian

Source of truth for build state. Starting a fresh chat? Paste this file
and say: "continue at Step N".

## Locked decisions
- Brand: Meridian (digital studio). All copy lives in client/src/data/.
- Theme 60/30/10 (dark): base #0E100F · surface #161917 · line #262B27 ·
  paper #F6F8F6 · ink #0E100F · accent #00DC82 (hover #3BF09B, soft #10241B) ·
  muted #9BA69F. Tokens defined ONLY in client/src/index.css @theme.
- Green = accents only (buttons, icons, eyebrows, focus). Never body text/bg.
- Type: Sora Variable (display) / Inter Variable (body), via Fontsource.
- Radii: --radius-btn 0.75rem, --radius-card 1.25rem — no others.
- Motion: Framer Motion only. Grammar in client/src/lib/motion.js
  (fade + 24px rise, once, EASE [0.22,1,0.36,1]). MotionConfig reducedMotion="user".
- State: local useState + AuthModalContext (later). No router — one page, anchors:
  #services #work #process #testimonials #faq #contact.
- Lint: oxlint (npm run lint inside client/). Conventional Commits.

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
6. ✅ Hero: masked headline reveal, CTAs, meridian-horizon SVG, reduced-motion safe
7. 🔨 Sections in progress — Services ✅ · next: Work, Process/Stats, Testimonials, FAQ, CTA, Contact, Footer
8. ⬜ Auth modal, mocked (login/register, validation, states)
9. ⬜ Express POST /api/contact + Prisma Contact model (SQLite)
10. ⬜ Integration → polish (a11y/SEO/perf) → deploy (Vercel) → final review

## Environment
- Windows / PowerShell · Node 22 · VS Code + Tailwind IntelliSense
- .vscode/settings.json: css.lint.unknownAtRules ignore (Tailwind v4 at-rules)
- Tailwind v4: prefer canonical utilities (z-60 not z-[60]; h-120 not h-[480px]).