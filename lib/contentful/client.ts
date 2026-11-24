/**
 * Contentful GraphQL API client
 * @module lib/contentful/client
 */

const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

export interface GraphQLResponse<T = Record<string, any>> {
  data: T | null;
  errors?: unknown[];
}

/**
 * Execute a GraphQL query against the Contentful API.
 * Network and API failures are logged and resolve to `{ data: null }` so pages can
 * render a fallback instead of failing the whole build.
 */
export async function fetchGraphQL<T = Record<string, any>>(
  query: string,
  preview = false
): Promise<GraphQLResponse<T>> {
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

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors) {
    console.error('Contentful GraphQL errors:', json.errors);
  }

  return json;
}

/**
 * Render a value as a GraphQL string literal (quoted and escaped).
 * Use for every value interpolated into a query so input cannot break out of the string.
 */
export function gqlString(value: unknown): string {
  return JSON.stringify(String(value ?? ''));
}

/** Build a Contentful metadata tag filter clause for GraphQL queries. */
export function buildSpaceFilter(space?: string): string {
  if (!space) {
    return '';
  }
  return `, contentfulMetadata: { tags: { id_contains_some: [${gqlString(space)}] } }`;
}
