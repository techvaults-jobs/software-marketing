"use client"

import { useId, useState } from "react"
import { packages } from "@/content/pricing"
import { formatMoney, toDollars, useCurrency } from "./currency"

const priced = packages.filter((plan) => plan.care)

/** Only a starting point for the box. The visitor is asked to replace it with their own quote. */
const STARTING_MONTHLY = 120_000

/**
 * The visitor puts in what a subscription costs them and for how long. We add
 * up both sides, care plan included, so the comparison is theirs and not ours.
 */
export function OwnOrRent() {
  const { currency, rate } = useCurrency()
  const [planId, setPlanId] = useState(priced[0].id)
  const [monthly, setMonthly] = useState(() => ({ ngn: STARTING_MONTHLY, usd: toDollars(STARTING_MONTHLY, rate) }))
  const [years, setYears] = useState(5)
  const ids = { plan: useId(), monthly: useId(), years: useId() }

  const plan = priced.find((candidate) => candidate.id === planId) ?? priced[0]
  const rent = monthly[currency] * 12 * years
  const inCurrency = (naira: number) => (currency === "ngn" ? naira : toDollars(naira, rate))
  const own = inCurrency(plan.price) + inCurrency(plan.care ?? 0) * (years - 1)
  const widest = Math.max(rent, own, 1)
  const gap = rent - own
  const symbol = currency === "ngn" ? "₦" : "$"

  return (
    <div className="reveal grid overflow-hidden rounded-xl border border-line bg-paper lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <div className="space-y-6 border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
        <div>
          <label htmlFor={ids.plan} className="text-sm font-medium">
            StockVaults package
          </label>
          <select id={ids.plan} value={planId} onChange={(event) => setPlanId(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-input bg-paper px-3 text-[15px]">
            {priced.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={ids.monthly} className="text-sm font-medium">
            A subscription would cost you, each month
          </label>
          <div className="mt-2 flex h-11 items-center rounded-lg border border-input bg-paper px-3 focus-within:border-ink">
            <span className="text-steel">{symbol}</span>
            <input
              id={ids.monthly}
              inputMode="numeric"
              value={monthly[currency].toLocaleString("en-US")}
              onChange={(event) => {
                const value = Number(event.target.value.replace(/\D/g, "").slice(0, 9))
                setMonthly((current) => ({ ...current, [currency]: value }))
              }}
              className="h-full w-full bg-transparent pl-1.5 text-[15px] tabular-nums outline-none"
            />
          </div>
          <p className="mt-2 text-[13px] text-steel">Use a quote you have been given, across all your branches and users.</p>
        </div>
        <div>
          <label htmlFor={ids.years} className="flex items-center justify-between text-sm font-medium">
            <span>For how long</span>
            <span className="tabular-nums">
              {years} {years === 1 ? "year" : "years"}
            </span>
          </label>
          <input id={ids.years} type="range" min={1} max={10} value={years} onChange={(event) => setYears(Number(event.target.value))} className="mt-3 w-full accent-ink" />
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8" aria-live="polite">
        <dl className="space-y-6">
          {[
            { label: "Renting", detail: `${formatMoney(monthly[currency], currency)} a month for ${years * 12} months`, total: rent, ours: false },
            { label: "Owning StockVaults", detail: years > 1 ? `One payment, then ${years - 1} ${years === 2 ? "year" : "years"} of care` : "One payment, first year of care included", total: own, ours: true },
          ].map((side) => (
            <div key={side.label}>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[15px] font-medium">{side.label}</dt>
                <dd className="text-[22px] font-semibold tracking-tight tabular-nums">{formatMoney(side.total, currency)}</dd>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className={side.ours ? "h-full rounded-full bg-ink" : "h-full rounded-full bg-faint"} style={{ width: `${(side.total / widest) * 100}%`, transition: "width 320ms var(--ease-out)" }} />
              </div>
              <p className="mt-2 text-sm text-steel">{side.detail}</p>
            </div>
          ))}
        </dl>
        <p className="mt-8 border-t border-line pt-6 text-[17px] leading-snug font-medium tracking-tight">
          {gap > 0 ? (
            <>
              Over {years} {years === 1 ? "year" : "years"}, owning costs <span className="text-vault-red">{formatMoney(gap, currency)} less</span>, and you still have the system at the end.
            </>
          ) : gap < 0 ? (
            <>
              Over {years} {years === 1 ? "year" : "years"}, renting costs {formatMoney(-gap, currency)} less. Move the slider to see when owning overtakes it.
            </>
          ) : (
            <>The two cost the same over this period.</>
          )}
        </p>
      </div>
    </div>
  )
}
