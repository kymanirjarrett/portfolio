# Kymani Jarrett — Portfolio

Personal portfolio site for Kymani Jarrett — Cloud & Data Engineer, Full-Stack Developer, Cybersecurity student at the University of Cincinnati.

**Live:** [kymanirjarrett.vercel.app](https://kymanirjarrett.vercel.app)

---

## Stack

| Concern   | Tech                                             |
| --------- | ------------------------------------------------ |
| Build     | Vite 6                                           |
| Framework | React 18, TypeScript (strict)                    |
| Styling   | Tailwind CSS                                     |
| Routing   | React Router v7                                  |
| 3D        | react-three-fiber + @react-three/drei (Three.js) |
| Animation | Framer Motion                                    |
| Icons     | Simple Icons (CDN), lucide-react                 |
| Hosting   | Vercel                                           |
| CI        | GitHub Actions                                   |
| Tests     | Vitest + React Testing Library                   |

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
npm run build      # production build → dist/
npm run typecheck  # TypeScript strict check
npm run lint       # ESLint
npm run test       # Vitest (run once)
npm run test:watch # Vitest watch mode
npm run format     # Prettier
```

---

## Project structure

```text
src/
  components/   # Reusable UI: Nav, Footer, TechSphere, RotatingDescriptor
  sections/     # Home page beats: Hero, Spotlight, About, Work,
                #   Experience, Skills, Leadership, Contact
  pages/        # Home, VigilCaseStudy, ClausifyCaseStudy (lazy-loaded)
  data/         # Typed content modules — edit content here, not in JSX
  hooks/        # useReducedMotion, useWebGL
  lib/          # utils (cn, fibonacci3D)
  test/         # Vitest + RTL tests

public/
  resume.pdf    # One-page resume (download link)
  cv.pdf        # Full curriculum vitae
  favicon.svg

.github/workflows/ci.yml   # Lint + typecheck + test + build on every PR
vercel.json                 # SPA rewrites + security headers
```

---

## Routes

| Route                | Description                       |
| -------------------- | --------------------------------- |
| `/`                  | Home — full-scroll, all sections  |
| `/projects/vigil`    | Vigil case study (lazy-loaded)    |
| `/projects/clausify` | Clausify case study (lazy-loaded) |

---

## Accessibility & motion

- All animated elements respect `prefers-reduced-motion`: the 3D sphere, Spotlight reel, scroll reveals, and rotating descriptor each have static fallbacks.
- The 3D sphere gracefully falls back to a 2D logo grid when WebGL is unavailable.
- Semantic HTML, logical heading order, visible focus states, and keyboard navigation throughout.
- Spotlight reel is fully keyboard-navigable (tab to tiles, arrow keys or buttons for prev/next).

---

## Deploying to Vercel

1. Import the repo in [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build` · Output directory: `dist`.
4. The `vercel.json` in this repo handles SPA rewrites so deep links resolve correctly.

To swap in a custom domain later, update the `canonical`, `og:url`, and `twitter:image` meta tags in `index.html` — they're the only hard-coded references to the domain.

---

## Content

All content lives in typed data modules under `src/data/`. To update a job, project, or skill, edit the relevant file — no JSX changes needed.

| File                 | Controls                                             |
| -------------------- | ---------------------------------------------------- |
| `data/projects.ts`   | Featured projects (Vigil, Clausify, Bearcat Buddies) |
| `data/experience.ts` | Work history                                         |
| `data/skills.ts`     | Skill grid + sphere logo list                        |
| `data/leadership.ts` | Leadership & impact                                  |
| `data/spotlight.ts`  | Spotlight reel tiles                                 |
