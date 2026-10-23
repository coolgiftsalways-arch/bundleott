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
];

export const PUBLIC_CATALOG = Object.freeze(ITEMS.map(([id, name, price, category]) =>
  Object.freeze({ id, name, price, category, currency: 'INR' })
));
const map = new Map(PUBLIC_CATALOG.map(p => [p.id, p]));

// A cart is valid only with unique known item IDs. Browser prices are NEVER trusted.
export function quoteBundle(planIds) {
  if (!Array.isArray(planIds) || planIds.length < 1 || planIds.length > 30 ||
      planIds.some(id => typeof id !== 'string') ||
      new Set(planIds).size !== planIds.length || planIds.some(id => !map.has(id))) return null;
  const items = planIds.map(id => map.get(id));
  const subtotal = items.reduce((n,p) => n + p.price, 0);
  const discount = planIds.includes('netflix') && planIds.includes('prime') ? 100 : 0;
  const amount = subtotal - discount;
  if (!Number.isSafeInteger(amount) || amount <= 0) return null;
  return { items, discount, amount, name: items.map(p => p.name).join(' + ') };
}
