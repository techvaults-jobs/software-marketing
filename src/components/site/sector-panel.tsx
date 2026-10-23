import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { isReady, type Sector } from "@/content/sectors"
import { nairaShort } from "@/lib/naira"
import { cn } from "@/lib/utils"

/** At or below this many on hand, a line shows in red. */
const LOW = 6

/**
 * What StockVaults keeps count of in one trade, beside a few lines of that
 * trade's demo stock. Used by the home page picker and each industry page.
 */
export function SectorPanel({ sector, className }: { sector: Sector; className?: string }) {
  const { demo, sample } = sector
  const ready = isReady(sector)
  const rows = sample.rows.flatMap((row) => {
    const item = demo.items.find((candidate) => candidate.id === row.id)
    if (!item) return []
    const onHand = item.stock[sample.location] ?? 0
    return [{ ...row, name: item.name, onHand, value: onHand * item.cost }]
  })

  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]", className)}>
      <div className="flex flex-col rounded-card bg-ink p-6 text-paper sm:p-8">
        <p className="font-mono text-[12px] tracking-[0.08em] text-on-dark-muted uppercase">For {sector.name.toLowerCase()}</p>
        <h3 className="mt-4 text-[22px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[24px]">{sector.blurb}</h3>
        <ul className="mt-6 space-y-2.5 text-[15px]">
          {sector.tracks.slice(0, 4).map((track) => (
            <li key={track} className="flex items-baseline gap-3">
              <span aria-hidden className="size-1 shrink-0 translate-y-[-3px] rounded-full bg-paper" />
              {track}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
          <Link href={`/demo/${sector.slug}`} transitionTypes={["nav-forward"]} className="btn btn-inverse">
            Open the {sector.short.toLowerCase()} {ready ? "demo" : "preview"}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <span className="text-[13px] text-on-dark-muted">{ready ? "Runs on StockVaults today" : "Built into your version on request"}</span>
        </div>
      </div>

      <div className="card min-w-0 overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-line bg-mist px-5 py-3.5 text-[13px]">
          <span className="truncate text-steel">
            {demo.business} · {demo.locations[sample.location]}
          </span>
          <span className="shrink-0 text-steel">sample data</span>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[14px]">
            <caption className="sr-only">
              Stock at {demo.locations[sample.location]}, {demo.business}. Lines with {LOW} or fewer on hand are marked low.
            </caption>
            <thead className="text-[12px] text-steel">
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 font-normal">Item</th>
                <th scope="col" className="px-3 py-3 font-normal">{sample.column}</th>
                <th scope="col" className="px-3 py-3 text-right font-normal">On hand</th>
                <th scope="col" className="px-5 py-3 text-right font-normal">Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const low = row.onHand <= LOW
                return (
                  <tr key={row.id} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-4 font-medium">{row.name}</th>
                    <td className="px-3 py-4 font-mono text-[13px] whitespace-nowrap text-steel">{row.detail}</td>
                    <td className={cn("px-3 py-4 text-right font-mono tabular-nums", low && "text-vault-red")}>
                      {row.onHand}
                      {low ? <span className="sr-only"> (low)</span> : null}
                    </td>
                    <td className="px-5 py-4 text-right font-mono tabular-nums">{nairaShort(row.value)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
