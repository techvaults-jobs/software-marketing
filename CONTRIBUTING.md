# Contributing

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # types, lint and a production build
```

Node 20 or newer.

## Where things are

| Path | What is in it |
| --- | --- |
| `src/content` | Everything the site says: sectors and their demo data, services, systems, FAQ, company details |
| `src/app` | Routes. Each page is a thin layout over content |
| `src/components/site` | Shared pieces: header, footer, Section, Eyebrow, StatCell, SectorTabs, SectorPanel, cards |
| `src/components/home` | The home page sections, one component each |
| `src/components/demo` | The in-browser inventory demo |
| `src/components/ui` | shadcn/ui components. Regenerate with the shadcn CLI, do not hand-edit |

## Adding a sector

1. Add an entry to `sectors` in `src/content/sectors.ts`: copy, a `tab` label for the home page picker, what it tracks, four workflows, a demo dataset of about eight items priced in naira, and a `sample` of four of those items for the picker table.
2. Give the demo business a made-up name. Check it is not a real company in that trade.
3. Run `npm run check`. The industry page, the demo page, the footer and the sitemap pick it up.

Set `zoned: true` when locations hold different things (a kitchen and a bar), and `out` when stock leaves by something other than a sale (dispatch, issue).

## Adding a customer

Get written permission to use their name and logo first. Put the logo in `public/customers`, add a page under `src/app/customers`, and state only facts the customer has approved. No invented figures or quotes.

## Code style

- TypeScript, strict. No `any`, no non-null assertion where a check is cheap.
- Two-space indent, double quotes, no semicolons. Match the file you are in.
- Colours come from the tokens in `globals.css` (`vault-red`, `ink`, `paper`, `mist`, `line`, `steel` and the rest). No hex values in components.
- Tailwind classes in the markup. A class goes in `globals.css` only when it is used in many places (`btn`, `title`, `frame`).
- One component per concern. If a file passes 300 lines, look for the second component inside it.
- Accessibility is part of done: labels on inputs, `aria-current` on the active link, visible focus, real buttons for actions and real links for navigation.

## Transitions

Route changes use React's `<ViewTransition>`, set up in `src/components/site/page.tsx`.

- Wrap every new page in `<Page>`.
- Links that go deeper take `transitionTypes={["nav-forward"]}`. Links that go back up take `["nav-back"]`. Everything else fades.
- A shared element (the sector badge) needs the same `name` on both pages and must appear once per page.
- Timing and easing are variables at the top of `globals.css`. Change them there.

## Commits

Present tense, what changed and why: `fix: demo cart can no longer exceed stock at the location`. One change per commit.

## Before publishing copy

Read it aloud. If a sentence could be on any software company's website, rewrite it until it could only be on this one. The banned-word list is in `AGENTS.md`.
