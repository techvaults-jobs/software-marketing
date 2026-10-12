"use client"

import { useState, type Dispatch, type ReactNode } from "react"
import { ArrowRight, Check, Download, Minus, PackagePlus, Plus, Search, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DemoConfig, DemoItem } from "@/content/sectors"
import { attention, count, money, outWording, statusOf, total, type DemoAction, type DemoState, type Line, type Status } from "./demo-state"

export type Prefill = { itemId: string; from: number; to: number }

type ScreenProps = { config: DemoConfig; state: DemoState }

const field =
  "h-9 w-full rounded-md border border-line bg-white px-2.5 text-[13px] outline-none transition-colors hover:border-[#bdbdbd] focus-visible:border-ink"

function Heading({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
        {note ? <p className="mt-0.5 text-muted-foreground">{note}</p> : null}
      </div>
      {children}
    </div>
  )
}

function Panel({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-lg border border-line", className)}>
      <h4 className="border-b border-line px-3 py-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{title}</h4>
      {children}
    </section>
  )
}

function StatusTag({ status }: { status: Status }) {
  const label = status === "ok" ? "In stock" : status === "low" ? "Low" : "Out"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        status === "ok" && "border-line text-muted-foreground",
        status === "low" && "border-ink text-ink",
        status === "out" && "border-brand bg-brand text-white"
      )}
    >
      {label}
    </span>
  )
}

/* ------------------------------ Overview ------------------------------ */

