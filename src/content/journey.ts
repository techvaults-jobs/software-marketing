/**
 * One phone, followed from the supplier's bill to a customer and back. Used by
 * the "follow one item" explainer. The unit, the people and the shop are made up
 * and match the phones and electronics demo.
 */
export const journeyUnit = { sector: "phones-electronics", item: "p1", serial: "IMEI ending 2074" } as const

export const journeyPlaces = ["Vault", "In transit", "High Street", "With customer"] as const

export type JourneyStop = {
  step: string
  title: string
  body: string
  /** Index into `journeyPlaces`: where the unit is counted after this step. */
  place: number
  record: { what: string; who: string; when: string }
  /** What the system will not allow at this point. */
  refuses: string
}

export const journey: JourneyStop[] = [
  {
    step: "Receive",
    title: "It arrives on a supplier's bill.",
    body: "The unit is scanned once. Its number, what it cost and the bill it came on stay with it from here on.",
    place: 0,
    record: { what: "Received on bill PO-1042", who: "L. Okoye", when: "Mon 09:12" },
    refuses: "The same number being received a second time.",
  },
  {
    step: "Send",
    title: "The vault sends it to a shop.",
    body: "It leaves the vault's count the moment it is sent. Until the shop accepts it, it is in transit and belongs to neither.",
    place: 1,
    record: { what: "Sent to High Street", who: "L. Okoye", when: "Mon 14:30" },
    refuses: "Sending a unit the vault does not hold.",
  },
  {
    step: "Accept",
    title: "The shop confirms it arrived.",
    body: "A second person puts their name to the movement. If the box is one short, you know which hand-over to ask about.",
    place: 2,
    record: { what: "Received from Vault", who: "A. Mensah", when: "Mon 16:05" },
    refuses: "Selling it before somebody has accepted it.",
  },
  {
    step: "Sell",
    title: "A cashier scans it at the till.",
    body: "The system checks the unit is in that shop, applies the prices that cashier is allowed to use and prints the receipt.",
    place: 3,
    record: { what: "Sold on INV-20418", who: "A. Mensah", when: "Wed 11:47" },
    refuses: "A price below the lowest that role may charge.",
  },
  {
    step: "Return",
    title: "The customer brings it back.",
    body: "The return is tied to the sale it came from. The unit goes back into the shop's count and the refund is worked out from the receipt.",
    place: 2,
    record: { what: "Returned against INV-20418", who: "A. Mensah", when: "Fri 10:20" },
    refuses: "A refund above what it sold for, or a second return of the same unit.",
  },
]
