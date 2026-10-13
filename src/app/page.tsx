import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { DemoSwitcher } from "@/components/demo/demo-switcher"
import { CtaBand } from "@/components/site/cta-band"
import { AbuTwinsMark } from "@/components/site/customer"
import { Faq } from "@/components/site/faq"
import { FeatureBento } from "@/components/site/feature-bento"
import { HeroFilm } from "@/components/site/hero-film"
import { Page } from "@/components/site/page"
import { Rules } from "@/components/site/rules"
import { SectorGrid } from "@/components/site/sector-card"
import { Section, SectionIntro } from "@/components/site/section"
import { sectors } from "@/content/sectors"
import { services } from "@/content/services"
import { systems } from "@/content/systems"

export default function HomePage() {
  return (
    <Page>
      <section className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden />
        <div className="frame relative">
          <div className="pad grid grid-cols-1 gap-12 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
            <div>
              <p className="rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1 pr-3.5 pl-1 text-[13px]">
                <span className="rounded-full bg-ink px-2 py-0.5 font-medium text-white">StockVaults</span>
                <span className="text-muted-foreground">Inventory software, built to order</span>
              </p>
              <h1 className="display rise max-w-[15ch] lg:text-[56px] xl:text-[64px]" style={{ "--i": 1 } as React.CSSProperties}>
                Know what you have, where it is and what it is worth<span className="text-brand">.</span>
              </h1>
              <p className="lede rise mt-6 max-w-[58ch]" style={{ "--i": 2 } as React.CSSProperties}>
                StockVaults is the inventory system TechVaults fits around the way your business already runs. We train your staff on it and we look after it once it is live. Try a working demo for your sector before you speak to anyone.
              </p>
              <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
                <Link href="/demo" transitionTypes={["nav-forward"]} className="btn btn-primary">
                  Try the demo
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Book a walkthrough
                </Link>
              </div>
              <ul className="rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" style={{ "--i": 4 } as React.CSSProperties}>
                {["No sign-up to try it", `${sectors.length} sector demos`, "Fitted to your workflows", "Staff trained by role"].map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check className="size-3.5 text-brand" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
              <HeroFilm />
            </div>
          </div>
          <div className="pad rise pb-16 sm:pb-20" style={{ "--i": 5 } as React.CSSProperties}>
            <p className="eyebrow mb-4">Now try it yourself</p>
            <DemoSwitcher compact />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="frame">
          <Link
            href="/customers/abu-twins"
            transitionTypes={["nav-forward"]}
            className="pad group flex flex-col gap-4 py-7 transition-colors hover:bg-subtle sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="eyebrow shrink-0">In daily use at</span>
            <span className="flex items-center gap-3">
              <AbuTwinsMark size={36} />
              <span className="text-[17px] font-semibold tracking-tight">Abu Twins</span>
            </span>
            <span className="text-[15px] text-muted-foreground sm:flex-1">
              A multi-shop phone and electronics retailer in Ibadan, Nigeria, running sales, stock and suppliers on a system we built for them.
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium">
              Read the story
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      <Section>
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro eyebrow="Industries" title="One core. Fitted to the stock you hold.">
            A phone has a serial number. A box of tablets has an expiry date. A tonne of sand has neither. Each sector gets the tracking it needs and none of what it does not.
          </SectionIntro>
          <Link href="/industries" className="btn btn-outline shrink-0 self-start lg:self-auto">
            All industries
          </Link>
        </div>
        <div className="mt-12">
          <SectorGrid sectors={sectors} />
        </div>
      </Section>

      <section className="border-t border-line">
        <div className="frame">
          <dl className="reveal reveal-children grid grid-cols-2 lg:grid-cols-4">
            {[
              [String(sectors.length), "sectors with a working demo"],
              ["5", "staff roles, each trained on its own screens"],
              ["6", "steps from first call to go-live"],
              ["1", "team for the build and the years after"],
            ].map(([figure, label], index) => (
              <div key={label} className={`border-line px-5 py-8 sm:px-8 lg:px-12 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block text-[44px] leading-none font-semibold tracking-[-0.05em] tabular-nums sm:text-[56px]">{figure}</span>
                  <span className="mt-3 block max-w-[22ch] text-sm leading-snug text-muted-foreground">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section tone="subtle">
        <SectionIntro eyebrow="Inside StockVaults" title="Everything a stock-holding business needs to keep count." className="reveal">
          These are in every StockVaults system we deliver, whatever the sector. They have been through real trading days, month ends and stock counts.
        </SectionIntro>
        <div className="mt-12">
          <FeatureBento />
        </div>
        <div className="reveal mt-10">
          <Link href="/stockvaults" className="nudge inline-flex items-center gap-1.5 text-[15px] font-medium hover:text-brand">
            See StockVaults in detail <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Built-in discipline" title="Rules the system keeps, so your staff do not have to remember them." className="reveal">
          Most stock losses are small mistakes that nobody caught. We write your rules into the software.
        </SectionIntro>
        <div className="mt-12">
          <Rules />
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div className="reveal">
            <p className="eyebrow mb-4 text-white/50">More than software</p>
            <h2 className="title">We build it, train your people and stay.</h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-white/65 sm:text-[19px]">
              A system nobody was trained on gets abandoned within a month. Building is one part of the job. The rest is getting every member of staff comfortable with it and being there when the business changes.
            </p>
            <Link href="/services" className="btn btn-inverse mt-8">
              How we work
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ol className="reveal reveal-children grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.id} className="bg-ink p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <service.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  <span className="font-mono text-[12px] text-white/40">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{service.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{service.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro eyebrow="Beyond inventory" title="Software for the rest of the business.">
            StockVaults is where most of our customers start. The same team builds the systems that sit around it, for any sector.
          </SectionIntro>
          <Link href="/systems" className="btn btn-outline shrink-0 self-start lg:self-auto">
            All systems
          </Link>
        </div>
        <ul className="reveal reveal-children mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {systems.slice(0, 9).map((system) => (
            <li key={system.name} className="flex items-center gap-4 bg-white p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line">
                <system.icon className="size-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-medium">{system.name}</span>
                <span className="block text-sm text-muted-foreground">{system.for}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="subtle">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionIntro eyebrow="Questions" title="Before you ask." className="reveal">
            Straight answers to what buyers ask us first.
          </SectionIntro>
          <div className="reveal">
            <Faq />
          </div>
        </div>
      </Section>

      <CtaBand />
    </Page>
  )
}
