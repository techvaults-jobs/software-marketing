import Link from "next/link"
import { sectors } from "@/content/sectors"
import { site, whatsappLink } from "@/content/site"
import { Logo } from "./logo"

const columns = [
  {
    title: "Product",
    links: [
      { href: "/stockvaults", label: "StockVaults" },
      { href: "/demo", label: "Live demo" },
      { href: "/pricing", label: "Pricing" },
      { href: "/industries", label: "Industries" },
      { href: "/systems", label: "Other systems" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/services", label: "Services" },
      { href: "/services#process", label: "How we work" },
      { href: "/customers/abu-twins", label: "Customers" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

async function currentYear() {
  "use cache"
  return new Date().getFullYear()
}

export async function Footer() {
  const year = await currentYear()
  return (
    <footer className="border-t border-line bg-paper">
      <div className="frame pad">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-steel">
              StockVaults is inventory software built around your business, with the training and care to keep it working.
            </p>
            <address className="mt-4 text-sm leading-relaxed text-steel not-italic">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="link">
                  WhatsApp {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-sm font-medium text-ink">{column.title}</h2>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-steel transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Industries" className="col-span-2 md:col-span-1">
            <h2 className="mb-4 text-sm font-medium text-ink">Industries</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
              {sectors.map((sector) => (
                <li key={sector.slug}>
                  <Link href={`/industries/${sector.slug}`} className="text-steel transition-colors hover:text-ink">
                    {sector.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-line py-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>Demo data on this site is made up and belongs to no real business.</p>
        </div>
      </div>
    </footer>
  )
}
