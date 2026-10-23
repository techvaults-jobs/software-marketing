import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionIntro } from "@/components/site/section"
import { systems } from "@/content/systems"

export const metadata: Metadata = {
  title: "Other systems",
  description: "Point of sale, accounting, HR and payroll, school, clinic, logistics and other business software, built to order for any sector.",
}

export default function SystemsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Other systems"
        title="We build software for every part of a business."
        actions={
          <Link href="/contact" className="btn btn-primary">
            Describe what you need <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        Inventory is what we lead with, and for most customers it is the first system we deliver. The same team designs, builds and maintains the software around it, for companies in any sector.
      </PageHero>

      <Section tone="subtle">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <li key={system.name} className="reveal bg-paper p-6 sm:p-7">
              <system.icon className="size-5" strokeWidth={1.75} aria-hidden />
              <h2 className="mt-5 text-[17px] font-semibold tracking-tight">{system.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-steel">{system.body}</p>
              <p className="mt-5 font-mono text-[12px] tracking-wide text-steel uppercase">{system.for}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionIntro eyebrow="Joined up" title="Better together than bought apart." className="reveal">
            Separate tools mean the same sale typed three times. When we build the systems around your inventory, a sale updates stock, the customer balance and the books in one step.
          </SectionIntro>
          <div className="reveal self-end">
            <p className="text-[16px] leading-relaxed text-steel">
              Something not on this list? Most of what we build starts as a conversation about a process that is costing a business time or money. If it can be written down as steps, it can be built.
            </p>
            <Link href="/services#process" className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium hover:text-vault-red">
              See how a project runs <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </Page>
  )
}
