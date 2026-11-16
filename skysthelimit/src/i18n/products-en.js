// English texts for products, keyed by product id.
// Only the fields listed here are replaced; images and prices come from the original data.

const travelContent = [
  "Travel wish list",
  "Budget tracking and planning",
  "Detailed destination plan (sights, food, photo spots, transport)",
  "Daily plan for every trip",
  "Pre-departure to-do list",
  "Packing list",
  "Daily outfit planning",
  "Space for notes",
  "Space for gluing photos",
];

const weddingContent = [
  "Monthly overview (-- months until our wedding) (x15)",
  "Task assignment and tracking of completed tasks",
  "Wedding expenses list (deadlines, deposits paid...)",
  "Budget allocation",
  "Budget organisation",
  "To-do list (tasks organised by 10, 6 and 3 months before the wedding)",
  "Hair trial",
  "Makeup trial",
  "Choosing the wedding dress: fitting schedule, costs...",
  "Choosing the wedding venue (x2)",
  "Guest list (up to 280)",
  "Seating plan (tables for 10 guests, 57 tables)",
  "Menu offers and notes (x2)",
  "Gifts for guests, best man, maid of honour...",
  "Decorations for the ceremony, reception and home",
  "Day party at the bride's home",
  "Day party at the groom's home",
  "Colour palette",
  "Planning the bachelorette party",
  "Space for your favourite bachelorette party photos",
  "Space for your favourite wedding photos",
  "Name change checklist",
  "Choosing the honeymoon destination",
  "Travel plan",
  "Space for your favourite honeymoon photos",
];

const recipeContent = [
  "Table of contents at the start (recipe names and pages so you can find them easily)",
  "Space for 115 recipes",
];

const academicContent = [
  "Goal setting",
  "Monthly planning",
  "Monthly budget planning",
  "Monthly task planning and deadline tracking",
  "Weekly planning of tasks, space for notes and organising the week",
  "Monthly habit tracking",
  "Study and exam preparation plan",
];

const babyContent = [
  "Fill this little book with your favourite photos and your baby's sweetest firsts. Keep the first steps, first tooth, first word, first trip and every special moment in one place.",
];

const skysUndatedContent = [
  "Long-term goal setting",
  "Passwords and contacts",
  "List of books read, book wish list and space for favourite quotes",
  "My health journal",
  "Yearly challenge: 'Save a set amount of money every day of the year'",
  "Yearly challenge: 'Physical activity every day'",
  "Monthly goal setting",
  "Weekly overview (+ meals, water intake, workouts, notes) (x60)",
  "Monthly budget (x12)",
  "Monthly new-habit tracker (x12)",
  "Monthly reflection (x12)",
  "Half-page dot grid to write down or organise anything extra (x12)",
  "Gratitude (x12)",
  "Anxiety pages",
  "5-4-3-2-1 calming method",
  "Pages on self-confidence, self-respect, life balance, worries, gratitude, rediscovering yourself, manifesting, positive affirmations and a recipe for happiness",
  "30-day healthy habits challenge",
  "What you want vs. what you really need",
  "Things you'd like to do before your birthday",
  "Decorate the tree with your biggest achievements",
  "What your dream life looks like and what is holding you back",
  "Pages with questions that will really make you think",
  "Instructions to help you fill in the pages",
  "Travel plan (x2)",
  "Brain dump (x4)",
  "Daily mood tracker to colour in",
  "Adorable stickers at the back",
];

const skys2027Content = [
  "2027 and 2028 calendar",
  "Long-term goal setting",
  "Passwords",
  ...skysUndatedContent.slice(2),
];

const skys2027Characteristics = [
  "A5 format",
  "218 pages",
  "Hard covers",
  "Gold foil",
  "Undated",
  "2027 and 2028 calendar",
  "Available in Macedonian",
];

const cardCharacteristics = ["230 g textured paper", "A6 format", "Envelope included"];

const travel = {
  title: "Travel Planner",
  subtitle: "10 fully planned trips in one planner!",
  characteristics: ["A5 format", "146 pages", "Available in Macedonian only", "Hard cover", "Gold spiral"],
  content: travelContent,
};
const wedding = {
  subtitle: "Plan your wedding down to the last detail!",
  characteristics: ["A5 format", "122 pages", "Available in Macedonian only", "Hard cover", "Gold spiral"],
  content: weddingContent,
};
const recipe = {
  title: "Recipe Journal",
  subtitle: "All your recipes in one place!",
  characteristics: ["A5 format", "122 pages", "Available in Macedonian only", "Hard cover", "White spiral"],
  content: recipeContent,
};
const academic = {
  title: "Academic Planner",
  subtitle: "Organise two full semesters!",
  characteristics: ["A5 format", "140 pages", "Available in English only", "Hard cover", "White spiral"],
  content: academicContent,
};
const baby = {
  title: "Baby Book",
  subtitle: "Create memories that last forever!",
  characteristics: ["Available in Macedonian only", "Hard cover", "White spiral"],
  content: babyContent,
};

