import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { hero } from "@/content/home"
import { HeroDashboard } from "./hero-dashboard"

const step = (index: number) => ({ "--i": index }) as React.CSSProperties

/** One message beside one product tile. On a phone the tile sits under the buttons. */
export function Hero() {
  return (
    <section>
      <div className="frame pad flex flex-wrap items-center gap-x-16 gap-y-10 pt-8 pb-16 sm:pt-16 lg:pt-20 lg:pb-26">
        <div className="min-w-0 flex-[1_1_440px]">
          <p className="rise mb-5 inline-flex items-center gap-2 rounded-full border border-line py-1 pr-3.5 pl-1 text-[13px] sm:mb-7">
            <span className="rounded-full bg-ink px-2 py-0.5 font-medium text-paper">New</span>
            <span className="text-steel">{hero.badge}</span>
          </p>
          <h1 className="display rise max-w-[15ch] [text-wrap:pretty]" style={step(1)}>
            {hero.title}
          </h1>
          <p className="rise mt-5 max-w-[46ch] text-[17px] leading-[1.5] text-body-muted sm:mt-6 sm:text-[19px]" style={step(2)}>
            {hero.lead}
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3" style={step(3)}>
            <Link href="#sectors" className="btn btn-primary">
              {hero.primary}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              {hero.secondary}
            </Link>
          </div>
          <Reassurance className="rise mt-6 hidden sm:flex" style={step(4)} />
        </div>
        <div className="rise min-w-0 flex-[1_1_440px]" style={step(3)}>
          <HeroDashboard />
        </div>
        <Reassurance className="flex basis-full sm:hidden" />
      </div>
    </section>
  )
}

/** Three short promises, slash-separated. Under the buttons on wide screens, under the dashboard on a phone. */
function Reassurance({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <ul className={`flex-wrap gap-y-1 text-[13px] text-steel ${className}`} style={style}>
      {hero.reassurance.map((point, index) => (
        <li key={point} className="whitespace-nowrap">
          {index > 0 ? (
            <span aria-hidden className="px-2.5 text-faint">
              /
            </span>
          ) : null}
          {point}
        </li>
      ))}
    </ul>
  )
}
