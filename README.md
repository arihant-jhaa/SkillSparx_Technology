# SkillSparx Technology

SkillSparx Technology is a Vite and React single-page application for exploring the course catalogue, syllabus details, and enrollment contact options.

## Project layout

- `Frontend/` — Vite application, source code, public assets, and Vercel configuration.
- `Frontend/src/components/layout/` — shared navigation, brand, and footer.
- `Frontend/src/components/sections/` — homepage and catalogue sections.
- `Frontend/src/components/courses/` — course artwork and WhatsApp link components.
- `Frontend/src/components/login/` — login interface components.
- `Frontend/src/pages/` — home, classes, and individual course pages.
- `Frontend/src/data/` — the 32 course outlines and artwork metadata.
- `Frontend/public/images/courses/` — local course-specific SVGs.
- `cources/` — original syllabus source files; retained as supplied and not required at runtime.

The checked-out project has no backend application or API routes. The course catalogue and static pages run in the frontend. No environment variables are required for the current frontend build; WhatsApp links use the configured business contact number in the frontend utility.

## Local development

From `Frontend/`:

```sh
npm ci
npm run dev
```

Build and preview the production bundle:

```sh
npm run build
npm run preview
```

Direct routes include `/classes` and `/courses/:slug`. Unknown course slugs show the course not-found page.

## Vercel deployment

When importing this repository into Vercel, set **Root Directory** to `Frontend`.

- Framework Preset: **Vite**
- Node.js Version: **24.x**
- Install Command: `npm ci` (or Vercel's npm lockfile detection)
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: none required by the current frontend

`Frontend/vercel.json` rewrites SPA page requests to `index.html` so direct route opens and refreshes can load the React app. There are no backend endpoints in this project; any future backend should be deployed separately and connected through a public `VITE_` URL, with private secrets kept server-side.
