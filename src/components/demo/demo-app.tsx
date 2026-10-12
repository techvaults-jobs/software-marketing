"use client"

import { useMemo, useReducer, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowLeftRight,
  BarChart3,
  Boxes,
  LayoutDashboard,
  RotateCcw,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getSector, type DemoConfig } from "@/content/sectors"
import { initialState, outWording, reducer } from "./demo-state"
import { MovesScreen, OutScreen, OverviewScreen, ReportsScreen, StockScreen, type Prefill } from "./demo-screens"

type Screen = "overview" | "stock" | "out" | "moves" | "reports"

/**
 * A working copy of the inventory system, loaded with made-up data for one
 * sector. Everything happens in the browser: selling takes stock off the
 * shelf, transfers move it, the reports follow. Nothing is saved.
 */
export function DemoApp({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const sector = getSector(slug)
  if (!sector) return null
  // A new sector is a new business: start it from its own opening numbers.
  return <DemoWorkspace key={sector.slug} config={sector.demo} compact={compact} />
}

function DemoWorkspace({ config, compact }: { config: DemoConfig; compact: boolean }) {
  const reduce = useMemo(() => reducer(config), [config])
  const [state, dispatch] = useReducer(reduce, config, initialState)
  const [screen, setScreen] = useState<Screen>("overview")
  const [location, setLocation] = useState(0)
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  const still = useReducedMotion()
  const wording = outWording(config)

  const tabs: Array<{ id: Screen; label: string; icon: LucideIcon }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "stock", label: "Stock", icon: Boxes },
    { id: "out", label: wording.tab, icon: ShoppingCart },
    { id: "moves", label: "Movements", icon: ArrowLeftRight },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ]

  function startTransfer(next: Prefill) {
    setPrefill(next)
    setScreen("moves")
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-[#dcdcdc] bg-white text-[13px] text-ink shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.18)]",
        compact ? "h-[560px] sm:h-[600px]" : "h-[calc(100dvh-10.5rem)] min-h-[560px]"
      )}
    >
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-line px-3 sm:px-4">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-ink text-[11px] font-semibold text-white">
          {config.business.charAt(0)}
        </span>
        <span className="truncate font-medium">{config.business}</span>
        <span className="hidden rounded-full border border-line px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase sm:inline">
          Sample data
        </span>
        <div className="ml-auto flex items-center gap-2">
          <label className="sr-only" htmlFor="demo-location">
            {config.locationNoun}
          </label>
          <select
            id="demo-location"
            value={location}
            onChange={(event) => setLocation(Number(event.target.value))}
            className="h-8 max-w-[9.5rem] rounded-md border border-line bg-white px-2 text-[13px] outline-none hover:border-[#bdbdbd] focus-visible:border-ink"
          >
            {config.locations.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "reset" })
              setPrefill(null)
            }}
            className="flex h-8 items-center gap-1.5 rounded-md border border-line px-2 text-muted-foreground transition-colors hover:border-[#bdbdbd] hover:text-ink"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Reset</span>
            <span className="sr-only sm:hidden">Reset the demo</span>
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <nav
          aria-label="Demo screens"
          className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-subtle p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:w-44 md:flex-col md:overflow-visible md:border-r md:border-b-0"
        >
          {tabs.map((tab) => {
            const active = tab.id === screen
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setScreen(tab.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-8 shrink-0 items-center gap-2 rounded-md px-2.5 text-left transition-colors",
                  active ? "text-ink" : "text-muted-foreground hover:text-ink"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={`demo-tab-${config.business}`}
                    className="absolute inset-0 rounded-md border border-line bg-white"
                    transition={still ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 42 }}
                  />
                ) : null}
                <tab.icon className="relative size-4" aria-hidden />
                <span className="relative font-medium">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          {/* Enter only: the old screen is gone at once, so fast switching never waits on an exit. */}
          <div key={screen} className="demo-enter p-4 sm:p-5">
              {screen === "overview" ? (
                <OverviewScreen config={config} state={state} onTransfer={startTransfer} />
              ) : screen === "stock" ? (
                <StockScreen config={config} state={state} location={location} />
              ) : screen === "out" ? (
                <OutScreen config={config} state={state} location={location} dispatch={dispatch} />
              ) : screen === "moves" ? (
                <MovesScreen config={config} state={state} location={location} dispatch={dispatch} prefill={prefill} />
              ) : (
                <ReportsScreen config={config} state={state} />
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
