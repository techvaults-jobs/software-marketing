import type { Metadata } from "next"
import { Check } from "lucide-react"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionIntro } from "@/components/site/section"
import { CurrencyProvider, CurrencyToggle } from "@/components/pricing/currency"
import { OwnOrRent } from "@/components/pricing/own-or-rent"
import { Packages } from "@/components/pricing/packages"
import { included, notIncluded, ownership } from "@/content/pricing"
import { getDollarRate } from "@/lib/exchange-rate"

export const metadata: Metadata = {
  title: "Pricing",
  description: "StockVaults is paid for once and yours to keep. Standard prices by number of locations, in naira and US dollars, with the first year of care included.",
}

export default async function PricingPage() {
  const dollar = await getDollarRate()
  return (
    <Page>
      <CurrencyProvider rate={dollar.rate}>
        <PageHero eyebrow="Pricing" title="Pay once. It is yours to keep." actions={<CurrencyToggle />}>
          StockVaults is not a subscription. You pay for the system once and it stays yours, with no monthly licence. The first year of hosting, support and updates is in the price.
        </PageHero>

        <Section tone="subtle">
          <Packages />
          <p className="reveal mt-6 max-w-[90ch] text-sm leading-relaxed text-steel">
            Prices are charged in naira. Dollar figures are the same price at ₦{Math.round(dollar.rate).toLocaleString("en-US")} to the dollar, the rate on {dollar.asOf}, and move with it.{" "}
            {dollar.live ? (
              <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer" className="link">
                Rates by Exchange Rate API
              </a>
            ) : null}
            {dollar.live ? ". " : null}
            {notIncluded}
          </p>
        </Section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionIntro eyebrow="In every package" title="What the price covers." className="reveal">
              The same six things, whether you run one shop or twenty.
            </SectionIntro>
            <ol className="reveal reveal-children grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {included.map((entry, index) => (
                <li key={entry.title} className="border-t border-line pt-5">
                  <span className="font-mono text-[12px] text-steel">0{index + 1}</span>
                  <h3 className="mt-2 text-[17px] font-semibold tracking-tight">{entry.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-steel">{entry.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section tone="subtle">
          <SectionIntro eyebrow="Own or rent" title="Work it out with your own numbers." className="reveal">
            Put in what a subscription would cost you each month. We add up both sides, including our care plan after the first year.
          </SectionIntro>
          <div className="mt-12">
            <OwnOrRent />
          </div>
        </Section>

        <Section>
          <SectionIntro eyebrow="What owning means" title="Three things you can hold us to." className="reveal" />
          <ul className="reveal reveal-children mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {ownership.map((entry) => (
              <li key={entry.title} className="bg-paper p-6 sm:p-8">
                <Check className="size-5 text-vault-red" aria-hidden />
                <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{entry.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-steel">{entry.body}</p>
              </li>
            ))}
          </ul>
        </Section>
      </CurrencyProvider>

      <CtaBand title="Not sure which one you are?" body="Tell us how many locations you run and how stock moves between them. We will tell you which package fits and put the price in writing." />
    </Page>
  )
}
