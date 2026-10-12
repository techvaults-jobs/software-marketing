import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { CtaBand } from "@/components/site/cta-band"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionIntro } from "@/components/site/section"
import { process, services } from "@/content/services"

export const metadata: Metadata = {
  title: "Services",
  description: "We build your system, deploy it, train every member of staff by role and maintain it for as long as you run it.",
}

export default function ServicesPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Services"
        title="Software is the easy part. Getting it used is the job."
        actions={
          <Link href="/contact" className="btn btn-primary">
            Start with a discovery call <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        We take responsibility for the whole thing: the build, the set-up, the training and the years after go-live. You deal with one team that knows your business.
      </PageHero>

      <Section tone="subtle">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.id} id={service.id} className="reveal scroll-mt-24 bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg border border-line">
                  <service.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="font-mono text-[12px] text-muted-foreground">0{index + 1}</span>
              </div>
              <h2 className="mt-7 text-[26px] font-semibold tracking-[-0.03em]">{service.name}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{service.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed">
                    <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="process">
        <SectionIntro eyebrow="How we work" title="Six steps, with you in the room for each." className="reveal">
          You see working software early and often. Nothing is a surprise on go-live day.
        </SectionIntro>
        <ol className="reveal mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step) => (
            <li key={step.step} className="border-t border-ink pt-5">
              <span className="font-mono text-[12px] text-brand">{step.step}</span>
              <h3 className="mt-3 text-[19px] font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="subtle">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionIntro eyebrow="Training" title="Taught by role, on your own screens." className="reveal">
            A cashier does not need the same training as an accountant. Each group learns the handful of screens they will use every day, on a practice copy loaded with sample stock.
          </SectionIntro>
          <ul className="reveal divide-y divide-line border-y border-line text-[15px]">
            {[
              ["Cashiers and sales staff", "Selling, part payments, returns, closing the till"],
              ["Storekeepers", "Receiving, transfers, counts, sending back to suppliers"],
              ["Managers", "Prices, approvals, daily reports, staff activity"],
              ["Accounts", "Supplier bills, customer balances, exports"],
              ["Owners", "Every location at a glance, margin and audit trail"],
            ].map(([role, covers]) => (
              <li key={role} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <span className="font-medium">{role}</span>
                <span className="text-muted-foreground">{covers}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand title="Tell us how your business runs." body="A discovery call takes about an hour. You leave with a clear picture of what we would build, how long it would take and what it would cost." />
    </Page>
  )
}
