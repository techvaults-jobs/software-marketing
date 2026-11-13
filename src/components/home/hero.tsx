import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { abuTwins } from "@/content/customers"
import { hero, heroStats } from "@/content/home"
import { HeroDashboard } from "./hero-dashboard"

const step = (index: number) => ({ "--i": index }) as React.CSSProperties

/**
 * A full-width dark banner, as every TechVaults site opens: one statement,
 * two actions and the product beside them. The light dashboard is the
 * brightest thing on the page, so the eye lands on the product first.
 */
export function Hero() {
  return (
    <section className="overflow-x-clip bg-ink text-paper">
      <div className="frame pad flex flex-wrap items-center gap-x-16 gap-y-12 pt-12 pb-14 sm:pt-16 lg:pt-24 lg:pb-24">
        <div className="min-w-0 flex-[1_1_440px]">
          <p className="eyebrow rise text-paper">StockVaults by TechVaults</p>
          <h1 className="display rise mt-6 max-w-[15ch] [text-wrap:pretty]" style={step(1)}>
            {hero.title}
          </h1>
          <p className="rise mt-6 max-w-[46ch] text-[17px] leading-[1.55] text-on-dark-muted sm:text-[19px]" style={step(2)}>
            {hero.lead}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={step(3)}>
            <Link href="#sectors" className="btn btn-primary">
              {hero.primary}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-ghost-inverse">
              {hero.secondary}
            </Link>
          </div>
          <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-on-dark-muted" style={step(4)}>
            {hero.reassurance.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="size-4 text-paper" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rise min-w-0 flex-[1_1_440px] text-ink" style={step(3)}>
          <HeroDashboard />
        </div>
      </div>

      <div className="border-t border-paper/12">
        <dl className="frame grid grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat, index) => (
            <div key={stat.label} className={`border-paper/12 px-6 py-6 lg:py-8 ${index % 2 ? "border-l" : ""} ${index === 2 ? "border-t lg:border-t-0 lg:border-l" : ""}`}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[24px]">{stat.value}</p>
                <p className="mt-1 text-[13px] text-on-dark-muted sm:text-[14px]">{stat.label}</p>
              </dd>
            </div>
          ))}
          <div className="border-t border-l border-paper/12 lg:border-t-0">
            <dt className="sr-only">Customer</dt>
            <dd className="h-full">
              <Link href={abuTwins.href} transitionTypes={["nav-forward"]} className="nudge group flex h-full flex-col justify-center px-6 py-6 lg:py-8">
                <span className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[24px]">{abuTwins.name}</span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-on-dark-muted group-hover:text-paper sm:text-[14px]">
                  Uses it every day
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
