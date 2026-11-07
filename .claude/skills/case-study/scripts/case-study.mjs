#!/usr/bin/env node
/**
 * Case study tooling for the Contentful showcase site.
 *
 *   node case-study.mjs schema                    Compare live content types with SCHEMA below
 *   node case-study.mjs list                      List existing case studies
 *   node case-study.mjs validate <spec.json>      Validate a spec (also checks the slug is free)
 *   node case-study.mjs push <spec.json> [--dry-run]
 *                                                 Create assets, blocks and the case study as DRAFTS
 *
 * Reads CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_ENVIRONMENT (default "master")
 * and SPACE (tag id) from the environment or the project's .env.local. Never publishes anything.
 */
import { existsSync, readFileSync, createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const LOCALE = 'en-US';
/** csblocksCollection(limit: 20) in lib/contentful/queries/post.js */
export const MAX_BLOCKS = 20;

// ---------------------------------------------------------------------------
// Schema enforced by this script. Keep in sync with reference/schema.md.
// `target` maps a spec field to its Contentful field id when they differ
// (the spec reserves `type` for the block type).
// ---------------------------------------------------------------------------
export const SCHEMA = {
  caseStudy: {
    contentType: 'caseStudy',
    fields: {
      title: { kind: 'symbol', required: true },
      slug: { kind: 'symbol', required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/ },
      subtitle: { kind: 'symbol' },
      client: { kind: 'symbol' },
      color: { kind: 'symbol', required: true, pattern: /^#[0-9a-fA-F]{6}$/ },
      tags: { kind: 'symbols' },
      img: { kind: 'asset', mime: ['image'] },
      blog: { kind: 'boolean' },
      protected: { kind: 'boolean' },
      publishToWeb: { kind: 'boolean' },
      related: { kind: 'entries' },
    },
  },
  blocks: {
    BlockHero: {
      contentType: 'blockHero',
      fields: {
        title: { kind: 'symbol', required: true },
        intro: { kind: 'text', required: true },
        content: { kind: 'text' },
        tag: { kind: 'symbol' },
        image: { kind: 'asset', mime: ['image'] },
      },
    },
    BlockIntro: {
      contentType: 'block_intro',
      fields: {
        title: { kind: 'symbol', required: true },
        client: { kind: 'symbol' },
        role: { kind: 'symbol' },
        duration: { kind: 'symbol' },
        overview: { kind: 'text', required: true },
      },
    },
    BlockHeader: {
      contentType: 'blockHeader',
      fields: {
        title: { kind: 'symbol', required: true },
        content: { kind: 'text' },
        headerType: { kind: 'enum', target: 'type', values: ['page', 'section'], default: 'section' },
        primaryPageHeader: { kind: 'boolean' },
      },
    },
    BlockArticle: {
      contentType: 'blockArticle',
      fields: {
        title: { kind: 'symbol' },
        body: { kind: 'markdown', target: 'contentRich', required: true },
        images: { kind: 'assets', target: 'img', max: 10, mime: ['image', 'video'] },
        caption: { kind: 'symbol' },
      },
    },
    BlockImage: {
      contentType: 'blockImage',
      fields: {
        title: { kind: 'symbol' },
        image: { kind: 'asset', mime: ['image', 'video'] },
        video: { kind: 'symbol', url: true },
        size: { kind: 'enum', values: ['full'] },
      },
    },
    BlockImages: {
      contentType: 'blockImages',
      fields: {
        title: { kind: 'symbol', required: true },
        images: { kind: 'assets', required: true, mime: ['image', 'video'] },
        layout: { kind: 'enum', values: ['basic', 'bento', 'things'] },
        maxCols: { kind: 'integer', values: [2, 3, 4] },
      },
    },
    BlockEmbed: {
      contentType: 'blockEmbed',
      fields: {
        title: { kind: 'symbol', required: true },
        url: { kind: 'symbol', required: true, url: true },
        caption: { kind: 'symbol', required: true },
        displayFullWidth: { kind: 'boolean' },
      },
    },
    BlockList: {
      contentType: 'blockList',
      fields: {
        title: { kind: 'symbol', required: true },
        content: { kind: 'text' },
        listType: { kind: 'enum', target: 'type', values: ['content', 'feature', 'timeline', 'results'], required: true },
        items: { kind: 'listItems', required: true },
      },
    },
    BlockQuote: {
      contentType: 'blockQuote',
      fields: {
        title: { kind: 'symbol' },
        content: { kind: 'text', required: true },
        author: { kind: 'symbol' },
        authorImage: { kind: 'asset', mime: ['image'] },
      },
    },
    BlockCode: {
      contentType: 'blockCode',
      fields: {
        title: { kind: 'symbol', required: true },
        language: { kind: 'enum', target: 'type', values: ['javascript', 'css'], required: true },
        code: { kind: 'text', required: true },
        embedurl: { kind: 'symbol', url: true },
      },
    },
  },
  listItem: { contentType: 'listItem', fields: ['title', 'number', 'content'] },
};

const TEXT_BLOCKS = new Set(['BlockArticle', 'BlockHeader', 'BlockList', 'BlockQuote', 'BlockIntro', 'BlockCode']);
const MEDIA_BLOCKS = new Set(['BlockImage', 'BlockImages', 'BlockEmbed']);

// ---------------------------------------------------------------------------
// Markdown -> Contentful rich text
// ---------------------------------------------------------------------------
const textNode = (value, marks = []) => ({ nodeType: 'text', value, marks: marks.map((type) => ({ type })), data: {} });

/** Inline markdown: **bold**, *italic* / _italic_, `code`, [label](url). */
export function inlineNodes(input) {
  const nodes = [];
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*([^*\s][^*]*)\*|(?<![\w])_([^_]+)_(?![\w])/g;
  let last = 0;
  let match;
  while ((match = pattern.exec(input))) {
    if (match.index > last) nodes.push(textNode(input.slice(last, match.index)));
    const [, bold, code, label, uri, italic, italicUnderscore] = match;
    if (bold !== undefined) nodes.push(textNode(bold, ['bold']));
    else if (code !== undefined) nodes.push(textNode(code, ['code']));
    else if (label !== undefined) nodes.push({ nodeType: 'hyperlink', data: { uri }, content: [textNode(label)] });
    else nodes.push(textNode(italic ?? italicUnderscore, ['italic']));
    last = pattern.lastIndex;
  }
  if (last < input.length) nodes.push(textNode(input.slice(last)));
  return nodes.length ? nodes : [textNode('')];
}

const paragraph = (line) => ({ nodeType: 'paragraph', data: {}, content: inlineNodes(line) });
const BLOCK_START = /^(#{1,6}\s|>|\s*([-*+]|\d+[.)])\s|(-{3,}|\*{3,})\s*$)/;

/** Block markdown: headings (# is demoted to h2; the page owns the h1), lists, quotes, rules, paragraphs. */
export function markdownToRichText(markdown) {
  const lines = String(markdown ?? '').replace(/\r\n/g, '\n').split('\n');
  const content = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = Math.min(Math.max(heading[1].length, 2), 6);
      content.push({ nodeType: `heading-${level}`, data: {}, content: inlineNodes(heading[2].trim()) });
      i++;
      continue;
    }
    if (/^(-{3,}|\*{3,})\s*$/.test(line)) {
      content.push({ nodeType: 'hr', data: {}, content: [] });
      i++;
      continue;
    }
    if (/^>/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, '').trim());
      content.push({ nodeType: 'blockquote', data: {}, content: [paragraph(quote.filter(Boolean).join(' '))] });
      continue;
    }
    const list = line.match(/^\s*([-*+]|\d+[.)])\s+/);
    if (list) {
      const ordered = /\d/.test(list[1]);
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(/^\s*([-*+]|\d+[.)])\s+(.*)$/);
        if (!m || /\d/.test(m[1]) !== ordered) break;
        items.push({ nodeType: 'list-item', data: {}, content: [paragraph(m[2].trim())] });
        i++;
      }
      content.push({ nodeType: ordered ? 'ordered-list' : 'unordered-list', data: {}, content: items });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && (para.length === 0 || !BLOCK_START.test(lines[i]))) {
      para.push(lines[i++].trim());
    }
    content.push(paragraph(para.join(' ')));
  }
  return { nodeType: 'document', data: {}, content };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const isMedia = (v) => v && typeof v === 'object' && ['file', 'url', 'assetId', 'placeholder'].some((k) => k in v);
