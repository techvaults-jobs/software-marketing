import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { whatsappLink } from "@/content/site"
import { Section } from "./section"

export function CtaBand({
  title = "See it with your own stock in mind.",
  body = "Open the demo for your sector, or tell us how your business runs and we will show you what your system would look like.",
}: {
  title?: string
  body?: string
}) {
  return (
    <Section tone="dark">
      <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[640px]">
          <h2 className="title">{title}</h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-white/65 sm:text-[19px]">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href="/contact" className="btn btn-brand">
            Book a walkthrough
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-ghost-inverse">
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </Section>
  )
}
