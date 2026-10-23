import type { Metadata } from "next"
import { MessageCircle, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { Page } from "@/components/site/page"
import { sectors } from "@/content/sectors"
import { site, whatsappLink } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a walkthrough or tell us how your business runs. We reply within one working day.",
}

const next = [
  ["We reply within one working day", "A person who builds these systems reads your message, not a sales queue."],
  ["A one-hour discovery call", "We ask how stock moves through your business and show you the closest demo."],
  ["A written proposal", "Scope, price and delivery date, so you can decide with everything in front of you."],
]

export default function ContactPage() {
  return (
    <Page>
      <section>
        <div className="frame">
          <div className="pad grid gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Contact</p>
              <h1 className="display max-w-[12ch]">Tell us how your business runs.</h1>
              <p className="lede mt-6 max-w-[48ch]">
                The more you tell us about your stock and where it goes wrong, the more useful the first call will be.
              </p>
              <ol className="mt-10 space-y-6 border-t border-line pt-8">
                {next.map(([title, body], index) => (
                  <li key={title} className="flex gap-4">
                    <span className="font-mono text-[12px] leading-6 text-vault-red">0{index + 1}</span>
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-steel">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 border-t border-line pt-8">
                <p className="font-medium">Quicker by phone</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <MessageCircle className="size-4" aria-hidden />
                    Chat on WhatsApp
                  </a>
                  <a href={`tel:${site.phone.e164}`} className="btn btn-outline">
                    <Phone className="size-4" aria-hidden />
                    {site.phone.display}
                  </a>
                </div>
                <p className="mt-6 text-[15px] text-steel">
                  <a href={`mailto:${site.email}`} className="link text-ink">
                    {site.email}
                  </a>
                </p>
                <address className="mt-2 text-[15px] leading-relaxed text-steel not-italic">{site.address.join(", ")}</address>
              </div>
            </div>
            <ContactForm sectors={sectors.map((sector) => sector.name)} />
          </div>
        </div>
      </section>
    </Page>
  )
}
