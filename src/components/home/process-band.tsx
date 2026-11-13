import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/site/section"
import { processBand } from "@/content/home"
import { process } from "@/content/services"

/**
 * The working process on a dark band. It breaks the long white scroll and
 * answers the question a buyer has after the product: what happens next.
 */
export function ProcessBand() {
  return (
    <Section tone="dark">
      <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-[720px]">
          <p className="eyebrow mb-4 text-paper">{processBand.eyebrow}</p>
          <h2 className="title">{processBand.title}</h2>
        </div>
        <p className="max-w-[40ch] text-[17px] leading-[1.5] text-on-dark-muted sm:text-[18px]">{processBand.body}</p>
      </div>
      <ol className="reveal reveal-children mt-12 grid gap-px overflow-hidden rounded-card border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((step) => (
          <li key={step.step} className="bg-ink p-6 sm:p-8">
            <span className="text-[40px] leading-none font-semibold tracking-[-0.04em] text-paper/25 tabular-nums">{step.step}</span>
            <h3 className="mt-6 text-[19px] font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.55] text-on-dark-muted">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/contact" className="btn btn-inverse">
          Start with a discovery call
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link href="/services" className="link-rule border-paper hover:border-paper hover:text-paper">
          See our services
        </Link>
      </div>
    </Section>
  )
}
