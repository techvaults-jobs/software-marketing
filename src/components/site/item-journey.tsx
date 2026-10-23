"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight, Ban, Smartphone } from "lucide-react"
import { journey, journeyPlaces, journeyUnit } from "@/content/journey"
import { getSector } from "@/content/sectors"
import { cn } from "@/lib/utils"

const item = getSector(journeyUnit.sector)?.demo.items.find((candidate) => candidate.id === journeyUnit.item)

/**
 * One unit followed through the system, a step at a time. The reader drives
 * it: the point is that the unit is only ever counted in one place, and that
 * every move leaves a name behind.
 */
export function ItemJourney() {
  const [at, setAt] = useState(0)
  const still = useReducedMotion()
  const stop = journey[at]
  const last = journey.length - 1

  return (
    <div className="reveal overflow-hidden rounded-card border border-line bg-paper">
      <div className="border-b border-line bg-mist p-4 sm:p-6">
        <p className="eyebrow mb-3">Where it is counted</p>
        <ol className="grid grid-cols-4 gap-1.5 sm:gap-3">
          {journeyPlaces.map((place, index) => {
            const here = index === stop.place
            return (
              <li
                key={place}
                className={cn(
                  "flex min-h-[92px] flex-col rounded-lg border p-2 transition-colors duration-300 sm:min-h-[104px] sm:p-3",
                  here ? "border-ink bg-paper" : "border-dashed border-line-strong"
                )}
              >
                <span className={cn("text-[11px] leading-tight font-medium sm:text-[13px]", here ? "text-ink" : "text-steel")}>{place}</span>
                <span className="mt-auto flex h-9 items-end">
                  {here ? (
                    <motion.span
                      layoutId="journey-unit"
                      transition={still ? { duration: 0 } : { type: "spring", duration: 0.38, bounce: 0 }}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-ink px-1.5 py-1.5 text-paper sm:justify-start sm:px-2.5"
                    >
                      <Smartphone className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                      <span className="hidden truncate text-[13px] font-medium sm:inline">{item?.name ?? "Unit"}</span>
                    </motion.span>
                  ) : null}
                </span>
              </li>
            )
          })}
        </ol>
        <p className="mt-3 font-mono text-[11px] text-steel uppercase">
          1 unit · {journeyUnit.serial} · counted in exactly one place
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <ol className="flex overflow-x-auto border-b border-line [scrollbar-width:none] lg:flex-col lg:border-r lg:border-b-0 [&::-webkit-scrollbar]:hidden">
          {journey.map((entry, index) => {
            const active = index === at
            return (
              <li key={entry.step} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setAt(index)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "relative flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] transition-colors sm:px-6 lg:py-4",
                    active ? "bg-mist font-medium text-ink" : "text-steel hover:text-ink"
                  )}
                >
                  {active ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-0.5" /> : null}
                  <span className={cn("font-mono text-[11px]", index <= at ? "text-ink" : "text-steel")}>0{index + 1}</span>
                  {entry.step}
                </button>
              </li>
            )
          })}
        </ol>

        <div className="p-5 sm:p-8" aria-live="polite">
          <div key={stop.step} className="demo-enter">
            <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.03em] sm:text-[26px]">{stop.title}</h3>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-steel sm:text-base">{stop.body}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-line p-4">
                <p className="eyebrow">Written to the record</p>
                <p className="mt-3 text-[15px] font-medium">{stop.record.what}</p>
                <p className="mt-1 text-sm text-steel">
                  {stop.record.who} · {stop.record.when}
                </p>
              </div>
              <div className="rounded-lg border border-line p-4">
                <p className="eyebrow flex items-center gap-1.5">
                  <Ban className="size-3 text-vault-red" aria-hidden />
                  Refused here
                </p>
                <p className="mt-3 text-[15px] leading-snug font-medium">{stop.refuses}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="font-mono text-[12px] text-steel">
              {at + 1} of {journey.length}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setAt(Math.max(0, at - 1))} disabled={at === 0} aria-label="Previous step" className="btn btn-secondary btn-sm w-9 px-0 disabled:opacity-40">
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button type="button" onClick={() => setAt(at === last ? 0 : at + 1)} className="btn btn-primary btn-sm">
                {at === last ? "Start again" : `Next: ${journey[at + 1].step.toLowerCase()}`}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
