"use client"

import { useState } from "react"
import { getSector, sectors } from "@/content/sectors"
import { panelId, SectorTabs, tabId } from "@/components/site/sector-tabs"
import { SectorPanel } from "@/components/site/sector-panel"

const PREFIX = "home-sector"

/** Pick a trade: the copy, the stock and the demo link all follow. */
export function SectorPicker() {
  const [slug, setSlug] = useState(sectors[0].slug)
  const sector = getSector(slug)

  return (
    <div>
      <SectorTabs value={slug} onChange={setSlug} idPrefix={PREFIX} />
      <div id={panelId(PREFIX)} role="tabpanel" aria-labelledby={tabId(PREFIX, slug)} className="mt-8">
        {sector ? <SectorPanel key={slug} sector={sector} className="demo-enter" /> : null}
      </div>
    </div>
  )
}
