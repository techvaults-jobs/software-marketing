import type { LucideIcon } from "lucide-react"
import {
  Banknote,
  Building2,
  CalendarCheck,
  GraduationCap,
  HeartPulse,
  KanbanSquare,
  ShoppingCart,
  Store,
  Truck,
  Users,
  Wallet,
  Wheat,
} from "lucide-react"

export type System = {
  name: string
  icon: LucideIcon
  body: string
  /** Sectors it is usually built for. */
  for: string
}

/**
 * Software we build besides inventory. Each one is scoped and built to order;
 * none of these is an off-the-shelf download.
 */
export const systems: System[] = [
  { name: "Point of sale", icon: Store, for: "Retail, food, services", body: "Tills that work offline, take split payments and close the day against the cash drawer." },
  { name: "Accounting and finance", icon: Banknote, for: "Any business", body: "Invoices, expenses, bank accounts and supplier balances, with books that agree with stock." },
  { name: "HR and payroll", icon: Users, for: "Any employer", body: "Staff records, attendance, leave, payslips and statutory deductions." },
  { name: "Customer management", icon: Wallet, for: "Sales teams", body: "Leads, quotes, customer accounts and follow-ups in one place." },
  { name: "School management", icon: GraduationCap, for: "Education", body: "Admissions, fees, timetables, results and a portal for parents." },
  { name: "Clinic and hospital", icon: HeartPulse, for: "Healthcare", body: "Patient records, appointments, billing, pharmacy and lab requests." },
  { name: "Logistics and fleet", icon: Truck, for: "Transport, distribution", body: "Orders, routes, drivers, vehicles, fuel and proof of delivery." },
  { name: "Online stores", icon: ShoppingCart, for: "Retail, wholesale", body: "A storefront that sells from the same stock your shops do." },
  { name: "Project and task management", icon: KanbanSquare, for: "Agencies, construction", body: "Projects, milestones, workloads and reporting for delivery teams." },
  { name: "Bookings and appointments", icon: CalendarCheck, for: "Hospitality, services", body: "Rooms, tables, slots and deposits, with reminders that cut no-shows." },
  { name: "Property and facilities", icon: Building2, for: "Real estate", body: "Units, tenants, rent, service charges and maintenance requests." },
  { name: "Farm and agribusiness", icon: Wheat, for: "Agriculture", body: "Inputs, harvests, storage, offtakers and cost per hectare." },
]
