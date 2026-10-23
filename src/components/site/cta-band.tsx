import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { finalCta } from "@/content/home"

/** The red block that closes a page. The only red surface on the site. */
export function CtaBand({ title = finalCta.title, body = finalCta.body }: { title?: string; body?: string }) {
  return (
    <section className="frame pad py-16 lg:py-20">
      <div className="reveal flex flex-col gap-8 rounded-card bg-vault-red px-6 py-10 text-paper sm:px-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-[620px]">
          <h2 className="title">{title}</h2>
          <p className="mt-4 text-[17px] leading-[1.5] sm:text-[18px]">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href="/demo" className="btn btn-inverse">
            Try the demo
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/contact" className="btn btn-ghost-inverse">
            Book a walkthrough
          </Link>
        </div>
      </div>
    </section>
  )
}
