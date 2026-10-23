import type { Metadata } from "next"
import Link from "next/link"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { SectorGrid } from "@/components/site/sector-card"
import { Section } from "@/components/site/section"
import { sectors } from "@/content/sectors"

export const metadata: Metadata = {
  title: "Industries",
  description: "StockVaults inventory systems for retail, pharmacy, grocery, distribution, manufacturing, hospitality, fashion, auto parts and building materials.",
}

export default function IndustriesPage() {
  return (
    <Page>
      <PageHero eyebrow="Industries" title="Stock behaves differently in every trade.">
        So the system does too. Phone and electronics shops run on StockVaults today. For the other sectors we build in the parts your trade needs; each has a preview you can use.
      </PageHero>
      <Section tone="subtle" className="py-12 sm:py-16">
        <SectorGrid sectors={sectors} />
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-dashed border-line-strong bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight">Your sector is not here?</h2>
            <p className="mt-1 text-[15px] text-steel">
              These are the ones with a demo or preview. If you hold stock of any kind, we can fit the core to it.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary shrink-0 self-start sm:self-auto">
            Tell us what you stock
          </Link>
        </div>
      </Section>
      <CtaBand />
    </Page>
  )
}
