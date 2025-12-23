# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core commands

This is a Next.js App Router project created with `create-next-app`.

### Local development

- Start dev server: `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
  - Serves the app at `http://localhost:3000`.

### Build & run in production mode

- Build: `npm run build`
- Start after build: `npm start`

### Linting

- Run ESLint with the Next.js config: `npm run lint`
  - Uses `eslint.config.mjs` with `eslint-config-next` (core-web-vitals + TypeScript) and custom ignores for `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.

### Testing

- There is currently **no test script configured** in `package.json` and no obvious test setup. To add tests, introduce a test framework (e.g. Jest, Vitest, Playwright) and wire it via a `"test"` (and optionally `"test:watch"`) script in `package.json`.

## Project structure & architecture

### High-level layout

- This is a TypeScript React app using the **Next.js App Router** with the main source under `src/`:
  - `src/app/layout.tsx` — root layout, sets global fonts via `next/font` (Geist and Geist_Mono) and imports global styles from `src/app/globals.css`. Exposes `metadata` for the app.
  - `src/app/page.tsx` — the home route (`/`). A simple composition of top-level UI sections: `Header`, `Values`, and `NewsServer`.
- Shared and feature components live under `src/components/`.
- Static assets (images, etc.) are under `public/` and referenced by relative `/images/...` paths.

### Components & routing

- **Routing model**
  - The project uses the App Router: each route lives under `src/app/<route>/page.tsx`.
  - Currently only the root route is defined via `src/app/page.tsx`.

- **Top-level sections on the home page**
  - `Header` (`src/components/Header/Header.tsx`)
    - Pure presentational component rendering the site header with branding, a navigation bar, and contact actions.
    - Styled via a colocated SCSS module `Header.module.scss`.
  - `Values` (`src/components/Values/Values.tsx`)
    - Static content describing clinic values, arranged as a grid of four items.
    - Uses a SCSS module `Values.module.scss` and references images from `public/images`.
  - `NewsServer` + `NewsClient` (`src/components/News/NewsServer.tsx` and `src/components/News/News.tsx`)
    - **`NewsServer`** is an async **server component** responsible for data fetching:
      - Calls `https://dummyjson.com/posts?limit=15` with `cache: 'no-store'` to always fetch fresh posts.
      - Normalizes the response to a `posts: { id; title; body }[]` array and passes it to `NewsClient`.
    - **`NewsClient`** is a `"use client"` **client component** that implements the interactive UI:
      - Renders a horizontal slider or grid of news cards using a `ref` for imperative scrolling.
      - Provides left/right buttons for sliding when not showing all posts.
      - Allows toggling to "show all" posts in a grid layout.
      - Associates each rendered post with an image path computed from its index (e.g. `/images/news-1.png`).
      - All UI behavior and layout are controlled via the `News.module.scss` stylesheet.

- **Form**
  - `src/components/Form/Form.tsx` exists but is currently empty. If you introduce a form flow, this is a natural place to build it, keeping styles in `Form.module.scss`.

### Styling approach

- Global styles:
  - `src/app/globals.css` provides base/global styling and is imported once in `src/app/layout.tsx`.
- Component-scoped styles:
  - Each major component (`Header`, `Values`, `News`, `Form`) uses a colocated `*.module.scss` file imported as `styles` and referenced via `className={styles.someClass}`.
  - This pattern should be followed for new UI components to keep styles encapsulated.

### TypeScript & module resolution

- TypeScript is configured via `tsconfig.json` with `strict` enabled and `noEmit: true`.
- Module resolution:
  - Uses `"module": "esnext"` and `"moduleResolution": "bundler"` as recommended for modern Next.js.
  - Defines a path alias `@/*` → `./src/*`, used throughout the app (e.g. `import Header from '@/components/Header/Header';`).
- All React/Next code should be written in TypeScript (`.ts`/`.tsx`), consistent with the current setup.

### ESLint configuration

- `eslint.config.mjs` composes Next.js ESLint presets:
  - `eslint-config-next/core-web-vitals` for React/Next best practices.
  - `eslint-config-next/typescript` for TS-specific rules.
- `globalIgnores` is used to ignore generated build artifacts and type stubs: `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.
- When adding new directories that contain generated code or build outputs, extend these ignores rather than disabling lint rules inline.

## Notes derived from README

- Development is expected to follow the standard Next.js workflow from `create-next-app`:
  - Use `npm run dev` (or the equivalent yarn/pnpm/bun command) for local iteration.
  - Refer to the official Next.js docs for advanced topics like data fetching strategies, deployment, and performance optimization.
