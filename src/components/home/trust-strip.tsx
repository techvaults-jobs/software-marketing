import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { abuTwins } from "@/content/customers"

/**
 * Proof straight under the hero. Partner marks join this strip once the
 * partnerships are confirmed in writing; until then it names only Abu Twins.
 */
export function TrustStrip() {
  return (
    <section aria-label="Customers" className="border-y border-line bg-mist">
      <div className="frame pad">
        <Link
          href={abuTwins.href}
          transitionTypes={["nav-forward"]}
          className="group flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 text-[14px] sm:text-[15px]"
        >
          <span className="text-body-muted">
            In daily use at <strong className="font-semibold text-ink">{abuTwins.name}</strong>, {abuTwins.summary}
          </span>
          <span className="nudge inline-flex items-center gap-1.5 font-medium text-ink group-hover:text-vault-red">
            Read the story
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      </div>
    </section>
  )
}
