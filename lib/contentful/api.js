/**
 * Contentful data-fetching functions
 * Each function composes the GraphQL client with query fragments
 * @module lib/contentful/api
 */

import { fetchGraphQL, buildSpaceFilter, gqlString } from './client';
import {
  PAGE_GRAPHQL_FIELDS,
  HOME_GRAPHQL_FIELDS,
  LANDING_GRAPHQL_FIELDS,
  POSTINTRO_GRAPHQL_FIELDS,
  POST_GRAPHQL_FIELDS,
  IMAGES_GRAPHQL_FIELDS,
  FOOTER_GRAPHQL_FIELDS,
  GLOBAL_GRAPHQL_FIELDS,
  THEME_GRAPHQL_FIELDS,
} from './queries';

// ---------------------------------------------------------------------------
// Extractors -- safely pull items from GraphQL responses
// ---------------------------------------------------------------------------

function extractFirstItem(response, collectionKey) {
  return response?.data?.[collectionKey]?.items?.[0] ?? null;
}

function extractItems(response, collectionKey) {
  return response?.data?.[collectionKey]?.items ?? [];
}

// ---------------------------------------------------------------------------
// Preview
// ---------------------------------------------------------------------------

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: ${gqlString(slug)} }, preview: true, limit: 1) {
        items { ${POST_GRAPHQL_FIELDS} }
      }
    }`,
    true
  );
  return extractFirstItem(entry, 'postCollection');
}

// ---------------------------------------------------------------------------
// Home / Pages
// ---------------------------------------------------------------------------

export async function getHomePage(slug) {
  const spaceFilter = buildSpaceFilter(process.env.SPACE);
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { slug: ${gqlString(slug)}${spaceFilter} }, limit: 1) {
        items { ${HOME_GRAPHQL_FIELDS} }
      }
    }`
  );
  return extractFirstItem(response, 'homeCollection');
}

export async function getLandingPage(slug) {
  const spaceFilter = buildSpaceFilter(process.env.SPACE);
  const query = `query {
    homeCollection(where: { slug: ${gqlString(slug)}${spaceFilter} }, limit: 1) {
      items { ${LANDING_GRAPHQL_FIELDS} }
    }
  }`;

  try {
    const response = await fetchGraphQL(query);
    const data = extractFirstItem(response, 'homeCollection');

    if (!data) {
      console.warn('No data found for slug:', slug);
    }

    return data;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export async function getPages() {
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { type: "home" }) {
        items { ${PAGE_GRAPHQL_FIELDS} }
      }
    }`
  );
  return extractFirstItem(response, 'homeCollection');
}

export async function getHomeCollection() {
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { type: "home" }, order: order_ASC) {
        items {
          sys { id }
          title
          slug
          order
        }
      }
    }`
  );
  return response.data?.homeCollection ?? null;
}

export async function getHome() {
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { slug: "home" }, limit: 1) {
        items { ${PAGE_GRAPHQL_FIELDS} }
      }
    }`
  );
  return extractFirstItem(response, 'homeCollection');
}

export async function getWork() {
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { slug: "work" }, limit: 1) {
        items { ${PAGE_GRAPHQL_FIELDS} }
      }
    }`
  );
  return extractFirstItem(response, 'homeCollection');
}

// ---------------------------------------------------------------------------
// Slugs
// ---------------------------------------------------------------------------

export async function getAllHomePageSlugs() {
  const spaceFilter = buildSpaceFilter(process.env.SPACE);
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { contentfulMetadata: { tags: { id_contains_some: [${gqlString(process.env.SPACE)}] } } }) {
        items {
          slug
          title
        }
      }
    }`
  );
  return extractItems(response, 'homeCollection');
}

// ---------------------------------------------------------------------------
// Case Studies / Blog Posts
// ---------------------------------------------------------------------------

export async function getAllCaseStudies(preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(limit: 10) {
        items { ${POSTINTRO_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'caseStudyCollection');
}

export async function getAllBlogPosts(preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection {
        items { ${POSTINTRO_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'caseStudyCollection');
}

export async function getPost(slug, preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(where: { slug: ${gqlString(slug)} }, limit: 1, preview: ${preview}) {
        items { ${POST_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'caseStudyCollection');
}

export async function getNextPost(slug, preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(where: { slug_not_in: ${gqlString(slug)} }, order: title_ASC, limit: 1, preview: ${preview}) {
        items { ${POSTINTRO_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'caseStudyCollection');
}

export async function getAllCaseStudiesIntro(preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(preview: ${preview}) {
        items { ${POSTINTRO_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'caseStudyCollection');
}

export async function getAllBlogPostsIntro(preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(preview: ${preview}, order: title_ASC) {
        items { ${POSTINTRO_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  const data = extractItems(response, 'caseStudyCollection');
  const allTags = [...new Set(data.flatMap((item) => item.tags || []))];
  return { posts: data, tags: allTags };
}

export async function getAllBlogTags(preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(preview: ${preview}, order: title_ASC) {
        items { tags }
      }
    }`,
    preview
  );
  const items = extractItems(response, 'caseStudyCollection');
  return items
    .flatMap((item) => item.tags)
    .filter((tag, index, self) => self.indexOf(tag) === index);
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

