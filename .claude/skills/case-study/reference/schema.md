# Case study content model

Verified against the live Contentful space (content types + GraphQL schema) and the site's renderers (`components/post/post-body.js`, `components/blocks/*`). Run `scripts/case-study.mjs schema` to check for drift.

Locale: `en-US` (single locale). Assets: images and video (mp4/webm). The site fetches up to **20 blocks** per case study.

## How a block reaches the page

`caseStudy.csblocks` → `lib/contentful/queries/fragments.js` (`CASE_STUDY_BLOCK_FRAGMENTS`) → `components/post/post-body.js` → `components/blocks/<block>.js`.
A field that is not in the fragment is never rendered, even if it is filled in Contentful.

## Spec file shape

```jsonc
{
  "caseStudy": { /* CaseStudy fields */ },
  "blocks": [ { "type": "BlockHero", /* fields */ }, ... ]
}
```

`type` is reserved for the block type, so three Contentful fields named `type` use other keys in the spec (the script maps them back):

| Block | Spec key | Contentful field |
|---|---|---|
| BlockHeader | `headerType` | `type` |
| BlockList | `listType` | `type` |
| BlockCode | `language` | `type` |

Enum values can be written as a string (`"results"`); the script wraps them in the array Contentful stores.

**Media value** (anywhere a field takes an asset):

```jsonc
{ "file": "media/hero.mp4", "title": "Token pipeline demo", "description": "Alt text: what it shows and why" }
{ "url": "https://example.com/image.png", "title": "...", "description": "..." }   // uploaded by Contentful
{ "assetId": "7uBHIVKdC0IyJhmT0OfNBE" }                                            // reuse an existing asset
{ "placeholder": "Screen recording, 8–12 s loop, token change propagating to 3 products" }
```
`file` paths are relative to the spec file. `description` (alt text) is required for every non-placeholder media item.

## CaseStudy (`caseStudy`)

| Field | Type | Required | Shown | Notes |
|---|---|---|---|---|
| `title` | string ≤ 256 | yes (by convention) | listings, `<title>`, OG | Project name, 2–6 words |
| `slug` | string | yes (by convention) | URL `/articles/<slug>` | lowercase-kebab, unique |
| `subtitle` | string ≤ 256 | recommended | listings, meta description | One-sentence outcome, ≤ 155 chars |
| `client` | string | optional | tiles | Company or "Personal project" |
| `color` | string | **required by Contentful** | tile accent | Hex, e.g. `#1F6FEB` |
| `tags` | string[] | recommended | tiles, `article:tag` | 3–6, e.g. `Design systems`, `Tokens`, `React` |
| `img` | image asset | recommended | tiles, social card | Cover, 16:10 or 3:2, ≥ 2400 px wide, no text |
| `blog` | boolean | optional | | `true` = blog post for workmates and peers (listed under Writing, not on the résumé); `false` = portfolio case study for recruiters and employers |
| `protected` | boolean | optional | | Password-protected case study (NDA work) |
| `publishToWeb` | boolean | optional | | |
| `related` | caseStudy entry ids | optional | | Not rendered yet |
| `csblocks` | blocks below | yes | the page | Built by the script from `blocks` |

## Blocks

### BlockHero (`blockHero`) — opening statement
| Field | Shown | Notes |
|---|---|---|
| `title` | no (entry name) | Internal name: `<Project> — Hero` |
| `intro` | **yes, the big headline** | 6–14 words. `__word__` renders a highlighted word; inline images `![alt](url)` are supported |
| `content` | yes, sub-text | 1–2 sentences: what was built and the outcome |
| `tag` | yes, eyebrow | Discipline or year, e.g. `Design systems · 2025` |
| `image` | hero background (theme dependent) | image asset |
| `infoMessage`, `cta`, `canvas` | | Not used in case studies |

### BlockIntro (`block_intro`) — project facts (case studies only)
`title` (entry name, not shown), `client`, `role`, `duration`, `overview` (shown; 2–4 sentences: context, problem, outcome).

### BlockHeader (`blockHeader`) — section heading
| Field | Shown | Notes |
|---|---|---|
| `title` | yes, small eyebrow | e.g. `The problem`, `Approach`, `Outcome` |
| `content` | yes, large statement | The section's one-sentence point, ≤ 20 words |
| `headerType` | | `"section"` (default) in case studies; `"page"` is for landing pages |
| `primaryPageHeader` | | `false` |

### BlockArticle (`blockArticle`) — body copy
| Field | Shown | Notes |
|---|---|---|
| `title` | yes, small label above text | Short label, or entry name |
| `body` *(spec only)* | yes | Markdown → `contentRich`. Supports `##`–`####`, paragraphs, `-`/`1.` lists, `>` quotes, `---`, **bold**, *italic*, `code`, links. 60–220 words per block |
| `images` *(spec only)* | yes, below text | → `img` (max 10 assets, images or video) |
| `caption` | no | not rendered |

### BlockImage (`blockImage`) — single image or video
| Field | Shown | Notes |
|---|---|---|
| `title` | yes, caption under the media | Say what to notice, not what it is |
| `image` | yes | image **or video asset** (mp4/webm autoplay muted loop; paused with controls for reduced motion) |
| `video` | yes, replaces `image` | URL: YouTube/Vimeo (embedded) or direct .mp4 |
| `size` | | `"full"` = page width; omit for column width |
| `imageUrl`, `hotspots` | | legacy, don't use |

### BlockImages (`blockImages`) — gallery
`title` (entry name), `images` (assets, images or video; each asset's `title` is shown as a caption chip), `layout` `basic | bento | things` (stored; the grid currently uses the theme's grid), `maxCols` `2 | 3 | 4` (caps columns). 2–8 items.

### BlockEmbed (`blockEmbed`) — live artefact
All of `title`, `url`, `caption` are **required**. `displayFullWidth` boolean.
`url` may be a Figma file/design/proto link (converted to Figma's embed), YouTube/Vimeo (converted), or any embeddable URL (Storybook iframe, CodePen `/embed/`, StackBlitz `?embed=1`). Figma prototypes render 4:3, everything else 16:9.

### BlockList (`blockList`) — results, timeline, features
| Field | Notes |
|---|---|
| `title` | shown as the list heading |
| `content` | intro text (shown in some variants) |
| `listType` | one of `results`, `timeline`, `feature`, `content` |
| `items` *(spec)* | → `listItem` entries `{ "title", "number", "content" }`. `number` is shown in `timeline` (step number or date). For results, put the metric in `title` (`"−42% UI bugs"`) and evidence in `content` |

### BlockQuote (`blockQuote`) — testimonial or principle
`content` (shown large, the quote), `title` (shown small; use the speaker's role), `author`, `authorImage` (asset), `callToAction` (link to a landing page entry; rarely used). Only real quotes with permission.

### BlockCode (`blockCode`) — code sample
`title`, `language` **required**: `javascript` or `css` (TS/JSX: use `javascript`), `code` (≤ 40 lines; the block collapses long code), `embedurl` (optional live demo).

### Do not use in case studies
`BlockHotspotImage` (prototype styling), `BlockArticles` / `BlockArticlesList` (listing blocks for landing pages; the page footer already links work), `BlockPreview`.
