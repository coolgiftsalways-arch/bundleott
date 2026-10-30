import {
  EFFECTIVE_PRICE_OVERRIDES,
} from "../frontend/src/data/BundleUpOTT_effectivePrices.js";

const OFFER_MONTHS = ["1", "3", "6", "12"];

function parseReferenceAmount(value) {
  const match = String(value ?? "").match(
    /(?:₹|US\$|\$)\s*([\d,]+(?:\.\d{1,2})?)/i
  );

  if (!match) return null;

  const amount = Number(match[1].replaceAll(",", ""));

  return Number.isFinite(amount) && amount > 0
    ? amount
    : null;
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

// Only products with four numeric effective prices are included.
// USD products are temporarily excluded because the current payment
// flow is INR-only.
export const PUBLIC_CATALOG = Object.freeze(
  Object.values(EFFECTIVE_PRICE_OVERRIDES)
    .filter((plan) => {
      if (plan.pricingType !== "subscription") return false;
      if (plan.currency !== "INR") return false;

      return OFFER_MONTHS.every((month) => {
        const price = plan.effectivePrices?.[month];

        return (
          typeof price === "number" &&
          Number.isFinite(price) &&
          price > 0
        );
      });
    })
    .map((plan) => {
      const monthlyReference = parseReferenceAmount(
        plan.monthlyReference
      );

      const originalDurationPrices = Object.fromEntries(
        OFFER_MONTHS.map((month) => [
          month,
          monthlyReference === null
            ? null
            : Math.round(
                monthlyReference * Number(month) * 100
              ) / 100,
        ])
      );

      return Object.freeze({
        id: `sub_${String(plan.id)}`,
        name: `${plan.brand} ${plan.tier}`,
        brand: plan.brand,
        tier: plan.tier,
        category: categoryFor(plan),
        currency: "INR",

        // Discounted BundleUpOTT prices
        durationPrices: plan.effectivePrices,

        // Original prices before discount
        originalDurationPrices,

        price: plan.effectivePrices["1"],
        originalPrice: originalDurationPrices["1"],
      });
    })
);

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
  currency: catalogueItem.currency,
  months: Number(months),
  price,
  originalPrice:
    catalogueItem.originalDurationPrices?.[months] ?? null,
};
  });

  if (items.some((item) => !item)) {
    return null;
  }

  const subtotal = Math.round(
    items.reduce((total, item) => total + item.price, 0) * 100
  ) / 100;

  // Preserve the existing promotion for legacy plan IDs.
  const discount = 0;

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
