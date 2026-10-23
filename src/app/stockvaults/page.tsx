import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { DemoSwitcher } from "@/components/demo/demo-switcher"
import { Alternatives } from "@/components/site/alternatives"
import { CtaBand } from "@/components/site/cta-band"
import { DisciplineBento } from "@/components/site/discipline-bento"
import { FeatureBento } from "@/components/site/feature-bento"
import { ItemJourney } from "@/components/site/item-journey"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionIntro } from "@/components/site/section"

export const metadata: Metadata = {
  title: "StockVaults inventory system",
  description: "Stock by location, unit-level tracking, sales, purchasing, transfers, returns, roles, reports and a tamper-evident audit trail.",
}

const days = [
  {
    time: "Opening",
    title: "Start from yesterday's close",
    body: "Each location opens on the count it closed with. Transfers sent overnight are waiting to be received, with the sender's name on them.",
  },
  {
    time: "Trading",
    title: "Sell from what is really there",
    body: "The till only offers stock held at that location. Prices follow the role of whoever is logged in, and part payments stay attached to the sale.",
  },
  {
    time: "Receiving",
    title: "Take in deliveries against the bill",
    body: "Goods are checked in line by line. The supplier's balance, your stock and the cost of each unit move together.",
  },
  {
    time: "Closing",
    title: "Close the day and lock it",
    body: "Cash, bank and card totals are counted against the system. Once a day is closed, nobody can quietly edit it.",
  },
]

const included = [
  "Built for many locations, products and staff accounts",
  "Web app that works on computers, tablets and phones",
  "Barcode, QR and serial scanning",
  "Receipts and invoices in your branding",
  "Excel and PDF export on every report",
  "Import from your spreadsheets or current system",
  "Set up for Nigeria: naira and West Africa Time. Other currencies, tax rules and time zones on request",
  "Integrations with accounting, payments and messaging on request",
]

export default function StockVaultsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="StockVaults"
        title="One count that everybody trusts."
        actions={
          <>
            <Link href="/demo" transitionTypes={["nav-forward"]} className="btn btn-primary">
              Try the demo <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Book a walkthrough
            </Link>
          </>
        }
      >
        When the shop floor, the store room and the accounts all read from the same numbers, arguments about stock stop. StockVaults is the inventory system TechVaults builds, fits to your trade and looks after.
      </PageHero>

      <Section tone="mist">
        <SectionIntro eyebrow="What is in it" title="Nine parts, working from one set of numbers." className="reveal" />
        <div className="mt-12">
          <FeatureBento />
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="A trading day" title="How it fits into the day." className="reveal" />
        <ol className="reveal reveal-children mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {days.map((day) => (
            <li key={day.time} className="border-t border-ink pt-5">
              <p className="eyebrow">{day.time}</p>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{day.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-steel">{day.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <SectionIntro eyebrow="Built-in discipline" title="Your rules, applied every time." className="reveal">
          These three come from problems our customers brought us. Your system carries the rules your business needs.
        </SectionIntro>
        <div className="mt-12">
          <DisciplineBento link={false} />
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="How it works" title="Follow one phone from the supplier to a customer." className="reveal">
          Every item in StockVaults is in one known place at a time, and every move has a name on it. Step through it.
        </SectionIntro>
        <div className="mt-12">
          <ItemJourney />
        </div>
      </Section>

      <Section tone="mist">
        <SectionIntro eyebrow="What it replaces" title="Most stock is still counted in a book, a spreadsheet or software built for somebody else." className="reveal">
          Each of them works on a quiet day. This is what happens on the other days.
        </SectionIntro>
        <div className="mt-12">
          <Alternatives />
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Try it" title="Use it before you buy it." className="reveal">
          Pick a sector. Sell, receive and transfer stock, then watch the reports follow.
        </SectionIntro>
        <div className="reveal mt-10">
          <DemoSwitcher compact />
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionIntro eyebrow="Included" title="What comes with it." className="reveal">
            The practical things that decide whether a system gets used.
          </SectionIntro>
          <ul className="reveal grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {included.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-vault-red" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </Page>
  )
}
