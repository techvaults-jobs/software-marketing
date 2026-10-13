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
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "techvaults@gmail.com",
  phone: { display: "+234 803 404 8178", e164: "+2348034048178" },
  address: ["17, Akinremi Street", "Anifowoshe, Ikeja", "Lagos, Nigeria"],
} as const

/** A WhatsApp chat with the team, opened with a first line already typed. */
export function whatsappLink(message = "Hello TechVaults. I would like to know more about StockVaults.") {
  return `https://wa.me/${site.phone.e164.slice(1)}?text=${encodeURIComponent(message)}`
}

export const nav = [
  { href: "/stockvaults", label: "StockVaults" },
  { href: "/industries", label: "Industries" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/systems", label: "Other systems" },
  { href: "/customers/abu-twins", label: "Customers" },
] as const
