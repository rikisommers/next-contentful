import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import * as skill from '../../.claude/skills/case-study/scripts/case-study.mjs';

// The script is plain ESM; its inferred types are too narrow for these assertions.
const { markdownToRichText, inlineNodes, validateSpec, MAX_BLOCKS } = skill as any;

const exampleDir = path.resolve('.claude/skills/case-study/examples');
const example = JSON.parse(readFileSync(path.join(exampleDir, 'design-tokens.json'), 'utf8'));
const clone = () => JSON.parse(JSON.stringify(example));

describe('markdownToRichText', () => {
  it('builds headings, paragraphs and lists', () => {
    const doc = markdownToRichText('## Title\n\nFirst line\nsame paragraph.\n\n- one\n- two\n\n1. a\n2. b');
    expect(doc.nodeType).toBe('document');
    expect(doc.content.map((n: { nodeType: string }) => n.nodeType)).toEqual(['heading-2', 'paragraph', 'unordered-list', 'ordered-list']);
    expect(doc.content[1].content[0].value).toBe('First line same paragraph.');
    expect(doc.content[2].content).toHaveLength(2);
  });

  it('demotes # to h2 because the page owns the h1', () => {
    expect(markdownToRichText('# Big').content[0].nodeType).toBe('heading-2');
  });

  it('handles quotes and rules', () => {
    const doc = markdownToRichText('> said\n> this\n\n---');
    expect(doc.content[0].nodeType).toBe('blockquote');
    expect(doc.content[0].content[0].content[0].value).toBe('said this');
    expect(doc.content[1].nodeType).toBe('hr');
  });

  it('marks bold, italic, code and links', () => {
    const nodes = inlineNodes('a **b** *c* `d` [e](https://x.y) f_g_h');
    expect(nodes.find((n: any) => n.value === 'b').marks).toEqual([{ type: 'bold' }]);
    expect(nodes.find((n: any) => n.value === 'c').marks).toEqual([{ type: 'italic' }]);
    expect(nodes.find((n: any) => n.value === 'd').marks).toEqual([{ type: 'code' }]);
    expect(nodes.find((n: any) => n.nodeType === 'hyperlink').data.uri).toBe('https://x.y');
    // underscores inside words are not italics
    expect(nodes[nodes.length - 1].value).toContain('f_g_h');
  });
});

describe('validateSpec', () => {
  it('accepts the bundled example', () => {
    const { errors } = validateSpec(example, exampleDir);
    expect(errors).toEqual([]);
  });

  it('reports placeholders as media TODOs', () => {
    const { warnings } = validateSpec(example, exampleDir);
    expect(warnings.some((w: string) => w.includes('TODO media'))).toBe(true);
  });

  it('requires colour, slug format and known block types', () => {
    const spec = clone();
    delete spec.caseStudy.color;
    spec.caseStudy.slug = 'Not A Slug';
    spec.blocks.push({ type: 'BlockCarousel' });
    const { errors } = validateSpec(spec, exampleDir);
    expect(errors).toContain('caseStudy.color is required');
    expect(errors.some((e: string) => e.startsWith('caseStudy.slug'))).toBe(true);
    expect(errors.some((e: string) => e.includes('unknown block type'))).toBe(true);
  });

  it('enforces allowed values and required alt text', () => {
    const spec = clone();
    spec.blocks.find((b: any) => b.type === 'BlockList').listType = 'gallery';
    spec.blocks.find((b: any) => b.type === 'BlockCode').language = 'typescript';
    spec.blocks.push({ type: 'BlockImage', title: 'x', image: { url: 'https://example.com/a.png' } });
    const { errors } = validateSpec(spec, exampleDir);
    expect(errors.some((e: string) => e.includes('listType: must be one of'))).toBe(true);
    expect(errors.some((e: string) => e.includes('language: must be one of'))).toBe(true);
    expect(errors.some((e: string) => e.includes('description (alt text) is required'))).toBe(true);
  });

  it('rejects video where only images are allowed, and missing local files', () => {
    const spec = clone();
    spec.caseStudy.img = { file: 'media/cover.mp4', description: 'x' };
    const { errors } = validateSpec(spec, exampleDir);
    expect(errors.some((e: string) => e.includes('video not allowed'))).toBe(true);
    expect(errors.some((e: string) => e.includes('file not found'))).toBe(true);
  });

  it('caps the number of blocks at what the site renders', () => {
    const spec = clone();
    while (spec.blocks.length <= MAX_BLOCKS) spec.blocks.push({ type: 'BlockHeader', title: 'x' });
    expect(validateSpec(spec, exampleDir).errors.some((e: string) => e.includes(`at most ${MAX_BLOCKS}`))).toBe(true);
  });

  it('rejects fields the content model does not have', () => {
    const spec = clone();
    spec.blocks[0].subtitle = 'nope';
    expect(validateSpec(spec, exampleDir).errors).toContain('blocks[0] (BlockHero): unknown field "subtitle"');
  });
});
