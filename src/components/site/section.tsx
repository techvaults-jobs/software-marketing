import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** A band of the page: a hairline on top, content inside the framed column. */
export function Section({
  children,
  className,
  tone = "light",
  id,
}: {
  children: ReactNode
  className?: string
  tone?: "light" | "subtle" | "dark"
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        // The crosses sit 4px outside the frame, which at laptop widths is the page edge.
        "overflow-x-clip border-t",
        tone === "dark" ? "border-paper/10 bg-ink text-paper" : "border-line",
        tone === "subtle" && "bg-mist"
      )}
    >
      <div className={cn("frame relative", tone === "dark" && "frame-dark")}>
        <Cross className="-top-[5px] -left-[5px]" dark={tone === "dark"} />
        <Cross className="-top-[5px] -right-[5px]" dark={tone === "dark"} />
        <div className={cn("pad py-16 sm:py-24", className)}>{children}</div>
      </div>
    </section>
  )
}

/** The small plus where a section line meets the frame. Desktop only. */
function Cross({ className, dark }: { className: string; dark?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 9 9"
      className={cn("pointer-events-none absolute z-10 hidden size-[9px] lg:block", dark ? "text-paper/40" : "text-faint", className)}
    >
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function SectionIntro({
  eyebrow,
  title,
  children,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  className?: string
  as?: "h1" | "h2"
}) {
  return (
    <div className={cn("max-w-[720px]", className)}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag className={Tag === "h1" ? "display" : "title"}>{title}</Tag>
      {children ? <p className="lede mt-5">{children}</p> : null}
    </div>
  )
}
