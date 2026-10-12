/**
 * Company details used across the site. Change them here, nowhere else.
 */
export const site = {
  name: "TechVaults",
  legalName: "TechVaults Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techvaults.com",
  description:
    "TechVaults builds inventory software around the way your business works, trains your staff to use it and keeps it running.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@techvaults.com",
} as const

export const nav = [
  { href: "/inventory", label: "Inventory" },
  { href: "/industries", label: "Industries" },
  { href: "/services", label: "Services" },
  { href: "/systems", label: "Other systems" },
  { href: "/customers/abu-twins", label: "Customers" },
] as const
