import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section } from "@/components/site/section"
import { sectors } from "@/content/sectors"

export const metadata: Metadata = {
  title: "Live demo",
  description: "Use a working copy of the inventory system for your sector. No sign-up, nothing to install.",
}

export default function DemoIndexPage() {
  return (
    <Page>
      <PageHero eyebrow="Live demo" title="Pick a business. Run it for five minutes.">
        Each demo is a working copy of the system with made-up stock for that sector. Sell, receive and transfer, then open the reports. No sign-up, and nothing you do is saved.
      </PageHero>
      <Section tone="subtle" className="py-12 sm:py-16">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li key={sector.slug}>
              <Link
                href={`/demo/${sector.slug}`}
                transitionTypes={["nav-forward"]}
                className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-subtle sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-white">
                    <sector.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <ArrowUpRight className="size-4 text-[#b0b0b0] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
                </div>
                <p className="mt-6 font-mono text-[12px] tracking-wide text-muted-foreground uppercase">{sector.name}</p>
                <h2 className="mt-1.5 text-[19px] font-semibold tracking-tight">{sector.demo.business}</h2>
                <p className="mt-2 text-[15px] text-muted-foreground">
                  {sector.demo.locations.join(", ")}. Tracks {sector.demo.attrs.map((attr) => attr.label.toLowerCase()).join(" and ")}.
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  )
}
