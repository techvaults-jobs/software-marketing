import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CtaBand } from "@/components/site/cta-band"
import { AbuTwinsMark } from "@/components/site/customer"
import { Page } from "@/components/site/page"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionIntro } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Abu Twins",
  description: "How a multi-shop phone and electronics retailer in Ibadan runs sales, stock and suppliers on a TechVaults inventory system.",
}

const facts = [
  ["Business", "Phones, laptops and power products"],
  ["Where", "Ibadan, Nigeria"],
  ["Set-up", "Several shops and a central vault"],
  ["System", "Phones and electronics inventory"],
]

const built = [
  {
    title: "Every device tracked by IMEI",
    body: "A phone is recorded once, on the supplier's bill, and followed by its number through every shop, sale, swap, repair and return.",
  },
  {
    title: "Three prices, set by the right people",
    body: "Each item carries a cost, a lowest and a selling price. The owner, admin and branch managers can set them; cashiers sell within them and never see cost.",
  },
  {
    title: "Transfers with a sender and a receiver",
    body: "Stock moving between shops is in transit until the receiving shop accepts it. Both names stay on the record.",
  },
  {
    title: "Part payments, step by step",
    body: "A sale paid in instalments shows each payment, its reference and who received it, on the sale itself.",
  },
  {
    title: "Returns that cannot exceed the sale",
    body: "The system refuses a return worth more than the item sold for, and refuses a second return of the same item.",
  },
  {
    title: "Supplier bills, line by line",
    body: "Each bill shows what was on it, the cost per unit and what is still owed. Faulty units are scanned into a list and sent back in one batch.",
  },
  {
    title: "Reports per shop, into Excel",
    body: "Sales, cost and collections for each shop and for the whole business, for any period, with one click to export.",
  },
  {
    title: "A record of who did what",
    body: "Every change is logged with the member of staff and the time. Entries are chained, so a missing one shows.",
  },
]

export default function AbuTwinsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Customer story"
        title="A phone retailer that knows where every unit is."
        lead={
          <span className="inline-flex items-center gap-3">
            <AbuTwinsMark size={48} />
            <span className="text-[19px] font-semibold tracking-tight">Abu Twins</span>
          </span>
        }
      >
        Abu Twins sells phones, laptops and power products from several shops in Ibadan. Their staff run each trading day on an inventory system TechVaults built around the way they already worked.
      </PageHero>

      <section className="border-t border-line">
        <div className="frame">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map(([label, value], index) => (
              <div key={label} className={`pad border-line py-6 lg:px-8 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}>
                <dt className="eyebrow">{label}</dt>
                <dd className="mt-2 text-[15px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionIntro eyebrow="The problem" title="High-value stock, many hands." className="reveal" />
          <div className="reveal space-y-5 text-[17px] leading-[1.65] text-muted-foreground">
            <p>
              A phone shop holds a lot of money in a small space. Units move between shops daily, customers pay in parts, old phones come in as part exchange and faulty ones go back to suppliers. Each of those is a place where a unit, or the money for it, can go missing without anyone noticing for weeks.
            </p>
            <p>
              Generic software handles the simple sale. It does not handle the way a business like this trades: swap deals, branch managers who set prices, a vault that feeds the shops, opening stock that must be valued but is owed to nobody.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="subtle">
        <SectionIntro eyebrow="What we built" title="Their workflows, written into the system." className="reveal" />
        <ul className="reveal mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {built.map((item, index) => (
            <li key={item.title} className="bg-white p-6 sm:p-7">
              <span className="font-mono text-[12px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionIntro eyebrow="After go-live" title="The system keeps changing, because the business does." className="reveal" />
          <div className="reveal space-y-5 text-[17px] leading-[1.65] text-muted-foreground">
            <p>
              Requests come straight from the people using it: the owner, shop managers and the warehouse team. When a manager asked for the people behind each transfer to be shown, it was added. When the warehouse wanted to check a list before anything was sent to a supplier, the screen was redesigned around that.
            </p>
            <p>That is what maintenance means to us: the software follows the business, and somebody who knows the set-up is always on the other end.</p>
            <Link href="/demo/phones-electronics" transitionTypes={["nav-forward"]} className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand">
              Try the phones and electronics demo <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand title="Want the same for your business?" />
    </Page>
  )
}
