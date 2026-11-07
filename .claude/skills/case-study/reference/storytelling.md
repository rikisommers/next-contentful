# Storytelling, copy and media

## Two audiences: decide first

Ask which audience the piece is for before planning it. The `blog` field records the choice and changes where the site lists it.

| | **Portfolio case study** (`blog: false`) | **Blog post** (`blog: true`) |
|---|---|---|
| Reader | Recruiters and hiring managers | Workmates and peers (designers, engineers) |
| Goal | Get a job offer | Share how it was done so others can learn or reuse it |
| Listed | "Case studies", `/resume.json`, Person JSON-LD | "Writing" only, not on the résumé |
| Length | 8–12 blocks, about 400–800 words | Up to 20 blocks, about 800–1,500 words |
| Focus | Problem → goal → role → business result | How and why: technique, code, decisions, gotchas, what to reuse |
| Language | Plain; explain or drop jargon | Technical terms are fine; still clear and skimmable |

One project can have both: a short portfolio case study for hiring and a deeper blog post for peers. Link them to each other with a sentence in the copy.

### Portfolio case study: get the interview

The reader is deciding whether to call. They skim, they may not know design-system or UX jargon, and they want someone who can solve their problems from week one with little risk.

So a case study is **clear and short, not complete**:
- A reader who looks only at the hero, the intro and the results should know the problem, Riki's role and the business outcome within about 30 seconds.
- The whole piece takes about **3 minutes** to read.
- Depth is for the interview, or for a blog post. Leave out anything the reader wouldn't miss. When in doubt, cut it.

The rest of this file is written for portfolio case studies unless it says otherwise.

### Blog post: teach a peer

The reader is a colleague who wants to understand or reuse the work. Structure it as context → approach → how it works → gotchas → what to reuse. Use `BlockCode`, embeds, diagrams and timelines freely. Business framing is optional; a short "why this mattered" is enough. Keep the same clarity rules: descriptive headings, one idea per block, short paragraphs (`BlockArticle` up to about 250 words). Never put NDA material in a blog post.

## Choosing what to write

- **One story per case study, built around one skill.** If a big project used different skills (for example research plus IA, and then the token pipeline), split it into separate case studies rather than covering everything.
- **Answer what the target roles ask for.** Ask which roles Riki is applying for and which requirements keep appearing in those job ads (cross-functional work, accessibility, scaling a system, and so on). Each case study should answer one or two of them clearly, usually in the process section.
- **Imperfect projects count.** Work that never shipped, shipped differently from the design, or had little time or research is still worth showing. Name the blocker and the workaround; that shows resilience and judgement. No company has a perfect process.

## Structure: Problem → Goal → Process → Result

Every arc follows STAR so it can be skimmed:
1. **Problem**: what was wrong, or the reason for a new product, and what it cost the business or its users.
2. **Goal**: the specific target ("cut rebrand time to under a week", "launch by Q3", "raise sign-up completion by 10%").
3. **Process**: what Riki did and why, covering the key decisions, the trade-offs and who was on the team.
4. **Result**: business impact first (money made, money saved or risk reduced), then the benefit for users or teams. Every number has a timeframe.

## Arcs

Pick one, then adapt. Block names refer to `schema.md`. Section headers (`BlockHeader.content`) are **descriptive**: they say what was done and what it found or achieved, never a bare label like "Research" or "The problem". The `title` field is internal and can stay short.

### Design systems engineering
Show that the system was adopted and made teams faster, not just that components exist.
1. `BlockHero`: outcome headline (`Shipping one design language to __six__ products`)
2. `BlockIntro`: client, role, duration, and an overview that covers the problem, the goal and the result in 2–3 sentences
3. `BlockHeader` ("Audited 6 products and found 14 button styles") → `BlockArticle` (the cost and who felt it, plus the goal) → `BlockImages` (audit)
4. `BlockHeader` ("Replaced brand forks with three token tiers") → `BlockArticle` (the key decision and the rejected option) → `BlockImage` (diagram or loop of a token change propagating)
5. `BlockHeader` ("Migrated 6 products without a code freeze") → `BlockList` (listType `timeline`, 3 steps)
6. `BlockList` (listType `results`), then `BlockQuote` (team lead) if a real quote exists

### Creative development
Lead with motion; the craft is the evidence.
1. `BlockHero` with a short line; `image` = still frame
2. `BlockImage` `size: "full"` with the hero video loop
3. `BlockIntro`: include the brief or goal
4. `BlockHeader` ("Built a particle field that holds 60 fps on mid-range phones") → `BlockArticle` (concept and technique in one block) → `BlockImages` (process frames, 3 cols)
5. `BlockEmbed` (CodePen or live demo), or `BlockCode` (the interesting 20 lines) for an engineering audience
6. `BlockList` (listType `results`): engagement, fps, load size, awards

