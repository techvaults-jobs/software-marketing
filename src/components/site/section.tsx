import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** A band of the page. Mist and dark bands break up the long white scroll. */
export function Section({
  children,
  className,
  tone = "light",
  id,
  label,
}: {
  children: ReactNode
  className?: string
  tone?: "light" | "mist" | "dark"
  id?: string
  /** Names the band for screen readers when it has no heading of its own. */
  label?: string
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "overflow-x-clip",
        tone === "mist" && "border-y border-line bg-mist",
        tone === "dark" && "bg-ink text-paper"
      )}
    >
      <div className={cn("frame pad py-16 lg:py-26", className)}>{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>
}

/**
 * Eyebrow, heading and a short paragraph. `split` puts the paragraph in its
 * own column on wide screens, as the sector and service bands do.
 */
export function SectionIntro({
  eyebrow,
  title,
  children,
  className,
  layout = "stack",
  as: Tag = "h2",
  dark = false,
}: {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  className?: string
  layout?: "stack" | "split"
  as?: "h1" | "h2"
  dark?: boolean
}) {
  const body = children ? (
    <p className={cn(layout === "split" ? "max-w-[40ch] text-[17px] leading-[1.5] sm:text-[18px]" : "lede mt-5", dark ? "text-on-dark-muted" : "text-body-muted")}>{children}</p>
  ) : null

  if (layout === "split") {
    return (
      <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16", className)}>
        <div className="max-w-[720px]">
          {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
          <Tag className={Tag === "h1" ? "display" : "title"}>{title}</Tag>
        </div>
        {body}
      </div>
    )
  }

  return (
    <div className={cn("max-w-[720px]", className)}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag className={Tag === "h1" ? "display" : "title"}>{title}</Tag>
      {body}
    </div>
  )
}
