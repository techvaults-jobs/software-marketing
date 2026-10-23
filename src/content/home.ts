/**
 * Words on the home page that are not a sector, a service or an FAQ entry.
 * Those have their own files.
 */
export const hero = {
  badge: "Inventory software, built to order for your trade",
  title: "Know what you have, where it is and what it is worth.",
  lead: "One stock system shaped around how your shops already run. We set it up, train every member of staff and stay on call.",
  primary: "Try the demo for your sector",
  secondary: "Book a walkthrough",
  reassurance: ["No sign-up to try it", "One payment, no monthly licence", "Staff trained by role"],
  /** The sector whose demo data the hero dashboard shows. */
  sector: "phones-electronics",
  /** A unit from the sample stock table, just booked in. Made up, like the rest of the demo. */
  received: { imei: "…2074", by: "L. Okoye", at: "09:12" },
} as const

export const picker = {
  eyebrow: "Your trade",
  title: "A phone has an IMEI. A drug has an expiry date. A tonne of sand has neither.",
  body: "Pick your sector. StockVaults tracks what your trade needs and leaves out what it does not.",
} as const

export const discipline = {
  eyebrow: "Built-in discipline",
  title: "Rules the system keeps, so your staff do not have to remember them.",
  movement: {
    title: "A name on every movement",
    body: "Who sent it, who received it, who approved it. When a count is short you start with a name and a time, not a guess.",
    from: { place: "Iwo Road", who: "Sent by A. Mensah" },
    to: { place: "Dugbe", who: "Received by L. Okoye" },
    units: "12 units",
    times: "09:14 to 10:02",
  },
  limits: {
    title: "Limits that hold",
    body: "A refund cannot exceed the sale. The check runs on the server, so no till can skip it.",
    asked: 120_000,
    allowed: 85_000,
  },
  roles: {
    title: "Each role sees its own screen",
    body: "Cost prices and margins stay hidden from people who do not need them.",
    cost: 671_000,
    sells: 799_000,
  },
  link: "See everything StockVaults does",
} as const

export const serviceBand = {
  title: "We build it, train your people and stay.",
  body: "A system nobody was trained on gets abandoned in a month. Software is one part of the job.",
} as const

export const pricingTeaser = {
  eyebrow: "Pricing",
  title: "One payment. No monthly licence.",
  body: "You pay once for a system fitted to your business. The first year of care is included, then a care plan only if you want one.",
} as const

export const finalCta = {
  title: "See it with your own stock in mind.",
  body: "Open the demo for your sector, sell something, then check the count. No sign-up.",
} as const
