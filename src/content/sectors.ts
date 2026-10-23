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
  /** A short label for tight spaces, such as button text. */
  short: string
  /** The label on the home page sector tabs. */
  tab: string
  icon: LucideIcon
  /** One line for cards and menus. */
  blurb: string
  headline: string
  summary: string
  /**
   * "ready": StockVaults does this today, as it does for the phone shops it
   * already runs. "on-request": the sector's own parts (its tracks and
   * workflows) are built for the customer before go-live, and the demo is a
   * preview of that version, not software that exists yet.
   */
  availability: "ready" | "on-request"
  /**
   * The industry setup in the StockVaults app that this sector opens as a full
   * demo: the visitor's own made-up business, kept for a day. None where no
   * setup fits closely enough yet.
   */
  setup?: "retail" | "phones" | "pharmacy" | "hospital" | "restaurant" | "hardware" | "distribution" | "office"
  /** What the system keeps count of in this sector. */
  tracks: string[]
  workflows: Array<{ title: string; body: string }>
  demo: DemoConfig
  /**
   * Four lines of the demo's stock at one location, for the sector picker.
   * `detail` fills the one column that is different in this trade.
   */
  sample: { column: string; location: number; rows: Array<{ id: string; detail: string }> }
}

export const sectors: Sector[] = [
  {
    slug: "phones-electronics",
    setup: "phones",
    availability: "ready",
    name: "Phones and electronics",
    short: "Electronics",
    tab: "Phones and electronics",
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
      locations: ["Iwo Road", "Dugbe", "Warehouse"],
      unit: "unit",
      attrs: [
        { key: "storage", label: "Storage" },
        { key: "tracking", label: "Tracked by" },
      ],
      week: [4_210_000, 3_890_000, 5_120_000, 4_630_000, 6_240_000, 7_810_000, 5_390_000],
      items: [
        { id: "p1", name: "Apex 15 Pro", sku: "APX-15P-256", attrs: { storage: "256 GB", tracking: "IMEI" }, price: 999_000, cost: 842_000, stock: [6, 2, 14], reorder: 8 },
        { id: "p2", name: "Apex 15", sku: "APX-15-128", attrs: { storage: "128 GB", tracking: "IMEI" }, price: 799_000, cost: 671_000, stock: [9, 4, 20], reorder: 10 },
        { id: "p3", name: "Nova S24", sku: "NVA-S24-256", attrs: { storage: "256 GB", tracking: "IMEI" }, price: 849_000, cost: 705_000, stock: [5, 3, 11], reorder: 8 },
        { id: "p4", name: "Nova A55", sku: "NVA-A55-128", attrs: { storage: "128 GB", tracking: "IMEI" }, price: 379_000, cost: 301_000, stock: [12, 7, 26], reorder: 12 },
        { id: "p5", name: "Lumen Tab 11", sku: "LMN-T11-128", attrs: { storage: "128 GB", tracking: "Serial" }, price: 449_000, cost: 362_000, stock: [3, 0, 5], reorder: 6 },
        { id: "p6", name: "Orbit Buds 3", sku: "ORB-B3", attrs: { storage: "-", tracking: "Serial" }, price: 129_000, cost: 84_000, stock: [18, 11, 40], reorder: 20 },
        { id: "p7", name: "20W fast charger", sku: "ACC-CHG-20", attrs: { storage: "-", tracking: "Quantity" }, price: 24_000, cost: 9_000, stock: [44, 27, 120], reorder: 40 },
        { id: "p8", name: "Clear case, Apex 15", sku: "ACC-CSE-A15", attrs: { storage: "-", tracking: "Quantity" }, price: 15_000, cost: 4_000, stock: [31, 2, 60], reorder: 25 },
      ],
    },
    sample: { column: "IMEI / serial", location: 0, rows: [{ id: "p1", detail: "…2074" }, { id: "p3", detail: "…8812" }, { id: "p6", detail: "batch OB-41" }, { id: "p2", detail: "…5530" }] },
  },
  {
    slug: "pharmacy",
    setup: "pharmacy",
    availability: "on-request",
    name: "Pharmacy and healthcare",
    short: "Pharmacy",
    tab: "Pharmacy",
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
      week: [1_840_000, 2_110_000, 1_960_000, 2_380_000, 2_540_000, 2_990_000, 1_720_000],
      items: [
        { id: "m1", name: "Amoxicillin 500 mg caps", sku: "AMX-500-21", attrs: { batch: "B24-1187", expiry: "Mar 2027" }, price: 8_500, cost: 4_200, stock: [42, 30, 160], reorder: 60 },
        { id: "m2", name: "Paracetamol 500 mg tabs", sku: "PCM-500-100", attrs: { batch: "B25-0031", expiry: "Aug 2028" }, price: 3_200, cost: 1_100, stock: [120, 86, 400], reorder: 150 },
        { id: "m3", name: "Metformin 850 mg tabs", sku: "MET-850-56", attrs: { batch: "B24-2204", expiry: "Jan 2027" }, price: 6_900, cost: 3_400, stock: [28, 14, 90], reorder: 40 },
        { id: "m4", name: "Salbutamol inhaler 100 mcg", sku: "SAL-INH-100", attrs: { batch: "B24-0919", expiry: "Dec 2026" }, price: 11_500, cost: 6_800, stock: [9, 4, 20], reorder: 18 },
        { id: "m5", name: "Oral rehydration salts", sku: "ORS-20", attrs: { batch: "B25-0412", expiry: "May 2028" }, price: 4_400, cost: 1_900, stock: [36, 22, 110], reorder: 40 },
        { id: "m6", name: "Insulin glargine 100 U/ml", sku: "INS-GLA-5", attrs: { batch: "B25-0760", expiry: "Nov 2026" }, price: 48_000, cost: 36_500, stock: [6, 0, 12], reorder: 10 },
        { id: "m7", name: "Vitamin C 1000 mg", sku: "VTC-1000-30", attrs: { batch: "B25-0288", expiry: "Feb 2028" }, price: 7_800, cost: 3_600, stock: [54, 41, 140], reorder: 50 },
        { id: "m8", name: "Digital thermometer", sku: "DEV-THM-01", attrs: { batch: "-", expiry: "-" }, price: 12_000, cost: 5_500, stock: [14, 9, 30], reorder: 12 },
      ],
    },
    sample: { column: "Batch and expiry", location: 0, rows: [{ id: "m1", detail: "B24-1187 · Mar 2027" }, { id: "m4", detail: "B24-0919 · Dec 2026" }, { id: "m6", detail: "B25-0760 · Nov 2026" }, { id: "m2", detail: "B25-0031 · Aug 2028" }] },
  },
  {
    slug: "supermarket",
    setup: "retail",
    availability: "on-request",
    name: "Supermarkets and grocery",
    short: "Grocery",
    tab: "Supermarkets",
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
      week: [6_120_000, 5_840_000, 6_010_000, 6_490_000, 7_930_000, 9_870_000, 8_450_000],
      items: [
        { id: "g1", name: "Long grain rice 5 kg", sku: "RCE-LG-5K", attrs: { pack: "Sack of 4", aisle: "A3" }, price: 9_400, cost: 7_100, stock: [38, 24, 220], reorder: 60 },
        { id: "g2", name: "Sunflower oil 1 L", sku: "OIL-SF-1L", attrs: { pack: "Carton of 12", aisle: "A4" }, price: 3_900, cost: 2_800, stock: [64, 41, 360], reorder: 96 },
        { id: "g3", name: "Whole milk 1 L", sku: "MLK-WH-1L", attrs: { pack: "Crate of 12", aisle: "C1" }, price: 1_600, cost: 1_100, stock: [22, 9, 48], reorder: 48 },
        { id: "g4", name: "Free range eggs, dozen", sku: "EGG-FR-12", attrs: { pack: "Tray of 15", aisle: "C2" }, price: 4_200, cost: 3_000, stock: [30, 18, 75], reorder: 45 },
        { id: "g5", name: "Instant noodles 70 g", sku: "NDL-IN-70", attrs: { pack: "Carton of 40", aisle: "B2" }, price: 600, cost: 350, stock: [210, 160, 1200], reorder: 400 },
        { id: "g6", name: "Laundry powder 2 kg", sku: "LND-PW-2K", attrs: { pack: "Carton of 6", aisle: "D1" }, price: 7_800, cost: 5_400, stock: [17, 6, 54], reorder: 24 },
        { id: "g7", name: "Bottled water 1.5 L", sku: "WTR-15", attrs: { pack: "Pack of 6", aisle: "B5" }, price: 900, cost: 450, stock: [96, 72, 540], reorder: 180 },
        { id: "g8", name: "Tomato paste 400 g", sku: "TMT-PS-400", attrs: { pack: "Carton of 24", aisle: "A5" }, price: 1_300, cost: 800, stock: [58, 0, 240], reorder: 72 },
      ],
    },
    sample: { column: "Barcode", location: 1, rows: [{ id: "g2", detail: "6154000120341" }, { id: "g3", detail: "6154000310872" }, { id: "g6", detail: "6154000542119" }, { id: "g8", detail: "6154000208456" }] },
  },
  {
    slug: "warehouse-distribution",
    setup: "distribution",
    availability: "on-request",
    name: "Warehousing and distribution",
    short: "Warehouse",
    tab: "Warehousing",
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
      week: [18_400_000, 21_250_000, 19_800_000, 24_100_000, 26_700_000, 12_900_000, 8_300_000],
      items: [
        { id: "w1", name: "Carbonated drink 330 ml x24", sku: "BEV-CD-330", attrs: { bin: "A-04-2", pallet: "80 cases" }, price: 14_500, cost: 11_200, stock: [640, 320, 160], reorder: 400 },
        { id: "w2", name: "Cooking oil 5 L x4", sku: "OIL-5L-4", attrs: { bin: "A-11-1", pallet: "48 cases" }, price: 38_000, cost: 31_500, stock: [192, 96, 48], reorder: 144 },
        { id: "w3", name: "Detergent 1 kg x12", sku: "DET-1K-12", attrs: { bin: "B-02-3", pallet: "60 cases" }, price: 27_000, cost: 21_400, stock: [240, 180, 0], reorder: 180 },
        { id: "w4", name: "Biscuits assorted x48", sku: "BSC-AS-48", attrs: { bin: "B-07-1", pallet: "72 cases" }, price: 19_200, cost: 14_800, stock: [144, 72, 72], reorder: 144 },
        { id: "w5", name: "Tissue rolls x40", sku: "TIS-RL-40", attrs: { bin: "C-01-4", pallet: "30 cases" }, price: 22_500, cost: 17_900, stock: [60, 30, 90], reorder: 90 },
        { id: "w6", name: "Baby diapers M x6", sku: "DPR-M-6", attrs: { bin: "C-05-2", pallet: "40 cases" }, price: 46_000, cost: 38_200, stock: [32, 0, 40], reorder: 80 },
        { id: "w7", name: "Canned tomatoes 400 g x24", sku: "CAN-TM-24", attrs: { bin: "A-09-3", pallet: "90 cases" }, price: 16_800, cost: 12_900, stock: [270, 180, 90], reorder: 180 },
        { id: "w8", name: "Bottled water 500 ml x24", sku: "WTR-500-24", attrs: { bin: "D-01-1", pallet: "72 cases" }, price: 6_400, cost: 4_100, stock: [432, 288, 216], reorder: 360 },
      ],
    },
    sample: { column: "Bin", location: 1, rows: [{ id: "w2", detail: "A-11-1" }, { id: "w3", detail: "B-02-3" }, { id: "w5", detail: "C-01-4" }, { id: "w6", detail: "C-05-2" }] },
  },
  {
    slug: "manufacturing",
    availability: "on-request",
    name: "Manufacturing",
    short: "Manufacturing",
    tab: "Manufacturing",
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
      week: [9_200_000, 11_400_000, 10_800_000, 12_600_000, 13_100_000, 4_200_000, 6_900_000],
      items: [
        { id: "f1", name: "Steel sheet 2 mm", sku: "RM-STL-2", attrs: { type: "Raw material", uom: "Sheet" }, price: 62_000, cost: 48_000, stock: [140, 22, 0], reorder: 80 },
        { id: "f2", name: "Powder coat, black", sku: "RM-PWD-BK", attrs: { type: "Raw material", uom: "Kilogram" }, price: 9_500, cost: 6_800, stock: [210, 35, 0], reorder: 100 },
        { id: "f3", name: "M6 bolt and nut set", sku: "RM-BLT-M6", attrs: { type: "Raw material", uom: "Box of 500" }, price: 18_000, cost: 11_500, stock: [26, 4, 0], reorder: 40 },
        { id: "f4", name: "Hinge, 90 degree", sku: "RM-HNG-90", attrs: { type: "Raw material", uom: "Piece" }, price: 2_400, cost: 1_300, stock: [380, 120, 0], reorder: 400 },
        { id: "f5", name: "Cabinet frame, welded", sku: "WIP-CAB-FR", attrs: { type: "Work in progress", uom: "Piece" }, price: 140_000, cost: 96_000, stock: [0, 34, 0], reorder: 0 },
        { id: "f6", name: "Filing cabinet, 4 drawer", sku: "FG-CAB-4D", attrs: { type: "Finished good", uom: "Piece" }, price: 289_000, cost: 174_000, stock: [0, 0, 46], reorder: 30 },
        { id: "f7", name: "Locker, 6 door", sku: "FG-LKR-6D", attrs: { type: "Finished good", uom: "Piece" }, price: 412_000, cost: 256_000, stock: [0, 0, 12], reorder: 15 },
        { id: "f8", name: "Shelving unit, 5 tier", sku: "FG-SHL-5T", attrs: { type: "Finished good", uom: "Piece" }, price: 168_000, cost: 97_000, stock: [0, 0, 64], reorder: 40 },
      ],
    },
    sample: { column: "Stage", location: 1, rows: [{ id: "f1", detail: "Raw material" }, { id: "f3", detail: "Raw material" }, { id: "f4", detail: "Raw material" }, { id: "f5", detail: "Work in progress" }] },
  },
  {
    slug: "restaurants",
    setup: "restaurant",
    availability: "on-request",
    name: "Restaurants and hospitality",
    short: "Restaurants",
    tab: "Restaurants",
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
      week: [640_000, 590_000, 710_000, 780_000, 1_120_000, 1_460_000, 980_000],
      items: [
        { id: "r1", name: "Chicken thigh, boneless", sku: "ING-CHK-TH", attrs: { uom: "Kilogram", used: "6 dishes" }, price: 7_200, cost: 7_200, stock: [18, 0, 0], reorder: 20 },
        { id: "r2", name: "Basmati rice", sku: "ING-RCE-BS", attrs: { uom: "Kilogram", used: "9 dishes" }, price: 2_100, cost: 2_100, stock: [12, 0, 75], reorder: 30 },
        { id: "r3", name: "Olive oil, extra virgin", sku: "ING-OIL-OV", attrs: { uom: "Litre", used: "14 dishes" }, price: 8_900, cost: 8_900, stock: [6, 1, 24], reorder: 12 },
        { id: "r4", name: "Tomatoes, plum", sku: "ING-TOM-PL", attrs: { uom: "Kilogram", used: "11 dishes" }, price: 2_600, cost: 2_600, stock: [9, 0, 0], reorder: 15 },
        { id: "r5", name: "Mozzarella", sku: "ING-CHS-MZ", attrs: { uom: "Kilogram", used: "5 dishes" }, price: 9_400, cost: 9_400, stock: [7, 0, 0], reorder: 8 },
        { id: "r6", name: "House red wine", sku: "BAR-WNE-RD", attrs: { uom: "Bottle", used: "Bar menu" }, price: 11_000, cost: 11_000, stock: [0, 28, 36], reorder: 24 },
        { id: "r7", name: "Lager, 330 ml", sku: "BAR-LGR-330", attrs: { uom: "Bottle", used: "Bar menu" }, price: 1_400, cost: 1_400, stock: [0, 96, 240], reorder: 120 },
        { id: "r8", name: "Takeaway boxes", sku: "PKG-BOX-M", attrs: { uom: "Sleeve of 50", used: "Delivery" }, price: 6_500, cost: 6_500, stock: [3, 0, 4], reorder: 10 },
      ],
    },
    sample: { column: "Unit", location: 0, rows: [{ id: "r1", detail: "Kilogram" }, { id: "r3", detail: "Litre" }, { id: "r4", detail: "Kilogram" }, { id: "r8", detail: "Sleeve of 50" }] },
  },
  {
    slug: "fashion-retail",
    setup: "retail",
    availability: "on-request",
    name: "Fashion and apparel",
    short: "Fashion",
    tab: "Fashion",
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
      week: [2_910_000, 2_540_000, 3_120_000, 3_380_000, 5_210_000, 7_460_000, 6_120_000],
      items: [
        { id: "a1", name: "Oxford shirt", sku: "OXF-NVY-M", attrs: { size: "M", colour: "Navy" }, price: 58_000, cost: 21_000, stock: [2, 0, 4], reorder: 10 },
        { id: "a2", name: "Oxford shirt", sku: "OXF-WHT-XL", attrs: { size: "XL", colour: "White" }, price: 58_000, cost: 21_000, stock: [14, 9, 30], reorder: 10 },
        { id: "a3", name: "Slim chinos", sku: "CHN-KHK-32", attrs: { size: "32", colour: "Khaki" }, price: 72_000, cost: 28_000, stock: [8, 5, 18], reorder: 12 },
        { id: "a4", name: "Linen dress", sku: "LDR-OLV-S", attrs: { size: "S", colour: "Olive" }, price: 96_000, cost: 37_000, stock: [6, 3, 10], reorder: 8 },
        { id: "a5", name: "Linen dress", sku: "LDR-OLV-M", attrs: { size: "M", colour: "Olive" }, price: 96_000, cost: 37_000, stock: [1, 0, 0], reorder: 8 },
        { id: "a6", name: "Merino crew neck", sku: "MRN-GRY-L", attrs: { size: "L", colour: "Grey" }, price: 110_000, cost: 46_000, stock: [9, 6, 22], reorder: 10 },
        { id: "a7", name: "Canvas sneakers", sku: "SNK-WHT-42", attrs: { size: "42", colour: "White" }, price: 84_000, cost: 33_000, stock: [7, 4, 16], reorder: 10 },
        { id: "a8", name: "Leather belt", sku: "BLT-BRN-90", attrs: { size: "90 cm", colour: "Brown" }, price: 39_000, cost: 13_000, stock: [15, 11, 40], reorder: 15 },
      ],
    },
    sample: { column: "Size and colour", location: 0, rows: [{ id: "a1", detail: "M · Navy" }, { id: "a2", detail: "XL · White" }, { id: "a5", detail: "M · Olive" }, { id: "a6", detail: "L · Grey" }] },
  },
  {
    slug: "auto-parts",
    setup: "retail",
    availability: "on-request",
    name: "Auto parts and workshops",
    short: "Auto parts",
    tab: "Auto parts",
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
      week: [3_180_000, 3_620_000, 3_410_000, 3_990_000, 4_480_000, 5_210_000, 1_240_000],
      items: [
        { id: "c1", name: "Oil filter", sku: "FLT-OIL-118", attrs: { part: "90915-YZZF2", fits: "Corolla 2014-19" }, price: 9_500, cost: 4_800, stock: [24, 6, 80], reorder: 30 },
        { id: "c2", name: "Front brake pads", sku: "BRK-PAD-F22", attrs: { part: "04465-02220", fits: "Corolla 2014-19" }, price: 46_000, cost: 27_000, stock: [8, 2, 20], reorder: 12 },
        { id: "c3", name: "Spark plug, iridium", sku: "SPK-IR-6", attrs: { part: "ILKAR7B11", fits: "Civic 2016-21" }, price: 14_000, cost: 7_900, stock: [32, 8, 96], reorder: 40 },
        { id: "c4", name: "Air filter", sku: "FLT-AIR-204", attrs: { part: "17801-21050", fits: "Yaris 2012-18" }, price: 18_000, cost: 9_600, stock: [5, 0, 14], reorder: 12 },
        { id: "c5", name: "Timing belt kit", sku: "BLT-TMG-K3", attrs: { part: "TB-K3-204", fits: "Golf 2010-14" }, price: 128_000, cost: 84_000, stock: [2, 1, 4], reorder: 4 },
        { id: "c6", name: "Battery 12 V 60 Ah", sku: "BAT-12-60", attrs: { part: "DIN60-MF", fits: "Most saloons" }, price: 96_000, cost: 68_000, stock: [6, 0, 18], reorder: 10 },
        { id: "c7", name: "Engine oil 5W-30, 4 L", sku: "OIL-5W30-4", attrs: { part: "5W30-SN-4L", fits: "Petrol engines" }, price: 34_000, cost: 22_000, stock: [18, 9, 60], reorder: 24 },
        { id: "c8", name: "Wiper blade 24 in", sku: "WPR-24", attrs: { part: "WB-24-U", fits: "Universal hook" }, price: 11_000, cost: 4_900, stock: [26, 4, 70], reorder: 20 },
      ],
    },
    sample: { column: "Part number", location: 0, rows: [{ id: "c1", detail: "90915-YZZF2" }, { id: "c2", detail: "04465-02220" }, { id: "c4", detail: "17801-21050" }, { id: "c5", detail: "TB-K3-204" }] },
  },
  {
    slug: "building-materials",
    setup: "hardware",
    availability: "on-request",
    name: "Building materials and hardware",
    short: "Building",
    tab: "Building materials",
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
      week: [14_200_000, 16_800_000, 15_100_000, 19_400_000, 21_700_000, 17_300_000, 3_100_000],
      items: [
        { id: "b1", name: "Portland cement", sku: "CEM-PRT-50", attrs: { uom: "50 kg bag", grade: "42.5N" }, price: 8_200, cost: 6_900, stock: [820, 460, 0], reorder: 600 },
        { id: "b2", name: "Sharp sand", sku: "SND-SHP", attrs: { uom: "Tonne", grade: "Washed" }, price: 31_000, cost: 22_000, stock: [64, 38, 0], reorder: 40 },
        { id: "b3", name: "Rebar 12 mm", sku: "RBR-12-12", attrs: { uom: "12 m length", grade: "B500B" }, price: 12_400, cost: 9_800, stock: [540, 210, 0], reorder: 300 },
        { id: "b4", name: "Concrete block 6 in", sku: "BLK-6", attrs: { uom: "Piece", grade: "Hollow" }, price: 850, cost: 520, stock: [4200, 1800, 0], reorder: 3000 },
        { id: "b5", name: "Roofing sheet 0.45 mm", sku: "RFS-045-3", attrs: { uom: "3 m sheet", grade: "Aluzinc" }, price: 14_600, cost: 11_200, stock: [120, 0, 0], reorder: 150 },
        { id: "b6", name: "PVC pipe 4 in", sku: "PVC-4-6", attrs: { uom: "6 m length", grade: "Pressure" }, price: 19_000, cost: 13_500, stock: [86, 42, 6], reorder: 60 },
        { id: "b7", name: "Emulsion paint, white", sku: "PNT-EMU-20", attrs: { uom: "20 L bucket", grade: "Matt" }, price: 44_000, cost: 31_000, stock: [22, 10, 14], reorder: 50 },
        { id: "b8", name: "Ceramic floor tile 60x60", sku: "TLE-60-GRY", attrs: { uom: "Box of 4", grade: "First" }, price: 17_500, cost: 12_100, stock: [140, 60, 24], reorder: 120 },
      ],
    },
    sample: { column: "Unit", location: 1, rows: [{ id: "b1", detail: "50 kg bag" }, { id: "b2", detail: "Tonne" }, { id: "b5", detail: "3 m sheet" }, { id: "b7", detail: "20 L bucket" }] },
  },
]

/** App setups with a full demo but no sector page of their own on this site. */
export const otherSetups = [
  { setup: "hospital", name: "Hospitals and clinics" },
  { setup: "office", name: "Schools, offices and NGOs" },
] as const

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug)
}

/** True when the sector's own tracks and workflows exist in StockVaults today. */
export function isReady(sector: Sector) {
  return sector.availability === "ready"
}
