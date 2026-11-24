/**
 * Whether a case study should be indexed and listed (sitemap, feed, llms.txt, résumé).
 *
 * - Entries with no content blocks are unfinished.
 * - The Contentful space is shared by several sites, separated by tags. An entry tagged
 *   only for other sites does not belong to this one. Untagged entries are kept.
 */
export interface CaseStudyVisibilityInput {
  blockCount: number;
  tags?: string[] | null;
}

export function isCaseStudyListed(entry: CaseStudyVisibilityInput, space = process.env.SPACE): boolean {
  if (!entry.blockCount) return false;
  const tags = entry.tags ?? [];
  if (space && tags.length && !tags.includes(space)) return false;
  return true;
}
