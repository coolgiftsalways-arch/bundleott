import { SUBSCRIPTION_CATALOGUE } from "../frontend/src/data/subscriptionCatalogue.js";
import { SUBSCRIPTION_OFFERS } from "../frontend/src/data/BundleUpOTT_subscriptionOffers.js";
// Server-authoritative demo catalogue aligned with frontend/src/pages/OurPlans.jsx.
// IMPORTANT: replace with authorized, accurate products/prices before accepting real money.
const ITEMS = [
  ['netflix','Netflix',199,'ott'],
  ['prime','Amazon Prime Video',299,'ott'],
  ['jiohotstar','JioHotstar',149,'ott'],
  ['sonyliv','SonyLIV',299,'ott'],
  ['zee5','ZEE5',149,'ott'],
  ['sunnxt','Sun NXT',99,'ott'],
  ['aha','aha',149,'ott'],
  ['hoichoi','Hoichoi',99,'ott'],
  ['shemaroome','ShemarooMe',99,'ott'],
  ['lionsgate','Lionsgate Play',149,'ott'],
  ['discovery','discovery+',99,'ott'],
  ['fancode','FanCode',149,'ott'],
  ['chaupal','Chaupal',99,'ott'],
  ['etvwin','ETV Win',99,'ott'],
  ['planetmarathi','Planet Marathi',99,'ott'],
  ['manoramamax','ManoramaMAX',99,'ott'],
  ['erosnow','Eros Now',99,'ott'],
  ['youtube','YouTube Premium',149,'ott'],
  ['chatgpt','ChatGPT',199,'ai'],
  ['gemini','Google Gemini',199,'ai'],
  ['claude','Claude',199,'ai'],
  ['perplexity','Perplexity',199,'ai'],
  ['copilot','Microsoft Copilot',199,'ai'],
  ['grok','Grok',199,'ai'],
  ['midjourney','Midjourney',199,'ai'],
  ['canva','Canva AI',199,'ai'],
  ['notion','Notion AI',199,'ai'],
  ['firefly','Adobe Firefly',199,'ai'],
  ['elevenlabs','ElevenLabs',199,'ai'],
  ['runway','Runway',199,'ai'],
  ['spotify_platinum', 'Spotify Premium Platinum', 299, 'other'],
];

const USD_INR_REFERENCE = 94.9601;
const OFFER_MONTHS = ["1", "3", "6", "12"];

function parseOfferAmount(value) {
  const match = String(value ?? "").match(
    /₹\s*([\d,]+(?:\.\d{1,2})?)/
  );

  if (!match) return null;

  const amount = Number(match[1].replaceAll(",", ""));

  return Number.isFinite(amount) && amount > 0
    ? Math.round(amount * 100) / 100
    : null;
}

function getDurationPrices(plan) {
  const offer = SUBSCRIPTION_OFFERS[String(plan.id)];

  return Object.fromEntries(
    OFFER_MONTHS.map((months) => [
      months,
      parseOfferAmount(offer?.offers?.[months]),
    ])
  );
}


function getCataloguePrice(plan) {
  const raw = String(plan.price || "");
  const billing = String(plan.billing || "");

  const patterns = [
    {
      regex: /₹([\d,]+(?:\.\d+)?)\s*\/\s*month/i,
      divisor: 1,
      currency: "INR",
    },
    {
      regex: /₹([\d,]+(?:\.\d+)?)\s*\/\s*year/i,
      divisor: 12,
      currency: "INR",
    },
    {
      regex: /(?:US\$|\$)\s*([\d,]+(?:\.\d+)?)\s*\/\s*month/i,
      divisor: 1,
      currency: "USD",
    },
    {
      regex: /(?:US\$|\$)\s*([\d,]+(?:\.\d+)?)\s*\/\s*year/i,
      divisor: 12,
      currency: "USD",
    },
  ];

  for (const item of patterns) {
    const match = raw.match(item.regex);
    if (!match) continue;

    // Use the same monthly-equivalent pricing logic as the frontend.
    const value =
      Number(match[1].replaceAll(",", "")) / item.divisor;

    return item.currency === "USD"
      ? value * USD_INR_REFERENCE
      : value;
  }

  // No fixed numeric amount in the frontend catalogue.
  return null;
}

