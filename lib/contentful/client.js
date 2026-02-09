/**
 * Contentful GraphQL API client
 * @module lib/contentful/client
 */

const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

/**
 * Execute a GraphQL query against the Contentful API
 * @param {string} query - GraphQL query string
 * @param {boolean} [preview=false] - Whether to use the preview API
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {Error} If the request fails or returns GraphQL errors
 */
export async function fetchGraphQL(query, preview = false) {
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  const response = await fetch(CONTENTFUL_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    console.error(`Contentful API error: ${response.status} ${response.statusText}`);
    return { data: null };
  }

  const json = await response.json();

  if (json.errors) {
    console.error('Contentful GraphQL errors:', json.errors);
  }

  return json;
}

/**
 * Build a Contentful metadata tag filter clause for GraphQL queries
 * @param {string} [space] - Space tag ID to filter by
 * @returns {string} GraphQL filter clause or empty string
 */
export function buildSpaceFilter(space) {
  if (!space) {
    return '';
  }
  return `, contentfulMetadata: { tags: { id_contains_some: ["${space}"] } }`;
}
