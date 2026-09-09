export type SkinType = "oily" | "combo" | "dry";
export type Category = "cleanser" | "moisturizer" | "sunscreen" | "treatment";

export type Product = {
  id: string;
  name: string;
  retailer: string;
  price: number;
  category: Category;
  skinTypes: SkinType[];
  sensitiveSafe: boolean;
  concerns: string[];
};

export type QuestionDef = {
  id: string;
  type: "single" | "multi";
  prompt: string;
  options: string[];
};

export const QUESTIONS: QuestionDef[] = [
  {
    id: "concerns",
    type: "multi",
    prompt: "What are you mainly looking to improve?",
    options: [
      "Acne/breakouts",
      "Dark spots/pigmentation",
      "Dryness",
      "Oiliness",
      "Uneven texture",
      "Dull-looking skin",
      "Just want a simple routine",
    ],
  },
  {
    id: "midday",
    type: "single",
    prompt: "How does your skin usually feel by midday?",
    options: ["Very oily", "Mostly oily", "Combination", "Mostly dry", "Very dry", "Not sure"],
  },
  {
    id: "sensitivity",
    type: "single",
    prompt: "How sensitive is your skin?",
    options: ["Not sensitive", "Sometimes sensitive", "Very sensitive", "I'm not sure"],
  },
  {
    id: "budget",
    type: "single",
    prompt: "How much do you want to spend?",
    options: ["Under ₹500", "₹500–₹1,000", "₹1,000–₹2,000", "₹2,000+"],
  },
  {
    id: "current",
    type: "multi",
    prompt: "What skincare do you currently use?",
    options: ["Cleanser", "Moisturizer", "Sunscreen", "Serum", "Treatment", "Nothing currently"],
  },
  {
    id: "priority",
    type: "single",
    prompt: "What matters most to you right now?",
    options: [
      "Lowest possible price",
      "Best value for money",
      "Premium products",
      "A simple routine",
      "Fast results",
    ],
  },
];

export type Answers = Record<string, string[]>;

export const CATALOG: Product[] = [
  // Cleansers
  {
    id: "c1",
    name: "Gentle Gel Cleanser",
    retailer: "Nykaa",
    price: 199,
    category: "cleanser",
    skinTypes: ["oily", "combo"],
    sensitiveSafe: true,
    concerns: ["Oiliness", "Acne/breakouts"],
  },
  {
    id: "c2",
    name: "Salicylic Foaming Wash",
    retailer: "Amazon",
    price: 279,
    category: "cleanser",
    skinTypes: ["oily", "combo"],
    sensitiveSafe: false,
    concerns: ["Acne/breakouts", "Uneven texture"],
  },
  {
    id: "c3",
    name: "Cream Hydrating Cleanser",
    retailer: "Flipkart",
    price: 249,
    category: "cleanser",
    skinTypes: ["dry", "combo"],
    sensitiveSafe: true,
    concerns: ["Dryness"],
  },
  {
    id: "c4",
    name: "Milky Barrier Cleanser",
    retailer: "Nykaa",
    price: 399,
    category: "cleanser",
    skinTypes: ["dry"],
    sensitiveSafe: true,
    concerns: ["Dryness", "Dull-looking skin"],
  },
  // Moisturizers
  {
    id: "m1",
    name: "Oil-Free Gel Moisturiser",
    retailer: "Amazon",
    price: 249,
    category: "moisturizer",
    skinTypes: ["oily", "combo"],
    sensitiveSafe: true,
    concerns: ["Oiliness", "Acne/breakouts"],
  },
  {
    id: "m2",
    name: "Ceramide Daily Lotion",
    retailer: "Nykaa",
    price: 329,
    category: "moisturizer",
    skinTypes: ["combo", "dry"],
    sensitiveSafe: true,
    concerns: ["Dryness", "Uneven texture"],
  },
  {
    id: "m3",
    name: "Rich Repair Cream",
    retailer: "Flipkart",
    price: 449,
    category: "moisturizer",
    skinTypes: ["dry"],
    sensitiveSafe: true,
    concerns: ["Dryness", "Dull-looking skin"],
  },
  {
    id: "m4",
    name: "Niacinamide Light Cream",
    retailer: "Amazon",
    price: 299,
    category: "moisturizer",
    skinTypes: ["oily", "combo", "dry"],
    sensitiveSafe: false,
    concerns: ["Dark spots/pigmentation", "Dull-looking skin"],
  },
  // Sunscreens
  {
    id: "s1",
    name: "Matte Finish SPF 50",
    retailer: "Nykaa",
    price: 299,
    category: "sunscreen",
    skinTypes: ["oily", "combo"],
    sensitiveSafe: true,
    concerns: ["Oiliness", "Dark spots/pigmentation"],
  },
  {
    id: "s2",
    name: "Hydrating Fluid SPF 50",
    retailer: "Amazon",
    price: 349,
    category: "sunscreen",
    skinTypes: ["dry", "combo"],
    sensitiveSafe: true,
    concerns: ["Dryness", "Dark spots/pigmentation"],
  },
  {
    id: "s3",
    name: "Mineral Sunscreen SPF 40",
    retailer: "Flipkart",
    price: 399,
    category: "sunscreen",
    skinTypes: ["oily", "combo", "dry"],
    sensitiveSafe: true,
    concerns: ["Uneven texture"],
  },
  {
    id: "s4",
    name: "Everyday Sun Gel SPF 30",
    retailer: "Amazon",
    price: 259,
    category: "sunscreen",
    skinTypes: ["oily"],
    sensitiveSafe: false,
    concerns: ["Oiliness"],
  },
  // Treatments
  {
    id: "t1",
    name: "2% Salicylic Serum",
    retailer: "Amazon",
    price: 349,
    category: "treatment",
    skinTypes: ["oily", "combo"],
    sensitiveSafe: false,
    concerns: ["Acne/breakouts", "Uneven texture"],
  },
  {
    id: "t2",
    name: "10% Vitamin C Serum",
    retailer: "Nykaa",
    price: 449,
    category: "treatment",
    skinTypes: ["oily", "combo", "dry"],
    sensitiveSafe: false,
    concerns: ["Dark spots/pigmentation", "Dull-looking skin"],
  },
  {
    id: "t3",
    name: "Azelaic Gentle Serum",
    retailer: "Flipkart",
    price: 499,
    category: "treatment",
    skinTypes: ["oily", "combo", "dry"],
    sensitiveSafe: true,
    concerns: ["Acne/breakouts", "Dark spots/pigmentation", "Uneven texture"],
  },
  {
    id: "t4",
    name: "Hyaluronic Repair Serum",
    retailer: "Amazon",
    price: 299,
    category: "treatment",
    skinTypes: ["dry", "combo"],
    sensitiveSafe: true,
    concerns: ["Dryness", "Dull-looking skin"],
  },
];

