import { cn } from "@/lib/utils"

/**
 * The StockVaults lockup: an ink vault with a red dot, the product name, and
 * the company that builds it. Swap for the brand team's logo when there is one.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-[7px] bg-ink">
        <span className="size-2 rounded-full bg-vault-red" />
      </span>
      <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">StockVaults</span>
      <span className="hidden text-[13px] text-steel sm:inline">by TechVaults</span>
    </span>
  )
}
