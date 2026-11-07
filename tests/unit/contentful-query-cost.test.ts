/**
 * Live check against Contentful: every query that renders blocks must stay under the
 * GraphQL complexity limit (11000). Skipped when no Contentful credentials are set.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { POST_GRAPHQL_FIELDS } from '../../lib/contentful/queries/post';
import { LANDING_GRAPHQL_FIELDS } from '../../lib/contentful/queries/landing';

const env: Record<string, string> = { ...process.env } as Record<string, string>;
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const i = line.indexOf('=');
    if (i > 0 && !env[line.slice(0, i)]) env[line.slice(0, i)] = line.slice(i + 1);
  }
}
const hasCredentials = Boolean(env.CONTENTFUL_SPACE_ID && env.CONTENTFUL_ACCESS_TOKEN);

async function run(query: string) {
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}` },
    body: JSON.stringify({ query }),
  });
  return (await res.json()) as { errors?: { message: string }[] };
}

describe.skipIf(!hasCredentials)('Contentful query complexity', () => {
  it('case study query is under the limit', async () => {
    const json = await run(`query { caseStudyCollection(where: { slug: "x" }, limit: 1) { items { ${POST_GRAPHQL_FIELDS} } } }`);
    expect(json.errors?.map((e) => e.message) ?? []).toEqual([]);
  }, 30000);

  it('landing page query is under the limit', async () => {
    const json = await run(`query { homeCollection(where: { slug: "home" }, limit: 1) { items { ${LANDING_GRAPHQL_FIELDS} } } }`);
    expect(json.errors?.map((e) => e.message) ?? []).toEqual([]);
  }, 30000);
});
