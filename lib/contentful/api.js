/**
 * Contentful data-fetching functions
 * Each function composes the GraphQL client with query fragments
 * @module lib/contentful/api
 */

import { fetchGraphQL, buildSpaceFilter } from './client';
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
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
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
      homeCollection(where: { slug: "${slug}"${spaceFilter} }) {
        items { ${HOME_GRAPHQL_FIELDS} }
      }
    }`
  );
  return extractFirstItem(response, 'homeCollection');
}

export async function getLandingPage(slug) {
  const spaceFilter = buildSpaceFilter(process.env.SPACE);
  const query = `query {
    homeCollection(where: { slug: "${slug}"${spaceFilter} }) {
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
      homeCollection(where: { slug: "home" }) {
        items { ${PAGE_GRAPHQL_FIELDS} }
      }
    }`
  );
  return extractFirstItem(response, 'homeCollection');
}

export async function getWork() {
  const response = await fetchGraphQL(
    `query {
      homeCollection(where: { slug: "work" }) {
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
      homeCollection(where: { contentfulMetadata: { tags: { id_contains_some: ["${process.env.SPACE}"] } } }) {
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
      caseStudyCollection(where: { type_contains_all: "casestudy" }, limit: 10) {
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
      caseStudyCollection(where: { type_contains_all: "blogpost" }) {
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
      caseStudyCollection(where: { slug: "${slug}" }, order: title_ASC, preview: ${preview}) {
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
      caseStudyCollection(where: { slug_not_in: "${slug}" }, order: title_ASC, limit: 1, preview: ${preview}) {
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
      caseStudyCollection(where: { type_contains_all: "casestudy" }, preview: ${preview}) {
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
      caseStudyCollection(where: { type_contains_all: "blogpost" }, preview: ${preview}, order: title_ASC) {
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
      caseStudyCollection(where: { blog: true }, preview: ${preview}, order: title_ASC) {
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

export async function getGlobal(preview = false) {
  const response = await fetchGraphQL(
    `query {
      footerCollection(limit: 1) {
        items { ${FOOTER_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractFirstItem(response, 'footerCollection');
}

export async function getFooter(preview = false) {
  const response = await fetchGraphQL(
    `query {
      footerCollection(limit: 1) {
        items { ${FOOTER_GRAPHQL_FIELDS} }
      }
    }`,
    preview
  );
  return extractFirstItem(response, 'footerCollection');
}

export async function getLoading(preview = false) {
  const spaceFilter = buildSpaceFilter(process.env.SPACE);
  const response = await fetchGraphQL(
    `query {
      settingsCollection(
        where: { contentfulMetadata: { tags: { id_contains_some: ["${process.env.SPACE}"] } } },
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
