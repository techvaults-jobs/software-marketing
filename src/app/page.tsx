import { CustomerStory } from "@/components/home/customer-story"
import { Hero } from "@/components/home/hero"
import { PricingFaq } from "@/components/home/pricing-faq"
import { ProcessBand } from "@/components/home/process-band"
import { ProductAd } from "@/components/home/product-ad"
import { SectorPicker } from "@/components/home/sector-picker"
import { ServicesGrid } from "@/components/home/services-grid"
import { CtaBand } from "@/components/site/cta-band"
import { DisciplineBento } from "@/components/site/discipline-bento"
import { Page } from "@/components/site/page"
import { Section, SectionIntro } from "@/components/site/section"
import { discipline, picker } from "@/content/home"

export default function HomePage() {
  return (
    <Page>
      <Hero />

      <Section id="sectors">
        <SectionIntro eyebrow={picker.eyebrow} title={picker.title} layout="split" className="reveal">
          {picker.body}
        </SectionIntro>
        <div className="reveal mt-10">
          <SectorPicker />
        </div>
      </Section>

      <ProductAd />

      <Section>
        <SectionIntro eyebrow={discipline.eyebrow} title={discipline.title} className="reveal" />
        <div className="mt-10">
          <DisciplineBento />
        </div>
      </Section>

      <ServicesGrid />
      <ProcessBand />

      <Section label="Customer story">
        <CustomerStory />
      </Section>

      <PricingFaq />
      <CtaBand />
    </Page>
  )
}
