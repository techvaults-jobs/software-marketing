import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react"

/**
 * Three small pieces of the product, drawn in markup. Each shows a rule the
 * system applies by itself, which is the part buyers cannot see in a feature list.
 */
export function Rules() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
      <li className="flex flex-col bg-white p-6 sm:p-7">
        <div className="rounded-lg border border-line p-4 text-[13px]">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Return value</span>
            <span className="font-mono text-[11px] text-muted-foreground">INV-20418</span>
          </div>
          <div className="mt-2 flex h-9 items-center justify-between rounded-md border border-brand px-2.5 tabular-nums">
            <span>120.00</span>
            <Lock className="size-3.5 text-brand" aria-hidden />
          </div>
          <p className="mt-2 text-brand">The most that can be returned is 85.00, what this item sold for.</p>
        </div>
        <h3 className="mt-6 text-[17px] font-semibold tracking-tight">Limits that hold</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          A refund cannot exceed the sale. A transfer cannot send stock that is not there. The check runs on the server, so a till cannot skip it.
        </p>
      </li>

      <li className="flex flex-col bg-white p-6 sm:p-7">
        <div className="rounded-lg border border-line p-4 text-[13px]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-medium">High Street</p>
              <p className="text-muted-foreground">Sent by A. Mensah</p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="text-right">
              <p className="font-medium">Mall Kiosk</p>
              <p className="text-muted-foreground">Received by L. Okoye</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="text-muted-foreground">12 units · 09:14 → 10:02</span>
            <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium">Received</span>
          </div>
        </div>
        <h3 className="mt-6 text-[17px] font-semibold tracking-tight">A name on every movement</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Who sent it, who received it, who approved it. When a count is short, you start with a name and a time instead of a guess.
        </p>
      </li>

      <li className="flex flex-col bg-white p-6 sm:p-7">
        <div className="rounded-lg border border-line text-[13px]">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="flex items-center gap-2 font-medium">
              <Eye className="size-3.5" aria-hidden /> Manager
            </span>
            <span className="tabular-nums text-muted-foreground">Cost 671 · Lowest 740 · Sells 799</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="flex items-center gap-2 font-medium">
              <EyeOff className="size-3.5" aria-hidden /> Cashier
            </span>
            <span className="tabular-nums text-muted-foreground">Sells 799</span>
          </div>
        </div>
        <h3 className="mt-6 text-[17px] font-semibold tracking-tight">Each role sees its own screen</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Cost prices, margins and other shops stay hidden from people who do not need them. You set who can discount, and how far.
        </p>
      </li>
    </ul>
  )
}
