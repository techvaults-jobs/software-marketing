import { cn } from "@/lib/utils"

/** One figure with its label: a dashboard tile, a customer metric. */
export function StatCell({
  label,
  value,
  note,
  alert = false,
  size = "md",
  className,
}: {
  label?: string
  value: string
  note?: string
  /** The one number on screen that needs attention. */
  alert?: boolean
  size?: "md" | "lg"
  className?: string
}) {
  return (
    <div className={cn("min-w-0", className)}>
      {label ? <p className="text-[12px] leading-[1.3] text-steel">{label}</p> : null}
      <p className={cn("font-mono tracking-tight tabular-nums", size === "lg" ? "text-[26px] sm:text-[30px]" : "mt-1.5 text-[17px] sm:text-[19px]", alert && "text-vault-red")}>{value}</p>
      {note ? <p className={cn("mt-1 truncate text-[12px]", alert ? "text-vault-red" : "text-steel")}>{note}</p> : null}
    </div>
  )
}