const isUrl = (v) => typeof v === 'string' && /^https?:\/\/\S+$/i.test(v);
const wordCount = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|svg)$/i;

function checkMedia(media, def, where, specDir, errors, warnings) {
  if (!isMedia(media)) return errors.push(`${where}: expected a media object ({ file | url | assetId | placeholder })`);
  if (media.placeholder) return warnings.push(`${where}: TODO media — ${media.placeholder}`);
  const name = media.file || media.url || '';
  if (name) {
    const kind = VIDEO_EXT.test(name) ? 'video' : IMAGE_EXT.test(name) ? 'image' : null;
    if (!kind) warnings.push(`${where}: can't tell the media type of "${name}"`);
    else if (def.mime && !def.mime.includes(kind)) errors.push(`${where}: ${kind} not allowed here (allowed: ${def.mime.join(', ')})`);
  }
  if (media.file) {
    const abs = path.resolve(specDir, media.file);
    if (!existsSync(abs)) errors.push(`${where}: file not found: ${media.file}`);
    else if (statSync(abs).size > 50 * 1024 * 1024) warnings.push(`${where}: ${media.file} is over 50 MB; compress it`);
    else if (VIDEO_EXT.test(abs) && statSync(abs).size > 12 * 1024 * 1024) warnings.push(`${where}: video over 12 MB; loops should be ≤ 8 MB`);
  }
  if (media.url && !isUrl(media.url)) errors.push(`${where}: url must be absolute http(s)`);
  if (!media.assetId && !media.description) errors.push(`${where}: description (alt text) is required`);
  if (media.description && media.description.length > 200) warnings.push(`${where}: alt text over 200 characters`);
}

