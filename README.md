# TechVaults software marketing site

The public website for TechVaults' software business. It leads with inventory systems, shows the sectors they are built for, and lets a visitor use a working demo before getting in touch.

## Run it

```bash
npm install
npm run dev
```

`npm run check` runs the typecheck, lint and a production build.

## What is here

- **Home, Inventory, Industries, Services, Other systems, Customers, Contact**
- **Live demo** at `/demo/<sector>`: a working inventory app with made-up data for nine sectors. It runs entirely in the browser and saves nothing.
- **Route transitions** with React view transitions, and a framed layout in the TechVaults colours.

## Configuration

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public address, used for the sitemap and social cards |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown on the site |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Optional. When all three are set, the contact form sends through Resend. Without them it opens the visitor's email app with the message written out |

## Editing content

All text and demo data is in `src/content`. See `CONTRIBUTING.md` for how to add a sector or a customer, and `AGENTS.md` for the writing and design rules.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui on Base UI, lucide-react, motion.
