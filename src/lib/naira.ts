const full = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })
const compact = new Intl.NumberFormat("en-NG", { notation: "compact", maximumFractionDigits: 2 })

/** ₦4,860,000 */
export const naira = (value: number) => full.format(value)

/** ₦4.86m, for tiles and table cells where the full figure will not fit. */
export function nairaShort(value: number) {
  const short = compact.format(value).replace(/K$/, "k").replace(/M$/, "m").replace(/B$/, "bn")
  return `₦${short}`
}
