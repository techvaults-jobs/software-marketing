"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ArrowLeftRight, BellRing, Check, PackageCheck, Pause, Play, ReceiptText, type LucideIcon } from "lucide-react"
import { count, money, total } from "@/components/demo/demo-state"
import { getSector, type DemoItem, type Sector } from "@/content/sectors"
import { cn } from "@/lib/utils"

const SCENE_MS = 4400

type SceneId = "receive" | "sell" | "move" | "reorder"

/**
 * Four stock movements, each played out in a different sector's demo data, so
 * the names and numbers here are the ones a visitor finds in the demo itself.
 */
const script: Array<{ id: SceneId; label: string; sector: string; item: string; at: number; to?: number; qty: number }> = [
  { id: "receive", label: "Receive", sector: "pharmacy", item: "m1", at: 2, qty: 120 },
  { id: "sell", label: "Sell", sector: "phones-electronics", item: "p1", at: 0, qty: 1 },
  { id: "move", label: "Move", sector: "building-materials", item: "b1", at: 0, to: 1, qty: 200 },
  { id: "reorder", label: "Reorder", sector: "fashion-retail", item: "a1", at: 0, qty: 1 },
]

type Scene = Omit<(typeof script)[number], "sector" | "item"> & { sector: Sector; item: DemoItem; summary: string }

const scenes: Scene[] = script.map((step) => {
  const sector = getSector(step.sector)
  const item = sector?.demo.items.find((candidate) => candidate.id === step.item)
  if (!sector || !item) throw new Error(`Hero film: no ${step.item} in ${step.sector}`)
  return { ...step, sector, item, summary: summarise(step.id, sector, item, step) }
})

function units(sector: Sector, qty: number) {
  return `${count(qty)} ${sector.demo.unit}${qty === 1 ? "" : "s"}`
}

function details(sector: Sector, item: DemoItem) {
  return sector.demo.attrs
    .filter((attr) => item.attrs[attr.key] && item.attrs[attr.key] !== "-")
    .map((attr) => `${attr.label} ${item.attrs[attr.key]}`)
    .join(" · ")
}

function summarise(id: SceneId, sector: Sector, item: DemoItem, step: { at: number; to?: number; qty: number }) {
  const place = sector.demo.locations[step.at]
  const amount = `${units(sector, step.qty)} of ${item.name}`
  if (id === "receive") return `${amount} received at ${place}. The count there goes from ${item.stock[step.at]} to ${item.stock[step.at] + step.qty}.`
  if (id === "sell") return `${amount} sold at ${place} for ${money(item.price)}. The count there goes from ${item.stock[step.at]} to ${item.stock[step.at] - step.qty}.`
  if (id === "move") return `${amount} sent from ${place} to ${sector.demo.locations[step.to ?? 0]}. It leaves one count when sent and joins the other when received.`
  return `${item.name} is down to ${total(item.stock)} against a reorder level of ${item.reorder}, so it goes on the reorder list.`
}

