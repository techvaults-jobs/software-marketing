"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { getSector, isReady, sectors } from "@/content/sectors"
import { cn } from "@/lib/utils"
import { DemoApp } from "./demo-app"

/** The demo with a row of sectors above it. Used on the home page and /demo. */
export function DemoSwitcher({ initial = sectors[0].slug, compact = false }: { initial?: string; compact?: boolean }) {
  const [slug, setSlug] = useState(initial)
  const still = useReducedMotion()
  const sector = getSector(slug)

  return (
    <div>
      <div className="-mx-5 mb-4 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="tablist" aria-label="Choose a sector" className="flex w-max gap-1 rounded-full border border-line bg-paper p-1 sm:w-fit sm:flex-wrap sm:rounded-3xl">
          {sectors.map((sector) => {
            const active = sector.slug === slug
            return (
              <button
                key={sector.slug}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={sector.name}
                onClick={() => setSlug(sector.slug)}
                className={cn(
                  "relative flex h-8 items-center gap-2 rounded-full px-3 text-sm whitespace-nowrap transition-colors",
                  active ? "text-paper" : "text-steel hover:text-ink"
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
                <span className="relative font-medium">{sector.short}</span>
              </button>
            )
          })}
        </div>
      </div>

      {compact && sector ? (
        <div key={`tracks-${slug}`} className="demo-enter mb-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px]">
          <span className="mr-1 text-steel">
            For {sector.name.toLowerCase()} {isReady(sector) ? "it keeps count by" : "your version would keep count by"}
          </span>
          {sector.tracks.map((track) => (
            <span key={track} className="rounded-full border border-line bg-paper px-2.5 py-1">
              {track}
            </span>
          ))}
        </div>
      ) : null}

      <motion.div
        key={slug}
        initial={still ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <DemoApp slug={slug} compact={compact} />
      </motion.div>

      {compact ? (
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-steel">
          <span>
            {sector && isReady(sector)
              ? "This is a working demo. Sell something, then check the stock."
              : "This is a preview of a version built for this sector. Sell something, then check the stock."}
          </span>
          <Link href={`/demo/${slug}`} transitionTypes={["nav-forward"]} className="inline-flex items-center gap-1 font-medium text-ink hover:text-vault-red">
            Open it full screen <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          <Link href={`/industries/${slug}`} transitionTypes={["nav-forward"]} className="inline-flex items-center gap-1 font-medium text-ink hover:text-vault-red">
            How it works for {sector?.short.toLowerCase()} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>
      ) : null}
    </div>
  )
}
