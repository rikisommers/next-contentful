/**
 * GraphQL field definitions for landing page content types
 * @module lib/contentful/queries/landing
 */

import { BLOCK_FRAGMENTS } from './fragments';

/** Full fields for a landing page with content blocks */
export const LANDING_GRAPHQL_FIELDS = `
  slug
  contentfulMetadata {
    tags {
      id
      name
    }
  }
  sys {
    id
    publishedAt
  }
  csblocksCollection(limit: 4) {
    items {
      ${BLOCK_FRAGMENTS}
    }
  }
`;
