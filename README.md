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
```

---

## Project structure

```text
src/
  components/   # Nav, Footer, TechSphere, RotatingDescriptor, ResumeModal
  contexts/     # ResumeModalContext — shared modal state across the app
  sections/     # Home page sections: Hero, Spotlight, About, Work, Skills, Contact
  pages/        # Full pages (lazy-loaded):
                #   Home, ExperiencePage, LeadershipPage, ProjectsPage,
                #   VigilCaseStudy, ClausifyCaseStudy
  data/         # Typed content modules — edit content here, not in JSX
  hooks/        # useReducedMotion, useWebGL
  lib/          # utils (fibonacci3D)
  test/         # Vitest + RTL tests

public/
  resume.pdf    # One-page resume (served via modal PDF preview)
  favicon.svg

.github/workflows/ci.yml   # Lint + typecheck + test + build on every PR
vercel.json                 # SPA rewrites + security headers (X-Frame-Options: SAMEORIGIN)
```

---

## Routes

| Route                | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `/`                  | Home — hero, spotlight reel, projects teaser, about, skills, contact |
| `/experience`        | Full experience page with detailed role breakdowns                   |
| `/leadership`        | Leadership & community involvement                                   |
| `/projects`          | Projects landing page with live links and case study links           |
| `/projects/vigil`    | Vigil case study (lazy-loaded)                                       |
| `/projects/clausify` | Clausify case study (lazy-loaded)                                    |

---

## Navigation

The nav renders four items — **Home**, **Experience**, **Projects**, **Leadership** — plus a **Resume** button.

- **Home** is a `<Link to="/">` that also exposes a hover dropdown (desktop) or expandable sub-list (mobile) with **About** and **Skills** anchor links.
- Anchor links (`/#about`, `/#skills`) use `scrollIntoView` when already on `/`; from any other route they use React Router `navigate('/', { state: { scrollTo } })` so the home page scrolls to the section after mounting — no full-page reload.
- The **Resume** button opens a modal with a PDF preview and a download link. Closing works via the ✕ button, Escape key, or backdrop click. Focus is trapped within the dialog while it's open.

---

## Accessibility & motion

- All animated elements respect `prefers-reduced-motion`: the 3D sphere, Spotlight reel, scroll reveals, and rotating descriptor each have static fallbacks.
- Scroll animations are bidirectional — content animates in on scroll down and out on scroll up (`once: false`).
- The 3D sphere gracefully falls back to a 2D logo grid when WebGL is unavailable.
- Semantic HTML, logical heading order, visible focus states, and keyboard navigation throughout.
- Spotlight reel is fully keyboard-navigable (arrow keys or buttons for prev/next, dot indicators labelled).
- Resume modal has a proper focus trap and restores focus to the trigger element on close.

---

## Content

All content lives in typed data modules under `src/data/`. To update a role, project, or skill, edit the relevant file — no JSX changes needed.

| File                 | Controls                                                     |
| -------------------- | ------------------------------------------------------------ |
| `data/projects.ts`   | Projects: title, description, stack, `liveUrl`, GitHub link  |
| `data/experience.ts` | Work history: role, company, period, bullets, stack          |
| `data/leadership.ts` | Leadership & community roles                                 |
| `data/skills.ts`     | Skill grid + 3D sphere logo list                             |
| `data/spotlight.ts`  | Spotlight reel tiles (home page carousel)                    |

### Adding a project live URL

In `data/projects.ts`, set `liveUrl` to the deployed URL. If the project isn't live yet, set `liveUrl: null` and the projects page will show a "Deploying soon" pill automatically.

---

## Deploying to Vercel

1. Import the repo in [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build` · Output directory: `dist`.
4. The `vercel.json` in this repo handles SPA rewrites, security headers, and immutable asset caching. `X-Frame-Options` is set to `SAMEORIGIN` (not `DENY`) so the resume PDF renders inside the modal iframe.

To swap in a custom domain, update the `canonical`, `og:url`, and `twitter:image` meta tags in `index.html`.
