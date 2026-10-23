import { Plus } from "lucide-react"
import { faq } from "@/content/faq"

/**
 * Native disclosure widgets: keyboard, screen readers and find-in-page all
 * work without JavaScript. `skip` drops questions the page already answers.
 */
export function Faq({ skip = [] }: { skip?: string[] }) {
  return (
    <div className="border-t border-line">
      {faq
        .filter((entry) => !skip.includes(entry.q))
        .map((entry) => (
          <details key={entry.q} className="group border-b border-line">
            <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-medium tracking-tight [&::-webkit-details-marker]:hidden">
              {entry.q}
              <Plus className="mt-1 size-4 shrink-0 text-steel transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" aria-hidden />
            </summary>
            <p className="max-w-[64ch] pb-6 text-[16px] leading-[1.6] text-body-muted">{entry.a}</p>
          </details>
        ))}
    </div>
  )
}