### UX / product design
Show reasoning and evidence, not deliverables.
1. `BlockHero`: user and business outcome headline
2. `BlockIntro`
3. `BlockHeader` ("Members abandoned verification at the ID upload step") → `BlockArticle` (who, what it cost, the goal) → `BlockQuote` (anonymised research quote)
4. `BlockHeader` ("Ran a tree test to see where customers look for discounts") → `BlockList` (listType `feature`, 3 insights) → `BlockImages` (before / after, 2 cols)
5. `BlockHeader` ("Tested two flows with 8 members; the shorter one won") → `BlockArticle` (method, what changed) → `BlockEmbed` (Figma prototype)
6. `BlockList` (listType `results`)

Hybrid projects (for example a design system with a motion layer): take the design-systems arc and add one creative-development block.

**Reflection is optional.** Add a closing `BlockArticle` (≤ 80 words) only when it adds something: a blocker that was worked around, or what Riki would do differently.

## Copy rules

- **Plain language for a non-specialist.** If a recruiter wouldn't follow a term, explain it in a clause or drop it.
- **Show the scope of the role.** Say exactly what Riki did ("ran the discovery workshop, built the token pipeline, wrote the migration codemods"), not just a title. Use "we" for team work and say who was on the team (engineers, PM, brand).
- First person and active voice; outcomes in the past tense.
- **Lead with the outcome, then the how.** Headlines state a result, not a topic.
- **Business impact first:** money made, money saved or risk reduced. Then the user or team benefit ("cut rebrand time from 6 weeks to 3 days, saving about $40k per rebrand (estimate)").
- **Every metric has a timeframe** ("+12% completion in the first two weeks").
- **Estimates are allowed only when labelled.** Mark them "(estimate)" and keep them apart from measured facts. Never invent metrics, quotes, clients or awards. If there is no evidence, ask for it or phrase the result qualitatively and flag it.
- Specific beats impressive: "cut component build time from 3 days to 4 hours", not "massively improved velocity".
- Name one trade-off or rejected option per key decision; reviewers look for judgement.
- **One idea per `BlockArticle`, 40–150 words.** Short paragraphs (≤ 3 sentences). Prefer a list or an image to another paragraph.
- NDA work: anonymise the client ("a global network-equipment vendor"), blur data in media, and consider `protected: true`.
- Field lengths: hero `intro` 6–14 words; header `content` ≤ 20 words; `subtitle` ≤ 155 characters (used as the meta description).
- Alt text: what is shown and what to notice, ≤ 150 characters. Don't start with "Image of".
- Captions (`BlockImage.title`): tell the reader what to look at ("Tokens resolve per brand at build time; only the theme file changes").

## Media direction

Media does the explaining, so the copy can stay short. Aim for roughly one media block per text block. Prefer:
- **Short loops over screenshots** for anything that moves: 6–15 s, no audio, seamless loop.
- **Before / after pairs** in a 2-column `BlockImages`.
- **Living artefacts** (Figma prototype, Storybook, CodePen) as `BlockEmbed`, with a still or loop elsewhere for skimmers.
- **Diagrams** for architecture (token tiers, data flow): simple, on-brand, legible at 375 px wide.
- **Process artefacts** (sketches, whiteboards, audits) to show thinking, in a 3-column gallery.
- Real UI at real resolution; crop to the point, don't shrink whole screens.

### Media specs

| Use | Format | Size | Notes |
|---|---|---|---|
| Cover (`caseStudy.img`) | JPG/PNG | 2400×1500 (16:10) | No text; also the social card |
| Full-width image | JPG/PNG/WebP | ≥ 2400 px wide | Contentful resizes and serves WebP |
| Column image | JPG/PNG/WebP | ≥ 1600 px wide | |
| Loop video | MP4 (H.264), no audio | 1920×1080 or 1600×1000, ≤ 8 MB, 6–15 s | Autoplays muted; first frame should work as a still |
| Long demo with narration | YouTube/Vimeo URL in `BlockImage.video` | | Embedded, privacy-enhanced |
| Gallery items | same aspect ratio within one gallery | ≥ 1200 px wide | 2–8 items |
| Diagram | PNG/SVG exported at 2× | ≥ 1600 px wide | Test legibility on a phone |
