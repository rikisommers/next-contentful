/**
 * GraphQL field definitions for case study / blog post content types
 * @module lib/contentful/queries/post
 */

import { BLOCK_FRAGMENTS } from './fragments';

/** Fields for case study / blog post intro cards */
export const POSTINTRO_GRAPHQL_FIELDS = `
  slug
  color
  type
  title
  subtitle
  client
  tags
  layout
  img {
    title
    url
    description
  }
`;

/** Full fields for a case study / blog post with all blocks */
export const POST_GRAPHQL_FIELDS = `
  slug
  title
  subtitle
  color
  protected
  tags
  img {
    title
    url
    description
  }
  csblocksCollection(limit: 16) {
    items {
      ${BLOCK_FRAGMENTS}
    }
  }
`;

/** Fields for image collections within case studies */
export const IMAGES_GRAPHQL_FIELDS = `
  img { url }
  csblocksCollection(limit: 10) {
    items {
      __typename
      ... on BlockImage {
        image { url }
      }
      ... on BlockIg {
        imagegridCollection(limit: 2) {
          items { url }
        }
      }
    }
  }
`;
