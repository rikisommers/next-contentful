/**
 * Normalise a CMS-entered link.
 * - Absolute URLs, mailto:, tel:, #anchors and /paths are returned unchanged.
 * - Bare domains ("github.com/me", "www.site.com") become https:// URLs, so they are not
 *   treated as relative routes (which 404 and get prefetched by next/link).
 * - Anything else is treated as a site path ("work" -> "/work").
 * @param {string|null|undefined} url
 * @returns {string|null}
 */
export function toHref(url) {
  if (!url || typeof url !== "string") return null;
  const value = url.trim();
  if (!value) return null;
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(value)) return value;
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)+(\/|$|\?)/i.test(value)) return `https://${value}`;
  return `/${value}`;
}

/** True for links that leave the site. */
export function isExternalHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

/** Props for an anchor/Link: external links open in a new tab safely. */
export function linkProps(url) {
  const href = toHref(url);
  return isExternalHref(href)
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href: href ?? "#" };
}

/** CMS page slug -> route ("home" is served at "/"). */
export function pagePathFromSlug(slug) {
  if (!slug) return "/";
  return slug === "home" ? "/" : `/${slug}`;
}
