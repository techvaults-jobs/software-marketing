"use client"

import { useRef, type KeyboardEvent } from "react"
import { sectors } from "@/content/sectors"
import { cn } from "@/lib/utils"

/** The id of the tab and of the panel it controls, so both sides can point at each other. */
export const tabId = (prefix: string, slug: string) => `${prefix}-tab-${slug}`
export const panelId = (prefix: string) => `${prefix}-panel`

/**
 * One pill per sector, following the ARIA tabs pattern: arrow keys move
 * between tabs and select as they go, Home and End jump to either end, and
 * only the selected tab sits in the Tab order.
 */
export function SectorTabs({
  value,
  onChange,
  idPrefix,
  label = "Choose a sector",
  className,
}: {
  value: string
  onChange: (slug: string) => void
  idPrefix: string
  label?: string
  className?: string
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = sectors.length - 1
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % sectors.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + sectors.length) % sectors.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    onChange(sectors[next].slug)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {sectors.map((sector, index) => {
        const selected = sector.slug === value
        return (
          <button
            key={sector.slug}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, sector.slug)}
            aria-selected={selected}
            aria-controls={panelId(idPrefix)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(sector.slug)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150",
              selected ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper text-ink hover:border-ink"
            )}
          >
            <sector.icon className="size-4" strokeWidth={1.75} aria-hidden />
            {sector.tab}
          </button>
        )
      })}
    </div>
  )
}
