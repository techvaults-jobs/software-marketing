"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { packages } from "@/content/pricing"
import { cn } from "@/lib/utils"
import { Amount, Price } from "./currency"

export function Packages() {
  return (
    <ul className="reveal reveal-children grid gap-4 lg:grid-cols-3">
      {packages.map((plan) => (
        <li key={plan.id} className={cn("flex flex-col rounded-xl border bg-white p-6 sm:p-8", plan.featured ? "border-ink" : "border-line")}>
          <span className={cn("self-start rounded-full px-2.5 py-1 font-mono text-[11px] whitespace-nowrap uppercase", plan.featured ? "bg-ink text-white" : "border border-line text-muted-foreground")}>{plan.locations}</span>
          <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.03em]">{plan.name}</h2>
          <p className="mt-2 min-h-[3em] text-[15px] leading-relaxed text-muted-foreground">{plan.for}</p>
          <Price money={plan.price} from={plan.from} className="mt-6 block" />
          <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
            {plan.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-[15px] leading-snug">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-lg bg-subtle px-3.5 py-3 text-sm leading-relaxed text-muted-foreground">
            {plan.care ? (
              <>
                First year of care included. After that, optional at{" "}
                <span className="font-medium text-ink">
                  <Amount money={plan.care} />
                </span>{" "}
                a year.
              </>
            ) : (
              "First year of care included. After that, a care plan agreed with you."
            )}
          </p>
          <Link href={`/contact?package=${plan.id}`} className={cn("btn mt-6", plan.featured ? "btn-primary" : "btn-outline")}>
            {plan.from ? "Ask for a quote" : "Start with a discovery call"}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  )
}
