# Portfolio Re-Haul — Claude Code Handoff

**Owner:** Kymani Jarrett
**Repo:** `kymanirjarrett/portfolio`
**Live (current):** https://kymanirjarrett.github.io/portfolio/
**GitHub:** github.com/kymanirjarrett · **LinkedIn:** linkedin.com/in/kymanirjarrett · **Email:** jarretkr@mail.uc.edu

> Read this entire document before writing any code. The "Design North Star" and "Hard Design Rules" sections are non-negotiable. Where this doc explicitly says a decision is left to Kymani, stop and ask before proceeding. Do not invent facts about Kymani; use only the content in the "Content Source of Truth" section and the attached resume/CV PDFs.

---

## 1. Goal

Completely re-haul the graphical design and front-end of Kymani's personal portfolio. The visual inspiration is **OpenAI's ChatGPT Atlas landing page** (`chatgpt.com/atlas`). Mimic its layout, flow, and graphic design language while keeping the site original and personal. This is a personal portfolio, not a clone, so the Atlas page sets the *feel and structure*, not the literal content.

The portfolio must do two jobs at once:
1. Impress technical recruiters and engineers (the repo itself will be inspected, so code quality is part of the deliverable).
2. Read clearly and fast to a non-technical recruiter who spends under three minutes.

---

## 2. Who Kymani is (positioning)

Kymani is a developing professional who has deliberately **not** locked into a single niche. He is currently doing cloud/data engineering, has a full-stack background, is a cybersecurity major, and is genuinely open to future directions like **DevOps** and **SOC / security analyst** roles.

**Positioning rule:** Frame him as a broad, high-ceiling engineer, never boxed into one title. Nothing on the site should read as "I am only a data engineer." Lead with breadth across cloud, full-stack, data, and security.

Implementation of this:
- A primary identity line in the hero emphasizing breadth.
- A **rotating descriptor** under his name cycling through credible focus areas. These are framed as areas of expertise/focus, **not** held job titles (he has not held a DevOps or SOC title yet). Suggested cycle: `Cloud & Data Engineering` → `Full-Stack Development` → `DevOps & CI/CD` → `Cybersecurity`. All four are defensible (Smucker = cloud/data, ITSC = full-stack, GitLab→GitHub Actions migration = CI/CD, double major = cybersecurity).
- The rotating descriptor intentionally rhymes with the Spotlight reel's motion language so the page feels cohesive.

---

## 3. Tech stack & infrastructure (decided)

**Migrate** off the current Create React App + plain JavaScript setup.

| Concern | Decision |
|---|---|
| Build tool | **Vite** |
| Framework | **React 18+** |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS** (keep, but on a fresh, well-structured config) |
| Routing | **React Router** (hybrid scroll + dedicated routes, see §5) |
| 3D | **react-three-fiber** + **@react-three/drei** (Three.js) |
| Animation | **Framer Motion** (`motion`) for scroll reveals, parallax, transitions, rotating text |
| Icons / brand logos | **Simple Icons** (via `react-icons/si` or the `simple-icons` package) for the tech sphere; **lucide-react** for UI icons |
| Hosting | **Vercel** (move off GitHub Pages) |

Migration approach: do not try to salvage the old `Portfolio.jsx`. Scaffold a clean Vite + TS + Tailwind project, port any reusable content/data, and rebuild. Preserve git history (work on a branch, see §10).

**Open decision for Kymani (ASK):** custom domain. Default to the Vercel-generated subdomain. If he wants a custom domain (e.g. `kymanijarrett.dev`), structure metadata/OG tags so the domain is a single config change. Flag this and let him answer.

---

## 4. Design North Star (Atlas-inspired)

The Atlas page reads as: a clean, **bright and airy**, full-bleed hero built as a single composition, followed by vertically stacked feature sections that flow seamlessly into one another, with rich motion, expressive (non-default) typography, atmospheric (not flat) backgrounds, brand-first hierarchy, and one clear primary CTA path.

### Theme
**Bright and airy / light theme.** Warm off-white base, near-black ink text, one vivid accent, subtle multi-stop gradients and grain for atmosphere (never a flat single color).

Suggested palette (you may refine, keep the spirit):
- Base / paper: `#FAFAF7`
- Ink / text: `#0A0A0A`
- Muted text: `#5A5A55`
- Primary accent: an electric cobalt/indigo, e.g. `#3B49DF` (use sparingly, for CTAs, links, focus states, sphere glow)
- Secondary accent for gradients/hover: a warm complement, e.g. `#FF7A45` or a soft violet, used only in atmospheric gradients
- Surfaces/cards: white with soft shadows and generous radius

