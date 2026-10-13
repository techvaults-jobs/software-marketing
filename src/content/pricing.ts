/**
 * Standard prices for StockVaults. Naira is the price we charge; the dollar
 * figure is that amount at `rate`, rounded, for buyers who think in dollars.
 * When the rate moves far enough to matter, change `rate`, `ratedOn` and the
 * `usd` figures together.
 */
export const pricing = {
  rate: 1330,
  ratedOn: "October 2026",
  carePeriod: "12 months",
} as const

export type Money = { ngn: number; usd: number }

export type Package = {
  id: string
  name: string
  for: string
  /** One payment. `from` marks a starting price that depends on scope. */
  price: Money
  from?: boolean
  /** The optional yearly care plan after the first twelve months. */
  care: Money | null
  locations: string
  highlights: string[]
  featured?: boolean
}

export const packages: Package[] = [
  {
    id: "single",
    name: "One location",
    for: "A shop, a pharmacy or a store with one stock room.",
    price: { ngn: 2_500_000, usd: 1_900 },
    care: { ngn: 450_000, usd: 340 },
    locations: "1 location",
    highlights: ["StockVaults fitted to your sector", "Your opening stock and price list loaded", "Every member of staff trained", "Live in three to four weeks"],
  },
  {
    id: "multi",
    name: "Several locations",
    for: "Branches that share stock, with or without a central store.",
    price: { ngn: 6_500_000, usd: 4_900 },
    care: { ngn: 1_200_000, usd: 900 },
    locations: "Up to 5 locations",
    highlights: ["Everything in One location", "Transfers with a sender and a receiver", "Screens and approvals built for your workflows", "One view of every branch for the owner"],
    featured: true,
  },
  {
    id: "group",
    name: "Group",
    for: "Six locations or more, or a system that must talk to others.",
    price: { ngn: 15_000_000, usd: 11_300 },
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
