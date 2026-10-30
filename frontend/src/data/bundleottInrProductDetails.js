/**
 * BundleOTT product details for the INR products with valid Excel effective prices.
 *
 * Source of truth:
 * - Product descriptions, features, limitations, device notes and source URLs:
 *   subscriptionCatalogue.js (user-provided catalogue snapshot).
 * - Selling prices and currency eligibility:
 *   170_Subscriptions_Effective_Price_Model workbook.
 *
 * USD and VERIFY rows are intentionally excluded.
 * Canva Free is retained as a zero-price plan.
 * InShot Lifetime is retained as a one-time product and is not given
 * subscription duration options.
 *
 * Do not use advertisedRealPrice/monthlyReference as BundleOTT selling prices.
 * Use effectivePrices / offers for recurring plans.
 */

export const INR_PRODUCT_DETAILS = [
  {
    "id": "1",
    "category": "AI assistants & research",
    "brand": "ChatGPT",
    "tier": "Go",
    "title": "ChatGPT Go",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "General AI assistant / productivity",
    "billing": "Monthly",
    "whatYouGet": [
      "Higher usage than Free",
      "chat, image/file tools and expanded access to AI features (exact limits can change)."
    ],
    "limitations": [
      "Entry paid tier",
      "below Plus/Pro on model access and usage allowances."
    ],
    "deviceAccess": [
      "Individual account",
      "usage caps apply."
    ],
    "importantNotes": [
      "App Store price is a useful India price reference",
      "website checkout can differ by platform/offers."
    ],
    "source": "https://apps.apple.com/in/app/chatgpt/id6448311069",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "2",
    "category": "AI assistants & research",
    "brand": "ChatGPT",
    "tier": "Plus",
    "title": "ChatGPT Plus",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,999/month",
    "monthlyReference": "₹1,999/month",
    "effectivePrices": {
      "1": 1000,
      "3": 2399,
      "6": 3598,
      "12": 4798
    },
    "offers": {
      "1": "₹1,000",
      "3": "₹2,399",
      "6": "₹3,598",
      "12": "₹4,798"
    },
    "about": "General AI assistant / productivity",
    "billing": "Monthly",
    "whatYouGet": [
      "Higher limits and access to advanced models, files, images, voice and research features versus Free/Go."
    ],
    "limitations": [
      "More capability/usage than Go",
      "substantially below Pro usage levels."
    ],
    "deviceAccess": [
      "Individual account",
      "usage limits still apply."
    ],
    "importantNotes": [
      "Do not treat a personal Plus account as reseller inventory",
      "terms govern account use."
    ],
    "source": "https://apps.apple.com/in/app/chatgpt/id6448311069",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "3",
    "category": "AI assistants & research",
    "brand": "ChatGPT",
    "tier": "Pro 5x",
    "title": "ChatGPT Pro 5x",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹10,699/month",
    "monthlyReference": "₹10,699/month",
    "effectivePrices": {
      "1": 5350,
      "3": 12839,
      "6": 19258,
      "12": 25678
    },
    "offers": {
      "1": "₹5,350",
      "3": "₹12,839",
      "6": "₹19,258",
      "12": "₹25,678"
    },
    "about": "Power-user AI",
    "billing": "Monthly",
    "whatYouGet": [
      "Higher usage allowance for intensive advanced-model work."
    ],
    "limitations": [
      "Higher limits than Plus",
      "lower Pro level than the higher-usage Pro option."
    ],
    "deviceAccess": [
      "Individual account",
      "very high price",
      "usage terms apply."
    ],
    "importantNotes": [
      "Price and plan naming may vary between iOS and web checkout."
    ],
    "source": "https://apps.apple.com/in/app/chatgpt/id6448311069",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "4",
    "category": "AI assistants & research",
    "brand": "Google Gemini / Google One",
    "tier": "Google AI Plus",
    "title": "Google Gemini / Google One Google AI Plus",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "AI assistant, Google Workspace, cloud storage",
    "billing": "Monthly",
    "whatYouGet": [
      "Enhanced Gemini access, image/video creative tools, NotebookLM and storage across Google Photos/Drive/Gmail."
    ],
    "limitations": [
      "Lower-cost AI plan with less model/usage capacity than Pro and Ultra."
    ],
    "deviceAccess": [
      "Storage allowance and AI caps vary by current plan terms."
    ],
    "importantNotes": [
      "Google's plan page currently describes 400 GB storage",
      "plan benefits can evolve."
    ],
    "source": "https://one.google.com/intl/en_in/about/google-ai-plans/",
    "priceBasis": "India launch price; verify current checkout",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "5",
    "category": "AI assistants & research",
    "brand": "Google Gemini / Google One",
    "tier": "Google AI Pro",
    "title": "Google Gemini / Google One Google AI Pro",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "About ₹1,950/month",
    "monthlyReference": "₹1,950/month",
    "effectivePrices": {
      "1": 975,
      "3": 2340,
      "6": 3510,
      "12": 4680
    },
    "offers": {
      "1": "₹975",
      "3": "₹2,340",
      "6": "₹3,510",
      "12": "₹4,680"
    },
    "about": "AI assistant, research, cloud storage",
    "billing": "Monthly",
    "whatYouGet": [
      "Expanded Gemini model access, Deep Research, AI features across Gmail/Docs/Vids, NotebookLM, 5 TB storage",
      "some plans include YouTube Premium Lite."
    ],
    "limitations": [
      "Higher limits and storage than AI Plus",
      "below Ultra."
    ],
    "deviceAccess": [
      "Feature availability can depend on country, age and account."
    ],
    "importantNotes": [
      "The live Google plan page may show localized checkout pricing",
      "amount is a snapshot, not a guarantee."
    ],
    "source": "https://one.google.com/intl/en_in/about/google-ai-plans/",
    "priceBasis": "India price reported; verify checkout",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "6",
    "category": "AI assistants & research",
    "brand": "Google Gemini / Google One",
    "tier": "Google AI Ultra",
    "title": "Google Gemini / Google One Google AI Ultra",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "From about ₹6,500/month; higher-usage variants may cost more",
    "monthlyReference": "₹6,500/month",
    "effectivePrices": {
      "1": 3250,
      "3": 7800,
      "6": 11700,
      "12": 15600
    },
    "offers": {
              "1": "₹3,250",
      "3": "₹7,800",
      "6": "₹11,700",
      "12": "₹15,600"
    },
    "about": "AI assistant, advanced research and media generation",
    "billing": "Monthly",
    "whatYouGet": [
      "Highest Google AI usage tiers, advanced models and expanded AI media features with large storage allowance."
    ],
    "limitations": [
      "Higher usage, priority/advanced features and storage than AI Pro."
    ],
    "deviceAccess": [
      "Several Ultra levels/offerings may appear",
      "quotas and benefits differ."
    ],
    "importantNotes": [
      "Check current official checkout carefully",
      "prices and Ultra variants have changed recently."
    ],
    "source": "https://one.google.com/intl/en_in/about/google-ai-plans/",
    "priceBasis": "India price snapshot; verify checkout",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "7",
    "category": "AI assistants & research",
    "brand": "Claude",
    "tier": "Pro",
    "title": "Claude Pro",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,999/month (India reported); global official page: $20 monthly or $200 annually",
    "monthlyReference": "₹1,999/month",
    "effectivePrices": {
      "1": 1000,
      "3": 2399,
      "6": 3598,
      "12": 4798
    },
    "offers": {
      "1": "₹1,000",
      "3": "₹2,399",
      "6": "₹3,598",
      "12": "₹4,798"
    },
    "about": "AI assistant, writing, coding and research",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "More usage, Projects, Claude Code, web search, file work, advanced models and productivity integrations."
    ],
    "limitations": [
      "Pro is for regular use",
      "higher Max tiers multiply usage capacity."
    ],
    "deviceAccess": [
      "Individual account",
      "usage limits apply."
    ],
    "importantNotes": [
      "India price reported by current technology coverage",
      "confirm price on Claude checkout."
    ],
    "source": "https://claude.com/pricing",
    "priceBasis": "India localized price reported; global pricing official",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "8",
    "category": "AI assistants & research",
    "brand": "Claude",
    "tier": "Max 5x",
    "title": "Claude Max 5x",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹11,999/month (India reported)",
    "monthlyReference": "₹11,999/month",
    "effectivePrices": {
      "1": 6000,
      "3": 14399,
      "6": 21598,
      "12": 28798
    },
    "offers": {
      "1": "₹6,000",
      "3": "₹14,399",
      "6": "₹21,598",
      "12": "₹28,798"
    },
    "about": "Heavy AI use / coding",
    "billing": "Monthly",
    "whatYouGet": [
      "Pro capabilities with roughly 5x Pro usage and priority access during high demand."
    ],
    "limitations": [
      "Much higher usage allowance than Pro."
    ],
    "deviceAccess": [
      "Individual account",
      "price is high and usage limits still apply."
    ],
    "importantNotes": [
      "Localized amount is reported by Indian technology press",
      "verify at checkout."
    ],
    "source": "https://claude.com/pricing",
    "priceBasis": "Localized India price reported",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "9",
    "category": "AI assistants & research",
    "brand": "Claude",
    "tier": "Max 20x",
    "title": "Claude Max 20x",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹23,999/month (India reported)",
    "monthlyReference": "₹23,999/month",
    "effectivePrices": {
      "1": 12000,
      "3": 28799,
      "6": 43198,
      "12": 57598
    },
    "offers": {
      "1": "₹12,000",
      "3": "₹28,799",
      "6": "₹43,198",
      "12": "₹57,598"
    },
    "about": "Very heavy AI use / coding",
    "billing": "Monthly",
    "whatYouGet": [
      "Pro capabilities with roughly 20x Pro usage and priority access during high demand."
    ],
    "limitations": [
      "Largest individual Claude usage option listed in current pricing coverage."
    ],
    "deviceAccess": [
      "Individual account",
      "terms and use limits apply."
    ],
    "importantNotes": [
      "Localized amount is reported by Indian technology press",
      "verify at checkout."
    ],
    "source": "https://claude.com/pricing",
    "priceBasis": "Localized India price reported",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "10",
    "category": "AI assistants & research",
    "brand": "Perplexity",
    "tier": "Pro",
    "title": "Perplexity Pro",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "About ₹1,999/month in India App Store listing",
    "monthlyReference": "₹1,999/month",
    "effectivePrices": {
      "1": 1000,
      "3": 2399,
      "6": 3598,
      "12": 4798
    },
    "offers": {
      "1": "₹1,000",
      "3": "₹2,399",
      "6": "₹3,598",
      "12": "₹4,798"
    },
    "about": "AI answer engine / web research",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Higher search/research limits, access to premium AI models and file/research workflows."
    ],
    "limitations": [
      "More search and model options than free",
      "advanced plan limits vary."
    ],
    "deviceAccess": [
      "Individual account",
      "model availability changes."
    ],
    "importantNotes": [
      "The App Store amount is a price reference",
      "web promotions or billing may differ."
    ],
    "source": "https://www.perplexity.ai/pro",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "11",
    "category": "AI assistants & research",
    "brand": "Perplexity",
    "tier": "Max",
    "title": "Perplexity Max",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "About ₹19,900/month in India App Store listing",
    "monthlyReference": "₹19,900/month",
    "effectivePrices": {
      "1": 9950,
      "3": 23880,
      "6": 35820,
      "12": 47760
    },
    "offers": {
      "1": "₹9,950",
      "3": "₹23,880",
      "6": "₹35,820",
      "12": "₹47,760"
    },
    "about": "Advanced AI research",
    "billing": "Monthly",
    "whatYouGet": [
      "Higher limits and broader premium model/research capacity than Pro."
    ],
    "limitations": [
      "Power-user tier",
      "pricing is significantly above Pro."
    ],
    "deviceAccess": [
      "Individual account",
      "usage caps and features change."
    ],
    "importantNotes": [
      "Verify current web checkout and whether this tier is available on your account."
    ],
    "source": "https://www.perplexity.ai/pro",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "14",
    "category": "AI assistants & research",
    "brand": "Microsoft Copilot / Microsoft 365",
    "tier": "Microsoft 365 Personal",
    "title": "Microsoft 365 Personal",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹689/month or ₹6,899/year",
    "monthlyReference": "₹689/month",
    "effectivePrices": {
      "1": 345,
      "3": 827,
      "6": 1240,
      "12": 1654
    },
    "offers": {
      "1": "₹345",
      "3": "₹827",
      "6": "₹1,240",
      "12": "₹1,654"
    },
    "about": "Office, AI and cloud storage",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Word",
      "Excel",
      "PowerPoint",
      "Outlook",
      "OneNote",
      "Copilot features",
      "OneDrive storage and security benefits."
    ],
    "limitations": [
      "Single-person plan",
      "lower storage/member coverage than Family."
    ],
    "deviceAccess": [
      "One person",
      "benefits and AI allowances depend on product terms."
    ],
    "importantNotes": [
      "Microsoft 365 includes productivity software rather than a standalone ChatGPT/Gemini subscription."
    ],
    "source": "https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "15",
    "category": "AI assistants & research",
    "brand": "Microsoft Copilot / Microsoft 365",
    "tier": "Microsoft 365 Family",
    "title": "Microsoft 365 Family",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹819/month or ₹8,199/year",
    "monthlyReference": "₹819/month",
    "effectivePrices": {
      "1": 410,
      "3": 983,
      "6": 1474,
      "12": 1966
    },
    "offers": {
      "1": "₹410",
      "3": "₹983",
      "6": "₹1,474",
      "12": "₹1,966"
    },
    "about": "Office, AI and shared cloud storage",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Personal benefits for up to six people",
      "shared 2 TB storage",
      "Office apps."
    ],
    "limitations": [
      "More household seats and pooled storage than Personal.",
      "AI benefits may be limited to subscription owner depending on current terms."
    ],
    "deviceAccess": [
      "Up to six people",
      "read the AI eligibility conditions."
    ],
    "importantNotes": [
      "Plan terms distinguish family storage sharing from who receives AI features."
    ],
    "source": "https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "16",
    "category": "AI assistants & research",
    "brand": "Microsoft Copilot / Microsoft 365",
    "tier": "Microsoft 365 Premium",
    "title": "Microsoft 365 Premium",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,999/month or ₹19,999/year",
    "monthlyReference": "₹1,999/month",
    "effectivePrices": {
      "1": 1000,
      "3": 2399,
      "6": 3598,
      "12": 4798
    },
    "offers": {
      "1": "₹1,000",
      "3": "₹2,399",
      "6": "₹3,598",
      "12": "₹4,798"
    },
    "about": "Advanced AI productivity",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Everything in Family",
      "higher Copilot usage",
      "advanced research/analytics",
      "expanded AI features."
    ],
    "limitations": [
      "Higher AI usage and premium AI features than Personal/Family."
    ],
    "deviceAccess": [
      "Family-style seat coverage",
      "AI eligibility is plan-specific."
    ],
    "importantNotes": [
      "Useful comparator for an AI + office bundle because it includes non-AI productivity value too."
    ],
    "source": "https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "26",
    "category": "AI image, video & voice tools",
    "brand": "Adobe Firefly",
    "tier": "Firefly Pro",
    "title": "Adobe Firefly Pro",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,596.54/month",
    "monthlyReference": "₹1,597/month",
    "effectivePrices": {
      "1": 799,
      "3": 1916,
      "6": 2875,
      "12": 3833
    },
    "offers": {
      "1": "₹799",
      "3": "₹1,916",
      "6": "₹2,875",
      "12": "₹3,833"
    },
    "about": "Generative image/video and Adobe creative workflows",
    "billing": "Monthly",
    "whatYouGet": [
      "4,000 generative credits",
      "access to Photoshop on web/mobile",
      "Adobe Express Premium."
    ],
    "limitations": [
      "More generative credits than basic Firefly access",
      "integrates with Adobe creative apps."
    ],
    "deviceAccess": [
      "Generative credits are finite",
      "other Adobe apps may require separate plans."
    ],
    "importantNotes": [
      "Check renewal price, billing term and eligible Firefly features before purchase."
    ],
    "source": "https://www.adobe.com/in/creativecloud/plans.html",
    "priceBasis": "India price, incl. GST as displayed",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "34",
    "category": "AI image, video & voice tools",
    "brand": "InVideo AI",
    "tier": "Basic",
    "title": "InVideo AI Basic",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹999/month listed in India App Store",
    "monthlyReference": "₹999/month",
    "effectivePrices": {
      "1": 500,
      "3": 1199,
      "6": 1798,
      "12": 2398
    },
    "offers": {
      "1": "₹500",
      "3": "₹1,199",
      "6": "₹1,798",
      "12": "₹2,398"
    },
    "about": "Prompt-to-video and AI editing",
    "billing": "Monthly",
    "whatYouGet": [
      "AI video generation/editing",
      "stock media",
      "export allowances according to selected package."
    ],
    "limitations": [
      "Entry paid package",
      "less allowance than Plus/Pro."
    ],
    "deviceAccess": [
      "Generative credits and feature entitlements vary between package versions."
    ],
    "importantNotes": [
      "App Store listings show multiple in-app packages",
      "website checkout may differ."
    ],
    "source": "https://apps.apple.com/in/app/invideo-ai-video-editor/id6471394316",
    "priceBasis": "App Store listing; plan labels vary",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "35",
    "category": "AI image, video & voice tools",
    "brand": "InVideo AI",
    "tier": "Plus",
    "title": "InVideo AI Plus",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,999/month listed in India App Store",
    "monthlyReference": "₹1,999/month",
    "effectivePrices": {
      "1": 1000,
      "3": 2399,
      "6": 3598,
      "12": 4798
    },
    "offers": {
      "1": "₹1,000",
      "3": "₹2,399",
      "6": "₹3,598",
      "12": "₹4,798"
    },
    "about": "Prompt-to-video and creator production",
    "billing": "Monthly",
    "whatYouGet": [
      "Expanded AI video generation and editing capacity compared with entry tier."
    ],
    "limitations": [
      "Higher allowance than Basic",
      "below some high-capacity options."
    ],
    "deviceAccess": [
      "Credit usage, plan naming and entitlements vary."
    ],
    "importantNotes": [
      "Confirm current plan inclusions on the purchase screen."
    ],
    "source": "https://apps.apple.com/in/app/invideo-ai-video-editor/id6471394316",
    "priceBasis": "App Store listing; plan labels vary",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "36",
    "category": "AI image, video & voice tools",
    "brand": "InVideo AI",
    "tier": "Pro",
    "title": "InVideo AI Pro",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹2,999/month listed in India App Store",
    "monthlyReference": "₹2,999/month",
    "effectivePrices": {
      "1": 1500,
      "3": 3599,
      "6": 5398,
      "12": 7198
    },
    "offers": {
      "1": "₹1,500",
      "3": "₹3,599",
      "6": "₹5,398",
      "12": "₹7,198"
    },
    "about": "Higher-volume AI video production",
    "billing": "Monthly",
    "whatYouGet": [
      "Higher-capacity AI video package for frequent production."
    ],
    "limitations": [
      "Higher limits than Basic/Plus options listed in the App Store."
    ],
    "deviceAccess": [
      "Credits and output rules depend on plan."
    ],
    "importantNotes": [
      "Verify exact features, credit cap, renewal and platform billing."
    ],
    "source": "https://apps.apple.com/in/app/invideo-ai-video-editor/id6471394316",
    "priceBasis": "App Store listing; plan labels vary",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "40",
    "category": "OTT, films & TV",
    "brand": "Netflix",
    "tier": "Standard",
    "title": "Netflix Standard",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹499/month",
    "monthlyReference": "₹499/month",
    "effectivePrices": {
      "1": 250,
      "3": 599,
      "6": 898,
      "12": 1198
    },
    "offers": {
      "1": "₹250",
      "3": "₹599",
      "6": "₹898",
      "12": "₹1,198"
    },
    "about": "Films / series / global entertainment",
    "billing": "Monthly",
    "whatYouGet": [
      "1080p Full HD streaming on supported devices."
    ],
    "limitations": [
      "Full HD and wider device use vs Basic."
    ],
    "deviceAccess": [
      "Device concurrency and download limits depend on current plan terms."
    ],
    "importantNotes": [
      "Netflix plan prices in India can change",
      "household rules apply."
    ],
    "source": "https://www.netflix.com/in/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "41",
    "category": "OTT, films & TV",
    "brand": "Netflix",
    "tier": "Premium",
    "title": "Netflix Premium",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹649/month",
    "monthlyReference": "₹649/month",
    "effectivePrices": {
      "1": 325,
      "3": 779,
      "6": 1168,
      "12": 1558
    },
    "offers": {
      "1": "₹325",
      "3": "₹779",
      "6": "₹1,168",
      "12": "₹1,558"
    },
    "about": "Films / series / global entertainment",
    "billing": "Monthly",
    "whatYouGet": [
      "4K + HDR on supported devices",
      "spatial audio."
    ],
    "limitations": [
      "Highest listed quality",
      "premium audio/video."
    ],
    "deviceAccess": [
      "Device concurrency and download limits depend on current plan terms."
    ],
    "importantNotes": [
      "Netflix plan prices in India can change",
      "household rules apply."
    ],
    "source": "https://www.netflix.com/in/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "42",
    "category": "OTT, films & TV",
    "brand": "Amazon Prime",
    "tier": "Prime Shopping Edition",
    "title": "Amazon Prime Prime Shopping Edition",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/year",
    "monthlyReference": "₹33/month",
    "effectivePrices": {
      "1": 17,
      "3": 40,
      "6": 59,
      "12": 79
    },
    "offers": {
      "1": "₹17",
      "3": "₹40",
      "6": "₹59",
      "12": "₹79"
    },
    "about": "Ecommerce membership / video / music",
    "billing": "Annual",
    "whatYouGet": [
      "Shopping/delivery benefits."
    ],
    "limitations": [
      "Does not include Prime Video or Amazon Music entertainment benefits."
    ],
    "deviceAccess": [
      "Benefits vary by tier, city and applicable terms."
    ],
    "importantNotes": [
      "Prime benefits are bundled with shopping",
      "not merely an OTT subscription."
    ],
    "source": "https://www.aboutamazon.in/news/retail/new-amazon-prime-membership-plans-in-india",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "43",
    "category": "OTT, films & TV",
    "brand": "Amazon Prime",
    "tier": "Prime Lite",
    "title": "Amazon Prime Prime Lite",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹799/year",
    "monthlyReference": "₹67/month",
    "effectivePrices": {
      "1": 34,
      "3": 80,
      "6": 121,
      "12": 161
    },
    "offers": {
      "1": "₹34",
      "3": "₹80",
      "6": "₹121",
      "12": "₹161"
    },
    "about": "Ecommerce membership / video / music",
    "billing": "Annual",
    "whatYouGet": [
      "Shopping/shipping benefits plus limited Prime Video benefits."
    ],
    "limitations": [
      "Lower-cost tier",
      "streaming entitlements are more limited than full Prime."
    ],
    "deviceAccess": [
      "Benefits vary by tier, city and applicable terms."
    ],
    "importantNotes": [
      "Prime benefits are bundled with shopping",
      "not merely an OTT subscription."
    ],
    "source": "https://www.aboutamazon.in/news/retail/new-amazon-prime-membership-plans-in-india",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "44",
    "category": "OTT, films & TV",
    "brand": "Amazon Prime",
    "tier": "Prime",
    "title": "Amazon Prime Prime",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,499/year",
    "monthlyReference": "₹125/month",
    "effectivePrices": {
      "1": 63,
      "3": 150,
      "6": 225,
      "12": 300
    },
    "offers": {
      "1": "₹63",
      "3": "₹150",
      "6": "₹225",
      "12": "₹300"
    },
    "about": "Ecommerce membership / video / music",
    "billing": "Annual",
    "whatYouGet": [
      "Full shopping/delivery Prime benefits plus Prime Video, Amazon Music and member offers."
    ],
    "limitations": [
      "Broadest of these three",
      "full annual plan."
    ],
    "deviceAccess": [
      "Benefits vary by tier, city and applicable terms."
    ],
    "importantNotes": [
      "Prime benefits are bundled with shopping",
      "not merely an OTT subscription."
    ],
    "source": "https://www.aboutamazon.in/news/retail/new-amazon-prime-membership-plans-in-india",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "45",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Mobile Monthly",
    "title": "JioHotstar Mobile Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹79/month",
    "monthlyReference": "₹79/month",
    "effectivePrices": {
      "1": 40,
      "3": 95,
      "6": 142,
      "12": 190
    },
    "offers": {
      "1": "₹40",
      "3": "₹95",
      "6": "₹142",
      "12": "₹190"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Monthly",
    "whatYouGet": [
      "Mobile-only access",
      "ad-supported",
      "Hollywood may require add-on."
    ],
    "limitations": [
      "Cheapest mobile-only tier."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "46",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Mobile Quarterly",
    "title": "JioHotstar Mobile Quarterly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹149/3 months",
    "monthlyReference": "₹50/month",
    "effectivePrices": {
      "1": 25,
      "3": 60,
      "6": 90,
      "12": 120
    },
    "offers": {
      "1": "₹25",
      "3": "₹60",
      "6": "₹90",
      "12": "₹120"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Quarterly",
    "whatYouGet": [
      "Mobile-only entertainment",
      "ad-supported."
    ],
    "limitations": [
      "Lower effective cost than paying monthly where eligible."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "47",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Mobile Annual",
    "title": "JioHotstar Mobile Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹499/year",
    "monthlyReference": "₹42/month",
    "effectivePrices": {
      "1": 21,
      "3": 50,
      "6": 76,
      "12": 101
    },
    "offers": {
      "1": "₹21",
      "3": "₹50",
      "6": "₹76",
      "12": "₹101"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Annual",
    "whatYouGet": [
      "Mobile-only entertainment",
      "ad-supported."
    ],
    "limitations": [
      "Annual mobile plan",
      "device restrictions remain."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "48",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Super Monthly",
    "title": "JioHotstar Super Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹149/month",
    "monthlyReference": "₹149/month",
    "effectivePrices": {
      "1": 75,
      "3": 179,
      "6": 268,
      "12": 358
    },
    "offers": {
      "1": "₹75",
      "3": "₹179",
      "6": "₹268",
      "12": "₹358"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Monthly",
    "whatYouGet": [
      "Content across mobile/web/supported living room devices",
      "ad-supported."
    ],
    "limitations": [
      "Supports more device types than Mobile."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "49",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Super Quarterly",
    "title": "JioHotstar Super Quarterly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹349/3 months",
    "monthlyReference": "₹116/month",
    "effectivePrices": {
      "1": 58,
      "3": 139,
      "6": 209,
      "12": 278
    },
    "offers": {
      "1": "₹58",
      "3": "₹139",
      "6": "₹209",
      "12": "₹278"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Quarterly",
    "whatYouGet": [
      "Multi-device streaming",
      "ad-supported."
    ],
    "limitations": [
      "Quarterly term can lower monthly equivalent."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "50",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Super Annual",
    "title": "JioHotstar Super Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,099/year",
    "monthlyReference": "₹92/month",
    "effectivePrices": {
      "1": 46,
      "3": 110,
      "6": 166,
      "12": 221
    },
    "offers": {
      "1": "₹46",
      "3": "₹110",
      "6": "₹166",
      "12": "₹221"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Annual",
    "whatYouGet": [
      "Multi-device streaming",
      "ad-supported."
    ],
    "limitations": [
      "Annual multi-device plan."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "51",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Premium Monthly",
    "title": "JioHotstar Premium Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹299/month",
    "monthlyReference": "₹299/month",
    "effectivePrices": {
      "1": 150,
      "3": 359,
      "6": 538,
      "12": 718
    },
    "offers": {
      "1": "₹150",
      "3": "₹359",
      "6": "₹538",
      "12": "₹718"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Monthly",
    "whatYouGet": [
      "All content across supported devices",
      "ad-free entertainment except some live content."
    ],
    "limitations": [
      "Higher tier",
      "more simultaneous streams and better quality."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "52",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Premium Quarterly",
    "title": "JioHotstar Premium Quarterly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹699/3 months",
    "monthlyReference": "₹233/month",
    "effectivePrices": {
      "1": 117,
      "3": 280,
      "6": 419,
      "12": 559
    },
    "offers": {
      "1": "₹117",
      "3": "₹280",
      "6": "₹419",
      "12": "₹559"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Quarterly",
    "whatYouGet": [
      "Premium content, supported devices and up to 4 concurrent devices per plan family."
    ],
    "limitations": [
      "Quarterly Premium tier."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "53",
    "category": "OTT, films & TV",
    "brand": "JioHotstar",
    "tier": "Premium Annual",
    "title": "JioHotstar Premium Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹2,199/year",
    "monthlyReference": "₹183/month",
    "effectivePrices": {
      "1": 92,
      "3": 220,
      "6": 329,
      "12": 439
    },
    "offers": {
      "1": "₹92",
      "3": "₹220",
      "6": "₹329",
      "12": "₹439"
    },
    "about": "Movies / web series / sports / live TV",
    "billing": "Annual",
    "whatYouGet": [
      "Premium content, supported devices, up to 4 devices",
      "4K/quality benefits per terms."
    ],
    "limitations": [
      "Highest listed tier/term."
    ],
    "deviceAccess": [
      "Exact quality, device count and Hollywood inclusion depend on tier",
      "some live content may carry ads."
    ],
    "importantNotes": [
      "Rates are from JioStar's January 2026 plan update",
      "verify current app checkout and add-ons."
    ],
    "source": "https://cdn.jiostar.com/jiostar/wp-content/uploads/2026/01/JioHotstar-Introduces-Monthly-Plans.pdf",
    "priceBasis": "Official India plan table",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "54",
    "category": "OTT, films & TV",
    "brand": "Sony LIV",
    "tier": "Mobile Only",
    "title": "Sony LIV Mobile Only",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹699/year",
    "monthlyReference": "₹58/month",
    "effectivePrices": {
      "1": 29,
      "3": 70,
      "6": 104,
      "12": 139
    },
    "offers": {
      "1": "₹29",
      "3": "₹70",
      "6": "₹104",
      "12": "₹139"
    },
    "about": "Indian TV, originals and sports",
    "billing": "Annual",
    "whatYouGet": [
      "Sony LIV originals, TV channels/shows, movies and live sports",
      "mobile apps only",
      "up to 720p."
    ],
    "limitations": [
      "Lower-cost",
      "one concurrent device and mobile-only."
    ],
    "deviceAccess": [
      "Ads may remain on sports and selected shows."
    ],
    "importantNotes": [
      "Feature entitlements can change",
      "confirm current eligibility."
    ],
    "source": "https://www.sonyliv.com/faqs",
    "priceBasis": "India official FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "55",
    "category": "OTT, films & TV",
    "brand": "Sony LIV",
    "tier": "Premium Monthly",
    "title": "Sony LIV Premium Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "Indian TV, originals and sports",
    "billing": "Monthly",
    "whatYouGet": [
      "All-platform viewing, originals, movies, live sports, downloads, up to 4K UHD and Dolby Atmos where supported."
    ],
    "limitations": [
      "More platform support than Mobile",
      "monthly one concurrent stream."
    ],
    "deviceAccess": [
      "Ads remain on selected live/sports/reality content."
    ],
    "importantNotes": [
      "Sony LIV currently lists this tier in its India FAQ."
    ],
    "source": "https://www.sonyliv.com/faqs",
    "priceBasis": "India official FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "56",
    "category": "OTT, films & TV",
    "brand": "Sony LIV",
    "tier": "Premium Annual",
    "title": "Sony LIV Premium Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,499/year",
    "monthlyReference": "₹125/month",
    "effectivePrices": {
      "1": 63,
      "3": 150,
      "6": 225,
      "12": 300
    },
    "offers": {
      "1": "₹63",
      "3": "₹150",
      "6": "₹225",
      "12": "₹300"
    },
    "about": "Indian TV, originals and sports",
    "billing": "Annual",
    "whatYouGet": [
      "Premium catalogue, supported platforms, downloads and up to 2 concurrent streams / 4K per terms."
    ],
    "limitations": [
      "Annual billing",
      "up to 2 concurrent streams compared with monthly tier's 1."
    ],
    "deviceAccess": [
      "Exact benefits can change with rights and terms."
    ],
    "importantNotes": [
      "Verify current plan details at purchase."
    ],
    "source": "https://www.sonyliv.com/faqs",
    "priceBasis": "India official FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "57",
    "category": "OTT, films & TV",
    "brand": "Crunchyroll",
    "tier": "Fan",
    "title": "Crunchyroll Fan",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹99/month listed in India App Store",
    "monthlyReference": "₹99/month",
    "effectivePrices": {
      "1": 50,
      "3": 119,
      "6": 178,
      "12": 238
    },
    "offers": {
      "1": "₹50",
      "3": "₹119",
      "6": "₹178",
      "12": "₹238"
    },
    "about": "Anime streaming",
    "billing": "Monthly",
    "whatYouGet": [
      "Access to anime streaming catalogue and simulcasts by plan terms."
    ],
    "limitations": [
      "Entry tier",
      "fewer simultaneous/extra benefits than Mega Fan."
    ],
    "deviceAccess": [
      "Device and offline-viewing entitlements vary by current plan."
    ],
    "importantNotes": [
      "India App Store shows several membership labels",
      "confirm web price."
    ],
    "source": "https://apps.apple.com/in/app/crunchyroll/id329913454",
    "priceBasis": "App Store listing; pricing may vary",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "58",
    "category": "OTT, films & TV",
    "brand": "Crunchyroll",
    "tier": "Mega Fan",
    "title": "Crunchyroll Mega Fan",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹119/month; ₹569/year listed for Mega Fan in India App Store",
    "monthlyReference": "₹119/month",
    "effectivePrices": {
      "1": 60,
      "3": 143,
      "6": 214,
      "12": 286
    },
    "offers": {
      "1": "₹60",
      "3": "₹143",
      "6": "₹214",
      "12": "₹286"
    },
    "about": "Anime streaming",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Premium anime catalogue",
      "higher-tier benefits such as downloads or more concurrent streams depend on exact offer."
    ],
    "limitations": [
      "More benefits than Fan",
      "regional entitlements vary."
    ],
    "deviceAccess": [
      "Check exact concurrency and offline downloads at checkout."
    ],
    "importantNotes": [
      "App Store includes multiple legacy/alternative in-app purchase names."
    ],
    "source": "https://apps.apple.com/in/app/crunchyroll/id329913454",
    "priceBasis": "App Store listing; pricing may vary",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "60",
    "category": "OTT, films & TV",
    "brand": "hoichoi",
    "tier": "Monthly",
    "title": "hoichoi Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹199/month listed in India App Store",
    "monthlyReference": "₹199/month",
    "effectivePrices": {
      "1": 100,
      "3": 239,
      "6": 358,
      "12": 478
    },
    "offers": {
      "1": "₹100",
      "3": "₹239",
      "6": "₹358",
      "12": "₹478"
    },
    "about": "Bengali movies and series",
    "billing": "Monthly",
    "whatYouGet": [
      "Bengali films, originals, web series and offline downloads."
    ],
    "limitations": [
      "Monthly flexibility",
      "less commitment than annual."
    ],
    "deviceAccess": [
      "Device/stream allowance is plan-specific."
    ],
    "importantNotes": [
      "Website prices may be regional",
      "this price uses India App Store listing."
    ],
    "source": "https://apps.apple.com/in/app/hoichoi-movies-web-series/id1188755540",
    "priceBasis": "Official App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "61",
    "category": "OTT, films & TV",
    "brand": "hoichoi",
    "tier": "12-month",
    "title": "hoichoi 12-month",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹999/year listed in India App Store",
    "monthlyReference": "₹83/month",
    "effectivePrices": {
      "1": 42,
      "3": 100,
      "6": 149,
      "12": 199
    },
    "offers": {
      "1": "₹42",
      "3": "₹100",
      "6": "₹149",
      "12": "₹199"
    },
    "about": "Bengali movies and series",
    "billing": "Annual",
    "whatYouGet": [
      "Bengali movies and originals across supported devices",
      "annual access."
    ],
    "limitations": [
      "Lower monthly equivalent than monthly plan."
    ],
    "deviceAccess": [
      "Exact current library varies by rights."
    ],
    "importantNotes": [
      "App Store also shows other in-app SKUs",
      "confirm before buying."
    ],
    "source": "https://apps.apple.com/in/app/hoichoi-movies-web-series/id1188755540",
    "priceBasis": "Official App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "62",
    "category": "OTT, films & TV",
    "brand": "ManoramaMAX",
    "tier": "Premium",
    "title": "ManoramaMAX Premium",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹599/3 months or ₹1,199/year",
    "monthlyReference": "₹200/month",
    "effectivePrices": {
      "1": 100,
      "3": 240,
      "6": 360,
      "12": 480
    },
    "offers": {
      "1": "₹100",
      "3": "₹240",
      "6": "₹360",
      "12": "₹480"
    },
    "about": "Malayalam entertainment",
    "billing": "3 months / annual",
    "whatYouGet": [
      "Premium movie library, MAX exclusives and early access to selected TV shows."
    ],
    "limitations": [
      "Annual costs less per month than 3-month plan."
    ],
    "deviceAccess": [
      "India/GCC terms differ from international pricing."
    ],
    "importantNotes": [
      "Plan page also notes an annual combo with Manorama Online Premium."
    ],
    "source": "https://www.manoramamax.com/faq.html?lang=eng",
    "priceBasis": "Official India FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "67",
    "category": "OTT, films & TV",
    "brand": "Tata Play Binge",
    "tier": "4-app pack",
    "title": "Tata Play Binge 4-app pack",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "From ₹149/month",
    "monthlyReference": "₹149/month",
    "effectivePrices": {
      "1": 75,
      "3": 179,
      "6": 268,
      "12": 358
    },
    "offers": {
      "1": "₹75",
      "3": "₹179",
      "6": "₹268",
      "12": "₹358"
    },
    "about": "OTT aggregator / films and TV",
    "billing": "Monthly",
    "whatYouGet": [
      "One subscription interface for selected OTT apps",
      "watch supported apps on TV, laptop and mobile."
    ],
    "limitations": [
      "Small entry bundle",
      "choose from a limited set of apps."
    ],
    "deviceAccess": [
      "Exact app selection is plan-dependent."
    ],
    "importantNotes": [
      "The displayed 'from' price is not the full price of every selection."
    ],
    "source": "https://www.tataplaybinge.com/subscription",
    "priceBasis": "Official India pricing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "68",
    "category": "OTT, films & TV",
    "brand": "Tata Play Binge",
    "tier": "13-app pack",
    "title": "Tata Play Binge 13-app pack",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "From ₹199/month",
    "monthlyReference": "₹199/month",
    "effectivePrices": {
      "1": 100,
      "3": 239,
      "6": 358,
      "12": 478
    },
    "offers": {
      "1": "₹100",
      "3": "₹239",
      "6": "₹358",
      "12": "₹478"
    },
    "about": "OTT aggregator / films and TV",
    "billing": "Monthly",
    "whatYouGet": [
      "Access to selected OTT partners through one subscription."
    ],
    "limitations": [
      "More bundled apps than 4-app plan."
    ],
    "deviceAccess": [
      "Partner titles and device limits vary by selection."
    ],
    "importantNotes": [
      "Check whether specific OTTs you need are selected/included."
    ],
    "source": "https://www.tataplaybinge.com/subscription",
    "priceBasis": "Official India pricing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "69",
    "category": "OTT, films & TV",
    "brand": "Tata Play Binge",
    "tier": "35-app pack",
    "title": "Tata Play Binge 35-app pack",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "From ₹399/month",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "OTT aggregator / films and TV",
    "billing": "Monthly",
    "whatYouGet": [
      "Large multi-OTT catalogue via single subscription interface",
      "up to 4 devices per stated offer."
    ],
    "limitations": [
      "Broadest listed bundle tier."
    ],
    "deviceAccess": [
      "Not necessarily equivalent to standalone top tiers for every included app."
    ],
    "importantNotes": [
      "Compare app entitlements (mobile vs all devices, ads, quality) before purchase."
    ],
    "source": "https://www.tataplaybinge.com/subscription",
    "priceBasis": "Official India pricing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "70",
    "category": "OTT, films & TV",
    "brand": "Tata Play Binge (non-DTH customers)",
    "tier": "Flexi Mini",
    "title": "Tata Play Binge (non-DTH customers) Flexi Mini",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹149/month; ₹499/quarter; ₹1,799/year",
    "monthlyReference": "₹149/month",
    "effectivePrices": {
      "1": 75,
      "3": 179,
      "6": 268,
      "12": 358
    },
    "offers": {
      "1": "₹75",
      "3": "₹179",
      "6": "₹268",
      "12": "₹358"
    },
    "about": "OTT aggregator",
    "billing": "Monthly / quarterly / annual",
    "whatYouGet": [
      "Choose up to 4 apps from a selectable OTT list plus complimentary apps."
    ],
    "limitations": [
      "Small customisable app count."
    ],
    "deviceAccess": [
      "Selected-app roster is limited to the provider's list."
    ],
    "importantNotes": [
      "Pack pricing is subject to change",
      "GST/conditions may apply."
    ],
    "source": "https://www.tataplay.com/dth/tnc/tata-play-binge-service-terms-and-conditions",
    "priceBasis": "Official Tata Play terms",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "71",
    "category": "OTT, films & TV",
    "brand": "Tata Play Binge (non-DTH customers)",
    "tier": "Flexi Max",
    "title": "Tata Play Binge (non-DTH customers) Flexi Max",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹299/month; ₹699/quarter; ₹2,499/year",
    "monthlyReference": "₹299/month",
    "effectivePrices": {
      "1": 150,
      "3": 359,
      "6": 538,
      "12": 718
    },
    "offers": {
      "1": "₹150",
      "3": "₹359",
      "6": "₹538",
      "12": "₹718"
    },
    "about": "OTT aggregator",
    "billing": "Monthly / quarterly / annual",
    "whatYouGet": [
      "Choose up to 6 selectable OTT apps plus a larger complimentary app set."
    ],
    "limitations": [
      "More selectable apps than Flexi Mini."
    ],
    "deviceAccess": [
      "Specific premium content rights can still differ from standalone apps."
    ],
    "importantNotes": [
      "Check whether Prime Video or a particular plan is included as selected app or not."
    ],
    "source": "https://www.tataplay.com/dth/tnc/tata-play-binge-service-terms-and-conditions",
    "priceBasis": "Official Tata Play terms",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "72",
    "category": "OTT, films & TV",
    "brand": "Tata Play Binge (non-DTH customers)",
    "tier": "Infinity",
    "title": "Tata Play Binge (non-DTH customers) Infinity",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month; ₹899/quarter; ₹2,999/year",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "OTT aggregator",
    "billing": "Monthly / quarterly / annual",
    "whatYouGet": [
      "36 app bundle selection/entitlements listed by Tata Play terms."
    ],
    "limitations": [
      "Broadest named package in this set."
    ],
    "deviceAccess": [
      "App availability, device rules and access rights vary by service."
    ],
    "importantNotes": [
      "Aggregator access is not always identical to buying every service's standalone premium plan."
    ],
    "source": "https://www.tataplay.com/dth/tnc/tata-play-binge-service-terms-and-conditions",
    "priceBasis": "Official Tata Play terms",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "73",
    "category": "OTT, films & TV",
    "brand": "Jio OTT Pass",
    "tier": "Monthly pass",
    "title": "Jio OTT Pass Monthly pass",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹200/28 days",
    "monthlyReference": "₹200/month",
    "effectivePrices": {
      "1": 100,
      "3": 240,
      "6": 360,
      "12": 480
    },
    "offers": {
      "1": "₹100",
      "3": "₹240",
      "6": "₹360",
      "12": "₹480"
    },
    "about": "Telecom + OTT bundle",
    "billing": "28 days",
    "whatYouGet": [
      "15 premium OTTs, 30 GB data and Unlimited 5G benefits where eligible",
      "includes JioTV live channels."
    ],
    "limitations": [
      "Lower-cost short-duration OTT + mobile data bundle."
    ],
    "deviceAccess": [
      "Requires an active eligible Jio base plan",
      "Prime Video tier differs from longer passes."
    ],
    "importantNotes": [
      "Not an OTT-only independent subscription",
      "benefits depend on base mobile plan."
    ],
    "source": "https://www.jio.com/help/faq/mobile/ott-subscriptions/",
    "priceBasis": "Official Jio FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "74",
    "category": "OTT, films & TV",
    "brand": "Jio OTT Pass",
    "tier": "Quarterly pass",
    "title": "Jio OTT Pass Quarterly pass",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹550/84 days",
    "monthlyReference": "₹183/month",
    "effectivePrices": {
      "1": 92,
      "3": 220,
      "6": 329,
      "12": 439
    },
    "offers": {
      "1": "₹92",
      "3": "₹220",
      "6": "₹329",
      "12": "₹439"
    },
    "about": "Telecom + OTT bundle",
    "billing": "84 days",
    "whatYouGet": [
      "15 OTTs, 90 GB data and Unlimited 5G benefit subject to underlying plan."
    ],
    "limitations": [
      "Longer validity and larger data allowance than monthly pass."
    ],
    "deviceAccess": [
      "Requires eligible active 3-month or annual base plan",
      "check terms."
    ],
    "importantNotes": [
      "Bundle includes Prime Lite in longer-duration offers per Jio's FAQ."
    ],
    "source": "https://www.jio.com/help/faq/mobile/ott-subscriptions/",
    "priceBasis": "Official Jio FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "75",
    "category": "OTT, films & TV",
    "brand": "Jio OTT Pass",
    "tier": "Annual pass",
    "title": "Jio OTT Pass Annual pass",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹2,000/year",
    "monthlyReference": "₹167/month",
    "effectivePrices": {
      "1": 84,
      "3": 200,
      "6": 301,
      "12": 401
    },
    "offers": {
      "1": "₹84",
      "3": "₹200",
      "6": "₹301",
      "12": "₹401"
    },
    "about": "Telecom + OTT bundle",
    "billing": "365 days",
    "whatYouGet": [
      "15 OTTs, 365 GB data and Unlimited 5G benefit subject to underlying plan."
    ],
    "limitations": [
      "Longest validity with more data than shorter passes."
    ],
    "deviceAccess": [
      "Requires eligible annual Jio base plan",
      "Unlimited 5G duration may be shorter than pass."
    ],
    "importantNotes": [
      "One of the clearest examples of a telecom-led multi-OTT bundle."
    ],
    "source": "https://www.jio.com/help/faq/mobile/ott-subscriptions/",
    "priceBasis": "Official Jio FAQ",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "77",
    "category": "OTT, films & TV",
    "brand": "Tata Play DTH",
    "tier": "Channel packs and OTT add-ons",
    "title": "Tata Play DTH Channel packs and OTT add-ons",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "Pack pricing varies; e.g. Marathi Super Value ₹83/month; specific channel add-ons can be lower",
    "monthlyReference": "₹83/month",
    "effectivePrices": {
      "1": 42,
      "3": 100,
      "6": 149,
      "12": 199
    },
    "offers": {
      "1": "₹42",
      "3": "₹100",
      "6": "₹149",
      "12": "₹199"
    },
    "about": "DTH television channels / pay TV",
    "billing": "Monthly; add-ons vary",
    "whatYouGet": [
      "Linear TV channel packs, regional genre packs, channel add-ons and selected OTT combos."
    ],
    "limitations": [
      "Different content model from OTT: live scheduled channels and operator-defined packs."
    ],
    "deviceAccess": [
      "Network capacity fee and individual channel/packs can be extra."
    ],
    "importantNotes": [
      "Channel prices depend on operator, selected bouquet, region and network capacity fee."
    ],
    "source": "https://www.tataplay.com/explore/set-top-boxes-packs/dth-packages",
    "priceBasis": "Official DTH pack directory",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "78",
    "category": "YouTube & creator tools",
    "brand": "YouTube Premium",
    "tier": "Individual",
    "title": "YouTube Premium Individual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "Starts at ₹149/month; prepaid options available",
    "monthlyReference": "₹149/month",
    "effectivePrices": {
      "1": 75,
      "3": 179,
      "6": 268,
      "12": 358
    },
    "offers": {
      "1": "₹75",
      "3": "₹179",
      "6": "₹268",
      "12": "₹358"
    },
    "about": "Video / music / creator ecosystem",
    "billing": "Monthly / prepaid",
    "whatYouGet": [
      "Ad-free YouTube, background play, offline downloads and YouTube Music Premium."
    ],
    "limitations": [
      "Individual account",
      "lower household coverage than Family."
    ],
    "deviceAccess": [
      "Family sharing is subject to household eligibility",
      "some content remains sponsored by creators."
    ],
    "importantNotes": [
      "Plan/price may differ by billing channel and current promotion."
    ],
    "source": "https://www.youtube.com/premium",
    "priceBasis": "Official India plan page",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "79",
    "category": "YouTube & creator tools",
    "brand": "YouTube Premium",
    "tier": "Family",
    "title": "YouTube Premium Family",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹299/month",
    "monthlyReference": "₹299/month",
    "effectivePrices": {
      "1": 150,
      "3": 359,
      "6": 538,
      "12": 718
    },
    "offers": {
      "1": "₹150",
      "3": "₹359",
      "6": "₹538",
      "12": "₹718"
    },
    "about": "Video / music / household",
    "billing": "Monthly",
    "whatYouGet": [
      "Premium benefits for manager plus up to 5 eligible family members in same household."
    ],
    "limitations": [
      "More seats than Individual."
    ],
    "deviceAccess": [
      "Household and family-group requirements apply."
    ],
    "importantNotes": [
      "Not a general-purpose resale pool",
      "members must meet YouTube eligibility rules."
    ],
    "source": "https://www.youtube.com/premium",
    "priceBasis": "Official India plan page",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "83",
    "category": "YouTube & creator tools",
    "brand": "vidIQ",
    "tier": "Boost",
    "title": "vidIQ Boost",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "India App Store lists examples ₹999/month; annual/other channel packages vary",
    "monthlyReference": "₹999/month",
    "effectivePrices": {
      "1": 500,
      "3": 1199,
      "6": 1798,
      "12": 2398
    },
    "offers": {
      "1": "₹500",
      "3": "₹1,199",
      "6": "₹1,798",
      "12": "₹2,398"
    },
    "about": "YouTube creator analytics and AI",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Keyword/topic research, thumbnail ideas, AI Coach and channel optimization tools."
    ],
    "limitations": [
      "More AI credits, trends and optimization features than Free."
    ],
    "deviceAccess": [
      "Channel count and monthly AI credits vary by package."
    ],
    "importantNotes": [
      "The iOS listing shows multiple SKUs",
      "official web pricing may differ."
    ],
    "source": "https://vidiq.com/plans/",
    "priceBasis": "India App Store price snapshot",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "89",
    "category": "Music & audio",
    "brand": "Spotify Premium",
    "tier": "Standard Monthly",
    "title": "Spotify Premium Standard Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹139/month (promotional 2-month offer may appear to new users)",
    "monthlyReference": "₹139/month",
    "effectivePrices": {
      "1": 70,
      "3": 167,
      "6": 250,
      "12": 334
    },
    "offers": {
      "1": "₹70",
      "3": "₹167",
      "6": "₹250",
      "12": "₹334"
    },
    "about": "Music streaming",
    "billing": "Monthly",
    "whatYouGet": [
      "Ad-free music, offline downloads and very high audio quality up to ~320 kbps."
    ],
    "limitations": [
      "One account",
      "no lossless tier features listed for Platinum."
    ],
    "deviceAccess": [
      "Introductory promotion eligibility varies."
    ],
    "importantNotes": [
      "The standard monthly price is after any welcome offer."
    ],
    "source": "https://www.spotify.com/in-en/premium/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "90",
    "category": "Music & audio",
    "brand": "Spotify Premium",
    "tier": "Standard Annual prepaid",
    "title": "Spotify Premium Standard Annual prepaid",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,390/year (about ₹115.84/month equivalent)",
    "monthlyReference": "₹116/month",
    "effectivePrices": {
      "1": 58,
      "3": 139,
      "6": 209,
      "12": 278
    },
    "offers": {
      "1": "₹58",
      "3": "₹139",
      "6": "₹209",
      "12": "₹278"
    },
    "about": "Music streaming",
    "billing": "Annual prepaid",
    "whatYouGet": [
      "Standard Premium benefits",
      "prepaid for one year and does not auto-renew."
    ],
    "limitations": [
      "Lower effective monthly price than paying 12 monthly charges."
    ],
    "deviceAccess": [
      "Prepaid",
      "no automatic renewal."
    ],
    "importantNotes": [
      "Compare annual prepaid with renewal offers and family/student eligibility."
    ],
    "source": "https://www.spotify.com/in-en/premium/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "91",
    "category": "Music & audio",
    "brand": "Spotify Premium",
    "tier": "Student",
    "title": "Spotify Premium Student",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹69/month after eligible intro offer",
    "monthlyReference": "₹69/month",
    "effectivePrices": {
      "1": 35,
      "3": 83,
      "6": 124,
      "12": 166
    },
    "offers": {
      "1": "₹35",
      "3": "₹83",
      "6": "₹124",
      "12": "₹166"
    },
    "about": "Music streaming / student",
    "billing": "Monthly",
    "whatYouGet": [
      "Standard Premium features for verified students."
    ],
    "limitations": [
      "Lower price",
      "requires eligible higher-education verification."
    ],
    "deviceAccess": [
      "Student eligibility and renewal rules apply."
    ],
    "importantNotes": [
      "Student plan may be time-limited and subject to re-verification."
    ],
    "source": "https://www.spotify.com/in-en/premium/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "92",
    "category": "Music & audio",
    "brand": "Spotify Premium",
    "tier": "Platinum",
    "title": "Spotify Premium Platinum",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹299/month",
    "monthlyReference": "₹299/month",
    "effectivePrices": {
      "1": 150,
      "3": 359,
      "6": 538,
      "12": 718
    },
    "offers": {
      "1": "₹150",
      "3": "₹359",
      "6": "₹538",
      "12": "₹718"
    },
    "about": "Premium audio / multi-user music",
    "billing": "Monthly",
    "whatYouGet": [
      "Up to 3 Platinum accounts, lossless audio, AI DJ/playlist tools and DJ software connection."
    ],
    "limitations": [
      "Higher audio quality and features vs Standard."
    ],
    "deviceAccess": [
      "Up to 3 individuals at the same address according to terms."
    ],
    "importantNotes": [
      "A premium music plan, not the same as family sharing of Standard."
    ],
    "source": "https://www.spotify.com/in-en/premium/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "93",
    "category": "Music & audio",
    "brand": "Apple Music",
    "tier": "Individual",
    "title": "Apple Music Individual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹139/month",
    "monthlyReference": "₹139/month",
    "effectivePrices": {
      "1": 70,
      "3": 167,
      "6": 250,
      "12": 334
    },
    "offers": {
      "1": "₹70",
      "3": "₹167",
      "6": "₹250",
      "12": "₹334"
    },
    "about": "Music streaming",
    "billing": "Monthly",
    "whatYouGet": [
      "100M+ songs, ad-free streaming, offline downloads, Spatial Audio/lossless and Apple Music Classical."
    ],
    "limitations": [
      "Single user",
      "no multi-person sharing."
    ],
    "deviceAccess": [
      "Works across Apple, Android, Windows and supported devices."
    ],
    "importantNotes": [
      "New-subscriber free trial may be available."
    ],
    "source": "https://www.apple.com/in/apple-music/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "94",
    "category": "Music & audio",
    "brand": "Apple Music",
    "tier": "Family",
    "title": "Apple Music Family",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹229/month",
    "monthlyReference": "₹229/month",
    "effectivePrices": {
      "1": 115,
      "3": 275,
      "6": 412,
      "12": 550
    },
    "offers": {
      "1": "₹115",
      "3": "₹275",
      "6": "₹412",
      "12": "₹550"
    },
    "about": "Music streaming / household",
    "billing": "Monthly",
    "whatYouGet": [
      "All Individual features, with separate libraries/recommendations for up to six people via Family Sharing."
    ],
    "limitations": [
      "More users than Individual without sharing personal recommendations."
    ],
    "deviceAccess": [
      "Family Sharing and household terms apply."
    ],
    "importantNotes": [
      "Good family bundle candidate when all users need separate music profiles."
    ],
    "source": "https://www.apple.com/in/apple-music/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "95",
    "category": "Music & audio",
    "brand": "Apple Music",
    "tier": "Student",
    "title": "Apple Music Student",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹69/month",
    "monthlyReference": "₹69/month",
    "effectivePrices": {
      "1": 35,
      "3": 83,
      "6": 124,
      "12": 166
    },
    "offers": {
      "1": "₹35",
      "3": "₹83",
      "6": "₹124",
      "12": "₹166"
    },
    "about": "Music streaming / student",
    "billing": "Monthly",
    "whatYouGet": [
      "Individual features plus Apple TV at no extra cost per current India page."
    ],
    "limitations": [
      "Lower price for verified students."
    ],
    "deviceAccess": [
      "Student status must be verified",
      "eligibility period applies."
    ],
    "importantNotes": [
      "Check Apple’s current student verification policy."
    ],
    "source": "https://www.apple.com/in/apple-music/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "96",
    "category": "Music & audio",
    "brand": "Audible",
    "tier": "Premium Plus - 1 credit",
    "title": "Audible Premium Plus - 1 credit",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹199/month after 30-day trial where eligible",
    "monthlyReference": "₹199/month",
    "effectivePrices": {
      "1": 100,
      "3": 239,
      "6": 358,
      "12": 478
    },
    "offers": {
      "1": "₹100",
      "3": "₹239",
      "6": "₹358",
      "12": "₹478"
    },
    "about": "Audiobooks, spoken word and podcasts",
    "billing": "Monthly",
    "whatYouGet": [
      "One premium title credit monthly, Plus Catalogue streaming, member discounts and credits for selected titles kept after cancellation."
    ],
    "limitations": [
      "Includes one monthly premium-title credit beyond streaming catalogue."
    ],
    "deviceAccess": [
      "Catalogue titles may not remain included indefinitely",
      "credit rules apply."
    ],
    "importantNotes": [
      "Prime members may receive a special trial with two titles under Amazon offer terms."
    ],
    "source": "https://www.audible.in/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "98",
    "category": "Music & audio",
    "brand": "Apple Creator Studio",
    "tier": "Included Logic Pro / MainStage",
    "title": "Apple Creator Studio Included Logic Pro / MainStage",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month or ₹3,999/year; student/educator ₹199/month or ₹1,999/year",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "Music production tools",
    "billing": "Monthly / annual suite subscription",
    "whatYouGet": [
      "Logic Pro, MainStage and creative applications alongside video/editing and premium content apps."
    ],
    "limitations": [
      "One subscription covers multiple Apple creative tools vs single-app licensing."
    ],
    "deviceAccess": [
      "Device/OS compatibility applies",
      "educational plan requires eligibility."
    ],
    "importantNotes": [
      "See Apple Creator Studio row for the full bundle",
      "duplicated here for category discovery."
    ],
    "source": "https://www.apple.com/in/apple-creator-studio/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "99",
    "category": "Photo, video & design software",
    "brand": "Canva",
    "tier": "Free",
    "title": "Canva Free",
    "currency": "INR",
    "pricingType": "free",
    "advertisedRealPrice": "₹0",
    "monthlyReference": "₹0/month",
    "effectivePrices": {
      "1": 0,
      "3": 0,
      "6": 0,
      "12": 0
    },
    "offers": {
      "1": "₹0",
      "3": "₹0",
      "6": "₹0",
      "12": "₹0"
    },
    "about": "Graphic design, social posts and presentations",
    "billing": "Free",
    "whatYouGet": [
      "Drag-and-drop editor, basic templates/assets, 5 GB cloud storage and limited AI usage."
    ],
    "limitations": [
      "Basic tools",
      "smaller premium library and AI allowance than paid plans."
    ],
    "deviceAccess": [
      "Free assets/features remain subject to their licence terms."
    ],
    "importantNotes": [
      "Useful baseline for evaluating whether customers actually need a paid creative subscription."
    ],
    "source": "https://www.canva.com/en_in/pricing/",
    "priceBasis": "India official price",
    "pricingNote": "Free plan. No payment required; duration pricing is zero in the workbook."
  },
  {
    "id": "100",
    "category": "Photo, video & design software",
    "brand": "Canva",
    "tier": "Pro Lite",
    "title": "Canva Pro Lite",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,590/year",
    "monthlyReference": "₹132/month",
    "effectivePrices": {
      "1": 66,
      "3": 158,
      "6": 238,
      "12": 317
    },
    "offers": {
      "1": "₹66",
      "3": "₹158",
      "6": "₹238",
      "12": "₹317"
    },
    "about": "Graphic design / social media",
    "billing": "Annual",
    "whatYouGet": [
      "Premium templates/content, selected AI tools, background removal/resize tools and 50 GB storage."
    ],
    "limitations": [
      "Lower cost than Pro, with fewer Brand Kits/storage/AI allowance."
    ],
    "deviceAccess": [
      "One person",
      "only selected AI features included."
    ],
    "importantNotes": [
      "Plan names and included AI allowance can change",
      "see current comparison page."
    ],
    "source": "https://www.canva.com/en_in/pricing/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "101",
    "category": "Photo, video & design software",
    "brand": "Canva",
    "tier": "Pro",
    "title": "Canva Pro",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹4,000/year (daily/weekly options may also appear)",
    "monthlyReference": "₹333/month",
    "effectivePrices": {
      "1": 167,
      "3": 400,
      "6": 599,
      "12": 799
    },
    "offers": {
      "1": "₹167",
      "3": "₹400",
      "6": "₹599",
      "12": "₹799"
    },
    "about": "Graphic design / social media / video",
    "billing": "Annual",
    "whatYouGet": [
      "Premium templates/assets, background removal, resize/translation AI, scheduling, 5 Brand Kits and 100 GB storage."
    ],
    "limitations": [
      "More AI allowance and brand/social scheduling tools than Pro Lite."
    ],
    "deviceAccess": [
      "Individual plan",
      "business collaboration is limited versus Business."
    ],
    "importantNotes": [
      "AI credits and premium asset usage have terms",
      "AI Pass can be an extra-cost add-on."
    ],
    "source": "https://www.canva.com/en_in/pricing/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "102",
    "category": "Photo, video & design software",
    "brand": "Canva",
    "tier": "Business",
    "title": "Canva Business",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹6,800/year per person",
    "monthlyReference": "₹567/month",
    "effectivePrices": {
      "1": 284,
      "3": 680,
      "6": 1021,
      "12": 1361
    },
    "offers": {
      "1": "₹284",
      "3": "₹680",
      "6": "₹1,021",
      "12": "₹1,361"
    },
    "about": "Team design and brand collaboration",
    "billing": "Annual",
    "whatYouGet": [
      "Team/admin tools, brand approvals, up to 100 Brand Kits, 500 GB storage per user and higher AI allowance."
    ],
    "limitations": [
      "Team collaboration, approvals and much higher storage than Pro."
    ],
    "deviceAccess": [
      "Per-person billing",
      "actual seats/approvals depend on team setup."
    ],
    "importantNotes": [
      "Useful for agencies/brands",
      "can be overkill for solo creators."
    ],
    "source": "https://www.canva.com/en_in/pricing/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "103",
    "category": "Photo, video & design software",
    "brand": "Adobe Photoshop",
    "tier": "Single app",
    "title": "Adobe Photoshop Single app",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹599/month promo first year; regular listed price ₹733.96/month incl. GST",
    "monthlyReference": "₹599/month",
    "effectivePrices": {
      "1": 300,
      "3": 719,
      "6": 1078,
      "12": 1438
    },
    "offers": {
      "1": "₹300",
      "3": "₹719",
      "6": "₹1,078",
      "12": "₹1,438"
    },
    "about": "Professional photo editing and image compositing",
    "billing": "Annual, billed monthly",
    "whatYouGet": [
      "Desktop/web/mobile Photoshop, photo retouching, selection/masking, compositing and AI features depending on plan."
    ],
    "limitations": [
      "Single-app Photoshop vs broader Creative Cloud bundle."
    ],
    "deviceAccess": [
      "Annual commitment",
      "promotion for eligible new subscribers only."
    ],
    "importantNotes": [
      "Compare renewal price and whether Adobe Stock is an optional add-on."
    ],
    "source": "https://www.adobe.com/in/creativecloud/plans.html",
    "priceBasis": "India official price / promotion",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "104",
    "category": "Photo, video & design software",
    "brand": "Adobe Photography",
    "tier": "Photography plan",
    "title": "Adobe Photography Photography plan",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹599/month promo; regular listed price ₹638.38/month incl. GST",
    "monthlyReference": "₹599/month",
    "effectivePrices": {
      "1": 300,
      "3": 719,
      "6": 1078,
      "12": 1438
    },
    "offers": {
      "1": "₹300",
      "3": "₹719",
      "6": "₹1,078",
      "12": "₹1,438"
    },
    "about": "Photo editing and photo library management",
    "billing": "Annual, billed monthly",
    "whatYouGet": [
      "Lightroom, Lightroom Classic, Photoshop on desktop/web/mobile and 1 TB cloud storage."
    ],
    "limitations": [
      "Bundles Lightroom + Photoshop and cloud storage rather than Photoshop alone."
    ],
    "deviceAccess": [
      "Annual commitment",
      "promotion eligibility applies."
    ],
    "importantNotes": [
      "Strong value for photographers who need RAW workflow + retouching."
    ],
    "source": "https://www.adobe.com/in/creativecloud/plans.html",
    "priceBasis": "India official price / promotion",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "105",
    "category": "Photo, video & design software",
    "brand": "Adobe Premiere",
    "tier": "Single app",
    "title": "Adobe Premiere Single app",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹389/month promo for first 12 months; regular listed price ₹733.96/month incl. GST",
    "monthlyReference": "₹389/month",
    "effectivePrices": {
      "1": 195,
      "3": 467,
      "6": 700,
      "12": 934
    },
    "offers": {
      "1": "₹195",
      "3": "₹467",
      "6": "₹700",
      "12": "₹934"
    },
    "about": "Video editing / YouTube / film",
    "billing": "Annual, billed monthly",
    "whatYouGet": [
      "Professional video editing on desktop and iPhone with workflow, audio, effects and AI features by plan."
    ],
    "limitations": [
      "Single Premiere app, unlike broader Creative Cloud bundles."
    ],
    "deviceAccess": [
      "Annual commitment and new-subscriber promotion terms apply."
    ],
    "importantNotes": [
      "Check renewal pricing before using promotional price in a budget."
    ],
    "source": "https://www.adobe.com/in/creativecloud/plans.html",
    "priceBasis": "India official price / promotion",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "106",
    "category": "Photo, video & design software",
    "brand": "Adobe Creative Cloud Pro",
    "tier": "All-apps suite",
    "title": "Adobe Creative Cloud Pro All-apps suite",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "About ₹4,889/month per licence excl. GST on current listed business pricing",
    "monthlyReference": "₹4,889/month",
    "effectivePrices": {
      "1": 2445,
      "3": 5867,
      "6": 8800,
      "12": 11734
    },
    "offers": {
      "1": "₹2,445",
      "3": "₹5,867",
      "6": "₹8,800",
      "12": "₹11,734"
    },
    "about": "Professional creative suite",
    "billing": "Monthly equivalent; annual contract",
    "whatYouGet": [
      "20+ creative apps including Photoshop, Illustrator, Premiere, Acrobat Pro, and Adobe Firefly AI."
    ],
    "limitations": [
      "Much broader app bundle than single-app plans",
      "business licences have team controls."
    ],
    "deviceAccess": [
      "Business pricing shown per licence excluding GST",
      "individual offer can differ."
    ],
    "importantNotes": [
      "Clarify Individual vs Teams pricing before comparing directly."
    ],
    "source": "https://www.adobe.com/in/creativecloud/plans.html",
    "priceBasis": "Official business pricing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "107",
    "category": "Photo, video & design software",
    "brand": "Adobe Acrobat Pro",
    "tier": "PDF productivity",
    "title": "Adobe Acrobat Pro PDF productivity",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹638.38/month incl. GST",
    "monthlyReference": "₹638/month",
    "effectivePrices": {
      "1": 319,
      "3": 766,
      "6": 1148,
      "12": 1531
    },
    "offers": {
      "1": "₹319",
      "3": "₹766",
      "6": "₹1,148",
      "12": "₹1,531"
    },
    "about": "PDF editing, signatures, OCR and document tools",
    "billing": "Annual, billed monthly",
    "whatYouGet": [
      "Create/edit/convert/sign and manage PDFs across desktop, web and mobile",
      "AI capabilities depend on plan."
    ],
    "limitations": [
      "PDF workflow subscription, separate from full creative suite."
    ],
    "deviceAccess": [
      "Annual contract",
      "feature availability may depend on region/plan."
    ],
    "importantNotes": [
      "Useful adjacent add-on for freelancers/agency operations."
    ],
    "source": "https://www.adobe.com/in/creativecloud/plans.html",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "108",
    "category": "Photo, video & design software",
    "brand": "Apple Creator Studio",
    "tier": "Standard",
    "title": "Apple Creator Studio Standard",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month or ₹3,999/year",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "Video, music, photo and creative productivity apps",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Final Cut Pro, Logic Pro, Pixelmator Pro, Motion, Compressor, MainStage and premium content/AI features in Keynote, Pages, Numbers and Freeform",
      "Family Sharing for up to 5 others."
    ],
    "limitations": [
      "Multi-app creative suite vs paying for a single editing application."
    ],
    "deviceAccess": [
      "Requires compatible Apple account/device/OS",
      "some features need internet."
    ],
    "importantNotes": [
      "In India, Apple says Apple TV and Apple Arcade are now included with iCloud+ offers",
      "Apple One is no longer available to new subscribers."
    ],
    "source": "https://www.apple.com/in/apple-creator-studio/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "109",
    "category": "Photo, video & design software",
    "brand": "Apple Creator Studio",
    "tier": "Student / educator",
    "title": "Apple Creator Studio Student / educator",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹199/month or ₹1,999/year",
    "monthlyReference": "₹199/month",
    "effectivePrices": {
      "1": 100,
      "3": 239,
      "6": 358,
      "12": 478
    },
    "offers": {
      "1": "₹100",
      "3": "₹239",
      "6": "₹358",
      "12": "₹478"
    },
    "about": "Video, music, photo and creative productivity apps",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Same suite subject to education terms and eligibility."
    ],
    "limitations": [
      "Lower price for verified students/educators."
    ],
    "deviceAccess": [
      "Eligibility/verification applies."
    ],
    "importantNotes": [
      "Good value if user has compatible Apple devices and needs multiple creative tools."
    ],
    "source": "https://www.apple.com/in/apple-creator-studio/",
    "priceBasis": "India education price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "110",
    "category": "Photo, video & design software",
    "brand": "InShot Pro",
    "tier": "Monthly",
    "title": "InShot Pro Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "Mobile video editing",
    "billing": "Monthly",
    "whatYouGet": [
      "Premium transitions/effects, editing tools and removal of ads/watermarks as included in current Pro package."
    ],
    "limitations": [
      "Monthly flexibility, higher cost per month than annual plan."
    ],
    "deviceAccess": [
      "Mobile/OS-specific features and in-app terms apply."
    ],
    "importantNotes": [
      "Exact price can vary by platform and offer."
    ],
    "source": "https://apps.apple.com/in/app/inshot-ai-video-editor/id997362197",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "111",
    "category": "Photo, video & design software",
    "brand": "InShot Pro",
    "tier": "Annual",
    "title": "InShot Pro Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,499/year",
    "monthlyReference": "₹125/month",
    "effectivePrices": {
      "1": 63,
      "3": 150,
      "6": 225,
      "12": 300
    },
    "offers": {
      "1": "₹63",
      "3": "₹150",
      "6": "₹225",
      "12": "₹300"
    },
    "about": "Mobile video editing",
    "billing": "Annual",
    "whatYouGet": [
      "Pro editing tools, effects and premium assets according to current plan."
    ],
    "limitations": [
      "Lower effective monthly price than monthly plan."
    ],
    "deviceAccess": [
      "Subscription vs separate lifetime option must be distinguished."
    ],
    "importantNotes": [
      "Do not confuse annual subscription with lifetime in-app purchase."
    ],
    "source": "https://apps.apple.com/in/app/inshot-ai-video-editor/id997362197",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "112",
    "category": "Photo, video & design software",
    "brand": "InShot",
    "tier": "Lifetime unlock",
    "title": "InShot Lifetime unlock",
    "currency": "INR",
    "pricingType": "one_time",
    "advertisedRealPrice": "₹3,999 listed",
    "monthlyReference": "₹3,999/month",
    "effectivePrices": {},
    "offers": {},
    "about": "Mobile video editing",
    "billing": "One-time purchase (not recurring)",
    "whatYouGet": [
      "One-time unlocking offer as displayed in App Store."
    ],
    "limitations": [
      "Not a subscription",
      "future feature availability can differ."
    ],
    "deviceAccess": [
      "Purchases may be platform-bound and terms apply."
    ],
    "importantNotes": [
      "Included because app listings often mix recurring plans and one-time purchases."
    ],
    "source": "https://apps.apple.com/in/app/inshot-ai-video-editor/id997362197",
    "priceBasis": "India App Store listing",
    "oneTimePrice": 2000,
    "pricingNote": "One-time purchase. Do not show 3, 6 or 12 month subscription options."
  },
  {
    "id": "113",
    "category": "Photo, video & design software",
    "brand": "Picsart",
    "tier": "Pro Monthly",
    "title": "Picsart Pro Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹149/month listed for one Pro SKU; other SKUs may differ",
    "monthlyReference": "₹149/month",
    "effectivePrices": {
      "1": 75,
      "3": 179,
      "6": 268,
      "12": 358
    },
    "offers": {
      "1": "₹75",
      "3": "₹179",
      "6": "₹268",
      "12": "₹358"
    },
    "about": "Photo/video editing and AI design",
    "billing": "Monthly",
    "whatYouGet": [
      "Premium creative tools/content, more storage and monthly AI credits."
    ],
    "limitations": [
      "Entry-level paid Pro SKU",
      "higher/alternate SKUs may include more features/credits."
    ],
    "deviceAccess": [
      "App Store lists multiple price points",
      "check exact entitlement."
    ],
    "importantNotes": [
      "Because multiple SKUs show in-app, treat this as an observed listing—not a universal fixed price."
    ],
    "source": "https://apps.apple.com/in/app/picsart-ai-photo-editor-video/id587366035",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "114",
    "category": "Photo, video & design software",
    "brand": "Picsart",
    "tier": "Pro Annual",
    "title": "Picsart Pro Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,199/year listed in India App Store",
    "monthlyReference": "₹100/month",
    "effectivePrices": {
      "1": 50,
      "3": 120,
      "6": 180,
      "12": 240
    },
    "offers": {
      "1": "₹50",
      "3": "₹120",
      "6": "₹180",
      "12": "₹240"
    },
    "about": "Photo/video editing and AI design",
    "billing": "Annual",
    "whatYouGet": [
      "Premium tools/content, added storage and monthly AI credits subject to plan."
    ],
    "limitations": [
      "Annual billing lowers monthly equivalent for the listed SKU."
    ],
    "deviceAccess": [
      "Exact benefits depend on current Pro SKU."
    ],
    "importantNotes": [
      "Other Gold/Pro prices also appear in the App Store listing."
    ],
    "source": "https://apps.apple.com/in/app/picsart-ai-photo-editor-video/id587366035",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "115",
    "category": "Photo, video & design software",
    "brand": "Picsart",
    "tier": "Gold Monthly",
    "title": "Picsart Gold Monthly",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹399/month listed in India App Store",
    "monthlyReference": "₹399/month",
    "effectivePrices": {
      "1": 200,
      "3": 479,
      "6": 718,
      "12": 958
    },
    "offers": {
      "1": "₹200",
      "3": "₹479",
      "6": "₹718",
      "12": "₹958"
    },
    "about": "Photo/video editing and AI design",
    "billing": "Monthly",
    "whatYouGet": [
      "Paid creative tools, premium content, cloud storage and AI credits."
    ],
    "limitations": [
      "Different packaging/price point vs Pro",
      "exact feature comparison varies."
    ],
    "deviceAccess": [
      "App store and web prices may differ."
    ],
    "importantNotes": [
      "Confirm current plan matrix before purchasing."
    ],
    "source": "https://apps.apple.com/in/app/picsart-ai-photo-editor-video/id587366035",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "116",
    "category": "Photo, video & design software",
    "brand": "Picsart",
    "tier": "Gold Annual",
    "title": "Picsart Gold Annual",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,849/year listed in India App Store",
    "monthlyReference": "₹154/month",
    "effectivePrices": {
      "1": 77,
      "3": 185,
      "6": 277,
      "12": 370
    },
    "offers": {
      "1": "₹77",
      "3": "₹185",
      "6": "₹277",
      "12": "₹370"
    },
    "about": "Photo/video editing and AI design",
    "billing": "Annual",
    "whatYouGet": [
      "Paid creative tools and premium creative content."
    ],
    "limitations": [
      "Annual term",
      "exact features depend on current package."
    ],
    "deviceAccess": [
      "AI credits/storage terms apply."
    ],
    "importantNotes": [
      "Prices/SKUs may change by app version or user segment."
    ],
    "source": "https://apps.apple.com/in/app/picsart-ai-photo-editor-video/id587366035",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "117",
    "category": "Photo, video & design software",
    "brand": "Filmora",
    "tier": "Creator / annual / premium options",
    "title": "Filmora Creator / annual / premium options",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "India App Store lists examples from ₹999 monthly creator plan; annual plans around ₹4,999–₹7,900; lifetime around ₹7,900",
    "monthlyReference": "₹999/month",
    "effectivePrices": {
      "1": 500,
      "3": 1199,
      "6": 1798,
      "12": 2398
    },
    "offers": {
      "1": "₹500",
      "3": "₹1,199",
      "6": "₹1,798",
      "12": "₹2,398"
    },
    "about": "Video editing / YouTube",
    "billing": "Monthly / annual / lifetime options",
    "whatYouGet": [
      "Timeline editing, templates, effects, AI editing and optional cloud/asset packages depending on edition."
    ],
    "limitations": [
      "Mobile, Mac and desktop packages differ substantially."
    ],
    "deviceAccess": [
      "Some plans are platform-specific",
      "AI credits/effects can be separate."
    ],
    "importantNotes": [
      "Compare the exact OS/app version and renewal terms",
      "this is not one universal price."
    ],
    "source": "https://apps.apple.com/in/app/filmora-video-editor/id1516822341",
    "priceBasis": "India App Store listing; several SKUs",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "135",
    "category": "Cloud storage & productivity",
    "brand": "Google One",
    "tier": "Basic 100 GB",
    "title": "Google One Basic 100 GB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹149/month or ₹1,499/year in India App Store listing",
    "monthlyReference": "₹149/month",
    "effectivePrices": {
      "1": 75,
      "3": 179,
      "6": 268,
      "12": 358
    },
    "offers": {
      "1": "₹75",
      "3": "₹179",
      "6": "₹268",
      "12": "₹358"
    },
    "about": "Cloud storage",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "100 GB shared across Google Photos, Drive and Gmail",
      "storage can be shared with family group under supported plan terms."
    ],
    "limitations": [
      "More space than free 15 GB",
      "no premium AI tier unless separately eligible."
    ],
    "deviceAccess": [
      "Storage is shared across listed Google services."
    ],
    "importantNotes": [
      "Official web pricing can show account-specific offers",
      "app store price is an observed reference."
    ],
    "source": "https://one.google.com/intl/en_in/about/",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "136",
    "category": "Cloud storage & productivity",
    "brand": "Google One",
    "tier": "Standard 200 GB",
    "title": "Google One Standard 200 GB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹219/month or ₹2,199/year in India App Store listing",
    "monthlyReference": "₹219/month",
    "effectivePrices": {
      "1": 110,
      "3": 263,
      "6": 394,
      "12": 526
    },
    "offers": {
      "1": "₹110",
      "3": "₹263",
      "6": "₹394",
      "12": "₹526"
    },
    "about": "Cloud storage",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "200 GB across Photos, Drive and Gmail",
      "family sharing where supported."
    ],
    "limitations": [
      "Double storage of Basic",
      "does not itself imply premium AI plan benefits."
    ],
    "deviceAccess": [
      "Shared pool used across Google services."
    ],
    "importantNotes": [
      "Check the current web billing screen for annual savings and offers."
    ],
    "source": "https://one.google.com/intl/en_in/about/",
    "priceBasis": "India App Store listing",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "137",
    "category": "Cloud storage & productivity",
    "brand": "iCloud+",
    "tier": "50 GB",
    "title": "iCloud+ 50 GB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹75/month",
    "monthlyReference": "₹75/month",
    "effectivePrices": {
      "1": 38,
      "3": 90,
      "6": 135,
      "12": 180
    },
    "offers": {
      "1": "₹38",
      "3": "₹90",
      "6": "₹135",
      "12": "₹180"
    },
    "about": "Apple cloud storage and privacy",
    "billing": "Monthly",
    "whatYouGet": [
      "50 GB storage, Private Relay, Hide My Email, custom email domain and Apple Invites",
      "family sharing."
    ],
    "limitations": [
      "Entry paid storage",
      "one camera HomeKit Secure Video support in current plan matrix."
    ],
    "deviceAccess": [
      "Shared iCloud pool",
      "Apple ID and device ecosystem apply."
    ],
    "importantNotes": [
      "Apple has announced expanded iCloud+ India bundles that may include Apple TV and Apple Arcade benefits",
      "check current plan display."
    ],
    "source": "https://www.apple.com/in/icloud/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "138",
    "category": "Cloud storage & productivity",
    "brand": "iCloud+",
    "tier": "200 GB",
    "title": "iCloud+ 200 GB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹219/month",
    "monthlyReference": "₹219/month",
    "effectivePrices": {
      "1": 110,
      "3": 263,
      "6": 394,
      "12": 526
    },
    "offers": {
      "1": "₹110",
      "3": "₹263",
      "6": "₹394",
      "12": "₹526"
    },
    "about": "Apple cloud storage and privacy",
    "billing": "Monthly",
    "whatYouGet": [
      "200 GB, privacy features and HomeKit Secure Video for up to five cameras",
      "share with family."
    ],
    "limitations": [
      "More storage than 50 GB."
    ],
    "deviceAccess": [
      "Apple ecosystem integration",
      "storage is shared."
    ],
    "importantNotes": [
      "Check current Apple iCloud+ plan matrix for any bundled entertainment entitlements."
    ],
    "source": "https://www.apple.com/in/icloud/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
    {
    "id": "139",
    "category": "Cloud storage & productivity",
    "brand": "iCloud+",
    "tier": "2 TB",
    "title": "iCloud+ 2 TB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹749/month",
    "monthlyReference": "₹749/month",
    "effectivePrices": {
      "1": 375,
      "3": 899,
      "6": 1348,
      "12": 1798
    },
    "offers": {
      "1": "₹375",
      "3": "₹899",
      "6": "₹1,348",
      "12": "₹1,798"
    },
    "about": "Apple cloud storage and privacy",
    "billing": "Monthly",
    "whatYouGet": [
      "2 TB, privacy features, family sharing and advanced HomeKit Secure Video features."
    ],
    "limitations": [
      "High-storage tier vs 200 GB."
    ],
    "deviceAccess": [
      "Suitable for large photo/video libraries and family backups."
    ],
    "importantNotes": [
      "May be available with expanded Apple service benefits in India under current policy."
    ],
    "source": "https://www.apple.com/in/icloud/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "140",
    "category": "Cloud storage & productivity",
    "brand": "iCloud+",
    "tier": "6 TB",
    "title": "iCloud+ 6 TB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹2,999/month",
    "monthlyReference": "₹2,999/month",
    "effectivePrices": {
      "1": 1500,
      "3": 3599,
      "6": 5398,
      "12": 7198
    },
    "offers": {
      "1": "₹1,500",
      "3": "₹3,599",
      "6": "₹5,398",
      "12": "₹7,198"
    },
    "about": "Apple cloud storage and privacy",
    "billing": "Monthly",
    "whatYouGet": [
      "6 TB storage plus iCloud+ privacy benefits and family sharing."
    ],
    "limitations": [
      "Large storage tier for media libraries and multiple devices."
    ],
    "deviceAccess": [
      "High monthly cost",
      "evaluate storage usage."
    ],
    "importantNotes": [
      "Plan includes the standard iCloud+ feature set."
    ],
    "source": "https://www.apple.com/in/icloud/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "141",
    "category": "Cloud storage & productivity",
    "brand": "iCloud+",
    "tier": "12 TB",
    "title": "iCloud+ 12 TB",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹5,900/month",
    "monthlyReference": "₹5,900/month",
    "effectivePrices": {
      "1": 2950,
      "3": 7080,
      "6": 10620,
      "12": 14160
    },
    "offers": {
      "1": "₹2,950",
      "3": "₹7,080",
      "6": "₹10,620",
      "12": "₹14,160"
    },
    "about": "Apple cloud storage and privacy",
    "billing": "Monthly",
    "whatYouGet": [
      "12 TB storage plus iCloud+ privacy benefits and family sharing."
    ],
    "limitations": [
      "Largest listed iCloud+ tier."
    ],
    "deviceAccess": [
      "High-cost plan for very large storage needs."
    ],
    "importantNotes": [
      "Useful for large creator/media households",
      "not an editing app subscription."
    ],
    "source": "https://www.apple.com/in/icloud/",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "142",
    "category": "Cloud storage & productivity",
    "brand": "Microsoft 365",
    "tier": "Personal",
    "title": "Microsoft 365 Personal",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹689/month or ₹6,899/year",
    "monthlyReference": "₹689/month",
    "effectivePrices": {
      "1": 345,
      "3": 827,
      "6": 1240,
      "12": 1654
    },
    "offers": {
      "1": "₹345",
      "3": "₹827",
      "6": "₹1,240",
      "12": "₹1,654"
    },
    "about": "Office suite / productivity / cloud",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Word, Excel, PowerPoint, Outlook, OneNote, Copilot features, OneDrive and security features."
    ],
    "limitations": [
      "Single-person licence vs Family/Premium tiers."
    ],
    "deviceAccess": [
      "App/device limits and AI access are product-specific."
    ],
    "importantNotes": [
      "One of the clearer legitimate software bundles spanning multiple products."
    ],
    "source": "https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "143",
    "category": "Cloud storage & productivity",
    "brand": "Microsoft 365",
    "tier": "Family",
    "title": "Microsoft 365 Family",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹819/month or ₹8,199/year",
    "monthlyReference": "₹819/month",
    "effectivePrices": {
      "1": 410,
      "3": 983,
      "6": 1474,
      "12": 1966
    },
    "offers": {
      "1": "₹410",
      "3": "₹983",
      "6": "₹1,474",
      "12": "₹1,966"
    },
    "about": "Office suite / household productivity",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Office apps for up to six people and 2 TB shared cloud storage."
    ],
    "limitations": [
      "More users/storage than Personal",
      "AI features may remain owner-only."
    ],
    "deviceAccess": [
      "Per-person device limits and AI rules apply."
    ],
    "importantNotes": [
      "Do not assume every family member receives all Copilot benefits."
    ],
    "source": "https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "144",
    "category": "Cloud storage & productivity",
    "brand": "Microsoft 365",
    "tier": "Premium",
    "title": "Microsoft 365 Premium",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "₹1,999/month or ₹19,999/year",
    "monthlyReference": "₹1,999/month",
    "effectivePrices": {
      "1": 1000,
      "3": 2399,
      "6": 3598,
      "12": 4798
    },
    "offers": {
      "1": "₹1,000",
      "3": "₹2,399",
      "6": "₹3,598",
      "12": "₹4,798"
    },
    "about": "AI productivity suite",
    "billing": "Monthly / annual",
    "whatYouGet": [
      "Family benefits plus higher AI limits and more advanced Copilot functions."
    ],
    "limitations": [
      "More extensive AI usage than Personal/Family."
    ],
    "deviceAccess": [
      "AI capabilities can vary by app, market and account age/eligibility."
    ],
    "importantNotes": [
      "Compare included AI allowance against separate AI subscriptions."
    ],
    "source": "https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products",
    "priceBasis": "India official price",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "154",
    "category": "Learning, news & professional memberships",
    "brand": "Times Prime",
    "tier": "Annual membership",
    "title": "Times Prime Annual membership",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "Advertised entry offers from ₹349/year; offers vary",
    "monthlyReference": "₹29/month",
    "effectivePrices": {
      "1": 15,
      "3": 35,
      "6": 52,
      "12": 70
    },
    "offers": {
      "1": "₹15",
      "3": "₹35",
      "6": "₹52",
      "12": "₹70"
    },
    "about": "Lifestyle benefits / entertainment / shopping / travel",
    "billing": "Annual",
    "whatYouGet": [
      "Curated partner benefits across entertainment, food, shopping, travel, wellness and other categories",
      "mix of subscriptions and discounts."
    ],
    "limitations": [
      "Broad benefits membership",
      "not every item is a full standalone subscription."
    ],
    "deviceAccess": [
      "Offers vary and can be coupons, trials or limited benefits instead of full subscriptions."
    ],
    "importantNotes": [
      "Read each individual benefit's eligibility and renewal terms."
    ],
    "source": "https://www.timesprime.com/",
    "priceBasis": "Official service page; price is promotional/variable",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "158",
    "category": "Gaming subscriptions",
    "brand": "PlayStation Plus",
    "tier": "Essential",
    "title": "PlayStation Plus Essential",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "India Store prices observed: ₹649/month; ₹5,139/year",
    "monthlyReference": "₹649/month",
    "effectivePrices": {
      "1": 325,
      "3": 779,
      "6": 1168,
      "12": 1558
    },
    "offers": {
      "1": "₹325",
      "3": "₹779",
      "6": "₹1,168",
      "12": "₹1,558"
    },
    "about": "Console gaming",
    "billing": "Monthly / 3 months / annual",
    "whatYouGet": [
      "Online multiplayer, monthly games and member discounts / cloud storage per current terms."
    ],
    "limitations": [
      "Entry tier",
      "no full Extra/Deluxe game catalogue."
    ],
    "deviceAccess": [
      "Console/network and account region requirements apply."
    ],
    "importantNotes": [
      "India tier naming/pricing can differ from some countries",
      "use local PlayStation Store checkout."
    ],
    "source": "https://www.playstation.com/en-in/ps-plus/",
    "priceBasis": "Price tracker cross-check; verify PlayStation Store",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  },
  {
    "id": "159",
    "category": "Gaming subscriptions",
    "brand": "PlayStation Plus",
    "tier": "Extra",
    "title": "PlayStation Plus Extra",
    "currency": "INR",
    "pricingType": "subscription",
    "advertisedRealPrice": "India Store prices observed: ₹979/month; ₹8,709/year",
    "monthlyReference": "₹979/month",
    "effectivePrices": {
      "1": 490,
      "3": 1175,
      "6": 1762,
      "12": 2350
    },
    "offers": {
      "1": "₹490",
      "3": "₹1,175",
      "6": "₹1,762",
      "12": "₹2,350"
    },
    "about": "Console gaming and game catalogue",
    "billing": "Monthly / 3 months / annual",
    "whatYouGet": [
      "Essential benefits plus a catalogue of PS4/PS5 games."
    ],
    "limitations": [
      "Adds game catalogue vs Essential."
    ],
    "deviceAccess": [
      "Game catalogue rotates and varies by region."
    ],
    "importantNotes": [
      "Not the same as buying games permanently."
    ],
    "source": "https://www.playstation.com/en-in/ps-plus/",
    "priceBasis": "Price tracker cross-check; verify PlayStation Store",
    "pricingNote": "Selling prices are sourced from the Excel effective-price columns."
  }
];

export const INR_PRODUCT_DETAILS_BY_ID = Object.freeze(
  Object.fromEntries(INR_PRODUCT_DETAILS.map((product) => [String(product.id), product]))
);

export function getInrProductDetails(productOrId) {
  const id =
    typeof productOrId === "object" && productOrId !== null
      ? String(productOrId.id)
      : String(productOrId);

  return INR_PRODUCT_DETAILS_BY_ID[id] || null;
}

export default INR_PRODUCT_DETAILS;