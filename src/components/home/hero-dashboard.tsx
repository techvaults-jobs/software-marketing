import { attention, count, initialState, total } from "@/components/demo/demo-state"
import { StatCell } from "@/components/site/stat-cell"
import { hero } from "@/content/home"
import { getSector } from "@/content/sectors"
import { nairaShort } from "@/lib/naira"
import { cn } from "@/lib/utils"

const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Today"]

/**
 * The opening screen of the phones demo, drawn from the same data, so every
 * figure here is one a visitor finds again when they open the demo.
 */
export function HeroDashboard() {
  const sector = getSector(hero.sector)
  if (!sector) return null
  const { demo } = sector
  const state = initialState(demo)
  const alerts = attention(demo, state)
  const units = demo.items.reduce((sum, item) => sum + total(item.stock), 0)
  const value = demo.items.reduce((sum, item) => sum + total(item.stock) * item.cost, 0)
  const peak = Math.max(...demo.week)
  const alert = alerts.find((row) => row.from !== undefined && row.to !== undefined)
  const from = alert?.from ?? 0
  const to = alert?.to ?? 1

  return (
    <figure className="relative" aria-label={`Sample dashboard for ${demo.business}, a made-up phone shop`}>
      <div className="rounded-[22px] border border-line bg-mist p-2.5 shadow-float sm:p-3">
        <div className="overflow-hidden rounded-[16px] border border-line bg-paper">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
            <p className="flex items-center gap-2.5 text-[14px]">
              <span aria-hidden className="flex size-6 items-center justify-center rounded-md bg-ink font-mono text-[11px] text-paper">
                {demo.business[0]}
              </span>
              <span className="font-semibold">{demo.business}</span>
              <span className="text-[12px] text-steel">sample data</span>
            </p>
            <ul className="flex gap-1.5 text-[12px]" aria-label="Locations">
              {["All shops", demo.locations[0], demo.locations[1]].map((place, index) => (
                <li key={place} className={cn("rounded-full px-2.5 py-1", index === 0 ? "bg-ink text-paper" : "border border-line text-steel")}>
                  {place}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { label: "Sales today", value: nairaShort(demo.week[6]), note: "so far today" },
              { label: "Stock value at cost", value: nairaShort(value), note: `${demo.locations.length} locations` },
              { label: "Units on hand", value: count(units), note: "all counted" },
              { label: "Needs attention", value: String(alerts.length), note: "low stock", alert: true },
            ].map((tile, index) => (
              <div key={tile.label} className={cn("border-line px-4 py-4", index % 2 && "border-l", index > 1 && "border-t sm:border-t-0", index === 2 && "sm:border-l")}>
                <dt className="sr-only">{tile.label}</dt>
                <dd>
                  <StatCell label={tile.label} value={tile.value} note={tile.note} alert={tile.alert} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-line px-4 pt-4 pb-3">
            <p className="text-[12px] text-steel">Sales, last 7 days</p>
            <ul className="mt-3 flex h-24 items-end gap-2 sm:h-28" aria-label="Sales for each of the last seven days">
              {demo.week.map((sales, index) => (
                <li key={days[index]} className="flex h-full flex-1 flex-col justify-end">
                  <span
                    className={cn("block rounded-t-[4px]", index === days.length - 1 ? "bg-vault-red" : "bg-line")}
                    style={{ height: `${Math.round((sales / peak) * 100)}%` }}
                  />
                  <span className="sr-only">
                    {days[index]}: {nairaShort(sales)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {alert ? (
        <div
          className="float-in relative mx-4 -mt-6 rounded-[14px] border border-line bg-paper p-3.5 text-[13px] shadow-float sm:absolute sm:bottom-8 sm:-left-6 sm:mx-0 sm:mt-0 sm:w-[260px]"
          style={{ "--d": "360ms" } as React.CSSProperties}
        >
          <p className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="size-2 rounded-full bg-vault-red" />
            Low stock at {demo.locations[to]}
          </p>
          <p className="mt-1 text-steel">
            {alert.item.name} · {state.stock[alert.item.id][to]} left · {state.stock[alert.item.id][from]} at {demo.locations[from]}
          </p>
          <p className="mt-1.5 font-medium text-vault-red">Transfer from {demo.locations[from]}</p>
        </div>
      ) : null}

      <div
        className="float-in absolute -top-14 right-3 hidden rounded-[12px] bg-ink px-3.5 py-2.5 text-paper shadow-float sm:block lg:-right-4"
        style={{ "--d": "460ms" } as React.CSSProperties}
      >
        <p className="font-mono text-[12px]">IMEI {hero.received.imei} received</p>
        <p className="mt-0.5 text-[11px] text-on-dark-muted">
          by {hero.received.by} · {hero.received.at}
        </p>
      </div>
    </figure>
  )
}
