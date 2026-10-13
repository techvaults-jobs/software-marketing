/**
 * What a business usually counts stock with before it calls us, and what
 * happens in each when a normal trading day goes wrong. Keep these fair: say
 * only what is generally true of the tool, not of a named product.
 */
export const alternatives = ["A notebook", "A spreadsheet", "Packaged software", "StockVaults"] as const

export const situations: Array<{ when: string; answers: [string, string, string, string] }> = [
  {
    when: "Stock sits in more than one place",
    answers: [
      "One book per shop, added up by hand.",
      "One file per shop, or one file everybody overwrites.",
      "Supported, on the plan that includes it.",
      "Each location has its own count, and you can see them all together.",
    ],
  },
  {
    when: "Somebody enters a wrong figure",
    answers: [
      "It stays wrong until the next full count.",
      "The cell accepts whatever is typed.",
      "Stopped only where the vendor thought of it.",
      "Stopped by limits written for your business.",
    ],
  },
  {
    when: "A unit goes missing between shops",
    answers: [
      "Two books that disagree.",
      "Two files that disagree.",
      "A transfer record, if staff filled it in.",
      "A sender, a receiver and a time. In transit belongs to neither shop.",
    ],
  },
  {
    when: "Your business does something unusual",
    answers: [
      "The book takes anything, and checks nothing.",
      "Another column, another tab.",
      "You change how you work to suit it.",
      "We build the screen for the way you work.",
    ],
  },
  {
    when: "A new member of staff starts",
    answers: [
      "They copy whoever sits next to them.",
      "They copy whoever built the file.",
      "A help centre and a support queue.",
      "Training on the screens for their role, from the people who built them.",
    ],
  },
]
