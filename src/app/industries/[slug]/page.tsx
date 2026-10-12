import { ViewTransition } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { DemoApp } from "@/components/demo/demo-app"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionIntro } from "@/components/site/section"
import { getSector, sectors } from "@/content/sectors"

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const sector = getSector((await params).slug)
  if (!sector) return {}
  return { title: `Inventory for ${sector.name.toLowerCase()}`, description: sector.summary }
}

export default async function SectorPage({ params }: PageProps<"/industries/[slug]">) {
  const sector = getSector((await params).slug)
  if (!sector) notFound()
  const others = sectors.filter((other) => other.slug !== sector.slug)

  return (
    <Page>
      <PageHero
        back={{ href: "/industries", label: "All industries" }}
        lead={
          <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
            <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-white">
              <sector.icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
            </span>
          </ViewTransition>
        }
        eyebrow={sector.name}
        title={sector.headline}
        actions={
          <>
            <Link href={`/demo/${sector.slug}`} transitionTypes={["nav-forward"]} className="btn btn-primary">
              Open the full demo <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Book a walkthrough
            </Link>
          </>
        }
      >
        {sector.summary}
      </PageHero>

      <Section tone="subtle">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal">
            <SectionIntro eyebrow="What it tracks" title="The details that matter in your trade." />
            <ul className="mt-8 space-y-3">
              {sector.tracks.map((line) => (
                <li key={line} className="flex gap-3 text-[16px]">
                  <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <ul className="reveal grid gap-px self-start overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {sector.workflows.map((workflow, index) => (
              <li key={workflow.title} className="bg-white p-6 sm:p-7">
                <span className="font-mono text-[12px] text-muted-foreground">0{index + 1}</span>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{workflow.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{workflow.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Demo" title={`Try it as ${sector.demo.business}.`} className="reveal">
          A made-up business with made-up stock. Everything you do stays in your browser.
        </SectionIntro>
        <div className="reveal mt-10">
          <DemoApp slug={sector.slug} compact />
        </div>
      </Section>

      <Section tone="subtle" className="py-12 sm:py-16">
        <h2 className="eyebrow mb-5">Other industries</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/industries/${other.slug}`}
                className="flex h-10 items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-4 text-sm font-medium transition-colors hover:border-ink"
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
