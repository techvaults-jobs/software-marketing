import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { DemoSwitcher } from "@/components/demo/demo-switcher"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Rules } from "@/components/site/rules"
import { Section, SectionIntro } from "@/components/site/section"
import { features } from "@/content/features"

export const metadata: Metadata = {
  title: "Inventory system",
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
  "Receipts, invoices, delivery notes and labels in your branding",
  "Excel and PDF export on every report",
  "Import from your spreadsheets or current system",
  "Your currency, tax rules and time zone",
  "Integrations with accounting, payments and messaging on request",
]

export default function InventoryPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Inventory system"
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
        When the shop floor, the store room and the accounts all read from the same numbers, arguments about stock stop. This is the core every TechVaults inventory system is built on.
      </PageHero>

      <Section tone="subtle">
        <SectionIntro eyebrow="What is in it" title="Nine parts, working from one set of numbers." className="reveal" />
        <ul className="reveal mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.name} className="bg-white p-6 sm:p-7">
              <feature.icon className="size-5" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{feature.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionIntro eyebrow="A trading day" title="How it fits into the day." className="reveal" />
        <ol className="reveal mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {days.map((day) => (
            <li key={day.time} className="border-t border-ink pt-5">
              <p className="eyebrow">{day.time}</p>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{day.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{day.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="subtle">
        <SectionIntro eyebrow="Built-in discipline" title="Your rules, applied every time." className="reveal">
          These three come from problems our customers brought us. Your system carries the rules your business needs.
        </SectionIntro>
        <div className="reveal mt-12">
          <Rules />
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

      <Section tone="subtle">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionIntro eyebrow="Included" title="What comes with it." className="reveal">
            The practical things that decide whether a system gets used.
          </SectionIntro>
          <ul className="reveal grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {included.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
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
