"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { sectors } from "@/content/sectors"
import { cn } from "@/lib/utils"
import { DemoApp } from "./demo-app"

/** The demo with a row of sectors above it. Used on the home page and /demo. */
export function DemoSwitcher({ initial = sectors[0].slug, compact = false }: { initial?: string; compact?: boolean }) {
  const [slug, setSlug] = useState(initial)
  const still = useReducedMotion()

  return (
    <div>
      <div className="-mx-5 mb-4 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="tablist" aria-label="Choose a sector" className="flex w-max gap-1 sm:w-auto sm:flex-wrap">
          {sectors.map((sector) => {
            const active = sector.slug === slug
            return (
              <button
                key={sector.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSlug(sector.slug)}
                className={cn(
                  "relative flex h-9 items-center gap-2 rounded-full px-3.5 text-sm whitespace-nowrap transition-colors",
                  active ? "text-white" : "text-muted-foreground hover:text-ink"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={compact ? "sector-pill-compact" : "sector-pill"}
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={still ? { duration: 0 } : { type: "spring", stiffness: 460, damping: 38 }}
                  />
                ) : null}
                <sector.icon className="relative size-4" strokeWidth={1.75} aria-hidden />
                <span className="relative font-medium">{sector.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <motion.div
        key={slug}
        initial={still ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <DemoApp slug={slug} compact={compact} />
      </motion.div>

      {compact ? (
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>This is a working demo. Sell something, then check the stock.</span>
          <Link href={`/demo/${slug}`} transitionTypes={["nav-forward"]} className="inline-flex items-center gap-1 font-medium text-ink hover:text-brand">
            Open it full screen <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>
      ) : null}
    </div>
  )
}
