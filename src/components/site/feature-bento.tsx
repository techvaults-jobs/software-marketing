import { ArrowLeftRight, FileSpreadsheet, PackageCheck, ReceiptText, ShieldCheck, Undo2 } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * The inventory core, shown instead of listed. Four parts get a small drawing
 * of the screen they describe; the rest sit in a compact row underneath.
 */
export function FeatureBento() {
  return (
    <div className="reveal reveal-children grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-6">
      <Tile className="md:col-span-4" title="Stock by location" body="Every shop, branch, warehouse and van has its own count. See one, or all of them together.">
        <LocationsArt />
      </Tile>
      <Tile className="md:col-span-2" title="Unit-level tracking" body="Serial numbers, IMEIs, batches with expiry dates, or plain quantities. Each product is tracked the way it needs to be.">
        <ScanArt />
      </Tile>
      <Tile className="md:col-span-3" title="Audit trail" body="Who did what, when and from where. Entries are chained, so a deleted line is detectable.">
        <AuditArt />
      </Tile>
      <Tile className="md:col-span-3" title="Reports and exports" body="Sales, margin and stock value by location and period, on screen, in Excel or as a PDF.">
        <ReportArt />
      </Tile>
      <ul className="grid gap-px bg-line sm:grid-cols-2 md:col-span-6 lg:grid-cols-5">
        {more.map((item) => (
          <li key={item.name} className="bg-white p-5 sm:p-6">
            <item.icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{item.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const more = [
  { name: "Sales and receipts", icon: ReceiptText, body: "Split payments, part payments and customer balances that add up." },
  { name: "Purchasing", icon: PackageCheck, body: "Supplier bills line by line, and what you owe each one." },
  { name: "Transfers", icon: ArrowLeftRight, body: "In transit belongs to nobody until it is received." },
  { name: "Returns", icon: Undo2, body: "Never worth more than the sale, never accepted twice." },
  { name: "Roles and approvals", icon: ShieldCheck, body: "Cashiers do not see cost. You decide the rest." },
]

function Tile({ title, body, children, className }: { title: string; body: string; children: ReactNode; className?: string }) {
  return (
    <article className={cn("flex flex-col bg-white", className)}>
      <div className="flex min-h-[188px] flex-1 items-center justify-center bg-subtle px-6 py-7 sm:px-8" aria-hidden>
        {children}
      </div>
      <div className="border-t border-line p-6 sm:p-7">
        <h3 className="text-[17px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </article>
  )
}

function LocationsArt() {
  const rows = [
    { name: "High Street", units: 128, share: 46 },
    { name: "Mall Kiosk", units: 56, share: 20, low: true },
    { name: "Vault", units: 296, share: 100 },
  ]
  return (
    <div className="w-full max-w-[460px] rounded-lg border border-line bg-white text-[13px] shadow-[0_12px_32px_-20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-medium">Apex 15 Pro</span>
        <span className="font-mono text-[11px] text-muted-foreground">480 UNITS</span>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <li key={row.name} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 px-4 py-2.5">
            <span className="flex items-center gap-2">
              {row.low ? <span className="pulse-dot size-1.5 rounded-full bg-brand" /> : <span className="size-1.5 rounded-full bg-[#cfcfcf]" />}
              {row.name}
            </span>
            <span className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <span className={cn("block h-full rounded-full", row.low ? "bg-brand" : "bg-ink")} style={{ width: `${row.share}%` }} />
            </span>
            <span className="text-right font-medium tabular-nums">{row.units}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ScanArt() {
  return (
    <div className="w-full max-w-[230px] text-[12px]">
      <div className="relative overflow-hidden rounded-lg border border-line bg-white px-4 py-3 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.25)]">
        <div className="scan-line pointer-events-none absolute inset-x-3 top-2 h-px bg-brand" />
        <div className="flex h-12 items-stretch gap-[3px]">
          {[2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1].map((width, index) => (
            <span key={index} className="bg-ink" style={{ width, opacity: index % 2 ? 1 : 0.85 }} />
          ))}
        </div>
        <p className="mt-2 font-mono tracking-wider text-muted-foreground">3567 8210 4459 017</p>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2">
        <span className="font-medium">In stock · High Street</span>
        <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-white">Found</span>
      </div>
    </div>
  )
}

function AuditArt() {
  const rows = [
    { who: "L. Okoye", what: "Received transfer of 12 units", when: "10:02" },
    { who: "A. Mensah", what: "Changed selling price 799 → 779", when: "09:41" },
    { who: "System", what: "Day closed and locked", when: "Yesterday" },
  ]
  return (
    <ol className="relative w-full max-w-[400px] space-y-2 text-[13px]">
      <span className="absolute top-3 bottom-3 left-[13px] w-px bg-[#d9d9d9]" />
      {rows.map((row, index) => (
        <li key={row.what} className="relative flex items-center gap-3">
          <span className={cn("relative z-10 flex size-[27px] shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px]", index === 0 ? "border-ink" : "border-line text-muted-foreground")}>
            {String(3 - index).padStart(2, "0")}
          </span>
          <span className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2">
            <span className="min-w-0">
              <span className="block truncate font-medium">{row.what}</span>
              <span className="block text-muted-foreground">{row.who}</span>
            </span>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{row.when}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function ReportArt() {
  const bars = [44, 38, 57, 49, 71, 88, 63]
  return (
    <div className="w-full max-w-[400px] rounded-lg border border-line bg-white p-4 text-[13px] shadow-[0_12px_32px_-20px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground">Sales, last 7 days</p>
          <p className="mt-0.5 text-[20px] font-semibold tracking-tight tabular-nums">37,290</p>
        </div>
        <span className="flex h-7 items-center gap-1.5 rounded-md border border-line px-2 text-[12px] font-medium">
          <FileSpreadsheet className="size-3.5" />
          Excel
        </span>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((height, index) => (
          <span key={index} className={cn("flex-1 rounded-sm", index === bars.length - 1 ? "bg-brand" : "bg-[#d9d9d9]")} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  )
}
