import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, MessageCircle } from "lucide-react"
import { sectors } from "@/content/sectors"
import { site, whatsappLink } from "@/content/site"
import techvaultsMark from "../../../public/brand/techvaults.png"
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
  const contacts = [
    { icon: MapPin, title: "Visit us", lines: [site.address.join(", ")], href: null },
    { icon: MessageCircle, title: "Call or WhatsApp", lines: [site.phone.display], href: whatsappLink() },
    { icon: Mail, title: "Email", lines: [site.email], href: `mailto:${site.email}` },
  ]

  return (
    <footer className="border-t border-line bg-paper">
      <div className="frame pad">
        <ul className="grid gap-2 border-b border-line py-10 sm:grid-cols-3 sm:gap-8">
          {contacts.map((contact) => {
            const content = (
              <>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-ink text-paper">
                  <contact.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold tracking-[0.14em] text-steel uppercase">{contact.title}</span>
                  {contact.lines.map((line) => (
                    <span key={line} className="mt-1 block text-[15px] font-medium break-words text-ink underline-offset-4 group-hover:underline">
                      {line}
                    </span>
                  ))}
                </span>
              </>
            )
            return (
              <li key={contact.title} className="py-3 sm:py-0">
                {contact.href ? (
                  <a href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4">
                    {content}
                  </a>
                ) : (
                  <address className="flex items-center gap-4 not-italic">{content}</address>
                )}
              </li>
            )
          })}
        </ul>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-steel">
              StockVaults is inventory software built around your business, with the training and care to keep it working.
            </p>
            <Link href="/contact" className="btn btn-primary mt-6">
              Get a quote
            </Link>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-[12.5px] font-semibold tracking-[0.14em] text-ink uppercase">{column.title}</h2>
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
            <h2 className="mb-4 text-[12.5px] font-semibold tracking-[0.14em] text-ink uppercase">Industries</h2>
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
      </div>

      <div className="bg-ink text-on-dark-muted">
        <div className="frame pad flex flex-col gap-4 py-6 text-[13px] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Demo data on this site is made up and belongs to no real business.
          </p>
          <p className="flex items-center gap-3">
            A product of
            <span className="inline-flex rounded-md bg-paper px-2.5 py-1.5">
              <Image src={techvaultsMark} alt="TechVaults" height={22} className="h-[22px] w-auto" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