function categoryFor(plan) {
  if (plan.category === "OTT, films & TV") return "ott";
  if (plan.category.startsWith("AI ")) return "ai";

  if (
    [
      "YouTube & creator tools",
      "Photo, video & design software",
      "Stock assets, templates & licensing",
    ].includes(plan.category)
  ) {
    return "creator";
  }

  return "other";
}

const LEGACY_ITEMS = ITEMS.map(([id, name, price, category]) => ({
  id,
  name,
  price,
  category,
  currency: "INR",

  // Legacy plans have no verified multi-month offer data.
  durationPrices: {
    "1": price,
    "3": null,
    "6": null,
    "12": null,
  },
}));

const FRONTEND_ITEMS = SUBSCRIPTION_CATALOGUE.map((plan) => ({
  id: `sub_${String(plan.id)}`,
  name: `${plan.brand} ${plan.tier}`,
  brand: plan.brand,
  tier: plan.tier,
  price: getCataloguePrice(plan),
  category: categoryFor(plan),
  currency: "INR",
  durationPrices: getDurationPrices(plan),
}));

export const PUBLIC_CATALOG = Object.freeze([
  ...LEGACY_ITEMS,
  ...FRONTEND_ITEMS,
].map((item) => Object.freeze(item)));

const map = new Map(
  PUBLIC_CATALOG.map((plan) => [plan.id, plan])
);
// A cart is valid only with unique known item IDs. Browser prices are NEVER trusted.
export function quoteBundle(selections) {
  if (
    !Array.isArray(selections) ||
    selections.length < 1 ||
    selections.length > 200
  ) {
    return null;
  }

  // Support old string IDs as one-month selections.
  // New requests should send { id, months }.
  const normalized = selections.map((selection) => {
    if (typeof selection === "string") {
      return { id: selection, months: "1" };
    }

    if (
      !selection ||
      typeof selection !== "object" ||
      typeof selection.id !== "string"
    ) {
      return null;
    }

    const months = String(selection.months ?? "");

    if (!OFFER_MONTHS.includes(months)) {
      return null;
    }

    return {
      id: selection.id,
      months,
    };
  });

  if (normalized.some((selection) => !selection)) {
    return null;
  }

  const ids = normalized.map((selection) => selection.id);

  // A customer cannot add the same subscription twice.
  if (
    new Set(ids).size !== ids.length ||
    ids.some((id) => !map.has(id))
  ) {
    return null;
  }

  const items = normalized.map(({ id, months }) => {
    const catalogueItem = map.get(id);
    const price = catalogueItem.durationPrices?.[months];

    // Block unverified or unavailable prices.
    if (!Number.isFinite(price) || price <= 0) {
      return null;
    }

    return {
      id: catalogueItem.id,
      name: catalogueItem.name,
      category: catalogueItem.category,
      currency: "INR",
      months: Number(months),
      price,
    };
  });

  if (items.some((item) => !item)) {
    return null;
  }

  const subtotal = Math.round(
    items.reduce((total, item) => total + item.price, 0) * 100
  ) / 100;

  // Preserve the existing promotion for legacy plan IDs.
  const discount =
    ids.includes("netflix") && ids.includes("prime")
      ? 100
      : 0;

  const amount = Math.round((subtotal - discount) * 100) / 100;

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return {
    items,
    subtotal,
    discount,
    amount,
    name: items
      .map((item) =>
        `${item.name} (${item.months} month${item.months === 1 ? "" : "s"})`
      )
      .join(" + "),
  };
}
