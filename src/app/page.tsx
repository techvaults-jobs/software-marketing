import { CustomerStory } from "@/components/home/customer-story"
import { Hero } from "@/components/home/hero"
import { PricingFaq } from "@/components/home/pricing-faq"
import { SectorPicker } from "@/components/home/sector-picker"
import { ServiceBand } from "@/components/home/service-band"
import { TrustStrip } from "@/components/home/trust-strip"
import { CtaBand } from "@/components/site/cta-band"
import { DisciplineBento } from "@/components/site/discipline-bento"
import { Page } from "@/components/site/page"
import { Section, SectionIntro } from "@/components/site/section"
import { discipline, picker } from "@/content/home"

export default function HomePage() {
  return (
    <Page>
      <Hero />
      <TrustStrip />

      <Section id="sectors">
        <SectionIntro eyebrow={picker.eyebrow} title={picker.title} layout="split" className="reveal">
          {picker.body}
        </SectionIntro>
        <div className="reveal mt-10">
          <SectorPicker />
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <SectionIntro eyebrow={discipline.eyebrow} title={discipline.title} className="reveal" />
        <div className="mt-10">
          <DisciplineBento />
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0" label="Customer story">
        <CustomerStory />
      </Section>

      <ServiceBand />
      <PricingFaq />
      <CtaBand />
    </Page>
  )
}
