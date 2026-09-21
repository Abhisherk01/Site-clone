# Project Progress — Meridian

Source of truth for build state. Starting a fresh chat? Paste this file
and say: "continue at Step N".

# PROJECT STATUS:
MVP SHIPPED (18/18) · DevOps phase: 19-20 ✅ · next: 21 (railway.toml)
Lighthouse: recorded by CI from Step 24.

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
- Theme toggle IS in MVP (Option C). Default = stored choice → prefers-color-scheme →
dark. Persisted in localStorage["meridian-theme"]. Process/Stats stays the single
inverted band in BOTH themes. Light theme = token overrides ONLY in index.css; accent
text on light page surfaces = flipped --color-accent (#00804A); accent text on the
band = --color-accent-inverted (flips OPPOSITE to accent: deep in dark theme, bright
in light). RULE from 9b on: no raw hex/white in JSX — tokens only.



## Structure
Structure (verified from screenshot):
client/src/components/ → primitives + shared: Button, Card, Container, CountUp,
  Logo, Reveal, SectionHeading, ThemeToggle
client/src/sections/ → page sections: Header, Hero, Services, Work, Process,
  Testimonials (Process moved here in the structure-sync commit)
client/src/context/ → ThemeContext.jsx (AuthModalContext joins in Step 14)
client/src/data/ → hero, process, services, site, testimonials, work
client/src/hooks/ → useScrolled, useScrollLock · client/src/lib/ → motion.js
Imports: sections use ../components, ../data, ../hooks, ../lib; components use ./ and ../data.
Git rule: stage from `git status --short` output, never from memory.

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
9.  ✅ Process + Stats band (paper band, 4-step timeline, CountUp stats)
9b. ✅ Theme toggle (Option C): [data-theme="light"] token overrides in index.css
    (paper/ink swap; accent → deep #00804A on light), ThemeContext + ThemeToggle in
    Header (desktop + drawer), localStorage + prefers-color-scheme default, no-flash
    script in index.html, SectionHeading tone="inverted" for the band using
    --color-accent-inverted. Re-QA steps 5–9 in light theme.
10. ✅ strip trailing .

11. ✅ strip trailing .
12. ✅ strip trailing . + Contact form 
13. ✅ Footer: brand + tagline, Site nav reusing navLinks from data/site.js (single     source with Header), Elsewhere text links (external, noopener, sr-only new-tab     note — lucide brand icons avoided, they're deprecated), email reused from     data/contact.js, © auto-year, back-to-top via #top anchor + CSS smooth scroll     (reduced-motion guarded). No dead "#" links — Privacy/Terms deferred to Step 17     unless real pages are wanted. 14. ⏳ NEXT: Auth modal (mocked) — AuthModalContext, Header sign-in wiring 15.✅ strip trailing . ⬜ Express /api/contact + Prisma 16.✅ strip trailing . 17. ⬜ Polish (a11y/SEO/perf) · 18. ⬜ Deploy (Vercel)
19. ✅ CI pipeline: .github/workflows/ci.yml — build (3-package install: root +
    client + server; prisma generate in server/), lint (client oxlint), test
    (server vitest). Node 22 via .nvmrc; npm cache keyed on all three lockfiles;
    concurrency cancel. Runs on PRs + pushes to main; advisory (no branch
    protection yet). KNOWN SLACK: build job re-installs inside root build script —
    trim on next CI touch.
20. ✅ API smoke tests (server/ package): vitest + supertest — GET /api/health 200 ·
    POST /api/contact 201 + row persisted · invalid → 422 + nothing persisted.
    app/listen split: server/src/app.js exports app; index.js = process only.
    globalSetup runs real `prisma migrate deploy` vs throwaway
    server/prisma/test.db, deleted fresh each run. LAYOUT TRUTH: 3-package
    monorepo — root is a dep-free orchestrator; server has own package.json +
    lockfile. OPEN: root start script says src/index.js but root has no src/ →
    Railway root-dir question is Step 21 fact-find #1.



## Component contracts worth remembering

- Button: as | variant primary/secondary | size md/lg. Primary = green bg + INK text.
- Card: interactive | padded=false (Work artwork uses it — never stack p-* overrides).
- Reveal: as | delay | y. Wraps any block for one-time scroll reveal.
- SectionHeading: eyebrow/title/description/align.
- Header "Sign in" is an inert stub → wired to AuthModalContext in Step 14.



## Environment

- Windows / PowerShell · Node 22 · VS Code + Tailwind IntelliSense + oxlint
- .vscode/settings.json: css.lint.unknownAtRules ignore (Tailwind v4 at-rules)
- PS 5.1 note: string bodies send as Latin-1 (en dash → "?") and native-exe args lose
  embedded quotes — API tests use UTF-8 byte bodies ([char]0x2013 + GetBytes) and
  try/catch ($_.ErrorDetails.Message) for 4xx checks. Browsers always send UTF-8;
  real clients unaffected.
- RULE 0 (session start): Set-Location to repo root → git rev-parse --show-toplevel
  must print that path → git status --short --branch + git log --oneline -3.
  Folder names lie — 5 wrong-CWD incidents; "meridian" was a stray with no .git.
- INCIDENT #6 (index.lock race): batched paste of add+3 commits collided with VS
  Code's git refresh; one commit swallowed 9 files under a refactor-only label.
  RULE: read-only getters may paste as a block; index-touching git (add/commit/
  amend/reset) = one command, one Enter, output before the next.
- INCIDENT #7 (twin commits): amend+push ran outside pasted history (lossy
  multi-command pastes) → local parked on stale twin, push rejected (2nd
  non-fast-forward). Fix: abort the auto-started merge (generic push-hint did it),
  verify remote-only commits via git log HEAD..MERGE_HEAD, reset --hard to remote.
  LESSON: after push rejection, fetch-inspect-decide — never blind force, never
  blind pull.
- PS 5.1: commit messages ASCII-only (em dashes mangle in history).