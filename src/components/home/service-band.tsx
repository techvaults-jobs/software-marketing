import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section, SectionIntro } from "@/components/site/section"
import { serviceBand } from "@/content/home"
import { services } from "@/content/services"

/** The near-black band: the human half of what a customer buys. */
export function ServiceBand() {
  return (
    <Section tone="dark">
      <SectionIntro title={serviceBand.title} layout="split" dark className="reveal">
        {serviceBand.body}
      </SectionIntro>
      <ol className="reveal reveal-children mt-12 grid gap-px overflow-hidden rounded-card border border-paper/12 bg-paper/12 grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <li key={service.id} className="bg-ink p-5 sm:p-7">
            <span className="font-mono text-[12px] text-on-dark-muted">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-[17px] sm:mt-6 sm:text-[19px] font-semibold tracking-tight">{service.name}</h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-on-dark-muted sm:text-[15px]">{service.summary}</p>
          </li>
        ))}
      </ol>
      <Link href="/services" className="link-rule reveal mt-8 border-paper hover:border-paper hover:text-paper">
        How we work
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Section>
  )
}
