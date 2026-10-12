import type { LucideIcon } from "lucide-react"
import { GraduationCap, Hammer, LifeBuoy, ServerCog } from "lucide-react"

export type Service = { id: string; name: string; icon: LucideIcon; summary: string; points: string[] }

export const services: Service[] = [
  {
    id: "build",
    name: "Build",
    icon: Hammer,
    summary: "We write the system around your workflows instead of asking you to change them to suit ours.",
    points: [
      "We sit with the people who do the work and map how stock really moves",
      "Your words on every screen: shop or branch, bill or invoice",
      "Roles and approvals that mirror who is allowed to do what",
      "Your existing stock, customers and balances loaded on day one",
    ],
  },
  {
    id: "deploy",
    name: "Deploy",
    icon: ServerCog,
    summary: "The system runs where you need it: our cloud, your cloud or a server in your building.",
    points: [
      "Hosted and monitored by us, or installed on infrastructure you own",
      "Daily backups, with restores that we test",
      "Works on the computers, phones and scanners you already have",
      "Receipt printers, barcode scanners and label printers set up",
    ],
  },
  {
    id: "onboard",
    name: "Onboard",
    icon: GraduationCap,
    summary: "Every member of staff is trained on the screens they will use, in the order they will use them.",
    points: [
      "Training by role: cashier, storekeeper, manager, accountant, owner",
      "A written manual that matches your system, not a generic one",
      "A practice copy with sample data, so nobody learns on live stock",
      "We stay on site or on call through your first week of trading",
    ],
  },
  {
    id: "maintain",
    name: "Maintain",
    icon: LifeBuoy,
    summary: "The business changes after go-live. The system keeps up, and somebody answers when you call.",
    points: [
      "A named contact who knows your set-up",
      "Fixes and security updates included",
      "New reports and workflow changes as your business grows",
      "Regular checks that stock, money and reports still agree",
    ],
  },
]

export const process = [
  { step: "01", title: "Discovery", body: "We visit or call, watch how stock moves and write down every workflow, exception and report you rely on." },
  { step: "02", title: "Blueprint", body: "You get a written scope, screen sketches, a price and a delivery date before any code is written." },
  { step: "03", title: "Build", body: "We build in stages. You see working software every week or two and correct us early." },
  { step: "04", title: "Data and set-up", body: "Opening stock, price lists, customers, suppliers and staff accounts are loaded and checked against your records." },
  { step: "05", title: "Training and go-live", body: "Staff are trained by role, then we switch over on a date you choose and stay close for the first week." },
  { step: "06", title: "Care", body: "Support, updates and changes continue for as long as you run the system." },
] as const