export async function getAllImages(preview = false) {
  const response = await fetchGraphQL(
    `query {
      caseStudyCollection(preview: ${preview}) {
        items { ${IMAGES_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'caseStudyCollection');
}

// ---------------------------------------------------------------------------
// Footer / Global Settings
// ---------------------------------------------------------------------------

/** `where` clause limiting a collection to entries tagged with this site's SPACE tag. */
function spaceWhere() {
  return process.env.SPACE
    ? `, where: { contentfulMetadata: { tags: { id_contains_some: [${gqlString(process.env.SPACE)}] } } }`
    : '';
}

/**
 * The footer entry for this site. Filtered by the SPACE tag: the Contentful space holds
 * footers for several sites, and an unfiltered query returns an arbitrary one.
 */
export async function getFooter(preview = false) {
  const response = await fetchGraphQL(
    `query {
      footerCollection(limit: 1${spaceWhere()}) {
        items { ${FOOTER_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractFirstItem(response, 'footerCollection');
}

/** @deprecated Same as getFooter. */
export const getGlobal = getFooter;

export async function getLoading(preview = false) {
  const spaceFilter = buildSpaceFilter(process.env.SPACE);
  const response = await fetchGraphQL(
    `query {
      settingsCollection(
        where: { contentfulMetadata: { tags: { id_contains_some: [${gqlString(process.env.SPACE)}] } } },
        limit: 1
      ) {
        items { ${GLOBAL_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractFirstItem(response, 'settingsCollection');
}

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

export async function getTheme(preview = false) {
  const response = await fetchGraphQL(
    `query {
      themeCollection(limit: 1) {
        items { ${THEME_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractItems(response, 'themeCollection');
}

export async function getThemes(preview = false) {
  const response = await fetchGraphQL(
    `query {
      themeCollection(limit: 10) {
        items {
          sys { id }
          ${THEME_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return extractItems(response, 'themeCollection');
}

// ---------------------------------------------------------------------------
// SEO feeds
// ---------------------------------------------------------------------------

/**
 * Every published page and case study with dates, tags, block counts and (for
 * case studies) the intro facts, for the sitemap, RSS, llms.txt and /resume.json.
 * Visibility filtering happens in lib/case-study-visibility.ts.
 */
export async function getSitemapEntries() {
  const response = await fetchGraphQL(
    `query {
      homeCollection(limit: 100${spaceWhere()}) {
        items { slug title sys { publishedAt } }
      }
      caseStudyCollection(limit: 200, order: sys_firstPublishedAt_DESC) {
        items {
          slug title subtitle client tags blog
          sys { publishedAt firstPublishedAt }
          contentfulMetadata { tags { id } }
          csblocksCollection(limit: 1) { total }
        }
      }
    }`
  );
  return {
    pages: extractItems(response, 'homeCollection').map((p) => ({
      slug: p.slug,
      title: p.title ?? null,
      updatedAt: p.sys?.publishedAt ?? null,
    })),
    articles: extractItems(response, 'caseStudyCollection').map((a) => ({
      slug: a.slug,
      title: a.title ?? null,
      subtitle: a.subtitle ?? null,
      client: a.client ?? null,
      skills: a.tags ?? [],
      blog: a.blog === true,
      publishedAt: a.sys?.publishedAt ?? null,
      firstPublishedAt: a.sys?.firstPublishedAt ?? null,
      siteTags: (a.contentfulMetadata?.tags ?? []).map((t) => t.id),
      blockCount: a.csblocksCollection?.total ?? 0,
    })),
  };
}
