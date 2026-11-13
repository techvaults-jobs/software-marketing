import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section, SectionIntro } from "@/components/site/section"
import { servicesIntro } from "@/content/home"
import { services } from "@/content/services"

/**
 * The human half of what a customer buys, laid out the way TechVaults client
 * sites show services: an introduction beside cards that each lead deeper.
 */
export function ServicesGrid() {
  return (
    <Section tone="mist">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <SectionIntro eyebrow={servicesIntro.eyebrow} title={servicesIntro.title}>
            {servicesIntro.body}
          </SectionIntro>
          <Link href="/services#process" className="btn btn-secondary mt-8">
            {servicesIntro.link}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="reveal reveal-children grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services#${service.id}`}
                className="group flex h-full flex-col rounded-card border border-line bg-paper p-6 transition-colors hover:border-ink sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-ink text-paper">
                  <service.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">{service.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-body-muted">{service.summary}</p>
                <span className="nudge mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium group-hover:text-vault-red">
                  Learn more
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
