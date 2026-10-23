import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Faq } from "@/components/site/faq"
import { Section, SectionIntro } from "@/components/site/section"
import { pricingTeaser } from "@/content/home"
import { packages } from "@/content/pricing"
import { whatsappLink } from "@/content/site"
import { naira } from "@/lib/naira"

/** The answer to "how much" beside the questions buyers ask next. */
export function PricingFaq() {
  const from = Math.min(...packages.map((plan) => plan.price))
  return (
    <Section>
      <div className="flex flex-wrap gap-x-16 gap-y-12">
        <div className="reveal min-w-0 flex-[1_1_340px]">
          <SectionIntro eyebrow={pricingTeaser.eyebrow} title={pricingTeaser.title}>
            {pricingTeaser.body}
          </SectionIntro>
          <p className="mt-8 flex items-baseline gap-2">
            <span className="text-[14px] text-steel">From</span>
            <span className="font-mono text-[32px] tracking-tight sm:text-[36px]">{naira(from)}</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get a quote
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-secondary">
              Chat on WhatsApp
            </a>
          </div>
          <Link href="/pricing" className="link-rule mt-8">
            See every package
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="reveal min-w-0 flex-[1.3_1_420px]">
          <Faq skip={["How is it priced?", "Do you work with businesses outside Nigeria?", "We are not in any of the sectors listed. Can you still help?"]} />
        </div>
      </div>
    </Section>
  )
}
