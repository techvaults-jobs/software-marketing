import Link from "next/link"
import { ArrowDownLeft, ArrowUpRight, Check, Package, ScanLine } from "lucide-react"
import { ArrowRight } from "lucide-react"

/** A short, silent product spot drawn from the phone shop workflow. */
export function ProductAd() {
  return (
    <section aria-labelledby="product-ad-title" className="border-y border-line bg-mist">
      <div className="frame pad grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">One unit. A full record.</p>
          <h2 id="product-ad-title" className="title mt-4 max-w-[13ch]">From receiving to sale, every unit leaves a trail.</h2>
          <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-body-muted sm:text-[18px]">
            Scan a phone in, move it between shops and see who confirmed the handover. StockVaults keeps the IMEI with the unit at every step.
          </p>
          <Link href="/demo/phones-electronics" className="link-rule mt-7">
            Follow the phone shop demo <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <figure className="ad-stage relative overflow-hidden rounded-card border border-line bg-paper p-4 sm:p-7" aria-label="Animated illustration of a phone moving from receiving, to transfer, to sale. Sample data.">
          <div className="flex items-center justify-between border-b border-line pb-4 text-[12px]">
            <span className="font-semibold tracking-tight">StockVaults <span className="font-normal text-steel">· Sample workflow</span></span>
            <span className="rounded-full border border-line px-2.5 py-1 text-steel">IMEI …2074</span>
          </div>

          <div className="ad-scene ad-scene-receive" aria-hidden="true">
            <div className="ad-device"><SmartphoneShape /><span>IMEI …2074</span></div>
            <div className="ad-status"><ScanLine className="size-4 text-vault-red" /><span>Received from supplier</span><Check className="ml-auto size-4" /></div>
          </div>
          <div className="ad-scene ad-scene-transfer" aria-hidden="true">
            <div className="ad-route">
              <div><span className="ad-location"><Package className="size-4" /></span><strong>Iwo Road</strong><small>Sent by A. Mensah</small></div>
              <span className="ad-route-line"><ArrowUpRight className="ad-moving-unit size-5" /></span>
              <div><span className="ad-location"><Package className="size-4" /></span><strong>Dugbe</strong><small>Received by L. Okoye</small></div>
            </div>
            <div className="ad-status"><Check className="size-4" /><span>Transfer confirmed · 10:02</span></div>
          </div>
          <div className="ad-scene ad-scene-sale" aria-hidden="true">
            <div className="ad-sale-row"><span className="ad-location"><ArrowDownLeft className="size-4" /></span><div><strong>Sold at Dugbe</strong><small>IMEI …2074 · Receipt #SV-1048</small></div><span className="ml-auto text-[13px] font-mono">₦1,245,000</span></div>
            <div className="ad-status"><Check className="size-4" /><span>Stock updated at the point of sale</span></div>
          </div>

          <div className="ad-timeline mt-5 flex items-center gap-2 border-t border-line pt-4" aria-hidden="true">
            <span>Receive</span><i /><span>Transfer</span><i /><span>Sell</span>
          </div>
          <figcaption className="sr-only">Sample product animation. All names, transactions and figures shown are made up.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function SmartphoneShape() {
  return <span className="ad-phone" aria-hidden="true"><span /></span>
}