const productsEn = {
  // planners
  1: travel,
  2: { ...wedding, title: "Wedding Planner - Gold" },
  3: { ...wedding, title: "Wedding Planner - Rose Gold" },
  4: recipe,
  5: academic,
  6: baby,
  7: {
    title: "Sky’s The Limit 2026",
    subtitle: "A magical journal for planning, organising and personal growth!",
    characteristics: ["A5 format", "204 pages", "Hard covers", "Available in English only"],
    content: [
      "2026 calendar",
      "Long-term goal setting",
      "List of books read, book wish list and space for favourite quotes",
      "Yearly challenge: 'Save a set amount of money every day of the year'",
      "Yearly challenge: 'Physical activity every day'",
      "Monthly goal setting",
      "Weekly overview (+ meals, water intake, workouts, notes) (x60)",
      "Monthly budget (x12)",
      "Monthly new-habit tracker (x12)",
      "Monthly reflection (x12)",
      "Half-page dot grid for extra organising (x12)",
      "Gratitude (x12)",
      "Anxiety pages",
      "5-4-3-2-1 calming method",
      "Pages on self-confidence, self-respect, life balance, worries, manifesting and positive affirmations",
      "Questions for deep personal reflection",
      "Instructions for easy filling in",
      "Travel plan (x2)",
      "Brain dump (x4)",
      "Daily mood tracker",
      "Stickers at the back",
    ],
  },
  8: {
    title: "Sky’s The Limit 2026 - Celeste",
    subtitle: "An undated journal for planning and organising.",
    characteristics: ["A5 format", "218 pages", "Hard covers", "Gold foil", "Undated", "Available in Macedonian"],
    content: ["2026 calendar", ...skysUndatedContent],
  },
  9: {
    title: "Sky’s The Limit 2026 - Aura",
    subtitle: "An undated journal for planning and organising.",
    characteristics: ["A5 format", "218 pages", "Hard covers", "Gold foil", "Undated", "Available in Macedonian"],
    content: ["2026 calendar", ...skysUndatedContent],
  },
  10: {
    title: "Work Planner 2026",
    subtitle: "Perfect for professionals who want to organise their tasks, projects and meetings effectively.",
    characteristics: ["Available in Macedonian only", "Hard cover", "White spiral"],
    content: [
      "Project planning: clearly define goals, steps and deadlines for your projects.",
      "Meeting organisation: space for notes, agendas and meeting-related tasks.",
      "Time planning: a schedule to prioritise and complete your most important tasks.",
      "Made for anyone who wants to take control of their time and achieve the most professionally.",
    ],
  },
  11: {
    title: "Sky’s The Limit 2027 - Merlot",
    subtitle: "An undated journal for planning and organising – now with a 2027 and 2028 calendar.",
    characteristics: skys2027Characteristics,
    content: skys2027Content,
  },
  12: {
    title: "Sky’s The Limit 2027 - Dusk",
    subtitle: "An undated journal for planning and organising – now with a 2027 and 2028 calendar.",
    characteristics: skys2027Characteristics,
    content: skys2027Content,
  },
  13: {
    title: "Bullet Journal - Cinnamon",
    subtitle: "Blank pages, endless possibilities – your system, your rules.",
    characteristics: ["A5 format", "200 pages", "Hard covers", "Gold foil", "Dot grid on every page"],
    content: [
      "200 dot-grid pages (bullet journal)",
      "Complete freedom – create your own layouts, lists, trackers and drawings",
      "Perfect for weekly and monthly spreads, habit tracking, notes and sketches",
    ],
  },

  // old combo packs (still shown if they are in someone's cart)
  20: { ...travel, title: "3 Travel Planners" },
  21: { ...wedding, title: "2 Wedding Planners - Gold + Rose Gold" },
  22: { ...wedding, title: "3 Wedding Planners - Gold" },
  23: { ...recipe, title: "3 Recipe Journals" },
  24: { ...academic, title: "3 Academic Planners" },
  25: { ...baby, title: "3 Baby Books" },

  // greeting cards
  30: { title: "I lose track of time with you", subtitle: "Greeting card", characteristics: cardCharacteristics },
  31: { title: "For the best mum", subtitle: "Greeting card", characteristics: cardCharacteristics },
  32: { title: "Home sweet home", subtitle: "Greeting card", characteristics: cardCharacteristics },
  33: { title: "Over a chat", subtitle: "Greeting card", characteristics: cardCharacteristics },
  34: { title: "Life is beautiful with you", subtitle: "Greeting card", characteristics: cardCharacteristics },
  35: { title: "Dancing in the kitchen", subtitle: "Greeting card", characteristics: cardCharacteristics },
  36: { title: "Happy Birthday", subtitle: "Greeting card", characteristics: cardCharacteristics },
  37: { title: "Quiet love", subtitle: "Greeting card", characteristics: cardCharacteristics },
  38: { title: "Spring", subtitle: "Greeting card", characteristics: cardCharacteristics },
  39: { title: "Congrats on your new home!", subtitle: "Greeting card", characteristics: cardCharacteristics },
  40: { title: "Time to celebrate", subtitle: "Greeting card", characteristics: cardCharacteristics },
  41: { title: "Scent of memories", subtitle: "Greeting card", characteristics: cardCharacteristics },
  42: { title: "The colours of love", subtitle: "Greeting card", characteristics: cardCharacteristics },
  43: { title: "For the best mum", subtitle: "Greeting card", characteristics: cardCharacteristics },
  44: { title: "Together to the end", subtitle: "Greeting card", characteristics: cardCharacteristics },
  45: { title: "Nice Bum", subtitle: "Greeting card", characteristics: cardCharacteristics },
};

export default productsEn;