function checkField(def, value, where, specDir, errors, warnings) {
  switch (def.kind) {
    case 'symbol':
      if (typeof value !== 'string') return errors.push(`${where}: expected a string`);
      if (value.length > 256) errors.push(`${where}: longer than 256 characters (Contentful short text)`);
      if (def.pattern && !def.pattern.test(value)) errors.push(`${where}: "${value}" does not match ${def.pattern}`);
      if (def.url && !isUrl(value)) errors.push(`${where}: must be an absolute http(s) URL`);
      break;
    case 'text':
    case 'markdown':
      if (typeof value !== 'string' || !value.trim()) errors.push(`${where}: expected non-empty text`);
      break;
    case 'boolean':
      if (typeof value !== 'boolean') errors.push(`${where}: expected true or false`);
      break;
    case 'integer':
      if (!Number.isInteger(value)) errors.push(`${where}: expected an integer`);
      else if (def.values && !def.values.includes(value)) errors.push(`${where}: must be one of ${def.values.join(', ')}`);
      break;
    case 'enum': {
      const v = Array.isArray(value) ? value : [value];
      if (v.length !== 1 || !def.values.includes(v[0])) errors.push(`${where}: must be one of ${def.values.join(', ')}`);
      break;
    }
    case 'symbols':
    case 'entries':
      if (!Array.isArray(value) || value.some((t) => typeof t !== 'string')) errors.push(`${where}: expected an array of strings`);
      break;
    case 'asset':
      checkMedia(value, def, where, specDir, errors, warnings);
      break;
    case 'assets':
      if (!Array.isArray(value) || !value.length) return errors.push(`${where}: expected a non-empty array of media`);
      if (def.max && value.length > def.max) errors.push(`${where}: at most ${def.max} items`);
      value.forEach((m, i) => checkMedia(m, def, `${where}[${i}]`, specDir, errors, warnings));
      break;
    case 'listItems':
      if (!Array.isArray(value) || !value.length) return errors.push(`${where}: expected a non-empty array of items`);
      value.forEach((item, i) => {
        if (!item || typeof item !== 'object') return errors.push(`${where}[${i}]: expected { title, number?, content? }`);
        for (const k of Object.keys(item)) if (!SCHEMA.listItem.fields.includes(k)) errors.push(`${where}[${i}]: unknown field "${k}"`);
        if (!item.title) errors.push(`${where}[${i}]: title is required`);
        for (const k of SCHEMA.listItem.fields) if (item[k] !== undefined && typeof item[k] !== 'string') errors.push(`${where}[${i}].${k}: expected a string`);
      });
      break;
    default:
      errors.push(`${where}: unsupported field kind ${def.kind}`);
  }
}

const isBlank = (v) => v === undefined || v === null || v === '';

