# Kymani Jarrett: Portfolio

Personal site for Kymani Jarrett, a software engineer studying IT and Cybersecurity at the University of Cincinnati.

**Live:** [kymanij.vercel.app](https://kymanij.vercel.app)

---

## Stack

| Concern   | Tech                                                               |
| --------- | ------------------------------------------------------------------ |
| Build     | Vite 6                                                             |
| Framework | React 18, TypeScript (strict)                                      |
| Styling   | Tailwind CSS with design tokens, self-hosted variable fonts        |
| Routing   | React Router v7                                                    |
| Motion    | Motion (scroll-linked), Lenis (smooth scroll)                      |
| 3D        | react-three-fiber, drei (one shared canvas via `View`)             |
| Icons     | simple-icons and Devicon paths bundled at build time, lucide-react |
| Tests     | Vitest + React Testing Library, Playwright visual snapshots        |
| CI        | GitHub Actions                                                     |
| Hosting   | Vercel                                                             |

---

## Local setup

```bash
git clone https://github.com/kymanirjarrett/portfolio.git
cd portfolio
npm install
npm run dev        # http://localhost:5173
```

Other commands:

```bash
npm run build      # production build to dist/
npm run typecheck  # tsc -b across app, node, and e2e configs
npm run lint       # ESLint
npm test           # Vitest, run once
npm run test:e2e   # Playwright snapshots of key routes (build first)
```

---

## Design decisions

- **Full-width layout.** Every section sits on a 12-column grid between fluid gutters (`clamp(1.25rem, 4vw, 4rem)`) with no max-width cap. The only width limit is the ~68ch prose measure, so large monitors get larger type instead of empty margins.
- **Palette, light only ("warm daylight").** Sand canvas `#F6F1E7`, a sky `#EAF6F8` at the top of the hero gradient, ink `#1F2A24` text (13.18:1), muted `#5C6B63` (4.99:1), and a deep palm green accent `#0E6B4F` (5.77:1) for links and focus rings. Contribution levels `#E8E3D6` to `#0E6B4F` sit between GitHub's greens and palm and sea greens, so the name graph reads as GitHub and as part of the scene.
- **Type.** Space Grotesk for everything; JetBrains Mono only for tiny labels and the ⌘K hint.
- **A homepage that does very little.** "Hey, I'm" plus KYMANI in 3D contribution-graph blocks (a 53 × 7 grid, the size of a GitHub graph), four lines of intro, and a contact line. Hover, keyboard focus, or a tap turns the name into a decorative, seeded contribution graph that rises like GitHub Skyline, then settles back. A procedural clay palm sways and leans slightly toward the cursor as scenery. The `<h1>` still reads "Hey, I'm Kymani Jarrett" for screen readers and search engines.
- **⌘K command menu.** Built on `cmdk` (Radix dialog underneath): focus trap, Escape to close, focus returns to where it was. Loaded on first open.
- **Reduced motion is a first-class mode.** `useReducedMotion` is the single source of truth. Under `prefers-reduced-motion` the palm stands still, the name swaps instantly with no rising blocks, and Lenis turns itself off.

---

## Performance

- three.js and both 3D scenes live in one lazy chunk. They mount in idle stages after first paint (canvas and name, then palm), so no single long task blocks input. Rendering stops when the hero is off screen or the tab is hidden, and the device pixel ratio is capped at 1.75.
- The name and the palm share a single WebGL canvas through drei's `View`. The name is one `InstancedMesh` of 371 blocks: one draw call.
- Without WebGL the name falls back to the same grid as HTML squares, and the palm to `public/palm-poster.webp` (regenerate with `npm run palm-poster` against a running preview). Small screens always use the poster.
- Initial JavaScript is ~73 KB gzipped (was ~124 KB before the homepage redesign).
- Lighthouse (desktop, home): 99 performance, 100 accessibility.

---

## Project structure

```text
src/
  components/   # Nav, CommandMenu, PixelMark, SocialIcons, ProjectList, ...
    home/       # HomeScene (shared canvas), NameBlocks, PalmTree, NameGrid2D
  contexts/     # CommandMenuContext: open state and the ⌘K shortcut
  sections/     # Earlier homepage sections, parked until their pages are redesigned
  pages/        # Routed pages (lazy-loaded except Home)
  data/         # Typed content modules: edit content here, not in JSX
  hooks/        # useReducedMotion, useMediaQuery, useInViewport, usePageVisible, ...
  lib/          # nameGrid (bitmap font, seeded graph), contact, platform, utils
  test/         # Vitest + RTL tests
e2e/            # Playwright snapshots and navigation checks
scripts/        # export-palm-poster.mjs

public/
  favicon.svg         # KJ pixel mark (+ favicon-32.png)
  palm-poster.webp    # Palm resting pose: mobile and no-WebGL fallback
  hero-gradient.webp  # Static export of the hero gradient
  og-image.png        # 1200x630 social preview

.github/workflows/ci.yml  # Lint, typecheck, test, build; then Playwright snapshots
vercel.json               # SPA rewrites and security headers
```

---

## Routes

| Route                | Description                                |
| -------------------- | ------------------------------------------ |
| `/`                  | Greeting, 3D name, intro, and contact line |
| `/experience`        | Full experience timeline                   |
| `/leadership`        | All leadership roles                       |
| `/projects`          | All projects                               |
| `/projects/vigil`    | Vigil case study                           |
| `/projects/clausify` | Clausify case study                        |

---

## Content

All content lives in typed modules under `src/data/`.

| File                  | Controls                                                                          |
| --------------------- | --------------------------------------------------------------------------------- |
| `data/projects.ts`    | Projects: description, stack, case study, live and repo links, development status |
| `data/experience.ts`  | Roles: title, company, period, bullets, stack                                     |
| `data/leadership.ts`  | Leadership roles                                                                  |
| `data/skills.ts`      | Skill categories                                                                  |
| `data/sphereLogos.ts` | Logos on the 3D sphere (parked)                                                   |
| `data/spotlight.ts`   | Highlights strip tiles                                                            |

---

## CI

Every push to `main` or `feat/**` and every pull request runs lint, typecheck, unit tests, and a production build on Node 24. A second job builds the site, captures full-page Playwright screenshots (`/` and `/experience` at 1280, 1728, and 375px; the case studies at 1280, 1728, and 2560px), checks for horizontal overflow, runs navigation and command menu checks, and uploads the screenshots as an artifact.

---

## Deploying

Vercel auto-detects Vite (build `npm run build`, output `dist`). `vercel.json` handles SPA rewrites, security headers, and immutable asset caching. `X-Frame-Options` is `DENY`: the site is never framed.

When the domain changes, update `canonical`, `og:url`, `og:image`, `twitter:image`, and the JSON-LD `url` in `index.html`.