Provide a tasteful **dark-mode toggle as optional/stretch** only; the default and primary experience is light. Do not let dark mode delay the core build.

### Typography
Avoid default stacks (no Inter, Roboto, Arial, or system as the headline face). Use an expressive, purposeful system:
- **Display / headings:** `Clash Display` (or a comparably distinctive display face)
- **Body / UI:** `Geist Sans` (modern, distinctive, Vercel-native; fits the deploy target)
- **Mono / labels / rotating descriptor / code:** `Geist Mono` (gives the "developer" texture in small doses)

Load via Fontsource or self-host; do not block first paint.

### Motion (elevated — Kymani wants this)
Lean into motion: scroll-driven reveals, parallax on section transitions, the interactive sphere, the auto-rotating reel, the rotating identity descriptor, smooth page/route transitions. Keep it purposeful, not chaotic.
- **Mandatory:** honor `prefers-reduced-motion`. Every animated element needs a reduced-motion fallback (static positions, no parallax, sphere becomes a static styled logo cluster or grid).

### Hard Design Rules (from OpenAI's own published frontend guidance — treat as law)
- The first viewport must read as **one composition**, not a dashboard.
- Hierarchy: **brand/name first, headline second, body third, CTA fourth.**
- Brand test: if the first viewport could belong to anyone else after you remove the nav, the branding is too weak.
- Hero runs **full-bleed, edge-to-edge** (no inherited page gutters or shared max-width). Constrain only the inner text/action column.
- **No** hero cards, stat strips, logo clouds, "pill soup," or floating dashboards in the hero by default.
- Headlines: roughly 2–3 lines on desktop, readable in one glance on mobile.
- Backgrounds get atmosphere (gradients/grain/depth), never flat single color.
- Default section sequence: **Hero → Detail/Story → Final CTA.**

---

## 5. Information architecture & routing (hybrid)

Single scrolling home page plus dedicated deep-dive case-study routes.

```
/                     Home (long-scroll, all primary sections)
/projects/vigil       Vigil case study (full page)
/projects/clausify    Clausify case study (full page)
```

- Code-split the case-study routes (lazy load).
- Smooth in-page anchor navigation on `/`; smooth route transitions between pages (Framer Motion).
- Since this is Vercel (not a subpath), use normal `BrowserRouter`. Add a `vercel.json` rewrite so deep links resolve to the SPA.

### Home page section order (the "beats")
1. **Hero** — the 3D tech sphere (the single highlight; see §6). One composition.
2. **Spotlight reel** — Netflix-style rotating, clickable highlight carousel (see §7). This is the first thing on scroll.
3. **About** — short narrative: developing, high-ceiling engineer; breadth across cloud, full-stack, data, security; what he's building toward. A few sentences, not a wall.
4. **Selected Work** — Vigil and Clausify featured with strong visuals and "what problem it solves" framing, each linking to its case study. Bearcat Buddies automation featured here too as a "builds practical solutions" entry.
5. **Experience** — Smucker and ITSC prominent; others condensed (see §8).
6. **Skills** — clean categorized grid (Languages / Cloud & Tools / Frameworks / Practices). The sphere is the hero, so this stays restrained and scannable.
7. **Leadership & Impact** — UBSA Programming Chair, ColorStack Corporate Outreach Chair, Bearcat Buddies Secretary, Resident Assistant. Metrics-forward.
8. **Contact** — simple (see §8).
9. **Footer** — organized links (GitHub, LinkedIn, email, resume), built-with note optional.

---

## 6. The hero: 3D interactive tech sphere (THE highlight)

This is the centerpiece and the single most important visual. It must not compete with anything else in the viewport.

**Behavior:**
- A sphere whose surface is populated with the logos of the languages, frameworks, and tools Kymani works with (see logo list below). Logos face the camera (billboarded) and are evenly distributed on the sphere (Fibonacci sphere distribution).
- Auto-rotates slowly on load. **Draggable** to spin freely (pointer + touch). Optional: subtle scroll-linked rotation or scale as the user scrolls past.
- Soft accent-colored glow/atmosphere behind it. Logos can gently scale/brighten on hover.
- The hero text column (name, identity line, rotating descriptor, one primary CTA) sits in a calm area beside or layered over the sphere with strong contrast. Keep the text column narrow.
- Primary CTA: e.g. "View my work" (scrolls to Spotlight) or "Get in touch." Exactly one primary CTA in the hero.

