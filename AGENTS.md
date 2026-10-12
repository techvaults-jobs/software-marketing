<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Working on this site

These rules apply to everyone who changes this repository, people and coding agents alike. Read `CONTRIBUTING.md` for the full version. The short form:

## Code

- Content lives in `src/content`. Pages read from it. Do not hard-code a sector, service or FAQ entry in a page.
- Server components by default. Add `"use client"` only for state, effects or browser APIs, and keep that component small.
- Icons are functions: they cannot be passed from a server component to a client component as props. Import the content module inside the client component instead.
- No new dependency without a reason written in the pull request. Prefer what is already installed: Tailwind, shadcn/ui (Base UI), lucide-react, motion.
- Comments explain why, never what. No commented-out code, no banner comments, no "TODO" without an owner.
- Names say what a thing is in the business: `sector`, `location`, `reorder`. Not `data`, `item2`, `handleClick2`.
- `npm run check` must pass before a commit: types, lint and a production build.

## Copy

- Write the way a senior person at the company would explain it across a table. Short sentences. Concrete nouns.
- Say what the software does, with an example. "A return can never be worth more than the item sold for" beats "robust returns management".
- Banned: seamless, robust, powerful, cutting-edge, next-generation, revolutionary, unlock, unleash, elevate, empower, supercharge, leverage, game-changing, world-class, "in today's fast-paced world", "take your business to the next level".
- No em dashes to glue clauses together. No lists of three adjectives. No rhetorical questions followed by their own answer. No exclamation marks.
- Sentence case for every heading and button. One idea per heading.
- Never invent a customer, a quote, a number or a logo. Abu Twins is the only customer named on this site. A new one needs written permission first.
- Demo data is made up and must stay that way. Never paste real customer records, prices or names into `src/content`.

## Design

- Three colours: red `#bc0004`, black, white. Greys are neutral. No gradients, no glows, no glass, no coloured shadows, no second accent colour.
- Red is for one thing per screen: the main action or the one number that needs attention. If everything is red, nothing is.
- Structure comes from hairlines and spacing, not from boxes with shadows.
- Motion explains where something went. Under 400 ms, no bounce, and off for people who ask for reduced motion.
- Every page works at 360 px wide with no sideways scroll, and by keyboard alone.
