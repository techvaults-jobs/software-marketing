/**
 * Abu Twins is the only customer this site names. Everything here must be
 * approved by them in writing. A `null` is a gap waiting for that approval:
 * the page leaves it out rather than show a guess.
 */
export const abuTwins = {
  name: "Abu Twins",
  summary: "a multi-shop phone retailer in Ibadan",
  href: "/customers/abu-twins",
  /** A photo of the shop floor, in public/customers. Until then the logo stands in. */
  photo: null as { src: string; alt: string } | null,
  /** The owner's own words about knowing stock across the shops. */
  quote: null as string | null,
  person: null as { name: string; role: string } | null,
  /** Counted from their system, e.g. { value: "4", label: "shops on one system" }. */
  metrics: null as Array<{ value: string; label: string }> | null,
  /** Facts already approved and published on their story page. Shown while `metrics` is empty. */
  facts: [
    { value: "Phones and laptops", label: "and power products" },
    { value: "Several shops", label: "and a central vault" },
    { value: "Every unit", label: "tracked by IMEI" },
  ],
}
