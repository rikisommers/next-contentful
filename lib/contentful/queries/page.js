/**
 * GraphQL field definitions for page-level content types
 * @module lib/contentful/queries/page
 */

/** Fields for basic page content */
export const PAGE_GRAPHQL_FIELDS = `
  title
  intro
  content { json }
  sys {
    id
    publishedAt
  }
  titlealt
  contentalt
  video {
    title
    description
    poster {
      title
      url
      description
    }
  }
  textLoop {
    lead
    textCollection(limit: 10) {
      items {
        basicContent
        content { json }
      }
    }
  }
`;

/** Fields for home page entries */
export const HOME_GRAPHQL_FIELDS = `
  title
  intro
  image { url }
  titlealt
  contentalt
  content { json }
  sys {
    id
    publishedAt
  }
`;

/** Fields for global site settings */
export const GLOBAL_GRAPHQL_FIELDS = `
  sitetitle
  loadingText
  currentTheme
  text
  logo {
    title
    url
  }
  menuCollection(limit: 10) {
    items {
      slug
      title
      icon
    }
  }
`;

/** Fields for footer content */
export const FOOTER_GRAPHQL_FIELDS = `
  title
  content
  cta
  ctalink
  address
  phone
  email
  privacypolicy
  cookiespolicy
  socialCollection {
    items {
      title
      url
      icon { url }
    }
  }
`;

/** Fields for theme entries */
export const THEME_GRAPHQL_FIELDS = `
  sys { id }
  name
  data
`;
