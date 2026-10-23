import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { discipline } from "@/content/home"
import { naira, nairaShort } from "@/lib/naira"
import { cn } from "@/lib/utils"

/**
 * Three rules the system applies by itself. The transfer record takes half
 * the row because it answers the question owners ask most: who had it last.
 */
export function DisciplineBento({ link = true }: { link?: boolean }) {
  const { movement, limits, roles } = discipline
  return (
    <div>
      <div className="reveal reveal-children grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tile title={movement.title} body={movement.body} className="bg-mist md:col-span-2 lg:p-8" lead>
          <div className="card mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 text-[13px] sm:p-5" role="img" aria-label={`${movement.units} sent from ${movement.from.place} by ${movement.from.who.replace("Sent by ", "")} and received at ${movement.to.place} by ${movement.to.who.replace("Received by ", "")}, ${movement.times}.`}>
            <div>
              <p className="text-[12px] text-steel">From</p>
              <p className="mt-0.5 text-[15px] font-semibold">{movement.from.place}</p>
              <p className="mt-0.5 text-steel">{movement.from.who}</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-[12px]">{movement.units}</p>
              <div className="relative my-1.5 h-px bg-ink">
                <span className="absolute -top-[3.5px] right-0 size-2 rounded-full bg-vault-red" />
              </div>
              <p className="text-[12px] text-steel">{movement.times}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-steel">To</p>
              <p className="mt-0.5 text-[15px] font-semibold">{movement.to.place}</p>
              <p className="mt-0.5 text-steel">{movement.to.who}</p>
            </div>
          </div>
        </Tile>

        <Tile title={limits.title} body={limits.body}>
          <p className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-[12px] border border-vault-red px-3.5 py-3 text-[13px]">
            <span>Return {naira(limits.asked)}</span>
            <span className="font-medium text-vault-red">Max {naira(limits.allowed)}</span>
          </p>
        </Tile>

        <Tile title={roles.title} body={roles.body}>
          <ul className="mt-auto space-y-2 font-mono text-[12px]">
            <li className="rounded-[10px] bg-ink px-3 py-2.5 text-paper">
              Manager · cost {nairaShort(roles.cost)} · sells {nairaShort(roles.sells)}
            </li>
            <li className="rounded-[10px] bg-secondary px-3 py-2.5">Cashier · sells {nairaShort(roles.sells)}</li>
          </ul>
        </Tile>
      </div>
      {link ? (
        <div className="reveal mt-8">
          <Link href="/stockvaults" className="link-rule">
            {discipline.link}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      ) : null}
    </div>
  )
}

function Tile({ title, body, children, className, lead = false }: { title: string; body: string; children: React.ReactNode; className?: string; lead?: boolean }) {
  return (
    <article className={cn("card flex flex-col p-6", className)}>
      <h3 className={cn("font-semibold tracking-[-0.02em]", lead ? "text-[22px] sm:text-[24px]" : "text-[18px]")}>{title}</h3>
      <p className={cn("mt-2 leading-[1.5] text-body-muted", lead ? "max-w-[46ch] text-[16px]" : "mb-6 text-[15px]")}>{body}</p>
      {children}
    </article>
  )
}