**Tech:** react-three-fiber + drei (`Billboard`, `Html` or textured sprites). Use Simple Icons SVGs as textures or as `Html` overlays. Prefer instanced/sprite rendering for performance.

**Performance + fallback (required):**
- Lazy-init the 3D canvas; show a lightweight placeholder until ready.
- Cap pixel ratio, pause `requestAnimationFrame` when offscreen/tab hidden.
- `prefers-reduced-motion` and no-WebGL fallback: render a static, tastefully arranged 2D grid/cluster of the same logos. The page must be fully functional without WebGL.

**Logos for the sphere** (use Simple Icons; for items without an official brand logo, either omit from the sphere or render as a small styled mono token):
Python, TypeScript, JavaScript, Java, C#, React, Vite, Node.js, Express, FastAPI, AWS, Docker, PostgreSQL, Supabase, GitHub, GitHub Actions, Azure, Tailwind CSS, HTML5, CSS3, LangChain *(if available)*.
Omit/skip (no clean brand logo): SQL, YAML, boto3, Sequelize, Liquibase, Inversify.

---

## 7. The Spotlight reel (Netflix-style highlight carousel)

Beat 2, directly under the hero. A horizontally scrolling, **auto-rotating, manually controllable, clickable** highlight reel. Each tile is a facet of Kymani; clicking deep-links to the relevant case study or section.

**Six tiles, in this priority order:**
1. **Vigil** — production-grade ETL observability platform → links to `/projects/vigil`
2. **Clausify** — AI legal SaaS with RAG pipeline → links to `/projects/clausify`
3. **Smucker — Cloud & Data Engineering** — enterprise AWS ETL work → anchors to Experience
4. **ITSC — Full-Stack Engineering** — Fortune 500 apps, React + Node + Postgres → anchors to Experience
5. **Leadership & Impact** — UBSA / ColorStack / RA → anchors to Leadership section
6. **Bearcat Buddies Automation** — Power Automate recruitment pipeline he built to fix a real operational gap → anchors to Leadership/Selected Work

**Behavior:**
- Auto-advances on a timer; pauses on hover/focus/interaction. Manual prev/next controls and drag/swipe. Looping.
- Each tile: a strong visual/thumbnail, a short title, a one-line "what it is," and a clear affordance that it's clickable.
- Fully keyboard-navigable; respects `prefers-reduced-motion` (no auto-advance, manual only).
- If it ever crowds the hero on small screens, the reel yields, never the sphere. Keep them as two distinct viewport beats.

---

## 8. Content Source of Truth

Use this plus the attached one-page resume PDF (primary) and CV PDF (reference) for content. Do not fabricate metrics or facts.

### Identity / header
- Name: **Kymani Jarrett**
- University of Cincinnati, double major: **B.S. Information Technology & B.S. Cybersecurity**, GPA **3.7/4.0**, expected graduation **May 2028**
- **3x Dean's List** (Fall 2024, Summer 2025, Spring 2026)
- Links: GitHub `kymanirjarrett`, LinkedIn `kymanirjarrett`, Email `jarretkr@mail.uc.edu`

### PRIVACY — remove from the site entirely
- **No phone number.**
- **No street/city location.** (Do not display "Cincinnati" / "Columbus" as his location.)
- Email and social handles are fine (already public on his resume).

### Featured projects
**Vigil** — ETL Monitoring & Observability Platform.
React + Vite frontend, Python FastAPI backend, boto3 for AWS (Glue, CloudWatch, Step Functions), SendGrid email alerting, PostgreSQL via Supabase, JWT auth. Statistical anomaly detection (duration spikes, consecutive failures) with automated alerts. 7-day and 30-day trend windows. Dark, Datadog-style dashboard. Backend on Railway, frontend on Vercel. Repo: `github.com/kymanirjarrett/vigil`.

**Clausify** — AI-powered legal SaaS.
Next.js + TypeScript (shadcn/ui) frontend, FastAPI backend, LangChain + Groq AI, pgvector semantic search, RAG pipeline for clause-level contract risk scoring, multi-version diff tracking with AI-generated negotiation summaries, Supabase PostgreSQL, AWS S3 for document storage. Repo: `github.com/kymanirjarrett/clausify`.

