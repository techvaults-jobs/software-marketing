import { alternatives, situations } from "@/content/alternatives"
import { cn } from "@/lib/utils"

const ours = alternatives.length - 1

/**
 * StockVaults beside what it usually replaces. A table from tablet width up;
 * on a phone each situation becomes its own short list, because four columns
 * of sentences do not fit.
 */
export function Alternatives() {
  return (
    <div className="reveal">
      <table className="hidden w-full table-fixed border-separate border-spacing-0 text-left text-[15px] md:table">
        <thead>
          <tr>
            <th className="w-[22%] pb-4" />
            {alternatives.map((name, index) => (
              <th
                key={name}
                scope="col"
                className={cn(
                  "px-5 pb-4 pt-5 text-sm font-medium",
                  index === ours ? "rounded-t-xl border-x border-t border-ink bg-paper text-ink" : "text-steel"
                )}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {situations.map((situation, row) => (
            <tr key={situation.when}>
              <th scope="row" className="border-t border-line py-5 pr-5 align-top font-medium tracking-tight">
                {situation.when}
              </th>
              {situation.answers.map((answer, index) => (
                <td
                  key={answer}
                  className={cn(
                    "border-t border-line px-5 py-5 align-top leading-relaxed",
                    index === ours ? "border-x border-x-ink bg-paper font-medium text-ink" : "text-steel",
                    index === ours && row === situations.length - 1 && "rounded-b-xl border-b border-b-ink"
                  )}
                >
                  {answer}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-4 md:hidden">
        {situations.map((situation) => (
          <li key={situation.when} className="overflow-hidden rounded-xl border border-line bg-paper">
            <h3 className="border-b border-line px-4 py-3.5 text-[15px] font-semibold tracking-tight">{situation.when}</h3>
            <dl className="divide-y divide-line text-sm">
              {situation.answers.map((answer, index) => (
                <div key={answer} className={cn("grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3", index === ours && "bg-ink text-paper")}>
                  <dt className={index === ours ? "font-medium" : "text-steel"}>{alternatives[index]}</dt>
                  <dd className={cn("leading-relaxed", index === ours && "font-medium")}>{answer}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}
