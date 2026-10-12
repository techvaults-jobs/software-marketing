import type { LucideIcon } from "lucide-react"
import {
  ArrowLeftRight,
  FileSpreadsheet,
  History,
  MapPin,
  PackageCheck,
  ReceiptText,
  ScanBarcode,
  ShieldCheck,
  Undo2,
} from "lucide-react"

export type Feature = { name: string; icon: LucideIcon; body: string }

/** What every inventory system we build includes, whatever the sector. */
export const features: Feature[] = [
  { name: "Stock by location", icon: MapPin, body: "Every shop, branch, warehouse and van has its own count. See one, or all of them together." },
  { name: "Unit-level tracking", icon: ScanBarcode, body: "Serial numbers, IMEIs, batches or plain quantities. Each product is tracked the way it needs to be." },
  { name: "Sales and receipts", icon: ReceiptText, body: "A fast till with split payments, part payments and customer balances that add up." },
  { name: "Purchasing and suppliers", icon: PackageCheck, body: "Bills line by line, what you owe each supplier and faulty goods sent back against the right bill." },
  { name: "Transfers", icon: ArrowLeftRight, body: "Stock in transit belongs to nobody until it is received. Sender and receiver are both on record." },
  { name: "Returns and exchanges", icon: Undo2, body: "Limits are enforced by the system: a return cannot exceed the sale or happen twice." },
  { name: "Roles and approvals", icon: ShieldCheck, body: "Cashiers do not see cost. Managers set prices. Owners see everything. You decide the rest." },
  { name: "Reports and exports", icon: FileSpreadsheet, body: "Sales, margin and stock value by location and period, on screen, in Excel or as a PDF." },
  { name: "Audit trail", icon: History, body: "Who did what, when and from where. Entries are chained so a deleted line is detectable." },
]
