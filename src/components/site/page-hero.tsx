import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
    <section className="relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[360px]" aria-hidden />
      <div className="frame relative">
        <div className="pad pt-12 pb-14 sm:pt-16 sm:pb-20">
          {back ? (
            <Link
              href={back.href}
              transitionTypes={["nav-back"]}
              className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {back.label}
            </Link>
          ) : null}
          {lead ? <div className="rise mb-6">{lead}</div> : null}
          {eyebrow ? <p className="eyebrow rise mb-4">{eyebrow}</p> : null}
          <h1 className="display rise max-w-[18ch]" style={{ "--i": 1 } as React.CSSProperties}>
            {title}
          </h1>
          {children ? (
            <p className="lede rise mt-6 max-w-[60ch]" style={{ "--i": 2 } as React.CSSProperties}>
              {children}
            </p>
          ) : null}
          {actions ? (
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