export const SKIN_TYPE_LABEL: Record<SkinType, string> = {
  oily: "Oily",
  combo: "Combination",
  dry: "Dry",
};

export function skinTypeFromAnswers(answers: Answers): SkinType {
  const midday = answers["midday"]?.[0];
  if (midday === "Very oily" || midday === "Mostly oily") return "oily";
  if (midday === "Very dry" || midday === "Mostly dry") return "dry";
  return "combo";
}

export function mainConcern(answers: Answers): string {
  return answers["concerns"]?.[0] ?? "Just want a simple routine";
}

export function isSimpleRoutine(answers: Answers): boolean {
  return mainConcern(answers) === "Just want a simple routine";
}

export function budgetLabel(answers: Answers): string {
  return answers["budget"]?.[0] ?? "₹500–₹1,000";
}

export function budgetCeiling(answers: Answers): number {
  switch (budgetLabel(answers)) {
    case "Under ₹500":
      return 500;
    case "₹500–₹1,000":
      return 1000;
    case "₹1,000–₹2,000":
      return 2000;
    default:
      return 4000;
  }
}

export function isVerySensitive(answers: Answers): boolean {
  return answers["sensitivity"]?.[0] === "Very sensitive";
}

export type BasketItem = {
  role: string;
  product: Product;
  reasons: string[];
};

export type Recommendation = {
  skinType: SkinType;
  concern: string;
  simple: boolean;
  budget: string;
  items: BasketItem[];
  total: number;
  morning: string[];
  evening: string[];
};

const ROLE_LABEL: Record<Category, string> = {
  cleanser: "Cleanser",
  moisturizer: "Moisturizer",
  sunscreen: "Sunscreen",
  treatment: "Treatment",
};

function qualify(category: Category, skinType: SkinType, sensitive: boolean): Product[] {
  return CATALOG.filter(
    (p) =>
      p.category === category &&
      p.skinTypes.includes(skinType) &&
      (!sensitive || p.sensitiveSafe),
  );
}

function pick(pool: Product[], concern: string): Product | undefined {
  if (pool.length === 0) return undefined;
  const sorted = [...pool].sort((a, b) => a.price - b.price);
  const targeted = sorted.filter((p) => p.concerns.includes(concern));
  return targeted[0] ?? sorted[0];
}

function reasonsFor(
  product: Product,
  skinType: SkinType,
  concern: string,
  sensitive: boolean,
  budget: string,
): string[] {
  const reasons: string[] = [`Fits within your ${budget} budget`];
  reasons.push(`Formulated for ${SKIN_TYPE_LABEL[skinType].toLowerCase()} skin`);
  if (product.concerns.includes(concern)) reasons.push(`Targets ${concern.toLowerCase()}`);
  if (sensitive && product.sensitiveSafe) reasons.push("Safe for very sensitive skin");
  reasons.push("Lowest price among the options that qualified");
  return reasons;
}

export function recommend(answers: Answers): Recommendation {
  const skinType = skinTypeFromAnswers(answers);
  const concern = mainConcern(answers);
  const simple = isSimpleRoutine(answers);
  const sensitive = isVerySensitive(answers);
  const budget = budgetLabel(answers);
  const ceiling = budgetCeiling(answers);

  const items: BasketItem[] = [];
  (["cleanser", "moisturizer", "sunscreen"] as Category[]).forEach((category) => {
    const chosen = pick(qualify(category, skinType, sensitive), concern);
    if (chosen) {
      items.push({
        role: ROLE_LABEL[category],
        product: chosen,
        reasons: reasonsFor(chosen, skinType, concern, sensitive, budget),
      });
    }
  });

  let total = items.reduce((sum, item) => sum + item.product.price, 0);
  let hasTreatment = false;

  if (!simple) {
    const treatment = pick(qualify("treatment", skinType, sensitive), concern);
    if (treatment && total + treatment.price <= ceiling) {
      items.push({
        role: "Treatment",
        product: treatment,
        reasons: reasonsFor(treatment, skinType, concern, sensitive, budget),
      });
      total += treatment.price;
      hasTreatment = true;
    }
  }

  const morning = ["Cleanser", "Moisturizer", "Sunscreen"];
  const evening = hasTreatment
    ? ["Cleanser", "Treatment", "Moisturizer"]
    : ["Cleanser", "Moisturizer"];

  return { skinType, concern, simple, budget, items, total, morning, evening };
}

export const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;
