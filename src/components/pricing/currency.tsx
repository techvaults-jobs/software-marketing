"use client"

import { createContext, use, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type Currency = "ngn" | "usd"

const CurrencyContext = createContext<{ currency: Currency; setCurrency: (currency: Currency) => void; rate: number }>({ currency: "ngn", setCurrency: () => {}, rate: 1 })

/**
 * Holds the currency the visitor is reading prices in, and the day's rate.
 * Naira first: it is what we charge.
 */
export function CurrencyProvider({ rate, children }: { rate: number; children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("ngn")
  return <CurrencyContext value={{ currency, setCurrency, rate }}>{children}</CurrencyContext>
}

export const useCurrency = () => use(CurrencyContext)

/** A naira price in dollars, to the nearest ten so it reads as a price and not a conversion. */
export function toDollars(naira: number, rate: number) {
  return Math.round(naira / rate / 10) * 10
}

export function formatMoney(amount: number, currency: Currency) {
  return `${currency === "ngn" ? "₦" : "$"}${Math.round(amount).toLocaleString("en-US")}`
}

const options: Array<{ id: Currency; label: string }> = [
  { id: "ngn", label: "Naira" },
  { id: "usd", label: "US dollars" },
]

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency()
  const still = useReducedMotion()
  return (
    <div role="group" aria-label="Show prices in" className="inline-flex rounded-full border border-line bg-white p-1">
      {options.map((option) => {
        const active = option.id === currency
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => setCurrency(option.id)}
            className={cn("relative h-8 rounded-full px-4 text-sm font-medium transition-colors", active ? "text-white" : "text-muted-foreground hover:text-ink")}
          >
            {active ? (
              <motion.span layoutId="currency-pill" className="absolute inset-0 rounded-full bg-ink" transition={still ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }} />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/** A naira price in the chosen currency, with the other one underneath. */
export function Price({ naira, from, className }: { naira: number; from?: boolean; className?: string }) {
  const { currency, rate } = useCurrency()
  const amounts = { ngn: naira, usd: toDollars(naira, rate) }
  const other = currency === "ngn" ? "usd" : "ngn"
  return (
    <span className={className}>
      <span key={currency} className="demo-enter block text-[40px] leading-none font-semibold tracking-[-0.045em] tabular-nums sm:text-[44px]">
        {from ? <span className="mr-2 align-middle text-base font-medium tracking-normal text-muted-foreground">from</span> : null}
        {formatMoney(amounts[currency], currency)}
      </span>
      <span className="mt-2 block text-sm text-muted-foreground">
        about {formatMoney(amounts[other], other)} · paid once
      </span>
    </span>
  )
}

/** A smaller naira amount inline, in the chosen currency. */
export function Amount({ naira }: { naira: number }) {
  const { currency, rate } = useCurrency()
  return <>{formatMoney(currency === "ngn" ? naira : toDollars(naira, rate), currency)}</>
}