**Bearcat Buddies recruitment automation** (leadership-as-builder highlight).
Microsoft Power Automate pipeline replacing a manual paper process: per-member QR-code attribution, automated welcome emails, SharePoint-hosted Excel quota dashboard (COUNTIF-based), plus an authored Semester Reset & Maintenance Guide for handoff. Shows initiative solving a real operational problem.

### Experience (feature the first two; condense the rest)
- **Cloud Data Engineer — The J.M. Smucker Company** (May–Aug 2026). Led migration of Sales Marketing & Analytics CloudFormation templates to GitHub with production-grade deployment workflows replacing the existing CI/CD pipeline; partner-driven identification integration across a full raw→curated→published ETL pipeline (AppFlow, Glue tables, Athena validation); YAML IaC CloudFormation; Lambda runtime upgrades via cross-team coordination. Stack: AWS Glue, S3, Athena, Lambda, Step Functions, CloudFormation, AppFlow, GitHub Actions, Informatica IICS, Python, boto3.
- **Full Stack Software Engineer — UC IT Solutions Center** (Aug 2025–May 2026). Full-stack apps for Fortune 500 clients; ReactJS (Vite), TanStack, Zod; Node/TypeScript + Express, PostgreSQL (Sequelize), Inversify DI, Liquibase migrations; reduced data processing time 30%, accelerated release cycles 20%; Clean Architecture + SOLID.
- Condensed/optional (keep it tight, recruiters want 3–5): Resident Assistant (Aug 2026–present, surface under Leadership), Front-End Intern — Toyz Electronics (Jan–May 2025), Handshake Creator (Jul 2025). The longer CV has the rest; do not pad the site with non-technical roles.

### Skills (categorized grid)
- **Languages:** Python, TypeScript, JavaScript, Java, SQL, C#, HTML5/CSS, YAML
- **Cloud & Tools:** AWS (Glue, S3, EC2, Athena, Lambda, Step Functions, CloudFormation, AppFlow), Azure, Docker, PostgreSQL, Supabase, GitHub, GitHub Actions, Microsoft Power Automate
- **Frameworks & Libraries:** React, Vite, Node.js, Express, FastAPI, boto3, LangChain, Sequelize, Liquibase, Inversify, Tailwind CSS
- **Practices:** CI/CD, ETL Pipeline Development, RAG Pipeline Development, Clean Architecture, Agile/Scrum

### Leadership & Impact (metrics-forward)
- **Programming Chair — United Black Student Association:** owns programming/event strategy; "The RoundTable" recruiting dinner pairing members with hiring managers; 4+ signature events/semester, 40+ attendance.
- **Corporate Outreach Chair — ColorStack @ UC:** 20+ active employer relationships, 10+ exclusive opportunities sourced per semester, 2+ technical workshops/semester (30+ attendance).
- **Secretary — Bearcat Buddies Advisory Council:** record-keeping + the recruitment automation system above.
- **Resident Assistant — Resident Education & Development.**

### Resume on the site
- Primary CTA "Download Resume" → the **one-page resume PDF**.
- Secondary link "View full CV" → the CV PDF.
- Place both PDFs in `public/` and link them.

### Contact (simple, no form)
- `mailto:jarretkr@mail.uc.edu`, GitHub, LinkedIn. That's it. No contact form, no backend.

---

## 9. Accessibility, performance, SEO

- Semantic HTML, logical heading order, visible focus states, keyboard support for the reel and any interactive 3D affordances.
- All meaningful images get alt text; decorative ones are hidden from AT.
- `prefers-reduced-motion` fully respected across sphere, reel, parallax, and transitions.
- Lazy-load the 3D canvas and route-split case studies. Target Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ on desktop (mobile may dip due to 3D; degrade gracefully).
- SEO: title, meta description, Open Graph + Twitter card, a generated OG image, canonical URL, `robots`/`sitemap`. Structured data (`Person` JSON-LD) is a nice touch.
- Mobile-first and fully responsive (320px → large desktop).

---

## 10. Engineering quality (the repo is part of the portfolio)

Kymani works with branch protection, conventional commits, and structured CI/CD, and wants the repo to impress engineers who open it.

