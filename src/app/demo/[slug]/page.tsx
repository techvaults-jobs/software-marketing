import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { DemoApp } from "@/components/demo/demo-app"
import { Page } from "@/components/site/page"
import { AvailabilityBadge } from "@/components/site/sector-card"
import { getSector, isReady, sectors } from "@/content/sectors"
import { appLink } from "@/content/site"

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata({ params }: PageProps<"/demo/[slug]">): Promise<Metadata> {
  const sector = getSector((await params).slug)
  if (!sector) return {}
  return {
    title: `StockVaults ${isReady(sector) ? "demo" : "preview"}: ${sector.name.toLowerCase()}`,
    description: isReady(sector)
      ? `A working StockVaults demo for ${sector.name.toLowerCase()}, with made-up stock you can sell, receive and transfer.`
      : `A preview of StockVaults built for ${sector.name.toLowerCase()}, with made-up stock you can sell, receive and transfer.`,
  }
}

export default async function DemoPage({ params }: PageProps<"/demo/[slug]">) {
  const sector = getSector((await params).slug)
  if (!sector) notFound()
  const fullSystem = sector.setup ? appLink(`/demo/${sector.setup}`) : null

  return (
    <Page>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 pb-10 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/demo" transitionTypes={["nav-back"]} className="inline-flex items-center gap-1.5 text-sm text-steel transition-colors hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden />
            All demos
          </Link>
          <h1 className="text-sm font-medium">
            StockVaults <span className="text-steel">for {sector.name.toLowerCase()}</span>
          </h1>
          <AvailabilityBadge sector={sector} />
          <div className="ml-auto flex items-center gap-2">
            <Link href={`/industries/${sector.slug}`} className="btn btn-sm btn-secondary hidden sm:inline-flex">
              About this system
            </Link>
            {fullSystem ? (
              <a href={fullSystem} className="btn btn-sm btn-secondary">
                Open the full system
              </a>
            ) : null}
            <Link href="/contact" className="btn btn-sm btn-primary">
              Get this for my business
            </Link>
          </div>
        </div>
        <DemoApp slug={sector.slug} />
        <p className="mt-4 text-sm text-steel">
          {sector.demo.business} is a made-up business.{" "}
          {isReady(sector)
            ? "The demo shows the core screens; your system is fitted with the workflows, roles and reports your business needs."
            : `This is a preview: StockVaults runs phone and electronics shops today, and the ${sector.name.toLowerCase()} parts are built into your version before you go live.`}
        </p>
        {fullSystem ? (
          <p className="mt-2 text-sm text-steel">
            This page saves nothing. <a href={fullSystem} className="font-medium text-ink underline underline-offset-4">Open the full system</a> for your own copy of StockVaults with made-up stock, sales and reports. It is kept for 24 hours and nobody else sees it.
          </p>
        ) : null}
      </div>
    </Page>
  )
}