export function OverviewScreen({ config, state, onTransfer }: ScreenProps & { onTransfer: (prefill: Prefill) => void }) {
  const wording = outWording(config)
  const sessionOut = total(state.sold)
  const week = [...config.week.slice(0, 6), config.week[6] + sessionOut]
  const peak = Math.max(...week, 1)
  const units = config.items.reduce((sum, item) => sum + total(state.stock[item.id]), 0)
  const value = config.items.reduce((sum, item) => sum + total(state.stock[item.id]) * item.cost, 0)
  const rows = attention(config, state)

  const tiles = [
    { label: wording.kpi, value: money(week[6]) },
    { label: "Stock value, at cost", value: money(Math.round(value)) },
    { label: "Units on hand", value: count(units) },
    { label: "Needs attention", value: count(rows.length), alert: rows.length > 0 },
  ]

  return (
    <div>
      <Heading title="Overview" note={`All ${config.locations.length} locations`} />
      <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-line lg:grid-cols-4">
        {tiles.map((tile, index) => (
          <div
            key={tile.label}
            className={cn("border-line p-3", index % 2 === 1 && "border-l", index > 1 && "border-t lg:border-t-0", index === 2 && "lg:border-l")}
          >
            <dt className="text-muted-foreground">{tile.label}</dt>
            <dd className="mt-1 flex items-center gap-2 text-[20px] font-semibold tracking-tight tabular-nums">
              {tile.value}
              {tile.alert ? <span className="size-1.5 rounded-full bg-brand" aria-hidden /> : null}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Panel title="Last 7 days" className="lg:col-span-3">
          <div className="flex h-36 items-end gap-2 px-3 pt-4 pb-2" role="img" aria-label={`${wording.kpi}: ${money(week[6])}. Seven day high ${money(peak)}.`}>
            {week.map((amount, index) => (
              <div key={index} className="flex h-full flex-1 flex-col justify-end gap-1.5">
                <div
                  className={cn("w-full rounded-sm transition-[height] duration-500 ease-out", index === 6 ? "bg-brand" : "bg-[#d4d4d4]")}
                  style={{ height: `${Math.max(3, (amount / peak) * 100)}%` }}
                />
                <span className="text-center font-mono text-[10px] text-muted-foreground">{index === 6 ? "Today" : `-${6 - index}d`}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Needs attention" className="lg:col-span-2">
          {rows.length ? (
            <ul className="divide-y divide-line">
              {rows.slice(0, 4).map((row) => (
                <li key={row.item.id} className="flex items-center gap-3 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{row.item.name}</p>
                    <p className="truncate text-muted-foreground">{row.note}</p>
                  </div>
                  {row.from !== undefined && row.to !== undefined ? (
                    <button
                      type="button"
                      onClick={() => onTransfer({ itemId: row.item.id, from: row.from!, to: row.to! })}
                      className="shrink-0 rounded-md border border-line px-2 py-1 font-medium transition-colors hover:border-ink"
                    >
                      Transfer
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-6 text-center text-muted-foreground">Every line is above its reorder point.</p>
          )}
        </Panel>
      </div>

      <Panel title="Recent activity" className="mt-4">
        <ul className="divide-y divide-line">
          {state.activity.slice(0, 5).map((entry) => (
            <li key={entry.id} className="flex items-center gap-3 px-3 py-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-line text-muted-foreground">
                {entry.kind === "sale" ? <Check className="size-3.5" /> : entry.kind === "receive" ? <PackagePlus className="size-3.5" /> : <Truck className="size-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{entry.text}</p>
                <p className="truncate text-muted-foreground">{entry.detail}</p>
              </div>
              <span className="shrink-0 text-muted-foreground">{entry.when}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

/* -------------------------------- Stock ------------------------------- */

export function StockScreen({ config, state, location }: ScreenProps & { location: number }) {
  const [query, setQuery] = useState("")
  const [onlyLow, setOnlyLow] = useState(false)
  const needle = query.trim().toLowerCase()
  const rows = config.items.filter((item) => {
    const haystack = [item.name, item.sku, ...Object.values(item.attrs)].join(" ").toLowerCase()
    if (needle && !haystack.includes(needle)) return false
    return !onlyLow || statusOf(item, state.stock[item.id]) !== "ok"
  })

  return (
    <div>
      <Heading title="Stock" note={`${config.items.length} lines across ${config.locations.length} locations`}>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search name, SKU or ${config.attrs[0].label.toLowerCase()}`}
              aria-label="Search stock"
              className={cn(field, "pl-8")}
            />
          </div>
          <button
            type="button"
            onClick={() => setOnlyLow((value) => !value)}
            aria-pressed={onlyLow}
            className={cn("h-9 shrink-0 rounded-md border px-3 font-medium transition-colors", onlyLow ? "border-ink bg-ink text-white" : "border-line hover:border-ink")}
          >
            Low or out
          </button>
        </div>
      </Heading>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-subtle font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-3 py-2 font-normal">Item</th>
              {config.attrs.map((attr) => (
                <th key={attr.key} className="px-3 py-2 font-normal">
                  {attr.label}
                </th>
              ))}
              {config.locations.map((name, index) => (
                <th key={name} className={cn("px-3 py-2 text-right font-normal", index === location && "text-ink")}>
                  {name}
                </th>
              ))}
              <th className="px-3 py-2 text-right font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-subtle">
                <td className="px-3 py-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{item.sku}</p>
                </td>
                {config.attrs.map((attr) => (
                  <td key={attr.key} className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                    {item.attrs[attr.key]}
                  </td>
                ))}
                {state.stock[item.id].map((level, index) => (
                  <td key={index} className={cn("px-3 py-2 text-right tabular-nums", index === location ? "font-semibold" : "text-muted-foreground", level === 0 && "text-[#b3b3b3]")}>
                    {count(level)}
                  </td>
                ))}
                <td className="px-3 py-2 text-right">
                  <StatusTag status={statusOf(item, state.stock[item.id])} />
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={config.attrs.length + config.locations.length + 2} className="px-3 py-10 text-center text-muted-foreground">
                  Nothing matches. Clear the search to see every line.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ----------------------------- Sell / issue --------------------------- */

const METHODS = ["Cash", "Card", "Bank transfer"]

export function OutScreen({ config, state, location, dispatch }: ScreenProps & { location: number; dispatch: Dispatch<DemoAction> }) {
  const wording = outWording(config)
  const selling = !config.out
  const [cart, setCart] = useState<Line[]>([])
  const [method, setMethod] = useState(METHODS[0])
  const [receipt, setReceipt] = useState<{ value: number; units: number; where: string } | null>(null)

  const byId = new Map<string, DemoItem>(config.items.map((item) => [item.id, item]))
  // The cart follows the shelf: a line can never ask for more than this location holds.
  const lines = cart
    .map((line) => ({ ...line, qty: Math.min(line.qty, state.stock[line.itemId][location]) }))
    .filter((line) => line.qty > 0)
  const value = lines.reduce((sum, line) => sum + line.qty * byId.get(line.itemId)!.price, 0)
  const units = lines.reduce((sum, line) => sum + line.qty, 0)

  function change(itemId: string, by: number) {
    setReceipt(null)
    setCart((current) => {
      const available = state.stock[itemId][location]
      const existing = current.find((line) => line.itemId === itemId)
      const qty = Math.max(0, Math.min(available, (existing?.qty ?? 0) + by))
      if (!existing) return qty ? [...current, { itemId, qty }] : current
      return current.map((line) => (line.itemId === itemId ? { ...line, qty } : line)).filter((line) => line.qty > 0)
    })
  }

  function complete() {
    if (!lines.length) return
    dispatch({ type: "sell", location, lines, method: selling ? method : wording.tab })
    setReceipt({ value, units, where: config.locations[location] })
    setCart([])
  }

  return (
    <div>
      <Heading title={wording.tab} note={`From ${config.locations[location]}. Change the ${config.locationNoun.toLowerCase()} in the top bar.`} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ul className="grid grid-cols-1 content-start gap-2 sm:grid-cols-2 lg:col-span-3">
          {config.items.map((item) => {
            const available = state.stock[item.id][location]
            const inCart = lines.find((line) => line.itemId === item.id)?.qty ?? 0
            return (
              <li key={item.id}>
                <button
                  type="button"
                  disabled={available - inCart <= 0}
                  onClick={() => change(item.id, 1)}
                  className="group flex w-full items-center gap-3 rounded-lg border border-line p-3 text-left transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-line"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="truncate text-muted-foreground">
                      {config.attrs.map((attr) => item.attrs[attr.key]).filter((text) => text && text !== "-").join(" · ") || item.sku}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-semibold tabular-nums">{money(item.price)}</p>
                    <p className={cn("tabular-nums", available === 0 ? "text-brand" : "text-muted-foreground")}>{available === 0 ? "None here" : `${count(available - inCart)} left`}</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <aside className="flex flex-col rounded-lg border border-line lg:col-span-2 lg:sticky lg:top-0 lg:self-start">
          <h4 className="border-b border-line px-3 py-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{selling ? "Receipt" : "This order"}</h4>
          {lines.length ? (
            <ul className="divide-y divide-line">
              {lines.map((line) => {
                const item = byId.get(line.itemId)!
                return (
                  <li key={line.itemId} className="flex items-center gap-2 px-3 py-2">
                    <p className="min-w-0 flex-1 truncate font-medium">{item.name}</p>
                    <div className="flex items-center rounded-md border border-line">
                      <button type="button" onClick={() => change(item.id, -1)} aria-label={`One fewer ${item.name}`} className="flex size-7 items-center justify-center hover:bg-subtle">
                        <Minus className="size-3" />
                      </button>
                      <span className="w-7 text-center tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => change(item.id, 1)}
                        disabled={line.qty >= state.stock[item.id][location]}
                        aria-label={`One more ${item.name}`}
                        className="flex size-7 items-center justify-center hover:bg-subtle disabled:opacity-30"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <span className="w-16 text-right tabular-nums">{money(item.price * line.qty)}</span>
                  </li>
                )
              })}
            </ul>
          ) : receipt ? (
            <div className="px-3 py-6 text-center">
              <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-ink text-white">
                <Check className="size-4" />
              </span>
              <p className="mt-3 font-medium">{wording.done}</p>
              <p className="mt-1 text-muted-foreground">
                {count(receipt.units)} {receipt.units === 1 ? config.unit : `${config.unit}s`} taken out of {receipt.where}, worth {money(receipt.value)}. Stock and reports are already updated.
              </p>
            </div>
          ) : (
            <p className="px-3 py-8 text-center text-muted-foreground">Tap an item to add it.</p>
          )}
          <div className="mt-auto space-y-3 border-t border-line p-3">
            {selling ? (
              <div className="flex gap-1 rounded-md bg-secondary p-1" role="radiogroup" aria-label="Payment method">
                {METHODS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={method === name}
                    onClick={() => setMethod(name)}
                    className={cn("h-7 flex-1 rounded px-1 font-medium transition-colors", method === name ? "bg-white shadow-[0_0_0_1px_var(--line)]" : "text-muted-foreground hover:text-ink")}
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-[18px] font-semibold tracking-tight tabular-nums">{money(value)}</span>
            </div>
            <button
              type="button"
              onClick={complete}
              disabled={!lines.length}
              className="flex h-10 w-full items-center justify-center rounded-md bg-ink font-medium text-white transition-colors hover:bg-[#2b2b2b] disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:text-[#9b9b9b]"
            >
              {wording.cta}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ------------------------------ Movements ----------------------------- */

export function MovesScreen({
  config,
  state,
  location,
  dispatch,
  prefill,
}: ScreenProps & { location: number; dispatch: Dispatch<DemoAction>; prefill: Prefill | null }) {
  const [mode, setMode] = useState<"transfer" | "receive">("transfer")
  const [itemId, setItemId] = useState(prefill?.itemId ?? config.items[0].id)
  const [from, setFrom] = useState(prefill?.from ?? config.locations.length - 1)
  const [to, setTo] = useState(prefill?.to ?? location)
  const [qty, setQty] = useState("5")

  const available = state.stock[itemId][from]
  const amount = Math.max(0, Math.floor(Number(qty) || 0))
  const problem =
    mode === "receive"
      ? amount < 1 ? "Enter how many arrived." : null
      : from === to
        ? "Choose two different locations."
        : amount < 1
          ? "Enter how many to move."
          : amount > available
            ? `Only ${count(available)} at ${config.locations[from]}.`
            : null

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (problem) return
    if (mode === "receive") dispatch({ type: "receive", location: to, itemId, qty: amount })
    else dispatch({ type: "transfer", from, to, itemId, qty: amount })
  }

  const moves = state.activity.filter((entry) => entry.kind !== "sale")

  return (
    <div>
      <Heading title="Movements" note="Bring stock in from a supplier, or move it between locations." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <form onSubmit={submit} className="space-y-3 rounded-lg border border-line p-3 lg:col-span-2">
          <div className="flex gap-1 rounded-md bg-secondary p-1">
            {(["transfer", "receive"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                aria-pressed={mode === value}
                className={cn("h-7 flex-1 rounded font-medium transition-colors", mode === value ? "bg-white shadow-[0_0_0_1px_var(--line)]" : "text-muted-foreground hover:text-ink")}
              >
                {value === "transfer" ? "Transfer" : "Receive"}
              </button>
            ))}
          </div>

          <label className="block space-y-1">
            <span className="text-muted-foreground">Item</span>
            <select value={itemId} onChange={(event) => setItemId(event.target.value)} className={field}>
              {config.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.sku})
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            {mode === "transfer" ? (
              <label className="block space-y-1">
                <span className="text-muted-foreground">From</span>
                <select value={from} onChange={(event) => setFrom(Number(event.target.value))} className={field}>
                  {config.locations.map((name, index) => (
                    <option key={name} value={index}>
                      {name} ({count(state.stock[itemId][index])})
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="space-y-1">
                <span className="text-muted-foreground">From</span>
                <p className={cn(field, "flex items-center bg-subtle text-muted-foreground")}>Supplier</p>
              </div>
            )}
            <ArrowRight className="mb-2.5 size-4 text-muted-foreground" aria-hidden />
            <label className="block space-y-1">
              <span className="text-muted-foreground">To</span>
              <select value={to} onChange={(event) => setTo(Number(event.target.value))} className={field}>
                {config.locations.map((name, index) => (
                  <option key={name} value={index}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-muted-foreground">Quantity</span>
            <input type="number" min={1} inputMode="numeric" value={qty} onChange={(event) => setQty(event.target.value)} className={cn(field, "tabular-nums")} />
          </label>

          <p className={cn("min-h-5", problem ? "text-brand" : "text-muted-foreground")} aria-live="polite">
            {problem ?? (mode === "transfer" ? `${count(available - amount)} will remain at ${config.locations[from]}.` : `${config.locations[to]} will hold ${count(state.stock[itemId][to] + amount)}.`)}
          </p>

          <button
            type="submit"
            disabled={Boolean(problem)}
            className="flex h-10 w-full items-center justify-center rounded-md bg-ink font-medium text-white transition-colors hover:bg-[#2b2b2b] disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:text-[#9b9b9b]"
          >
            {mode === "transfer" ? "Send transfer" : "Receive stock"}
          </button>
        </form>

        <Panel title="Movement log" className="lg:col-span-3">
          <ul className="divide-y divide-line">
            {moves.map((entry) => (
              <li key={entry.id} className="flex items-center gap-3 px-3 py-2">
                <span className="w-16 shrink-0 font-mono text-[11px] text-muted-foreground uppercase">{entry.kind === "receive" ? "Received" : "Transfer"}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{entry.text}</p>
                  <p className="truncate text-muted-foreground">{entry.detail}</p>
                </div>
                <span className="shrink-0 text-muted-foreground">{entry.when}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

/* ------------------------------- Reports ------------------------------ */

export function ReportsScreen({ config, state }: ScreenProps) {
  const wording = outWording(config)
  const perLocation = config.locations.map((name, index) => {
    const units = config.items.reduce((sum, item) => sum + state.stock[item.id][index], 0)
    const cost = config.items.reduce((sum, item) => sum + state.stock[item.id][index] * item.cost, 0)
    const retail = config.items.reduce((sum, item) => sum + state.stock[item.id][index] * item.price, 0)
    return { name, units, cost, retail, out: state.sold[index] }
  })
  const totals = perLocation.reduce(
    (sum, row) => ({ units: sum.units + row.units, cost: sum.cost + row.cost, retail: sum.retail + row.retail, out: sum.out + row.out }),
    { units: 0, cost: 0, retail: 0, out: 0 }
  )
  const movers = config.items
    .map((item) => ({ item, units: state.soldUnits[item.id] ?? 0 }))
    .filter((row) => row.units > 0)
    .sort((a, b) => b.units - a.units)

  function download() {
    const header = [config.locationNoun, "Units on hand", "Stock at cost", "Stock at selling price", `${wording.tab} this session`]
    const body = perLocation.map((row) => [row.name, row.units, row.cost.toFixed(2), row.retail.toFixed(2), row.out.toFixed(2)])
    const csv = [header, ...body].map((cells) => cells.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${config.business.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-stock-by-location.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Heading title="Reports" note="Figures follow every sale and movement you make in this demo.">
        <button type="button" onClick={download} className="flex h-9 items-center gap-2 rounded-md border border-line px-3 font-medium transition-colors hover:border-ink">
          <Download className="size-3.5" aria-hidden />
          Export CSV
        </button>
      </Heading>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[520px] text-left">
          <thead className="bg-subtle font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-3 py-2 font-normal">{config.locationNoun}</th>
              <th className="px-3 py-2 text-right font-normal">Units</th>
              <th className="px-3 py-2 text-right font-normal">At cost</th>
              <th className="px-3 py-2 text-right font-normal">At selling price</th>
              <th className="px-3 py-2 text-right font-normal">{wording.tab}, this session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line tabular-nums">
            {perLocation.map((row) => (
              <tr key={row.name}>
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="px-3 py-2 text-right">{count(row.units)}</td>
                <td className="px-3 py-2 text-right">{money(Math.round(row.cost))}</td>
                <td className="px-3 py-2 text-right">{money(Math.round(row.retail))}</td>
                <td className="px-3 py-2 text-right">{money(row.out)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-line bg-subtle font-semibold tabular-nums">
            <tr>
              <td className="px-3 py-2">Total</td>
              <td className="px-3 py-2 text-right">{count(totals.units)}</td>
              <td className="px-3 py-2 text-right">{money(Math.round(totals.cost))}</td>
              <td className="px-3 py-2 text-right">{money(Math.round(totals.retail))}</td>
              <td className="px-3 py-2 text-right">{money(totals.out)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <Panel title="Moved this session" className="mt-4">
        {movers.length ? (
          <ul className="divide-y divide-line">
            {movers.map((row) => (
              <li key={row.item.id} className="flex items-center gap-3 px-3 py-2">
                <p className="min-w-0 flex-1 truncate font-medium">{row.item.name}</p>
                <span className="tabular-nums text-muted-foreground">{count(row.units)} × {money(row.item.price)}</span>
                <span className="w-20 text-right font-semibold tabular-nums">{money(row.units * row.item.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3 py-6 text-center text-muted-foreground">
            Nothing yet. Use {wording.tab} to move some stock, then come back.
          </p>
        )}
      </Panel>
    </div>
  )
}
