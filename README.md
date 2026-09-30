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
| 3D        | react-three-fiber, drei, ShaderGradient                            |
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
- **Palette.** Paper `#F7F7FC`, ink `#141432`, cobalt `#2F54EB` as the signature color, violet `#7B4DFF` as its gradient partner, and ember `#FF7F11` reserved for the primary action and the "in active development" marker. Ember fails contrast as text, so it is only ever a fill with ink text.
- **Type.** Mona Sans (variable width and weight) for headings, set wide and heavy; Atkinson Hyperlegible Next for body text.
- **Motion responds to the reader.** Section motion is scrubbed by scroll position with Motion's `useScroll`: project rows slide in from alternating sides, the experience timeline draws down the page, skill groups assemble, and the Spotlight strip moves sideways as you scroll down. The only autonomous motion is the hero load sequence, the sphere's idle rotation, the gradient's drift, the rotating descriptor, and the Spotlight highlight, which only advances while the section is on screen.
- **Reduced motion is a first-class mode.** `useReducedMotion` is the single source of truth. Under `prefers-reduced-motion` everything renders in its final position, Lenis turns itself off, the sphere becomes a logo grid, and the gradient becomes a static image.

---

## Performance

- three.js, the sphere, and ShaderGradient load lazily. Both WebGL scenes stop rendering when the hero is off screen or the tab is hidden.
- The static gradient (12 KB WebP) stands in on mobile, under reduced motion, and without WebGL, and fills the hero while the live gradient loads.
- Initial JavaScript is ~124 KB gzipped. An earlier `manualChunks` entry for three.js made Vite preload it on every page, so it was removed.
- Lighthouse (desktop): home 99 performance / 100 accessibility; case studies 100 / 100.

---

## Project structure

```text
src/
  components/   # Nav, Footer, TechSphere, HeroAtmosphere, ShaderGradientScene,
                # ProjectList, ExperienceTimeline, LeadershipList, ResumeModal, ...
  contexts/     # ResumeModalContext: shared modal state
  sections/     # Home page sections, in page order
  pages/        # Routed pages (lazy-loaded except Home)
  data/         # Typed content modules: edit content here, not in JSX
  hooks/        # useReducedMotion, useMediaQuery, useInViewport, usePageVisible, ...
  lib/          # utils, Devicon logo paths
  test/         # Vitest + RTL tests
e2e/            # Playwright visual snapshots

public/
  resume.pdf          # Shown in the resume modal and offered as a download
  hero-gradient.webp  # Static export of the hero gradient
  og-image.png        # 1200x630 social preview

.github/workflows/ci.yml  # Lint, typecheck, test, build; then Playwright snapshots
vercel.json               # SPA rewrites and security headers
```

---

## Routes

| Route                | Description                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `/`                  | Hero, highlights, about, projects, experience, leadership, skills, contact |
| `/experience`        | Full experience timeline                                                   |
| `/leadership`        | All leadership roles                                                       |
| `/projects`          | All projects                                                               |
| `/projects/vigil`    | Vigil case study                                                           |
| `/projects/clausify` | Clausify case study                                                        |

---

## Content

All content lives in typed modules under `src/data/`.

| File                  | Controls                                                                          |
| --------------------- | --------------------------------------------------------------------------------- |
| `data/projects.ts`    | Projects: description, stack, case study, live and repo links, development status |
| `data/experience.ts`  | Roles: title, company, period, bullets, stack                                     |
| `data/leadership.ts`  | Leadership roles; the home page shows the first four                              |
| `data/skills.ts`      | Skill categories                                                                  |
| `data/sphereLogos.ts` | Logos on the 3D sphere                                                            |
| `data/spotlight.ts`   | Highlights strip tiles                                                            |

---

## CI

Every push to `main` or `feat/**` and every pull request runs lint, typecheck, unit tests, and a production build on Node 24. A second job builds the site, captures full-page Playwright screenshots of `/`, `/projects/vigil`, and `/projects/clausify` at 1280, 1728, and 2560px, checks for horizontal overflow, and uploads the screenshots as an artifact.

---

## Deploying

Vercel auto-detects Vite (build `npm run build`, output `dist`). `vercel.json` handles SPA rewrites, security headers, and immutable asset caching. `X-Frame-Options` is `SAMEORIGIN` so the resume PDF renders inside the modal iframe.

When the domain changes, update `canonical`, `og:url`, `og:image`, `twitter:image`, and the JSON-LD `url` in `index.html`.
