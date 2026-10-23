import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { AvailabilityBadge } from "@/components/site/sector-card"
import { Section, SectionIntro } from "@/components/site/section"
import { otherSetups, sectors } from "@/content/sectors"
import { appLink, appUrl } from "@/content/site"

export const metadata: Metadata = {
  title: "Live demo",
  description: "Try StockVaults with made-up stock: a working demo for phone and electronics shops, and previews for other sectors. No sign-up, nothing to install.",
}

export default function DemoIndexPage() {
  return (
    <Page>
      <PageHero eyebrow="Live demo" title="Pick a business. Run it for five minutes.">
        Every demo runs in your browser with made-up stock. Sell, receive and transfer, then open the reports. Phones and electronics is StockVaults as it runs today; the other sectors are previews of a version we build for you. No sign-up, and nothing you do is saved.
      </PageHero>
      <Section tone="mist" className="py-12 lg:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li key={sector.slug}>
              <Link
                href={`/demo/${sector.slug}`}
                transitionTypes={["nav-forward"]}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-ink sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-paper">
                    <sector.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <ArrowUpRight className="size-4 text-faint transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-vault-red" aria-hidden />
                </div>
                <p className="mt-6 font-mono text-[12px] tracking-wide text-steel uppercase">{sector.name}</p>
                <h2 className="mt-1.5 text-[19px] font-semibold tracking-tight">{sector.demo.business}</h2>
                <p className="mt-2 text-[15px] text-steel">
                  {sector.demo.locations.join(", ")}. Tracks {sector.demo.attrs.map((attr) => attr.label.toLowerCase()).join(" and ")}.
                </p>
                <div className="mt-auto pt-5">
                  <AvailabilityBadge sector={sector} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      {appUrl ? (
        <Section className="py-12 lg:py-16">
          <SectionIntro eyebrow="Full system" title="Or open StockVaults itself.">
            The demos above are quick previews. The full system gives you your own made-up business inside the real StockVaults, set up for your trade: stock, sales, transfers, batches, serial numbers and reports. It is kept for 24 hours and nobody else sees it.
          </SectionIntro>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[...sectors.filter((sector) => sector.setup).map((sector) => ({ key: sector.slug, name: sector.name, setup: sector.setup })), ...otherSetups.map((other) => ({ key: other.setup, ...other }))].map((entry) => (
              <li key={entry.key}>
                <a href={appLink(`/demo/${entry.setup}`) ?? undefined} className="group flex h-full items-center justify-between gap-4 bg-paper px-6 py-5 transition-colors hover:bg-mist">
                  <span className="text-[15px] font-medium">{entry.name}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-faint transition-colors group-hover:text-ink" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </Page>
  )
}