/** Validate a spec object. Returns { errors, warnings }. */
export function validateSpec(spec, specDir = process.cwd()) {
  const errors = [];
  const warnings = [];
  if (!spec || typeof spec !== 'object') return { errors: ['spec must be a JSON object'], warnings };

  const cs = spec.caseStudy;
  if (!cs || typeof cs !== 'object') {
    errors.push('caseStudy is required');
  } else {
    for (const [name, def] of Object.entries(SCHEMA.caseStudy.fields)) {
      if (isBlank(cs[name])) {
        if (def.required) errors.push(`caseStudy.${name} is required`);
        continue;
      }
      checkField(def, cs[name], `caseStudy.${name}`, specDir, errors, warnings);
    }
    for (const k of Object.keys(cs)) if (!SCHEMA.caseStudy.fields[k]) errors.push(`caseStudy: unknown field "${k}"`);
    if (cs.subtitle && cs.subtitle.length > 155) warnings.push('caseStudy.subtitle is over 155 characters (it is the meta description)');
    if (!cs.img) warnings.push('caseStudy.img (cover) is missing: listings and social cards fall back to a generated card');
    if (!cs.tags?.length) warnings.push('caseStudy.tags is empty');
  }

  const blocks = spec.blocks;
  if (!Array.isArray(blocks) || !blocks.length) {
    errors.push('blocks must be a non-empty array');
    return { errors, warnings };
  }
  if (blocks.length > MAX_BLOCKS) errors.push(`${blocks.length} blocks: the site renders at most ${MAX_BLOCKS}`);
  if (blocks[0]?.type !== 'BlockHero') warnings.push('the first block should be a BlockHero');
  if (blocks[1]?.type !== 'BlockIntro') warnings.push('the second block should be a BlockIntro');

  let textRun = 0;
  let mediaCount = 0;
  blocks.forEach((block, index) => {
    const where = `blocks[${index}] (${block?.type ?? '?'})`;
    const def = SCHEMA.blocks[block?.type];
    if (!def) return errors.push(`${where}: unknown block type; use one of ${Object.keys(SCHEMA.blocks).join(', ')}`);

    for (const [name, fdef] of Object.entries(def.fields)) {
      if (isBlank(block[name])) {
        if (fdef.required) errors.push(`${where}.${name} is required`);
        continue;
      }
      checkField(fdef, block[name], `${where}.${name}`, specDir, errors, warnings);
    }
    for (const k of Object.keys(block)) if (k !== 'type' && !def.fields[k]) errors.push(`${where}: unknown field "${k}"`);

    if (block.type === 'BlockImage' && !block.image && !block.video) errors.push(`${where}: needs image or video`);
    if (block.type === 'BlockHero' && block.intro) {
      const n = wordCount(block.intro.replace(/!\[[^\]]*\]\([^)]*\)/g, ''));
      if (n < 4 || n > 16) warnings.push(`${where}.intro: ${n} words (aim for 6–14)`);
    }
    if (block.type === 'BlockHeader' && wordCount(block.content) > 24) warnings.push(`${where}.content: ${wordCount(block.content)} words (aim for ≤ 20)`);
    if (block.type === 'BlockArticle' && block.body) {
      const n = wordCount(block.body);
      if (n > 260) warnings.push(`${where}.body: ${n} words; split it (aim for 60–220)`);
      if (/^#\s/m.test(block.body)) warnings.push(`${where}.body: "#" headings are rendered as h2; use "##"`);
    }
    if (block.type === 'BlockCode' && block.code && block.code.split('\n').length > 40) warnings.push(`${where}.code: over 40 lines; show the interesting part`);

    const hasMedia = MEDIA_BLOCKS.has(block.type) || (block.type === 'BlockArticle' && block.images?.length);
    if (hasMedia) mediaCount++;
    textRun = TEXT_BLOCKS.has(block.type) && !hasMedia ? textRun + 1 : 0;
    if (textRun === 3) warnings.push(`${where}: three text blocks in a row; add media`);
  });

  if (mediaCount < 3) warnings.push(`only ${mediaCount} media blocks; aim for roughly one per text block`);
  if (!blocks.some((b) => b?.type === 'BlockList' && b.listType === 'results')) warnings.push('no BlockList with listType "results": show the outcome');
  return { errors, warnings };
}

