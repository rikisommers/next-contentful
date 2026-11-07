---
name: case-study
description: Write portfolio case studies for this site and load them into Contentful as drafts. Use when the user wants to write, plan, outline, rewrite or improve a case study / project write-up / portfolio piece, plan the images or video for one, or turn notes, a brief, a Figma file or a repo into a case study. Knows the CaseStudy content model and every block type the site renders.
---

# Case study writer

Produce modern, media-led case studies for Riki Sommers — design systems engineer, creative developer and UX designer — that the site renders well, and load them into Contentful as **drafts**.

**Two audiences; ask which one first** (see "Two audiences" in `reference/storytelling.md`):
- **Portfolio case study (`blog: false`) for recruiters and employers.** The goal is job offers. It is a short, clear pitch: problem → goal → what Riki did → business result, readable in about 3 minutes. Leave detail for the interview. When unsure whether to include something, cut it.
- **Blog post (`blog: true`) for workmates and peers.** It covers how and why the work was done (technique, code, decisions, gotchas) and can go deeper. It is listed under Writing and kept off the résumé.

The output is a spec file (`content/case-studies/<slug>/case-study.json`) that maps 1:1 onto the Contentful content model, plus a media brief. A script validates the spec and creates draft entries; a human reviews and publishes in Contentful.

Read before writing:
- `reference/schema.md` — content types, fields, allowed values and what each block displays. **Source of truth for the JSON.**
- `reference/storytelling.md` — narrative arcs per discipline, copy rules, media direction.
- `examples/design-tokens.json` — a complete, valid spec to copy the shape from.

## Workflow

### 1. Check the schema is current
Run `node .claude/skills/case-study/scripts/case-study.mjs schema`. It compares the live Contentful content types with the rules the script enforces and lists any drift. If it reports drift, tell the user and follow the live schema (update `reference/schema.md` and the `SCHEMA` table in the script before continuing).

### 2. Gather the facts (interview, don't invent)
Get what you can from what the user gave you (notes, repo, Figma links, existing case study). Then ask only for what is missing, in one short batch. Required before drafting:
- The audience: portfolio (recruiters/employers) or blog (workmates/peers). For a blog post, skip the target-role and business-impact questions and ask what a peer should take away instead
- The target roles: which jobs this case study should win, and which one or two requirements from those job ads it should prove
- Project name, client/company (or "personal"), dates or duration
- Riki's role scope (what Riki actually did, as a list of activities) and the team (who Riki worked with)
- The problem: who was affected, what it cost the business (money, time, risk), constraints and blockers
- The goal: the specific target or definition of success
- 2–3 key decisions and why (trade-offs, rejected options)
- Outcome, with evidence: business impact first (money made or saved, risk reduced), then user/team benefit, each with a timeframe. Estimates are fine if Riki confirms them and they're labelled "(estimate)". If there are no numbers, ask for qualitative evidence; never fabricate metrics, quotes or client names
- Media that exists (screenshots, recordings, Figma prototypes, Storybook, CodePen, repo) and what could be captured
- Confidentiality limits (NDA, blur, `protected: true`)

Existing case studies can be read for tone and to avoid duplicates: `node .claude/skills/case-study/scripts/case-study.mjs list`.

### 3. Pick the arc and blocks
Pick one story and one main skill. If the project covers several skills, suggest splitting it into more than one case study (see "Choosing what to write" in `reference/storytelling.md`). Choose the arc for the project type (design system, creative development, UX/product, or hybrid) and lay the story out as a block sequence. Rules:
- First block is a `BlockHero`, second a `BlockIntro` (client, role, duration, and an overview of problem, goal and result).
- Portfolio: aim for **8–12 blocks** and about 400–800 words of body copy, never more than 14. Blog: up to 20 blocks (the site's hard limit) and about 800–1,500 words.
- Alternate text and media; never more than two text blocks in a row.
- Every section heading is a `BlockHeader` (`headerType: "section"`, the default) whose `content` describes what was done and what it found ("Ran a tree test to see where customers look for discounts"), never a bare label like "Research".
- Results go in a `BlockList` with `listType: "results"`; process steps in `listType: "timeline"`.
- Use embeds for living artefacts (Figma prototype, Storybook, CodePen) instead of screenshots of them.

Show the user the outline (block list with one line each, plus the media plan) and get a go-ahead before writing full copy.

### 4. Write the spec
Create `content/case-studies/<slug>/case-study.json` following `reference/schema.md`. Body copy for `BlockArticle` is Markdown (`body`), converted to Contentful rich text by the script. Copy rules are in `reference/storytelling.md`; the important ones:
- Plain language a recruiter can follow. First person, active voice, specific. Lead with the outcome, then how.
- Business impact before UX benefit; every metric has a timeframe; estimates are labelled.
- `BlockArticle` 40–150 words, one idea each. Let media and lists carry the detail.
- Every media item has alt text (`description`) that says what the image shows and why it matters.
- Media that doesn't exist yet: `{ "placeholder": "what to capture, framing, duration" }`. The block is created without media and listed as a TODO.

Also write `content/case-studies/<slug>/media-brief.md`: one row per placeholder with what to capture, format and size (see "Media specs" in `reference/storytelling.md`), and the target file path in `media/`.

### 5. Validate
`node .claude/skills/case-study/scripts/case-study.mjs validate content/case-studies/<slug>/case-study.json`

Fix every error. Treat warnings as editorial issues to raise with the user.

### 6. Push as draft (only with the user's explicit OK)
Pushing writes to Contentful (shared, outward-facing). Show the dry run first, then ask:

```bash
node .claude/skills/case-study/scripts/case-study.mjs push <spec> --dry-run
node .claude/skills/case-study/scripts/case-study.mjs push <spec>
```

The script uploads local media (`media/…` paths relative to the spec), creates every block and the CaseStudy as **drafts**, tags them with the site's `SPACE` tag, and prints the Contentful edit link. It never publishes and refuses to overwrite an existing slug. Tell the user to review, add any remaining media, and publish from Contentful (publish linked blocks and assets too).

## Notes
- Credentials come from `.env.local` (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_MANAGEMENT_TOKEN`, optional `CONTENTFUL_ENVIRONMENT`, `SPACE`). Never print tokens.
- `content/case-studies/*/media/` is git-ignored; the spec and brief are committed.
- If a block type the story needs doesn't exist (e.g. before/after slider), say so and suggest the closest existing block rather than inventing fields.
