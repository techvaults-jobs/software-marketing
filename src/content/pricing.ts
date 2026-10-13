/**
 * Standard prices for StockVaults, in naira, which is what we charge. The
 * dollar figures on the site are worked out from the day's exchange rate
 * (see src/lib/exchange-rate.ts). The rate below is only used if the rate
 * services cannot be reached.
 */
export const pricing = {
  fallbackRate: 1330,
  fallbackRatedOn: "October 2026",
} as const

export type Package = {
  id: string
  name: string
  for: string
  /** One payment, in naira. `from` marks a starting price that depends on scope. */
  price: number
  from?: boolean
  /** The optional yearly care plan after the first twelve months, in naira. */
  care: number | null
  locations: string
  highlights: string[]
  featured?: boolean
}

export const packages: Package[] = [
  {
    id: "single",
    name: "One location",
    for: "A shop, a pharmacy or a store with one stock room.",
    price: 2_500_000,
    care: 450_000,
    locations: "1 location",
    highlights: ["StockVaults fitted to your sector", "Your opening stock and price list loaded", "Every member of staff trained", "Live in three to four weeks"],
  },
  {
    id: "multi",
    name: "Several locations",
    for: "Branches that share stock, with or without a central store.",
    price: 6_500_000,
    care: 1_200_000,
    locations: "Up to 5 locations",
    highlights: ["Everything in One location", "Transfers with a sender and a receiver", "Screens and approvals built for your workflows", "One view of every branch for the owner"],
    featured: true,
  },
  {
    id: "group",
    name: "Group",
    for: "Six locations or more, or a system that must talk to others.",
    price: 15_000_000,
    from: true,
    care: null,
    locations: "6 locations or more",
    highlights: ["Everything in Several locations", "Links to accounting, payments or your own systems", "Hosting on your own servers if you need it", "A named engineer on your account"],
  },
]

/** In every package, whatever the size. */
export const included = [
  { title: "A discovery visit", body: "We watch how stock moves through your business and write down every workflow before we build." },
  { title: "The system, fitted to you", body: "StockVaults set up for your sector, with your products, prices, locations and staff roles." },
  { title: "Your records moved across", body: "Opening stock, customers, suppliers and balances loaded and checked against your own totals." },
  { title: "Training by role", body: "Cashiers, storekeepers, managers and owners each learn the screens they will use." },
  { title: "Help through go-live", body: "We are on site or on call through your first week of trading on the system." },
  { title: "Twelve months of care", body: "Hosting, daily backups, support and updates for the first year, at no extra charge." },
]

export const notIncluded = "Hardware is not included: computers, receipt printers and barcode scanners. We tell you what to buy and set it up."

export const ownership = [
  { title: "No monthly licence", body: "You pay once for the system. It does not switch off if you stop paying us." },
  { title: "Your data, always", body: "Export it whenever you like. If you leave, you take a full copy with you." },
  { title: "Care is your choice", body: "After the first year a care plan keeps hosting, backups, support and updates going. You can also host it yourself." },
]