// ---------------------------------------------------------------------------
// Contentful
// ---------------------------------------------------------------------------
function loadEnv() {
  const env = { ...process.env };
  const file = path.join(ROOT, '.env.local');
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

async function connect() {
  const env = loadEnv();
  for (const key of ['CONTENTFUL_SPACE_ID', 'CONTENTFUL_MANAGEMENT_TOKEN']) {
    if (!env[key]) throw new Error(`${key} is not set (environment or .env.local)`);
  }
  const require = createRequire(path.join(ROOT, 'package.json'));
  const { createClient } = require('contentful-management');
  const client = createClient({ accessToken: env.CONTENTFUL_MANAGEMENT_TOKEN });
  const space = await client.getSpace(env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(env.CONTENTFUL_ENVIRONMENT || 'master');
  return { environment, spaceId: env.CONTENTFUL_SPACE_ID, envId: env.CONTENTFUL_ENVIRONMENT || 'master', tag: env.SPACE };
}

const loc = (value) => ({ [LOCALE]: value });
const link = (linkType, id) => ({ sys: { type: 'Link', linkType, id } });

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
  '.avif': 'image/avif', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
};

async function existingSlug(environment, slug) {
  const res = await environment.getEntries({ content_type: 'caseStudy', 'fields.slug': slug, limit: 1 });
  return res.items[0] ?? null;
}

/** Compare SCHEMA with the live content types. */
async function commandSchema() {
  const { environment } = await connect();
  const types = await environment.getContentTypes({ limit: 1000 });
  const byId = Object.fromEntries(types.items.map((t) => [t.sys.id, t]));
  const issues = [];
  const check = (contentType, fields, label) => {
    const live = byId[contentType];
    if (!live) return issues.push(`${label}: content type "${contentType}" not found`);
    const liveFields = Object.fromEntries(live.fields.filter((f) => !f.disabled && !f.omitted).map((f) => [f.id, f]));
    for (const [name, def] of Object.entries(fields)) {
      const id = def.target ?? name;
      const f = liveFields[id];
      if (!f) { issues.push(`${label}.${id}: missing in Contentful`); continue; }
      const allowed = [...(f.validations ?? []), ...(f.items?.validations ?? [])].find((v) => v.in)?.in;
      if (def.values && allowed && JSON.stringify([...allowed].sort()) !== JSON.stringify([...def.values].sort())) {
        issues.push(`${label}.${id}: allowed values changed: Contentful ${JSON.stringify(allowed)}, script ${JSON.stringify(def.values)}`);
      }
      if (f.required && !def.required) issues.push(`${label}.${id}: now required in Contentful`);
    }
    for (const [id, f] of Object.entries(liveFields)) {
      const known = Object.entries(fields).some(([name, def]) => (def.target ?? name) === id);
      if (!known && !['canvas', 'cta', 'infoMessage', 'imageUrl', 'hotspots', 'callToAction', 'csblocks'].includes(id)) {
        issues.push(`${label}.${id}: field exists in Contentful but not in the script (${f.type})${f.required ? ', REQUIRED' : ''}`);
      }
    }
  };
  check(SCHEMA.caseStudy.contentType, SCHEMA.caseStudy.fields, 'caseStudy');
  for (const [name, def] of Object.entries(SCHEMA.blocks)) check(def.contentType, def.fields, name);

  const csblocks = byId.caseStudy?.fields.find((f) => f.id === 'csblocks');
  const linkable = csblocks?.items?.validations?.find((v) => v.linkContentType)?.linkContentType ?? [];
  const scripted = Object.values(SCHEMA.blocks).map((b) => b.contentType);
  const notScripted = linkable.filter((id) => !scripted.includes(id));
  console.log(`Case studies can link: ${linkable.join(', ')}`);
  if (notScripted.length) console.log(`Not used by this skill (by design or new): ${notScripted.join(', ')}`);
  console.log(issues.length ? `\nDrift found:\n- ${issues.join('\n- ')}` : '\nNo drift: the script matches Contentful.');
  process.exitCode = issues.length ? 1 : 0;
}

async function commandList() {
  const { environment } = await connect();
  const res = await environment.getEntries({ content_type: 'caseStudy', limit: 200, order: '-sys.updatedAt' });
  for (const e of res.items) {
    const f = e.fields;
    const status = e.isPublished?.() ? (e.isUpdated?.() ? 'changed' : 'published') : 'draft';
    console.log(`${String(f.slug?.[LOCALE] ?? '').padEnd(42)} ${String(status).padEnd(10)} ${String(f.csblocks?.[LOCALE]?.length ?? 0).padStart(2)} blocks  ${f.title?.[LOCALE] ?? ''}`);
  }
}

function readSpec(file) {
  if (!file) throw new Error('pass the path to a case-study.json');
  const abs = path.resolve(file);
  return { spec: JSON.parse(readFileSync(abs, 'utf8')), specDir: path.dirname(abs) };
}

function report({ errors, warnings }) {
  for (const w of warnings) console.log(`warning  ${w}`);
  for (const e of errors) console.log(`ERROR    ${e}`);
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
}

async function commandValidate(file, { offline }) {
  const { spec, specDir } = readSpec(file);
  const result = validateSpec(spec, specDir);
  if (!offline && spec.caseStudy?.slug) {
    try {
      const { environment } = await connect();
      if (await existingSlug(environment, spec.caseStudy.slug)) result.errors.push(`slug "${spec.caseStudy.slug}" already exists in Contentful`);
    } catch (error) {
      result.warnings.push(`could not check the slug online: ${error.message}`);
    }
  }
  report(result);
  process.exitCode = result.errors.length ? 1 : 0;
  return result;
}

/** Collect every media object in the spec, in order. */
function mediaItems(spec) {
  const items = [];
  const visit = (value, where) => {
    if (isMedia(value)) items.push({ media: value, where });
    else if (Array.isArray(value)) value.forEach((v, i) => visit(v, `${where}[${i}]`));
  };
  visit(spec.caseStudy?.img, 'caseStudy.img');
  spec.blocks.forEach((b, i) => {
    for (const k of ['image', 'images', 'authorImage']) if (b[k]) visit(b[k], `blocks[${i}].${k}`);
  });
  return items;
}

async function uploadAsset(environment, media, specDir, tagLink) {
  const title = media.title || path.basename(media.file || media.url || 'asset');
  const fields = { title: loc(title), description: loc(media.description || '') };
  let asset;
  if (media.file) {
    const abs = path.resolve(specDir, media.file);
    const contentType = MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream';
    asset = await environment.createAssetFromFiles({
      fields: { ...fields, file: loc({ contentType, fileName: path.basename(abs), file: createReadStream(abs) }) },
      ...(tagLink ? { metadata: { tags: [tagLink] } } : {}),
    });
  } else {
    const fileName = path.basename(new URL(media.url).pathname) || 'asset';
    const contentType = MIME[path.extname(fileName).toLowerCase()] || 'application/octet-stream';
    asset = await environment.createAsset({
      fields: { ...fields, file: loc({ contentType, fileName, upload: media.url }) },
      ...(tagLink ? { metadata: { tags: [tagLink] } } : {}),
    });
  }
  await asset.processForAllLocales();
  return asset.sys.id;
}

async function commandPush(file, { dryRun }) {
  const { spec, specDir } = readSpec(file);
  const result = validateSpec(spec, specDir);
  if (result.errors.length) {
    report(result);
    throw new Error('fix the errors before pushing');
  }

  const media = mediaItems(spec);
  const uploads = media.filter((m) => m.media.file || m.media.url);
  const placeholders = media.filter((m) => m.media.placeholder);
  const listItems = spec.blocks.filter((b) => b.type === 'BlockList').reduce((n, b) => n + b.items.length, 0);

  console.log(`Case study "${spec.caseStudy.title}" (/articles/${spec.caseStudy.slug})`);
  console.log(`  ${spec.blocks.length} blocks, ${listItems} list items, ${uploads.length} asset uploads, ${placeholders.length} media TODOs`);
  spec.blocks.forEach((b, i) => console.log(`  ${String(i + 1).padStart(2)}. ${b.type.padEnd(13)} ${b.title ?? b.intro ?? ''}`));
  if (placeholders.length) {
    console.log('\nMedia still to add in Contentful:');
    for (const p of placeholders) console.log(`  - ${p.where}: ${p.media.placeholder}`);
  }
  if (dryRun) {
    console.log('\nDry run: nothing was written to Contentful.');
    return;
  }

  const { environment, spaceId, envId, tag } = await connect();
  if (await existingSlug(environment, spec.caseStudy.slug)) throw new Error(`slug "${spec.caseStudy.slug}" already exists; nothing was written`);

  let tagLink = null;
  if (tag) {
    try {
      await environment.getTag(tag);
      tagLink = link('Tag', tag);
    } catch {
      console.log(`warning  tag "${tag}" not found; entries will be untagged`);
    }
  }
  const metadata = tagLink ? { tags: [tagLink] } : undefined;
  const created = [];
  try {
    await writeDrafts({ environment, spec, specDir, media, tagLink, metadata, created, spaceId, envId });
  } catch (error) {
    if (created.length) {
      console.error(`\nFailed part-way. These drafts were created and can be deleted in Contentful:\n- ${created.join('\n- ')}`);
    }
    throw error;
  }
}

async function writeDrafts({ environment, spec, specDir, media, tagLink, metadata, created, spaceId, envId }) {

  const assetIds = new Map();
  for (const item of media) {
    if (item.media.assetId) assetIds.set(item.media, item.media.assetId);
    else if (item.media.file || item.media.url) {
      process.stdout.write(`uploading ${item.media.file || item.media.url} … `);
      const id = await uploadAsset(environment, item.media, specDir, tagLink);
      assetIds.set(item.media, id);
      created.push(`asset ${id}`);
      console.log('done');
    }
  }
  const assetLink = (m) => (m && assetIds.has(m) ? link('Asset', assetIds.get(m)) : undefined);
  const assetLinks = (list) => (list ?? []).map(assetLink).filter(Boolean);

  const createEntry = async (contentType, fields) => {
    const clean = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined && !(Array.isArray(v) && !v.length)).map(([k, v]) => [k, loc(v)]));
    const entry = await environment.createEntry(contentType, { fields: clean, ...(metadata ? { metadata } : {}) });
    created.push(`${contentType} ${entry.sys.id}`);
    return entry.sys.id;
  };

  const blockIds = [];
  for (const block of spec.blocks) {
    const def = SCHEMA.blocks[block.type];
    const fields = {};
    for (const [name, fdef] of Object.entries(def.fields)) {
      const target = fdef.target ?? name;
      let value = block[name] ?? fdef.default;
      if (value === undefined) continue;
      if (fdef.kind === 'enum') value = Array.isArray(value) ? value : [value];
      else if (fdef.kind === 'markdown') value = markdownToRichText(value);
      else if (fdef.kind === 'asset') value = assetLink(value);
      else if (fdef.kind === 'assets') value = assetLinks(value);
      else if (fdef.kind === 'listItems') {
        const ids = [];
        for (const item of value) ids.push(await createEntry(SCHEMA.listItem.contentType, item));
        value = ids.map((id) => link('Entry', id));
      }
      fields[target] = value;
    }
    blockIds.push(await createEntry(def.contentType, fields));
    console.log(`created ${block.type}`);
  }

  const cs = spec.caseStudy;
  const caseStudyId = await createEntry(SCHEMA.caseStudy.contentType, {
    title: cs.title,
    slug: cs.slug,
    subtitle: cs.subtitle,
    client: cs.client,
    color: cs.color,
    tags: cs.tags,
    img: assetLink(cs.img),
    blog: cs.blog,
    protected: cs.protected,
    publishToWeb: cs.publishToWeb,
    related: cs.related?.map((id) => link('Entry', id)),
    csblocks: blockIds.map((id) => link('Entry', id)),
  });

  console.log(`\nCreated ${created.length} draft items. Nothing is published.`);
  console.log(`Review: https://app.contentful.com/spaces/${spaceId}/environments/${envId}/entries/${caseStudyId}`);
  console.log('Publish the assets, blocks and list items, then the case study, from Contentful.');
}

// ---------------------------------------------------------------------------
async function main(argv) {
  const [command, file, ...rest] = argv;
  const flags = new Set(rest.concat(file?.startsWith('--') ? [file] : []));
  switch (command) {
    case 'schema': return commandSchema();
    case 'list': return commandList();
    case 'validate': return commandValidate(file, { offline: flags.has('--offline') });
    case 'push': return commandPush(file, { dryRun: flags.has('--dry-run') });
    default:
      console.log('usage: case-study.mjs <schema | list | validate <spec> [--offline] | push <spec> [--dry-run]>');
      process.exitCode = command ? 1 : 0;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`error: ${error.message}`);
    process.exitCode = 1;
  });
}
