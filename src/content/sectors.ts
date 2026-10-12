import type { LucideIcon } from "lucide-react"
import {
  Car,
  Factory,
  HardHat,
  Pill,
  Shirt,
  ShoppingBasket,
  Smartphone,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react"

export type DemoItem = {
  id: string
  name: string
  sku: string
  /** Sector-specific columns, keyed by `DemoConfig.attrs[].key`. */
  attrs: Record<string, string>
  price: number
  cost: number
  /** Units on hand, one number per location, in `locations` order. */
  stock: number[]
  reorder: number
}

export type DemoConfig = {
  /** A made-up business. Nothing in a demo belongs to a real customer. */
  business: string
  locationNoun: string
  locations: string[]
  unit: string
  /** Each location holds different things (a kitchen and a bar), so an empty one is not a gap. */
  zoned?: boolean
  /** Wording for stock going out, where "sale" is the wrong word. */
  out?: { tab: string; cta: string; kpi: string; done: string }
  attrs: Array<{ key: string; label: string }>
  /** Sales for the last seven days, oldest first. */
  week: number[]
  items: DemoItem[]
}

export type Sector = {
  slug: string
  name: string
  icon: LucideIcon
  /** One line for cards and menus. */
  blurb: string
  headline: string
  summary: string
  /** What the system keeps count of in this sector. */
  tracks: string[]
  workflows: Array<{ title: string; body: string }>
  demo: DemoConfig
}

export const sectors: Sector[] = [
  {
    slug: "phones-electronics",
    name: "Phones and electronics",
    icon: Smartphone,
    blurb: "Every unit tracked by IMEI or serial number, from supplier to customer.",
    headline: "Every phone accounted for, by serial number.",
    summary:
      "High-value stock walks out of shops when nobody can say which unit went where. This system records each device by IMEI or serial number, so a phone is always in one known place: a shop, in transit, with a customer, or back at the supplier.",
    tracks: ["IMEI and serial numbers", "Cost, lowest and selling price", "Swap and trade-in deals", "Repairs and warranty", "Part payments on a sale"],
    workflows: [
      {
        title: "Scan to sell",
        body: "The cashier scans the unit. The system checks it belongs to that shop, applies the price rules for their role and prints the receipt.",
      },
      {
        title: "Shop-to-shop transfers",
        body: "One shop sends, the other confirms receipt. Both names are recorded, and stock in transit belongs to neither shop until it is accepted.",
      },
      {
        title: "Returns with a ceiling",
        body: "A return can never be worth more than the item sold for, and the same unit cannot come back twice.",
      },
      {
        title: "Send back to supplier",
        body: "Faulty units are scanned into a list, reviewed, then sent in one batch against the supplier's bill.",
      },
    ],
    demo: {
      business: "Northgate Mobile",
      locationNoun: "Shop",
      locations: ["High Street", "Mall Kiosk", "Vault"],
      unit: "unit",
      attrs: [
        { key: "storage", label: "Storage" },
        { key: "tracking", label: "Tracked by" },
      ],
      week: [4210, 3890, 5120, 4630, 6240, 7810, 5390],
      items: [
        { id: "p1", name: "Apex 15 Pro", sku: "APX-15P-256", attrs: { storage: "256 GB", tracking: "IMEI" }, price: 999, cost: 842, stock: [6, 2, 14], reorder: 8 },
        { id: "p2", name: "Apex 15", sku: "APX-15-128", attrs: { storage: "128 GB", tracking: "IMEI" }, price: 799, cost: 671, stock: [9, 4, 20], reorder: 10 },
        { id: "p3", name: "Nova S24", sku: "NVA-S24-256", attrs: { storage: "256 GB", tracking: "IMEI" }, price: 849, cost: 705, stock: [5, 3, 11], reorder: 8 },
        { id: "p4", name: "Nova A55", sku: "NVA-A55-128", attrs: { storage: "128 GB", tracking: "IMEI" }, price: 379, cost: 301, stock: [12, 7, 26], reorder: 12 },
        { id: "p5", name: "Lumen Tab 11", sku: "LMN-T11-128", attrs: { storage: "128 GB", tracking: "Serial" }, price: 449, cost: 362, stock: [3, 0, 5], reorder: 6 },
        { id: "p6", name: "Orbit Buds 3", sku: "ORB-B3", attrs: { storage: "-", tracking: "Serial" }, price: 129, cost: 84, stock: [18, 11, 40], reorder: 20 },
        { id: "p7", name: "20W fast charger", sku: "ACC-CHG-20", attrs: { storage: "-", tracking: "Quantity" }, price: 24, cost: 9, stock: [44, 27, 120], reorder: 40 },
        { id: "p8", name: "Clear case, Apex 15", sku: "ACC-CSE-A15", attrs: { storage: "-", tracking: "Quantity" }, price: 15, cost: 4, stock: [31, 2, 60], reorder: 25 },
      ],
    },
  },
  {
    slug: "pharmacy",
    name: "Pharmacy and healthcare",
    icon: Pill,
    blurb: "Batch numbers and expiry dates on every pack, with the oldest stock sold first.",
    headline: "Nothing expires on the shelf unnoticed.",
    summary:
      "Medicines are counted by batch, not just by name. The system knows which batch each pack came from and when it expires, tells staff which one to dispense first and warns you months before stock goes out of date.",
    tracks: ["Batch and lot numbers", "Expiry dates", "Prescription-only items", "Pack and unit sizes", "Supplier recalls"],
    workflows: [
      {
        title: "First to expire, first out",
        body: "At the counter the system picks the batch that expires soonest, so older stock never gets buried behind new deliveries.",
      },
      {
        title: "Expiry watch",
        body: "A running list of what expires in 30, 60 and 90 days, by branch, with the value at risk.",
      },
      {
        title: "Recall by batch",
        body: "Type a batch number and see every branch holding it and every sale it went out on.",
      },
      {
        title: "Controlled items",
        body: "Prescription-only lines need a named pharmacist to approve the sale. Each approval is logged.",
      },
    ],
    demo: {
      business: "Greenleaf Pharmacy",
      locationNoun: "Branch",
      locations: ["Central", "Riverside", "Store room"],
      unit: "pack",
      attrs: [
        { key: "batch", label: "Batch" },
        { key: "expiry", label: "Expires" },
      ],
      week: [1840, 2110, 1960, 2380, 2540, 2990, 1720],
      items: [
        { id: "m1", name: "Amoxicillin 500 mg caps", sku: "AMX-500-21", attrs: { batch: "B24-1187", expiry: "Mar 2027" }, price: 8.5, cost: 4.2, stock: [42, 30, 160], reorder: 60 },
        { id: "m2", name: "Paracetamol 500 mg tabs", sku: "PCM-500-100", attrs: { batch: "B25-0031", expiry: "Aug 2028" }, price: 3.2, cost: 1.1, stock: [120, 86, 400], reorder: 150 },
        { id: "m3", name: "Metformin 850 mg tabs", sku: "MET-850-56", attrs: { batch: "B24-2204", expiry: "Jan 2027" }, price: 6.9, cost: 3.4, stock: [28, 14, 90], reorder: 40 },
        { id: "m4", name: "Salbutamol inhaler 100 mcg", sku: "SAL-INH-100", attrs: { batch: "B24-0919", expiry: "Dec 2026" }, price: 11.5, cost: 6.8, stock: [9, 4, 20], reorder: 18 },
        { id: "m5", name: "Oral rehydration salts", sku: "ORS-20", attrs: { batch: "B25-0412", expiry: "May 2028" }, price: 4.4, cost: 1.9, stock: [36, 22, 110], reorder: 40 },
        { id: "m6", name: "Insulin glargine 100 U/ml", sku: "INS-GLA-5", attrs: { batch: "B25-0760", expiry: "Nov 2026" }, price: 48, cost: 36.5, stock: [6, 0, 12], reorder: 10 },
        { id: "m7", name: "Vitamin C 1000 mg", sku: "VTC-1000-30", attrs: { batch: "B25-0288", expiry: "Feb 2028" }, price: 7.8, cost: 3.6, stock: [54, 41, 140], reorder: 50 },
        { id: "m8", name: "Digital thermometer", sku: "DEV-THM-01", attrs: { batch: "-", expiry: "-" }, price: 12, cost: 5.5, stock: [14, 9, 30], reorder: 12 },
      ],
    },
  },
  {
    slug: "supermarket",
    name: "Supermarkets and grocery",
    icon: ShoppingBasket,
    blurb: "Barcode scanning, cartons broken into singles and reorder points that keep shelves full.",
    headline: "Full shelves, fewer write-offs.",
    summary:
      "A grocery store sells thousands of lines at thin margins. The system is built for speed at the till and for the back office: buy by the carton, sell by the piece, reorder before a line runs out and see shrinkage by aisle.",
    tracks: ["Barcodes", "Carton, pack and single units", "Reorder points", "Shrinkage and wastage", "Promotions and price changes"],
    workflows: [
      {
        title: "Buy in cartons, sell in singles",
        body: "Receive 20 cartons of 24. The system holds 480 pieces and works out the cost of each one.",
      },
      {
        title: "Reorder list every morning",
        body: "Lines below their reorder point are listed by supplier, ready to turn into a purchase order.",
      },
      {
        title: "Stock counts that match",
        body: "Count an aisle on a phone. Differences go to a manager to approve before the numbers change.",
      },
      {
        title: "Price changes with a start date",
        body: "Set next week's promotion today. Tills pick it up at opening time and drop it when it ends.",
      },
    ],
    demo: {
      business: "Daily Basket",
      locationNoun: "Store",
      locations: ["Main Street", "Parkview", "Depot"],
      unit: "piece",
      attrs: [
        { key: "pack", label: "Bought as" },
        { key: "aisle", label: "Aisle" },
      ],
      week: [6120, 5840, 6010, 6490, 7930, 9870, 8450],
      items: [
        { id: "g1", name: "Long grain rice 5 kg", sku: "RCE-LG-5K", attrs: { pack: "Sack of 4", aisle: "A3" }, price: 9.4, cost: 7.1, stock: [38, 24, 220], reorder: 60 },
        { id: "g2", name: "Sunflower oil 1 L", sku: "OIL-SF-1L", attrs: { pack: "Carton of 12", aisle: "A4" }, price: 3.9, cost: 2.8, stock: [64, 41, 360], reorder: 96 },
        { id: "g3", name: "Whole milk 1 L", sku: "MLK-WH-1L", attrs: { pack: "Crate of 12", aisle: "C1" }, price: 1.6, cost: 1.1, stock: [22, 9, 48], reorder: 48 },
        { id: "g4", name: "Free range eggs, dozen", sku: "EGG-FR-12", attrs: { pack: "Tray of 15", aisle: "C2" }, price: 4.2, cost: 3.0, stock: [30, 18, 75], reorder: 45 },
        { id: "g5", name: "Instant noodles 70 g", sku: "NDL-IN-70", attrs: { pack: "Carton of 40", aisle: "B2" }, price: 0.6, cost: 0.35, stock: [210, 160, 1200], reorder: 400 },
        { id: "g6", name: "Laundry powder 2 kg", sku: "LND-PW-2K", attrs: { pack: "Carton of 6", aisle: "D1" }, price: 7.8, cost: 5.4, stock: [17, 6, 54], reorder: 24 },
        { id: "g7", name: "Bottled water 1.5 L", sku: "WTR-15", attrs: { pack: "Pack of 6", aisle: "B5" }, price: 0.9, cost: 0.45, stock: [96, 72, 540], reorder: 180 },
        { id: "g8", name: "Tomato paste 400 g", sku: "TMT-PS-400", attrs: { pack: "Carton of 24", aisle: "A5" }, price: 1.3, cost: 0.8, stock: [58, 0, 240], reorder: 72 },
      ],
    },
  },
  {
    slug: "warehouse-distribution",
    name: "Warehousing and distribution",
    icon: Warehouse,
    blurb: "Bin locations, pick lists and dispatch notes for stock that moves by the pallet.",
    headline: "Find any pallet in under a minute.",
    summary:
      "When stock sits in racks across several sites, knowing the quantity is not enough. The system records the bin each pallet is in, builds pick lists in walking order and follows every delivery until the customer signs for it.",
    tracks: ["Bin and rack locations", "Pallets, cases and units", "Pick, pack and dispatch", "Delivery notes and proof of delivery", "Stock held for customers"],
    workflows: [
      {
        title: "Put-away with a destination",
        body: "Goods in are scanned and given a bin. Nobody has to remember where a delivery went.",
      },
      {
        title: "Pick lists in walking order",
        body: "Orders are grouped and sorted by aisle, so a picker makes one trip instead of five.",
      },
      {
        title: "Dispatch and proof of delivery",
        body: "Each load leaves with a delivery note. The driver captures a signature and the order closes itself.",
      },
      {
        title: "Cycle counts",
        body: "Count a few bins every day instead of closing the warehouse once a year.",
      },
    ],
    demo: {
      business: "Portside Distribution",
      out: { tab: "Dispatch", cta: "Dispatch order", kpi: "Dispatched today", done: "Order dispatched" },
      locationNoun: "Site",
      locations: ["Dock A", "Dock B", "Overflow"],
      unit: "case",
      attrs: [
        { key: "bin", label: "Bin" },
        { key: "pallet", label: "Per pallet" },
      ],
      week: [18400, 21250, 19800, 24100, 26700, 12900, 8300],
      items: [
        { id: "w1", name: "Carbonated drink 330 ml x24", sku: "BEV-CD-330", attrs: { bin: "A-04-2", pallet: "80 cases" }, price: 14.5, cost: 11.2, stock: [640, 320, 160], reorder: 400 },
        { id: "w2", name: "Cooking oil 5 L x4", sku: "OIL-5L-4", attrs: { bin: "A-11-1", pallet: "48 cases" }, price: 38, cost: 31.5, stock: [192, 96, 48], reorder: 144 },
        { id: "w3", name: "Detergent 1 kg x12", sku: "DET-1K-12", attrs: { bin: "B-02-3", pallet: "60 cases" }, price: 27, cost: 21.4, stock: [240, 180, 0], reorder: 180 },
        { id: "w4", name: "Biscuits assorted x48", sku: "BSC-AS-48", attrs: { bin: "B-07-1", pallet: "72 cases" }, price: 19.2, cost: 14.8, stock: [144, 72, 72], reorder: 144 },
        { id: "w5", name: "Tissue rolls x40", sku: "TIS-RL-40", attrs: { bin: "C-01-4", pallet: "30 cases" }, price: 22.5, cost: 17.9, stock: [60, 30, 90], reorder: 90 },
        { id: "w6", name: "Baby diapers M x6", sku: "DPR-M-6", attrs: { bin: "C-05-2", pallet: "40 cases" }, price: 46, cost: 38.2, stock: [32, 0, 40], reorder: 80 },
        { id: "w7", name: "Canned tomatoes 400 g x24", sku: "CAN-TM-24", attrs: { bin: "A-09-3", pallet: "90 cases" }, price: 16.8, cost: 12.9, stock: [270, 180, 90], reorder: 180 },
        { id: "w8", name: "Bottled water 500 ml x24", sku: "WTR-500-24", attrs: { bin: "D-01-1", pallet: "72 cases" }, price: 6.4, cost: 4.1, stock: [432, 288, 216], reorder: 360 },
      ],
    },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    blurb: "Raw materials in, finished goods out, and the true cost of every production run.",
    headline: "Know what each batch really cost to make.",
    summary:
      "A factory holds three kinds of stock at once: raw materials, work in progress and finished goods. The system moves quantities between them as production runs, using your own recipes, and reports the real cost and yield of each run.",
    tracks: ["Raw materials", "Bills of materials", "Work in progress", "Finished goods", "Yield and scrap"],
    workflows: [
      {
        title: "Bills of materials",
        body: "Define what goes into one unit. Starting a production order reserves the materials it needs.",
      },
      {
        title: "Production orders",
        body: "Issue materials to the floor, record what came off the line and what was scrapped.",
      },
      {
        title: "Shortage warnings",
        body: "Before a run starts, the system says which material will run out and by how much.",
      },
      {
        title: "Cost per batch",
        body: "Materials, labour and overheads roll into the cost of the finished goods, run by run.",
      },
    ],
    demo: {
      business: "Kessler Works",
      zoned: true,
      out: { tab: "Dispatch", cta: "Dispatch order", kpi: "Dispatched today", done: "Order dispatched" },
      locationNoun: "Area",
      locations: ["Raw store", "Shop floor", "Finished goods"],
      unit: "unit",
      attrs: [
        { key: "type", label: "Type" },
        { key: "uom", label: "Measured in" },
      ],
      week: [9200, 11400, 10800, 12600, 13100, 4200, 6900],
      items: [
        { id: "f1", name: "Steel sheet 2 mm", sku: "RM-STL-2", attrs: { type: "Raw material", uom: "Sheet" }, price: 62, cost: 48, stock: [140, 22, 0], reorder: 80 },
        { id: "f2", name: "Powder coat, black", sku: "RM-PWD-BK", attrs: { type: "Raw material", uom: "Kilogram" }, price: 9.5, cost: 6.8, stock: [210, 35, 0], reorder: 100 },
        { id: "f3", name: "M6 bolt and nut set", sku: "RM-BLT-M6", attrs: { type: "Raw material", uom: "Box of 500" }, price: 18, cost: 11.5, stock: [26, 4, 0], reorder: 40 },
        { id: "f4", name: "Hinge, 90 degree", sku: "RM-HNG-90", attrs: { type: "Raw material", uom: "Piece" }, price: 2.4, cost: 1.3, stock: [380, 120, 0], reorder: 400 },
        { id: "f5", name: "Cabinet frame, welded", sku: "WIP-CAB-FR", attrs: { type: "Work in progress", uom: "Piece" }, price: 140, cost: 96, stock: [0, 34, 0], reorder: 0 },
        { id: "f6", name: "Filing cabinet, 4 drawer", sku: "FG-CAB-4D", attrs: { type: "Finished good", uom: "Piece" }, price: 289, cost: 174, stock: [0, 0, 46], reorder: 30 },
        { id: "f7", name: "Locker, 6 door", sku: "FG-LKR-6D", attrs: { type: "Finished good", uom: "Piece" }, price: 412, cost: 256, stock: [0, 0, 12], reorder: 15 },
        { id: "f8", name: "Shelving unit, 5 tier", sku: "FG-SHL-5T", attrs: { type: "Finished good", uom: "Piece" }, price: 168, cost: 97, stock: [0, 0, 64], reorder: 40 },
      ],
    },
  },
  {
    slug: "restaurants",
    name: "Restaurants and hospitality",
    icon: UtensilsCrossed,
    blurb: "Ingredients drawn down by recipe, wastage logged, and food cost per dish.",
    headline: "See your food cost dish by dish.",
    summary:
      "A kitchen sells plates but buys kilograms. The system holds a recipe for each dish, takes the right amount of every ingredient out of stock when the dish is sold, and shows where the difference between what was used and what should have been used is going.",
    tracks: ["Ingredients by weight and volume", "Recipes and portion sizes", "Wastage and spoilage", "Kitchen, bar and store", "Food cost percentage"],
    workflows: [
      {
        title: "Recipes that draw down stock",
        body: "Sell one plate and 180 g of chicken, 120 g of rice and 30 ml of oil leave the kitchen count.",
      },
      {
        title: "Wastage log",
        body: "Spoiled, burnt and returned food is recorded with a reason, so it shows up as a number.",
      },
      {
        title: "Store to kitchen requests",
        body: "The kitchen asks, the store issues. Nothing leaves the dry store without a name against it.",
      },
      {
        title: "Used against expected",
        body: "At week end, compare what recipes say you used with what the count says is gone.",
      },
    ],
    demo: {
      business: "Saffron Kitchen",
      zoned: true,
      out: { tab: "Issue", cta: "Issue stock", kpi: "Used today", done: "Stock issued" },
      locationNoun: "Area",
      locations: ["Kitchen", "Bar", "Dry store"],
      unit: "unit",
      attrs: [
        { key: "uom", label: "Measured in" },
        { key: "used", label: "Used in" },
      ],
      week: [640, 590, 710, 780, 1120, 1460, 980],
      items: [
        { id: "r1", name: "Chicken thigh, boneless", sku: "ING-CHK-TH", attrs: { uom: "Kilogram", used: "6 dishes" }, price: 7.2, cost: 7.2, stock: [18, 0, 0], reorder: 20 },
        { id: "r2", name: "Basmati rice", sku: "ING-RCE-BS", attrs: { uom: "Kilogram", used: "9 dishes" }, price: 2.1, cost: 2.1, stock: [12, 0, 75], reorder: 30 },
        { id: "r3", name: "Olive oil, extra virgin", sku: "ING-OIL-OV", attrs: { uom: "Litre", used: "14 dishes" }, price: 8.9, cost: 8.9, stock: [6, 1, 24], reorder: 12 },
        { id: "r4", name: "Tomatoes, plum", sku: "ING-TOM-PL", attrs: { uom: "Kilogram", used: "11 dishes" }, price: 2.6, cost: 2.6, stock: [9, 0, 0], reorder: 15 },
        { id: "r5", name: "Mozzarella", sku: "ING-CHS-MZ", attrs: { uom: "Kilogram", used: "5 dishes" }, price: 9.4, cost: 9.4, stock: [7, 0, 0], reorder: 8 },
        { id: "r6", name: "House red wine", sku: "BAR-WNE-RD", attrs: { uom: "Bottle", used: "Bar menu" }, price: 11, cost: 11, stock: [0, 28, 36], reorder: 24 },
        { id: "r7", name: "Lager, 330 ml", sku: "BAR-LGR-330", attrs: { uom: "Bottle", used: "Bar menu" }, price: 1.4, cost: 1.4, stock: [0, 96, 240], reorder: 120 },
        { id: "r8", name: "Takeaway boxes", sku: "PKG-BOX-M", attrs: { uom: "Sleeve of 50", used: "Delivery" }, price: 6.5, cost: 6.5, stock: [3, 0, 4], reorder: 10 },
      ],
    },
  },
  {
    slug: "fashion-retail",
    name: "Fashion and apparel",
    icon: Shirt,
    blurb: "One style, many sizes and colours, counted separately and reported together.",
    headline: "Know which sizes sell before you reorder.",
    summary:
      "A single shirt can be thirty different stock lines once size and colour are counted. The system keeps each one separate at the till and rolls them up for buying, so you can see that medium in navy is gone while extra large in white has not moved.",
    tracks: ["Size and colour variants", "Seasons and collections", "Barcode labels", "Markdowns", "Exchanges and store credit"],
    workflows: [
      {
        title: "Variant grid",
        body: "Enter a style once, tick the sizes and colours, and receive a delivery against the whole grid.",
      },
      {
        title: "Sell-through by size",
        body: "See what share of each size has sold, so the next order matches what customers buy.",
      },
      {
        title: "Exchanges",
        body: "Swap a size in one step. The old item goes back on the rail and the difference is settled.",
      },
      {
        title: "End-of-season markdowns",
        body: "Mark down a collection by date. Margin reports show what the clearance really cost.",
      },
    ],
    demo: {
      business: "Loom & Thread",
      locationNoun: "Store",
      locations: ["Flagship", "Outlet", "Stockroom"],
      unit: "piece",
      attrs: [
        { key: "size", label: "Size" },
        { key: "colour", label: "Colour" },
      ],
      week: [2910, 2540, 3120, 3380, 5210, 7460, 6120],
      items: [
        { id: "a1", name: "Oxford shirt", sku: "OXF-NVY-M", attrs: { size: "M", colour: "Navy" }, price: 58, cost: 21, stock: [2, 0, 4], reorder: 10 },
        { id: "a2", name: "Oxford shirt", sku: "OXF-WHT-XL", attrs: { size: "XL", colour: "White" }, price: 58, cost: 21, stock: [14, 9, 30], reorder: 10 },
        { id: "a3", name: "Slim chinos", sku: "CHN-KHK-32", attrs: { size: "32", colour: "Khaki" }, price: 72, cost: 28, stock: [8, 5, 18], reorder: 12 },
        { id: "a4", name: "Linen dress", sku: "LDR-OLV-S", attrs: { size: "S", colour: "Olive" }, price: 96, cost: 37, stock: [6, 3, 10], reorder: 8 },
        { id: "a5", name: "Linen dress", sku: "LDR-OLV-M", attrs: { size: "M", colour: "Olive" }, price: 96, cost: 37, stock: [1, 0, 0], reorder: 8 },
        { id: "a6", name: "Merino crew neck", sku: "MRN-GRY-L", attrs: { size: "L", colour: "Grey" }, price: 110, cost: 46, stock: [9, 6, 22], reorder: 10 },
        { id: "a7", name: "Canvas sneakers", sku: "SNK-WHT-42", attrs: { size: "42", colour: "White" }, price: 84, cost: 33, stock: [7, 4, 16], reorder: 10 },
        { id: "a8", name: "Leather belt", sku: "BLT-BRN-90", attrs: { size: "90 cm", colour: "Brown" }, price: 39, cost: 13, stock: [15, 11, 40], reorder: 15 },
      ],
    },
  },
  {
    slug: "auto-parts",
    name: "Auto parts and workshops",
    icon: Car,
    blurb: "Part numbers, the vehicles each part fits, and parts used on every job card.",
    headline: "The right part, for the right vehicle, first time.",
    summary:
      "Parts counters lose sales when staff cannot tell quickly whether a part fits. The system stores part numbers with their equivalents and the vehicles they fit, and ties parts taken from the shelf to the job card they were used on.",
    tracks: ["Part numbers and equivalents", "Vehicle fitment", "Job cards", "Core returns and warranty", "Fast and slow movers"],
    workflows: [
      {
        title: "Search by vehicle",
        body: "Pick make, model and year. The counter sees every part that fits and where it is.",
      },
      {
        title: "Parts on the job card",
        body: "Parts issued to a mechanic are charged to the job, so the customer's invoice is complete.",
      },
      {
        title: "Equivalent parts",
        body: "Out of the original? The system offers the aftermarket numbers that replace it.",
      },
      {
        title: "Dead stock report",
        body: "Parts that have not moved in six months, with the cash tied up in them.",
      },
    ],
    demo: {
      business: "Gearbox Parts",
      locationNoun: "Branch",
      locations: ["Counter", "Workshop", "Warehouse"],
      unit: "piece",
      attrs: [
        { key: "part", label: "Part no." },
        { key: "fits", label: "Fits" },
      ],
      week: [3180, 3620, 3410, 3990, 4480, 5210, 1240],
      items: [
        { id: "c1", name: "Oil filter", sku: "FLT-OIL-118", attrs: { part: "90915-YZZF2", fits: "Corolla 2014-19" }, price: 9.5, cost: 4.8, stock: [24, 6, 80], reorder: 30 },
        { id: "c2", name: "Front brake pads", sku: "BRK-PAD-F22", attrs: { part: "04465-02220", fits: "Corolla 2014-19" }, price: 46, cost: 27, stock: [8, 2, 20], reorder: 12 },
        { id: "c3", name: "Spark plug, iridium", sku: "SPK-IR-6", attrs: { part: "ILKAR7B11", fits: "Civic 2016-21" }, price: 14, cost: 7.9, stock: [32, 8, 96], reorder: 40 },
        { id: "c4", name: "Air filter", sku: "FLT-AIR-204", attrs: { part: "17801-21050", fits: "Yaris 2012-18" }, price: 18, cost: 9.6, stock: [5, 0, 14], reorder: 12 },
        { id: "c5", name: "Timing belt kit", sku: "BLT-TMG-K3", attrs: { part: "TB-K3-204", fits: "Golf 2010-14" }, price: 128, cost: 84, stock: [2, 1, 4], reorder: 4 },
        { id: "c6", name: "Battery 12 V 60 Ah", sku: "BAT-12-60", attrs: { part: "DIN60-MF", fits: "Most saloons" }, price: 96, cost: 68, stock: [6, 0, 18], reorder: 10 },
        { id: "c7", name: "Engine oil 5W-30, 4 L", sku: "OIL-5W30-4", attrs: { part: "5W30-SN-4L", fits: "Petrol engines" }, price: 34, cost: 22, stock: [18, 9, 60], reorder: 24 },
        { id: "c8", name: "Wiper blade 24 in", sku: "WPR-24", attrs: { part: "WB-24-U", fits: "Universal hook" }, price: 11, cost: 4.9, stock: [26, 4, 70], reorder: 20 },
      ],
    },
  },
  {
    slug: "building-materials",
    name: "Building materials and hardware",
    icon: HardHat,
    blurb: "Bags, tonnes and lengths on one invoice, sold on account and delivered to site.",
    headline: "Heavy stock, sold on credit, kept in balance.",
    summary:
      "Builders' merchants sell in mixed units, deliver most of what they sell and carry large customer balances. The system handles a tonne of sand next to 40 lengths of rebar, tracks what is paid for but not yet collected and keeps each contractor's account straight.",
    tracks: ["Bags, tonnes, lengths and pieces", "Yard and depot stock", "Customer credit limits", "Paid but not yet collected", "Delivery by truck"],
    workflows: [
      {
        title: "Mixed-unit invoices",
        body: "Cement by the bag, sand by the tonne and rebar by the length, priced and counted properly.",
      },
      {
        title: "Customer accounts",
        body: "Each contractor has a limit and a running balance. Payments are matched to invoices.",
      },
      {
        title: "Collect later",
        body: "A customer pays for 200 bags and takes 50. The other 150 are held in their name.",
      },
      {
        title: "Delivery runs",
        body: "Load a truck from several invoices and close each drop when the site signs for it.",
      },
    ],
    demo: {
      business: "Stonebridge Supplies",
      zoned: true,
      locationNoun: "Yard",
      locations: ["Main yard", "East depot", "Showroom"],
      unit: "unit",
      attrs: [
        { key: "uom", label: "Sold by" },
        { key: "grade", label: "Grade" },
      ],
      week: [14200, 16800, 15100, 19400, 21700, 17300, 3100],
      items: [
        { id: "b1", name: "Portland cement", sku: "CEM-PRT-50", attrs: { uom: "50 kg bag", grade: "42.5N" }, price: 8.2, cost: 6.9, stock: [820, 460, 0], reorder: 600 },
        { id: "b2", name: "Sharp sand", sku: "SND-SHP", attrs: { uom: "Tonne", grade: "Washed" }, price: 31, cost: 22, stock: [64, 38, 0], reorder: 40 },
        { id: "b3", name: "Rebar 12 mm", sku: "RBR-12-12", attrs: { uom: "12 m length", grade: "B500B" }, price: 12.4, cost: 9.8, stock: [540, 210, 0], reorder: 300 },
        { id: "b4", name: "Concrete block 6 in", sku: "BLK-6", attrs: { uom: "Piece", grade: "Hollow" }, price: 0.85, cost: 0.52, stock: [4200, 1800, 0], reorder: 3000 },
        { id: "b5", name: "Roofing sheet 0.45 mm", sku: "RFS-045-3", attrs: { uom: "3 m sheet", grade: "Aluzinc" }, price: 14.6, cost: 11.2, stock: [120, 0, 0], reorder: 150 },
        { id: "b6", name: "PVC pipe 4 in", sku: "PVC-4-6", attrs: { uom: "6 m length", grade: "Pressure" }, price: 19, cost: 13.5, stock: [86, 42, 6], reorder: 60 },
        { id: "b7", name: "Emulsion paint, white", sku: "PNT-EMU-20", attrs: { uom: "20 L bucket", grade: "Matt" }, price: 44, cost: 31, stock: [22, 10, 14], reorder: 50 },
        { id: "b8", name: "Ceramic floor tile 60x60", sku: "TLE-60-GRY", attrs: { uom: "Box of 4", grade: "First" }, price: 17.5, cost: 12.1, stock: [140, 60, 24], reorder: 120 },
      ],
    },
  },
]

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug)
}
