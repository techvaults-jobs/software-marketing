import { ImageResponse } from "next/og"

export const alt = "StockVaults by TechVaults: inventory software built around your business"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The card shown when a link to the site is shared. Brand colours only. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 72, borderTop: "14px solid #bc0004" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#0a0a0a" }}>
          <div style={{ display: "flex", background: "#0a0a0a", color: "#ffffff", padding: "8px 22px", borderRadius: 999, fontWeight: 600 }}>StockVaults</div>
          <div style={{ display: "flex", marginLeft: 18, color: "#666666" }}>by TechVaults</div>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: -4, color: "#0a0a0a", maxWidth: 980 }}>
          Know what you have, where it is and what it is worth.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#666666" }}>Inventory software built around your business. Try a working demo.</div>
      </div>
    ),
    size
  )
}
