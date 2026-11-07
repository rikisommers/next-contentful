# Storytelling, copy and media

Audience: hiring managers, design-system leads, creative directors and engineering managers who skim first. They should get the project, Riki's role and the outcome from the hero, intro and results alone, then find depth in the middle.

## Arcs

Pick one, then adapt. Block names refer to `schema.md`.

### Design systems engineering
Proof that the system was adopted and made teams faster, not just that components exist.
1. `BlockHero` — outcome headline (`Shipping one design language to __six__ products`)
2. `BlockIntro` — client, role, duration, overview
3. `BlockHeader` "The problem" → `BlockArticle` (fragmentation, cost, who felt it) → `BlockImages` (audit: inconsistent UI side by side)
4. `BlockHeader` "Architecture" → `BlockArticle` (token tiers, theming, platforms) → `BlockImage` (diagram or video of a token change propagating)
5. `BlockCode` (token definition or component API) or `BlockEmbed` (Storybook)
6. `BlockHeader` "Adoption" → `BlockArticle` (docs, contribution model, migration) → `BlockList` (listType `timeline`) (rollout)
7. `BlockList` (listType `results`) (adoption %, time saved, bugs, a11y), `BlockQuote` (team lead)
8. `BlockArticle` "What I'd do next"

### Creative development
Lead with motion; the craft is the evidence.
1. `BlockHero` with a short line; `image` = still frame
2. `BlockImage` `size: "full"` with the hero video loop
3. `BlockIntro`
4. `BlockHeader` "Idea" → `BlockArticle` (concept, references)
5. `BlockHeader` "How it works" → `BlockArticle` (technique: shaders, physics, performance budget) → `BlockCode` (the interesting 20 lines) → `BlockImages` (process frames, 3 cols)
6. `BlockEmbed` (CodePen or live demo)
7. `BlockList` (listType `results`) (fps on mid-range devices, load size, awards, engagement)
8. `BlockArticle` "Learned"

### UX / product design
Show reasoning and evidence, not deliverables.
1. `BlockHero` — user outcome headline
2. `BlockIntro`
3. `BlockHeader` "The problem" → `BlockArticle` (users, job to be done, evidence) → `BlockQuote` (user research quote, anonymised)
4. `BlockHeader` "Research" → `BlockList` (listType `feature`) (insights) → `BlockImages` (affinity map, journey)
5. `BlockHeader` "Design" → `BlockArticle` (options explored, trade-offs) → `BlockImages` (before / after, 2 cols) → `BlockEmbed` (Figma prototype)
6. `BlockHeader` "Validation" → `BlockArticle` (testing method, what changed)
7. `BlockList` (listType `results`)
8. `BlockArticle` "Reflection"

Hybrid projects (for example a design system with a motion layer): take the design-systems arc and insert the creative-development "How it works" section.

## Copy rules

- First person ("I", "we" for team work, and say which parts were Riki's). Active voice, present outcomes in past tense.
- Lead with the outcome, then the how. Headlines state a result, not a topic.
- Specific beats impressive: "cut component build time from 3 days to 4 hours" not "massively improved velocity".
- Name trade-offs and rejected options; reviewers look for judgement.
- One idea per `BlockArticle`, 60–220 words. Short paragraphs (≤ 3 sentences).
- No jargon without a payoff; explain tokens, tiers and the like in a clause the first time.
- Never invent metrics, quotes, clients or awards. Missing evidence → ask, or phrase qualitatively and flag it.
- NDA work: anonymise the client ("a global network-equipment vendor"), blur data in media, consider `protected: true`.
- Field lengths: hero `intro` 6–14 words; header `content` ≤ 20 words; `subtitle` ≤ 155 characters (used as meta description).
- Alt text: what is shown and what to notice, ≤ 150 characters. Don't start with "Image of".
- Captions (`BlockImage.title`): tell the reader what to look at ("Tokens resolve per brand at build time; only the theme file changes").

## Media direction

Aim for roughly one media block per text block. Prefer:
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
