import type { DemoConfig, DemoItem } from "@/content/sectors"
import { naira } from "@/lib/naira"

export type Line = { itemId: string; qty: number }

export type Activity = {
  id: number
  kind: "sale" | "receive" | "transfer"
  text: string
  detail: string
  when: string
}

export type DemoState = {
  /** Units on hand per item, one number per location. */
  stock: Record<string, number[]>
  /** Value sent out per location during this session. */
  sold: number[]
  /** Units sent out per item during this session. */
  soldUnits: Record<string, number>
  activity: Activity[]
  seq: number
}

export type DemoAction =
  | { type: "sell"; location: number; lines: Line[]; method: string }
  | { type: "receive"; location: number; itemId: string; qty: number }
  | { type: "transfer"; from: number; to: number; itemId: string; qty: number }
  | { type: "reset" }

const SALE_WORDING = { tab: "Sell", cta: "Complete sale", kpi: "Sales today", done: "Sale completed" }

/** "Sell" for a shop; "Dispatch" or "Issue" where nothing is sold over a counter. */
export function outWording(config: DemoConfig) {
  return config.out ?? SALE_WORDING
}

export const money = naira

export const count = (value: number) => value.toLocaleString("en-NG")

export const total = (levels: number[]) => levels.reduce((sum, level) => sum + level, 0)

/** A plausible morning of activity, so the first screen is not empty. */
function openingActivity(config: DemoConfig): Activity[] {
  const [first, second, third] = config.items
  const [front, , back] = config.locations
  return [
    { id: 3, kind: "sale", text: `2 × ${first.name}`, detail: `${front} · ${money(first.price * 2)}`, when: "12 min ago" },
    { id: 2, kind: "transfer", text: `10 × ${second.name}`, detail: `${back} → ${front}`, when: "1 hr ago" },
    { id: 1, kind: "receive", text: `40 × ${third.name}`, detail: `Received at ${back}`, when: "Yesterday" },
  ]
}

export function initialState(config: DemoConfig): DemoState {
  return {
    stock: Object.fromEntries(config.items.map((item) => [item.id, [...item.stock]])),
    sold: config.locations.map(() => 0),
    soldUnits: {},
    activity: openingActivity(config),
    seq: 3,
  }
}

export function reducer(config: DemoConfig) {
  const byId = new Map<string, DemoItem>(config.items.map((item) => [item.id, item]))

  return (state: DemoState, action: DemoAction): DemoState => {
    if (action.type === "reset") return initialState(config)

    const stock = { ...state.stock }
    const seq = state.seq + 1
    const log = (entry: Omit<Activity, "id" | "when">) => [{ ...entry, id: seq, when: "Just now" }, ...state.activity].slice(0, 12)

    if (action.type === "sell") {
      const soldUnits = { ...state.soldUnits }
      let value = 0
      let units = 0
      for (const line of action.lines) {
        const item = byId.get(line.itemId)
        if (!item) continue
        const levels = [...stock[item.id]]
        const qty = Math.min(line.qty, levels[action.location])
        levels[action.location] -= qty
        stock[item.id] = levels
        soldUnits[item.id] = (soldUnits[item.id] ?? 0) + qty
        value += qty * item.price
        units += qty
      }
      if (!units) return state
      const sold = state.sold.map((amount, index) => (index === action.location ? amount + value : amount))
      const firstItem = byId.get(action.lines[0].itemId)
      const text = action.lines.length === 1 && firstItem ? `${units} × ${firstItem.name}` : `${units} items on one receipt`
      return {
        stock,
        sold,
        soldUnits,
        seq,
        activity: log({ kind: "sale", text, detail: `${config.locations[action.location]} · ${money(value)} · ${action.method}` }),
      }
    }

    const item = byId.get(action.itemId)
    if (!item || action.qty <= 0) return state

    if (action.type === "receive") {
      const levels = [...stock[item.id]]
      levels[action.location] += action.qty
      stock[item.id] = levels
      return {
        ...state,
        stock,
        seq,
        activity: log({ kind: "receive", text: `${action.qty} × ${item.name}`, detail: `Received at ${config.locations[action.location]}` }),
      }
    }

    const levels = [...stock[item.id]]
    const qty = Math.min(action.qty, levels[action.from])
    if (!qty || action.from === action.to) return state
    levels[action.from] -= qty
    levels[action.to] += qty
    stock[item.id] = levels
    return {
      ...state,
      stock,
      seq,
      activity: log({ kind: "transfer", text: `${qty} × ${item.name}`, detail: `${config.locations[action.from]} → ${config.locations[action.to]}` }),
    }
  }
}

export type Status = "ok" | "low" | "out"

/** Low means at or under the reorder point across the whole business. */
export function statusOf(item: DemoItem, levels: number[]): Status {
  const onHand = total(levels)
  if (onHand === 0) return "out"
  if (item.reorder > 0 && onHand <= item.reorder) return "low"
  return "ok"
}

export type Attention = { item: DemoItem; note: string; from?: number; to?: number }

/**
 * What a manager should look at first: lines at or under their reorder point,
 * and, where every location stocks everything, a location that has run out
 * while another still holds some.
 */
export function attention(config: DemoConfig, state: DemoState): Attention[] {
  const rows: Attention[] = []
  for (const item of config.items) {
    const levels = state.stock[item.id]
    const status = statusOf(item, levels)
    if (status === "out") {
      rows.push({ item, note: "Out of stock everywhere" })
      continue
    }
    if (!config.zoned) {
      const empty = levels.findIndex((level) => level === 0)
      if (empty >= 0) {
        const source = levels.indexOf(Math.max(...levels))
        rows.push({ item, note: `None at ${config.locations[empty]}, ${count(levels[source])} at ${config.locations[source]}`, from: source, to: empty })
        continue
      }
    }
    if (status === "low") rows.push({ item, note: `${count(total(levels))} left, reorder at ${count(item.reorder)}` })
  }
  return rows
}
