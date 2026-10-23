import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StatCell } from "@/components/site/stat-cell"
import { Eyebrow } from "@/components/site/section"
import { abuTwins } from "@/content/customers"
import abuTwinsLogo from "../../../public/customers/abu-twins.jpg"

/**
 * The Abu Twins band. The photo, quote and counted results appear as soon as
 * they are approved and added to src/content/customers.ts.
 */
export function CustomerStory() {
  const { photo, quote, person, metrics, facts } = abuTwins
  const cells = metrics ?? facts

  return (
    <article className="card reveal grid overflow-hidden md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="relative hidden min-h-[340px] items-center justify-center border-r border-line bg-mist md:flex">
        {photo ? (
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        ) : (
          <Image src={abuTwinsLogo} alt="Abu Twins" width={112} height={112} className="rounded-full" />
        )}
      </div>
      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <Image src={abuTwinsLogo} alt="" width={32} height={32} className="rounded-full md:hidden" />
          <Eyebrow>Customer story · {abuTwins.name}</Eyebrow>
        </div>
        {quote ? (
          <blockquote className="mt-5 text-[22px] leading-[1.3] font-medium tracking-[-0.02em] sm:text-[26px]">{quote}</blockquote>
        ) : (
          <p className="mt-5 text-[22px] leading-[1.3] font-medium tracking-[-0.02em] sm:text-[26px]">A phone retailer that knows where every unit is.</p>
        )}
        <p className="mt-4 text-[14px] text-steel">{person ? `${person.name}, ${person.role}, ${abuTwins.name}` : `${abuTwins.name}, ${abuTwins.summary}`}</p>
        <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
          {cells.map((cell) => (
            <div key={cell.label}>
              <dt className="sr-only">{cell.label}</dt>
              <dd>
                <StatCell value={cell.value} note={cell.label} size={metrics ? "lg" : "md"} />
              </dd>
            </div>
          ))}
        </dl>
        <Link href={abuTwins.href} transitionTypes={["nav-forward"]} className="link-rule mt-8 self-start">
          Read the full story
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
