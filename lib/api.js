/**
 * Barrel export for Contentful API functions
 *
 * All data-fetching logic has been modularized into:
 *   - lib/contentful/client.js      -- GraphQL client and error handling
 *   - lib/contentful/queries/       -- GraphQL field definitions
 *   - lib/contentful/api.js         -- Data-fetching functions
 *
 * This file re-exports everything for backward compatibility.
 * New code should import directly from lib/contentful/api.
 *
 * @module lib/api
 */

export {
  getPreviewPostBySlug,
  getHomePage,
  getLandingPage,
  getPages,
  getHomeCollection,
  getHome,
  getWork,
  getAllHomePageSlugs,
  getAllCaseStudies,
  getAllBlogPosts,
  getPost,
  getNextPost,
  getAllCaseStudiesIntro,
  getAllBlogPostsIntro,
  getAllBlogTags,
  getAllImages,
  getGlobal,
  getFooter,
  getLoading,
  getTheme,
  getThemes,
} from './contentful/api';
