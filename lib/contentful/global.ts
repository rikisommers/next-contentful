import { getLoading, getThemes } from './api';

/**
 * Data every page needs (navigation, logo, theme, site title).
 * Fetched in each page's getStaticProps so pages stay statically generated,
 * instead of in `_app.getInitialProps`, which opts the whole site out of
 * static optimisation and re-runs in the browser on client navigations.
 *
 * Custom themes are only used by the development-only theme editor, so they
 * are not fetched in production builds.
 */
export async function getGlobalProps() {
  const [globalData, customThemes] = await Promise.all([
    getLoading(),
    process.env.NODE_ENV === 'development' ? getThemes() : Promise.resolve([]),
  ]);

  return {
    globalData: globalData ?? null,
    customThemes: customThemes ?? [],
  };
}

/** ISR window (seconds). Content is also refreshed on demand via /api/revalidate. */
export const REVALIDATE_SECONDS = 300;
