import { ViewTransition } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { isReady, type Sector } from "@/content/sectors"
import { cn } from "@/lib/utils"

/**
 * Says plainly whether a sector runs on StockVaults today or is built for the
 * customer, so no page lets a preview pass for shipped software.
 */
export function AvailabilityBadge({ sector, className }: { sector: Sector; className?: string }) {
  const ready = isReady(sector)
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium whitespace-nowrap",
        ready ? "bg-ink text-paper" : "border border-line bg-paper text-steel",
        className
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", ready ? "bg-vault-red" : "bg-faint")} />
      {ready ? "Ready today" : "Built on request"}
    </span>
  )
}

/**
 * A sector tile. The icon badge shares a transition name with the badge on
 * the sector's own page, so it travels there instead of blinking out.
 */
export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      href={`/industries/${sector.slug}`}
      transitionTypes={["nav-forward"]}
      className="card-line group flex h-full flex-col bg-paper p-6 transition-colors hover:bg-mist sm:p-7"
    >
      <div className="flex items-start justify-between">
        <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
          <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-paper transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <sector.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
          </span>
        </ViewTransition>
        <ArrowUpRight
          className="size-4 text-faint transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-vault-red"
          aria-hidden
        />
      </div>
      <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{sector.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-steel">{sector.blurb}</p>
      <div className="mt-auto pt-5">
        <AvailabilityBadge sector={sector} />
      </div>
    </Link>
  )
}

export function SectorGrid({ sectors }: { sectors: Sector[] }) {
  return (
    <ul className="reveal reveal-children grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {sectors.map((sector) => (
        <li key={sector.slug}>
          <SectorCard sector={sector} />
        </li>
      ))}
    </ul>
  )
}
