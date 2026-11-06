# Contentful Developer Showcase

Next.js (Pages Router) + Contentful GraphQL, Tailwind v4, Motion, React Three Fiber. Deployed on Vercel.

## Commands

```bash
yarn dev          # dev server (Turbopack)
yarn build        # production build
yarn lint         # ESLint (flat config, eslint-config-next)
yarn typecheck    # tsc --noEmit
yarn test         # Vitest unit tests
yarn test:e2e     # Playwright (axe accessibility)
```

To run a second server beside an existing one: `NEXT_DIST_DIR=.next-build yarn build && NEXT_DIST_DIR=.next-build npx next start -p 3101`.

## Architecture

- `pages/` -- every page fetches its data (including global nav/theme via `lib/contentful/global.ts`) in `getStaticProps` with ISR. Do not add `_app.getInitialProps`.
- `lib/site.ts` -- site name, URL (`NEXT_PUBLIC_SITE_URL`), `absoluteUrl`. `lib/seo-feeds.ts` builds sitemap, robots and RSS.
- `components/seo/seo-meta.tsx` -- all per-page metadata and JSON-LD. Pages must render one `h1`.
- `lib/contentful/` -- `client.ts` (`fetchGraphQL`, `gqlString`), `api.js`, `queries/`. Always wrap interpolated values in `gqlString()`.
- `utils/themes/` -- theme definitions. `config/default-theme.ts` holds `DEFAULT_THEME` and `resolveTheme()`; every theme key must have a default there or in `config/defaults.js`. `utils/styleUtils.js` turns a theme into CSS variables (`getThemeCssVars`), used for SSR and in the browser.
- `components/context/themeContext.tsx` -- renders on the server with the CMS theme; do not return `null` before mount.

## Rules

- Theme editor and its API routes are development only (`NODE_ENV === 'development'`). New routes that use `CONTENTFUL_MANAGEMENT_TOKEN` must be wrapped in `devOnly()` (`lib/dev-only.ts`).
- Leva is dev-only: import `useControls` from `utils/dev-controls`, never from `leva`.
- No `console.log`. Hooks must not be called after an early return.
- New modules are TypeScript; JavaScript files are migrated when touched. Types for React 19.
- Tests live in `tests/unit` (Vitest) and `tests/e2e` (Playwright).

## Known follow-ups

- ~450 ESLint warnings (mostly unused variables) and React Compiler lint rules set to `warn`.
- Some CMS content is placeholder text (home hero, footer).
- Article links with domain-like slugs (`bluesky.com`, `ctatest.com`) prefetch missing pages.
- Playwright e2e needs `npx playwright install` for the current Playwright version.
