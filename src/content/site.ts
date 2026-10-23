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

/**
 * The StockVaults app itself, where customers sign in and visitors open a full
 * demo. Unset until the app is live, and every link to it stays hidden until then.
 */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || null

/** A page in the app, or null while the app has no address. */
export function appLink(path: string) {
  return appUrl ? `${appUrl}${path}` : null
}

export const nav = [
  { href: "/industries", label: "Industries" },
  { href: "/stockvaults", label: "Features" },
  { href: "/customers/abu-twins", label: "Customers" },
  { href: "/pricing", label: "Pricing" },
] as const

/** In the mobile menu and the footer, not the top bar. */
export const moreNav = [
  { href: "/services", label: "Services" },
  { href: "/systems", label: "Other systems" },
  { href: "/contact", label: "Contact" },
] as const