/** The banner animation: a short loop of stock being received, sold, moved and reordered. */
export function HeroFilm() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = root.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const scene = scenes[index]

  return (
    <figure ref={root} data-running={!paused && inView} className="film">
      <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_24px_48px_-32px_rgba(0,0,0,0.3)]">
        <div className="flex h-11 items-center justify-between gap-3 border-b border-line pr-2 pl-4">
          <p key={scene.id} className="film-in flex min-w-0 items-center gap-2 text-[13px]">
            <scene.sector.icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="truncate font-medium">{scene.sector.demo.business}</span>
            <span className="hidden shrink-0 text-steel min-[400px]:inline">{scene.sector.short}</span>
          </p>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play the animation" : "Pause the animation"}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-steel transition-colors hover:bg-secondary hover:text-ink motion-reduce:hidden"
          >
            {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
          </button>
        </div>

        <div key={scene.id} role="img" aria-label={scene.summary} className="flex h-[252px] flex-col gap-3 bg-mist p-4 text-[13px] sm:p-5">
          {scene.id === "receive" ? <Receive scene={scene} /> : null}
          {scene.id === "sell" ? <Sell scene={scene} /> : null}
          {scene.id === "move" ? <Move scene={scene} /> : null}
          {scene.id === "reorder" ? <Reorder scene={scene} /> : null}
        </div>

        <div className="grid grid-cols-4 border-t border-line">
          {scenes.map((step, position) => {
            const active = position === index
            return (
              <button
                key={step.id}
                type="button"
                aria-current={active ? "step" : undefined}
                onClick={() => setIndex(position)}
                className={cn(
                  "relative flex flex-col gap-0.5 border-line px-3 pt-3 pb-2.5 text-left transition-colors sm:px-4",
                  position > 0 && "border-l",
                  active ? "text-ink" : "text-steel hover:text-ink"
                )}
              >
                {active ? (
                  <span
                    key={step.id}
                    className="film-progress absolute inset-x-0 top-0 h-0.5 bg-ink"
                    style={{ animationDuration: `${SCENE_MS}ms` }}
                    onAnimationEnd={() => setIndex((position + 1) % scenes.length)}
                  />
                ) : null}
                <span className="font-mono text-[11px] text-steel">0{position + 1}</span>
                <span className="text-[13px] font-medium">{step.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      <figcaption className="mt-3 text-[13px] text-steel">Four stock movements, taken from four of the sector demos. The businesses are made up.</figcaption>
    </figure>
  )
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties

function Event({ icon: Icon, title, meta }: { icon: LucideIcon; title: string; meta: string }) {
  return (
    <div className="film-in flex items-center gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-paper">
        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight">{title}</span>
      <span className="shrink-0 font-mono text-[11px] text-steel uppercase">{meta}</span>
    </div>
  )
}

/** A value that rolls from what it was to what it is. */
function Tick({ from, to, at }: { from: ReactNode; to: ReactNode; at: number }) {
  return (
    <span className="tick">
      <span className="tick-reel" style={delay(at)}>
        <span>{from}</span>
        <span>{to}</span>
      </span>
    </span>
  )
}

type Count = { label: string; from: number; to: number; at: number; change?: string; alert?: boolean }

function Ledger({ rows }: { rows: Count[] }) {
  return (
    <ul className="film-in mt-auto divide-y divide-line rounded-lg border border-line bg-paper" style={delay(160)}>
      {rows.map((row) => (
        <li key={row.label} className="flex h-11 items-center gap-3 px-3.5">
          <span className="flex min-w-0 flex-1 items-center gap-2 text-steel">
            {row.alert ? <span className="pulse-dot size-1.5 shrink-0 rounded-full bg-vault-red" /> : null}
            <span className="truncate">{row.label}</span>
          </span>
          {row.change ? (
            <span className="film-in hidden shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[11px] whitespace-nowrap min-[440px]:inline" style={delay(row.at + 240)}>
              {row.change}
            </span>
          ) : null}
          <span className={cn("shrink-0 text-right text-[20px] font-semibold tracking-tight tabular-nums", row.alert && "text-vault-red")}>
            <Tick from={count(row.from)} to={count(row.to)} at={row.at} />
          </span>
        </li>
      ))}
    </ul>
  )
}

const bars = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1]

function Receive({ scene }: { scene: Scene }) {
  const { sector, item, at, qty } = scene
  const place = sector.demo.locations[at]
  return (
    <>
      <Event icon={PackageCheck} title="Delivery received" meta={place} />
      <div className="film-in flex flex-1 items-center gap-4 rounded-lg border border-line bg-paper px-3.5" style={delay(80)}>
        <div className="relative flex h-14 shrink-0 items-stretch gap-[3px]">
          {bars.map((width, position) => (
            <span key={position} className={cn("bg-ink", position > 12 && "hidden min-[440px]:block")} style={{ width }} />
          ))}
          <span className="film-scan absolute -inset-y-1.5 w-px bg-vault-red" style={delay(420)} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium">{item.name}</p>
          <p className="mt-0.5 truncate text-steel">{details(sector, item)}</p>
        </div>
      </div>
      <Ledger rows={[{ label: `On hand at ${place}`, from: item.stock[at], to: item.stock[at] + qty, at: 1400, change: `+${units(sector, qty)}` }]} />
    </>
  )
}

function Sell({ scene }: { scene: Scene }) {
  const { sector, item, at, qty } = scene
  const place = sector.demo.locations[at]
  return (
    <>
      <Event icon={ReceiptText} title="Sale completed" meta={place} />
      <div className="film-in rounded-lg border border-line bg-paper" style={delay(80)}>
        <div className="flex items-start justify-between gap-3 p-3.5">
          <div className="min-w-0">
            <p className="truncate font-medium">
              {qty} × {item.name}
            </p>
            <p className="mt-0.5 truncate text-steel">{details(sector, item)}</p>
          </div>
          <span className="shrink-0 font-medium tabular-nums">{money(item.price * qty)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-line px-3.5 py-2.5">
          <span className="text-steel">Receipt printed</span>
          <span className="film-in inline-flex items-center gap-1 rounded-full bg-ink py-0.5 pr-2.5 pl-2 text-[11px] font-medium text-paper" style={delay(760)}>
            <Check className="size-3" strokeWidth={2.5} aria-hidden />
            Paid
          </span>
        </div>
      </div>
      <Ledger rows={[{ label: `On hand at ${place}`, from: item.stock[at], to: item.stock[at] - qty, at: 1400, change: `−${units(sector, qty)}` }]} />
    </>
  )
}

function Move({ scene }: { scene: Scene }) {
  const { sector, item, at, qty } = scene
  const to = scene.to ?? 0
  const [origin, destination] = [sector.demo.locations[at], sector.demo.locations[to]]
  return (
    <>
      <Event icon={ArrowLeftRight} title={`${count(qty)} × ${item.name}`} meta="Transfer" />
      <div className="film-in flex flex-1 flex-col justify-center rounded-lg border border-line bg-paper px-3.5" style={delay(80)}>
        <div className="relative mx-1.5 h-px bg-line-strong">
          <span className="absolute top-1/2 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-paper" />
          <span className="absolute top-1/2 left-full size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-paper" />
          <span className="film-travel absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" style={delay(700)} />
        </div>
        <p className="mt-3 text-center text-steel">
          <Tick from="In transit. It belongs to neither." to={`Received at ${destination}`} at={1700} />
        </p>
      </div>
      <Ledger
        rows={[
          { label: origin, from: item.stock[at], to: item.stock[at] - qty, at: 600 },
          { label: destination, from: item.stock[to], to: item.stock[to] + qty, at: 1700 },
        ]}
      />
    </>
  )
}

function Reorder({ scene }: { scene: Scene }) {
  const { sector, item, qty } = scene
  const onHand = total(item.stock)
  // The reorder level sits at the middle of the gauge, so "below the line" reads at a glance.
  const scale = item.reorder * 2
  return (
    <>
      <Event icon={BellRing} title="Reorder level reached" meta={item.sku} />
      <div className="film-in rounded-lg border border-line bg-paper p-3.5" style={delay(80)}>
        <p className="truncate font-medium">{item.name}</p>
        <p className="mt-0.5 truncate text-steel">{details(sector, item)}</p>
        <div className="relative mt-5 h-1.5 rounded-full bg-secondary">
          <span
            className="film-drain block h-full rounded-full bg-ink"
            style={{ width: `${(onHand / scale) * 100}%`, "--from": (onHand + qty * 4) / onHand, ...delay(500) } as CSSProperties}
          />
          <span className="absolute -top-1.5 -bottom-1.5 left-1/2 w-px bg-ink" />
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-steel">REORDER AT {count(item.reorder)}</span>
        </div>
      </div>
      <Ledger rows={[{ label: "On hand, all locations", from: onHand + qty, to: onHand, at: 1100, change: "On the reorder list", alert: true }]} />
    </>
  )
}
