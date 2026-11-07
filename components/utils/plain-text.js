/**
 * Strip the lightweight markup CMS text fields use (`__highlight__`, `**bold**`,
 * `![alt](url)`, `[label](url)`) and normalise whitespace, leaving readable prose.
 * Used for crawler/screen-reader text and metadata.
 * @param {string} input
 * @returns {string}
 */
export function toPlainText(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/\*([^*\s][^*]*)\*/g, "$1")
    .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();
}
