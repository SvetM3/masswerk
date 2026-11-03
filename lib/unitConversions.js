// Zentrale Umrechnungsdaten für Küchen- und Temperaturrechner.

export const US_CUP_ML = 236.588;
export const UK_CUP_ML = 284.131;

export const KITCHEN_UNITS = [
  { id: "cup_us", label: "Cup (US)", type: "volume", ml: US_CUP_ML },
  { id: "cup_uk", label: "Cup (UK)", type: "volume", ml: UK_CUP_ML },
  { id: "tbsp", label: "EL", type: "volume", ml: 14.787 },
  { id: "tsp", label: "TL", type: "volume", ml: 4.929 },
  { id: "oz", label: "Unze", type: "weight", grams: 28.3495 },
];

export const INGREDIENT_GROUPS = [
  {
    label: "Mehl & Getreide",
    items: [
      { id: "mehl405", label: "Mehl (Type 405)", gPerCup: 125, gPerTbsp: 10, gPerTsp: 3 },
      { id: "mehl1050", label: "Mehl (Type 1050)", gPerCup: 130, gPerTbsp: 10, gPerTsp: 3.5 },
      { id: "vollkornmehl", label: "Vollkornmehl", gPerCup: 120, gPerTbsp: 9, gPerTsp: 3 },
      { id: "haferflocken", label: "Haferflocken", gPerCup: 90, gPerTbsp: 6, gPerTsp: 2 },
      { id: "griess", label: "Grieß", gPerCup: 170, gPerTbsp: 11, gPerTsp: 3.5 },
      { id: "reis", label: "Reis (roh)", gPerCup: 185, gPerTbsp: 12, gPerTsp: 4 },
    ],
  },
  {
    label: "Zucker & Süßes",
    items: [
      { id: "zucker", label: "Zucker (weiß)", gPerCup: 200, gPerTbsp: 15, gPerTsp: 5 },
      { id: "brauner_zucker", label: "Zucker (braun)", gPerCup: 220, gPerTbsp: 16, gPerTsp: 5 },
      { id: "puderzucker", label: "Puderzucker", gPerCup: 120, gPerTbsp: 8, gPerTsp: 2.5 },
      { id: "kakao", label: "Kakaopulver", gPerCup: 100, gPerTbsp: 7, gPerTsp: 2.5 },
      { id: "honig", label: "Honig", gPerCup: 340, gPerTbsp: 21, gPerTsp: 7, liquid: true },
    ],
  },
  {
    label: "Fette & Flüssiges",
    items: [
      { id: "butter", label: "Butter", gPerCup: 227, gPerTbsp: 15, gPerTsp: 5 },
      { id: "margarine", label: "Margarine", gPerCup: 225, gPerTbsp: 15, gPerTsp: 5 },
      { id: "oel", label: "Öl", gPerCup: 224, gPerTbsp: 14, gPerTsp: 4.5, liquid: true },
      { id: "milch", label: "Milch", gPerCup: 245, gPerTbsp: 15, gPerTsp: 5, liquid: true },
      { id: "sahne", label: "Sahne", gPerCup: 240, gPerTbsp: 15, gPerTsp: 5, liquid: true },
      { id: "wasser", label: "Wasser", gPerCup: 237, gPerTbsp: 15, gPerTsp: 5, liquid: true },
    ],
  },
  {
    label: "Nüsse & Backzutaten",
    items: [
      { id: "mandeln", label: "Mandeln (gemahlen)", gPerCup: 100, gPerTbsp: 7, gPerTsp: 2.5 },
      { id: "staerke", label: "Speisestärke", gPerCup: 120, gPerTbsp: 8, gPerTsp: 2.5 },
      { id: "salz", label: "Salz", gPerCup: 288, gPerTbsp: 18, gPerTsp: 6 },
      { id: "backpulver", label: "Backpulver", gPerCup: 190, gPerTbsp: 12, gPerTsp: 4 },
    ],
  },
];

export const ALL_INGREDIENTS = INGREDIENT_GROUPS.flatMap((group) => group.items);

export function findIngredient(id) {
  return ALL_INGREDIENTS.find((item) => item.id === id) ?? ALL_INGREDIENTS[0];
}

export function convertKitchen(amount, unit, ingredient) {
  if (!ingredient || !Number.isFinite(amount) || amount <= 0) {
    return { grams: 0, ml: 0 };
  }

  if (unit.type === "weight") {
    const grams = amount * unit.grams;
    const density = ingredient.gPerCup / US_CUP_ML;
    return { grams, ml: grams / density };
  }

  const ml = amount * unit.ml;

  let grams;
  if (unit.id === "tbsp") {
    grams = amount * ingredient.gPerTbsp;
  } else if (unit.id === "tsp") {
    grams = amount * ingredient.gPerTsp;
  } else {
    grams = (ml / US_CUP_ML) * ingredient.gPerCup;
  }

  return { grams, ml };
}

// Standardisierte Backofenstufen (Ober-/Unterhitze) in °C
export const OVEN_STEPS = [
  80, 100, 110, 120, 130, 140, 150, 160, 170, 175, 180, 190, 200, 210, 220, 230,
  240, 250, 260, 280, 300,
];

export function fahrenheitToCelsius(fahrenheit) {
  const exact = ((fahrenheit - 32) * 5) / 9;
  let closest = OVEN_STEPS[0];
  let smallestDiff = Number.POSITIVE_INFINITY;

  OVEN_STEPS.forEach((step) => {
    const diff = Math.abs(step - exact);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = step;
    }
  });

  return closest;
}

export function celsiusToFahrenheit(celsius) {
  const exact = (celsius * 9) / 5 + 32;
  return Math.round(exact / 25) * 25;
}

export const GAS_MARKS = [
  { mark: "¼", celsius: 110 },
  { mark: "½", celsius: 120 },
  { mark: "¾", celsius: 130 },
  { mark: "1", celsius: 140 },
  { mark: "2", celsius: 150 },
  { mark: "3", celsius: 170 },
  { mark: "4", celsius: 180 },
  { mark: "5", celsius: 190 },
  { mark: "6", celsius: 200 },
  { mark: "7", celsius: 220 },
  { mark: "8", celsius: 230 },
  { mark: "9", celsius: 240 },
];

export const QUICK_FAHRENHEIT = [325, 350, 375, 400];