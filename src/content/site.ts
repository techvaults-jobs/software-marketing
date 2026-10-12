/**
 * Company details used across the site. Change them here, nowhere else.
 */
export const site = {
  name: "TechVaults",
  /** The inventory system, as it is sold. TechVaults is the company that builds it. */
  product: "StockVaults",
  legalName: "TechVaults Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techvaults.com",
  description:
    "StockVaults is inventory software from TechVaults, built around the way your business works. We train your staff to use it and keep it running.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@techvaults.com",
} as const

export const nav = [
  { href: "/stockvaults", label: "StockVaults" },
  { href: "/industries", label: "Industries" },
  { href: "/services", label: "Services" },
  { href: "/systems", label: "Other systems" },
  { href: "/customers/abu-twins", label: "Customers" },
] as const
