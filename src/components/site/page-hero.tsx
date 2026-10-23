import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Eyebrow } from "./section"

/** The top of an inner page: optional way back, heading, lede, actions. */
export function PageHero({
  eyebrow,
  title,
  children,
  back,
  actions,
  lead,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  back?: { href: string; label: string }
  actions?: ReactNode
  /** Sits above the heading, e.g. a sector's icon badge. */
  lead?: ReactNode
}) {
  return (
    <section>
      <div className="frame pad pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-20">
        {back ? (
          <Link
            href={back.href}
            transitionTypes={["nav-back"]}
            className="mb-10 inline-flex min-h-11 items-center gap-1.5 text-sm text-steel transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {back.label}
          </Link>
        ) : null}
        {lead ? <div className="rise mb-6">{lead}</div> : null}
        {eyebrow ? <Eyebrow className="rise mb-5">{eyebrow}</Eyebrow> : null}
        <h1 className="display rise max-w-[18ch]" style={{ "--i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        {children ? (
          <div className="lede rise mt-6 max-w-[60ch]" style={{ "--i": 2 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
        {actions ? (
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  )
}
