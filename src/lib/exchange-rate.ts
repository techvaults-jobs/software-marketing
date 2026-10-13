import "server-only"
import { cacheLife } from "next/cache"
import { pricing } from "@/content/pricing"

export type DollarRate = {
  /** Naira to one US dollar. */
  rate: number
  /** The day the source last published, e.g. "12 October 2026". */
  asOf: string
  /** False when both sources failed and the stored rate is being used. */
  live: boolean
}

type Source = { url: string; read: (body: unknown) => { rate: unknown; at: unknown } }

/* Both are free and need no key. The first asks for a credit, which the
   pricing page gives. The second is a fallback served from a CDN. */
const sources: Source[] = [
  {
    url: "https://open.er-api.com/v6/latest/USD",
    read: (body) => {
      const data = body as { rates?: { NGN?: unknown }; time_last_update_unix?: number }
      return { rate: data.rates?.NGN, at: data.time_last_update_unix ? data.time_last_update_unix * 1000 : undefined }
    },
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json",
    read: (body) => {
      const data = body as { date?: string; usd?: { ngn?: unknown } }
      return { rate: data.usd?.ngn, at: data.date }
    },
  },
]

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })

/** A rate outside this range is a broken response, not a market move. */
const plausible = (rate: unknown): rate is number => typeof rate === "number" && rate > 300 && rate < 20_000

async function ask(source: Source): Promise<DollarRate | null> {
  try {
    const response = await fetch(source.url, { signal: AbortSignal.timeout(6000) })
    if (!response.ok) return null
    const { rate, at } = source.read(await response.json())
    if (!plausible(rate)) return null
    const published = new Date((at as string | number | undefined) ?? Date.now())
    return { rate, asOf: day.format(Number.isNaN(published.getTime()) ? new Date() : published), live: true }
  } catch {
    return null
  }
}

/**
 * Today's naira rate for one US dollar, for showing naira prices in dollars.
 * Looked up a few times a day and shared by every visitor. If neither source
 * answers, the rate stored in the pricing content is used and tried again soon.
 */
export async function getDollarRate(): Promise<DollarRate> {
  "use cache"
  for (const source of sources) {
    const found = await ask(source)
    if (found) {
      cacheLife({ stale: 300, revalidate: 6 * 60 * 60, expire: 3 * 24 * 60 * 60 })
      return found
    }
  }
  cacheLife({ stale: 60, revalidate: 10 * 60, expire: 60 * 60 })
  return { rate: pricing.fallbackRate, asOf: pricing.fallbackRatedOn, live: false }
}
