# TechVaults software marketing site

The public website for TechVaults' software business. It leads with StockVaults, the inventory system, shows the sectors they are built for, and lets a visitor use a working demo before getting in touch.

## Run it

```bash
npm install
npm run dev
```

`npm run check` runs the typecheck, lint and a production build.

## What is here

- **Home, StockVaults, Industries, Services, Other systems, Customers, Contact**
- **Live demo** at `/demo/<sector>`: a working inventory app with made-up data for nine sectors. It runs entirely in the browser and saves nothing.
- **Route transitions** with React view transitions, and a framed layout in the TechVaults colours.

## Configuration

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public address, used for the sitemap and social cards |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown on the site |
| `DATABASE_URL` | Postgres connection string. Contact-form messages are saved here |
| `ADMIN_PASSWORD` | Opens `/admin`, where the team reads enquiries. 12 characters or more; the page stays closed without it |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Optional. When all three are set, each enquiry is also emailed to the team through Resend |

With neither a database nor Resend, the form opens the visitor's email app with the message written out.

## Database

One Postgres table, `enquiries`. Schema changes are numbered SQL files in `db/migrations`; `npm start` applies any new ones before the server starts, and `npm run db:migrate` does the same by hand. Add a new file for every change and never edit one that has already run.

On Railway the database is the `Postgres` service in the same project, and the site reads it over the private network through `DATABASE_URL=${{Postgres.DATABASE_URL}}`.

## Editing content

All text and demo data is in `src/content`. See `CONTRIBUTING.md` for how to add a sector or a customer, and `AGENTS.md` for the writing and design rules.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui on Base UI, lucide-react, motion.
