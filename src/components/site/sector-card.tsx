import { ViewTransition } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Sector } from "@/content/sectors"

/**
 * A sector tile. The icon badge shares a transition name with the badge on
 * the sector's own page, so it travels there instead of blinking out.
 */
export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      href={`/industries/${sector.slug}`}
      transitionTypes={["nav-forward"]}
      className="group relative flex h-full flex-col bg-white p-6 transition-colors hover:bg-subtle sm:p-7"
    >
      <div className="flex items-start justify-between">
        <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
          <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-white">
            <sector.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
          </span>
        </ViewTransition>
        <ArrowUpRight
          className="size-4 text-[#b0b0b0] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          aria-hidden
        />
      </div>
      <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{sector.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{sector.blurb}</p>
    </Link>
  )
}

export function SectorGrid({ sectors }: { sectors: Sector[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {sectors.map((sector) => (
        <li key={sector.slug}>
          <SectorCard sector={sector} />
        </li>
      ))}
    </ul>
  )
}