- Work on a **feature branch** (e.g. `feat/atlas-rehaul`), open a PR, do not commit straight to `main`.
- **Conventional commits** throughout.
- **TypeScript strict**, **ESLint + Prettier** configured and passing.
- Clear component structure (e.g. `components/`, `sections/`, `pages/`, `data/`, `hooks/`, `lib/`). Keep content in typed data modules (`data/projects.ts`, `data/experience.ts`, etc.) so it's easy to edit, not hardcoded in JSX.
- A small but real test setup: **Vitest + React Testing Library**, with a couple of meaningful component tests (e.g. the reel advances/pauses, the sphere fallback renders without WebGL).
- **GitHub Actions CI**: lint + typecheck + build + test on PR. Vercel preview deploys per PR.
- Rewrite the **README**: accurate stack, screenshots/GIF, local setup, deploy notes, and an architecture/structure overview. Remove the old CRA/GitHub Pages instructions and the placeholder preview image.
- Add `prefers-reduced-motion` and accessibility notes to the README to signal care.

---

## 11. Definition of done

- Vite + React + TS + Tailwind project, replacing the CRA build, deployed on Vercel.
- Light/airy, Atlas-flavored design honoring all Hard Design Rules.
- Interactive 3D tech sphere hero with a working reduced-motion / no-WebGL fallback.
- Netflix-style six-tile Spotlight reel, auto-rotating + manual + keyboard accessible.
- Hybrid routing: home + `/projects/vigil` + `/projects/clausify` case studies.
- All sections from §5 built with the §8 content; phone and location removed everywhere.
- Resume (one-pager) downloadable, CV linked.
- CI green, README rewritten, PR opened.

---

## 12. How to run this with Claude Code (read before starting, Kymani)

When you hand this file to Claude Code, include all of the following so it has everything it needs:

1. **This file** (`PORTFOLIO_REHAUL.md`) placed in the repo root, or attached.
2. **Both PDFs** for content accuracy: put `Kymani_Jarrett_Resume.pdf` (one-pager) and `Kymani_Jarrett_Curriculum_Vitae.pdf` in a `/reference` folder in the repo (and copy the one-pager into `public/` for the download link). Tell Claude Code not to invent facts beyond these.
3. **Atlas screenshots.** Claude Code cannot reliably load `chatgpt.com/atlas` (it blocks automated access). Take 2–3 screenshots yourself — the hero, one mid-page feature section, and the footer — and drop them in `/reference` (e.g. `atlas-hero.png`, `atlas-feature.png`, `atlas-footer.png`). These are the visual reference.
4. **Run it inside the `portfolio` repo directory**, and let it create a new branch (don't point it at an empty folder).
5. Have your **Vercel account ready**, and decide whether you want a **custom domain** (Claude Code will ask; default is the Vercel subdomain).

### Copy-paste kickoff prompt for Claude Code

```
Read PORTFOLIO_REHAUL.md in this repo in full before doing anything, then rebuild
my portfolio according to it.

- Follow the stack, structure, routing, and content exactly as specified.
- Treat the "Design North Star" and "Hard Design Rules" sections as non-negotiable.
- The atlas-*.png files in /reference are the visual reference for layout and feel.
  Mimic the flow and graphic language; keep it original (this is my personal site).
- Use my one-page resume (/reference) as the primary content source and the CV for
  detail. Do NOT invent facts, metrics, or experience.
- Remove my phone number and location everywhere.
- Work on a new branch, use conventional commits, set up ESLint/Prettier/Vitest and
  GitHub Actions CI, and configure the project to deploy on Vercel.
- Before any decision the doc explicitly leaves to me (custom domain, anything
  ambiguous), stop and ask me.

Start by proposing the migration plan and the file/route structure. Wait for my OK,
then build incrementally, section by section, beginning with the hero sphere.
```

---

## Appendix A — Why these choices (recruiter rationale)

Backing the structural decisions, current research on technical portfolios that land interviews: recruiters spend under three minutes, so name/role/target must be instantly visible (hero + rotating identity); they want **clickable live demos** (Vigil and Clausify deep links + live URLs); they reward **measurable impact and clear "what problem did it solve" narratives** (case-study pages); they want **3–5 strongest items** featured, not everything (the six-tile reel + condensed experience); and the **site being clean, inspectable code is itself a hiring signal** (the §10 engineering bar). The breadth-forward positioning keeps DevOps and SOC-analyst doors open without diluting the current cloud/data and full-stack credibility.

## Appendix B — Tech sphere logo shortlist (Simple Icons slugs)
`python, typescript, javascript, openjdk` (Java), `dotnet`/`csharp`, `react, vite, nodedotjs, express, fastapi, amazonaws`/`amazonwebservices, docker, postgresql, supabase, github, githubactions, microsoftazure, tailwindcss, html5, css3, langchain` (verify availability). Skip items without clean brand marks (SQL, YAML, boto3, Sequelize, Liquibase, Inversify) or render them as small mono tokens.
