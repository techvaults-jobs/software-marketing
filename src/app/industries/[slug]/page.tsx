import { ViewTransition } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { DemoApp } from "@/components/demo/demo-app"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { AvailabilityBadge } from "@/components/site/sector-card"
import { SectorPanel } from "@/components/site/sector-panel"
import { Section, SectionIntro } from "@/components/site/section"
import { getSector, isReady, sectors } from "@/content/sectors"
import { appLink } from "@/content/site"

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const sector = getSector((await params).slug)
  if (!sector) return {}
  return { title: `StockVaults for ${sector.name.toLowerCase()}`, description: sector.summary }
}

export default async function SectorPage({ params }: PageProps<"/industries/[slug]">) {
  const sector = getSector((await params).slug)
  if (!sector) notFound()
  const others = sectors.filter((other) => other.slug !== sector.slug)
  const ready = isReady(sector)

  return (
    <Page>
      <PageHero
        back={{ href: "/industries", label: "All industries" }}
        lead={
          <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
            <span className="inline-flex size-12 items-center justify-center rounded-card border border-line bg-paper">
              <sector.icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
            </span>
          </ViewTransition>
        }
        eyebrow={`StockVaults for ${sector.name.toLowerCase()}`}
        title={sector.headline}
        actions={
          <>
            <Link href={`/demo/${sector.slug}`} transitionTypes={["nav-forward"]} className="btn btn-primary">
              {ready ? "Open the full demo" : "Open the preview"} <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Book a walkthrough
            </Link>
            {sector.setup && appLink("/") ? (
              <a href={appLink(`/demo/${sector.setup}`) ?? undefined} className="btn btn-outline">
                Open the full system
              </a>
            ) : null}
          </>
        }
      >
        {sector.summary}
        <span className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
          <AvailabilityBadge sector={sector} />
          {ready ? null : (
            <span className="text-steel">
              StockVaults runs phone and electronics shops today. For {sector.name.toLowerCase()}, the parts below are built into your version before you go live.
            </span>
          )}
        </span>
      </PageHero>

      <Section className="pt-0 lg:pt-0" label={`StockVaults for ${sector.name.toLowerCase()} at a glance`}>
        <SectorPanel sector={sector} className="reveal" />
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal">
            <SectionIntro
              eyebrow={ready ? "What it tracks" : "What we build in"}
              title={ready ? "The details that matter in your trade." : "The details your version would track."}
            />
            <ul className="mt-8 space-y-3">
              {sector.tracks.map((line) => (
                <li key={line} className="flex gap-3 text-[16px]">
                  <Check className="mt-1 size-4 shrink-0 text-vault-red" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <ul className="reveal grid gap-px self-start overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {sector.workflows.map((workflow, index) => (
              <li key={workflow.title} className="bg-paper p-6 sm:p-7">
                <span className="font-mono text-[12px] text-steel">0{index + 1}</span>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{workflow.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-steel">{workflow.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow={ready ? "Demo" : "Preview"} title={`Try it as ${sector.demo.business}.`} className="reveal">
          {ready
            ? "A made-up business with made-up stock. Everything you do stays in your browser."
            : "A preview of your version, with a made-up business and made-up stock. It shows how the screens would work; the sector parts are built for you. Everything you do stays in your browser."}
        </SectionIntro>
        <div className="reveal mt-10">
          <DemoApp slug={sector.slug} compact />
        </div>
      </Section>

      <Section tone="mist" className="py-12 lg:py-16">
        <h2 className="eyebrow mb-5">Other industries</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/industries/${other.slug}`}
                className="flex h-10 items-center gap-2 rounded-full border border-line-strong bg-paper px-4 text-sm font-medium transition-colors hover:border-ink"
              >
                <other.icon className="size-4" strokeWidth={1.75} aria-hidden />
                {other.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`Running a ${sector.name.toLowerCase()} business?`} body="Tell us how your stock moves today. We will show you what your version of this system would look like and what it would cost." />
    </Page>
  )
}
