/**
 * BundleUpOTT effective prices imported from the user's workbook:
 * "170_Subscriptions_Effective_Price_Model final pric es.xlsx"
 *
 * Source columns:
 * - All Plans: ID, Category, Service / Brand, Plan / Tier
 * - Advertised Real Price (Source), Monthly Ref. (Source), Currency
 * - 1M / 3M / 6M / 12M Effective Price
 *
 * The `offers` property intentionally uses currency strings compatible with
 * the current frontend/backend parseOfferAmount() and getOfferPriceInfo()
 * functions. `effectivePrices` keeps the numeric workbook values as well.
 *
 * 36 rows have no numeric effective price in the workbook and remain "Verify".
 * Do not enable payment for those rows until their provider price is confirmed.
 * Canva Free (ID 99) remains zero-priced. InShot Lifetime (ID 112) is marked
 * one_time; do not treat its 3/6/12 month model outputs as subscription terms.
 */

export const EFFECTIVE_PRICE_OVERRIDES = Object.freeze({
  "1": {
      "id": 1,
      "category": "AI assistants & research",
      "brand": "ChatGPT",
      "tier": "Go",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "2": {
      "id": 2,
      "category": "AI assistants & research",
      "brand": "ChatGPT",
      "tier": "Plus",
      "advertisedRealPrice": "₹1,999/month",
      "monthlyReference": "₹1,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,000",
          "3": "₹2,399",
          "6": "₹3,598",
          "12": "₹4,798"
      },
      "effectivePrices": {
          "1": 1000.0,
          "3": 2399.0,
          "6": 3598.0,
          "12": 4798.0
      }
  },
  "3": {
      "id": 3,
      "category": "AI assistants & research",
      "brand": "ChatGPT",
      "tier": "Pro 5x",
      "advertisedRealPrice": "₹10,699/month",
      "monthlyReference": "₹10,699/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹5,350",
          "3": "₹12,839",
          "6": "₹19,258",
          "12": "₹25,678"
      },
      "effectivePrices": {
          "1": 5350.0,
          "3": 12839.0,
          "6": 19258.0,
          "12": 25678.0
      }
  },
  "4": {
      "id": 4,
      "category": "AI assistants & research",
      "brand": "Google Gemini / Google One",
      "tier": "Google AI Plus",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "5": {
      "id": 5,
      "category": "AI assistants & research",
      "brand": "Google Gemini / Google One",
      "tier": "Google AI Pro",
      "advertisedRealPrice": "About ₹1,950/month",
      "monthlyReference": "₹1,950/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹975",
          "3": "₹2,340",
          "6": "₹3,510",
          "12": "₹4,680"
      },
      "effectivePrices": {
          "1": 975.0,
          "3": 2340.0,
          "6": 3510.0,
          "12": 4680.0
      }
  },
  "6": {
      "id": 6,
      "category": "AI assistants & research",
      "brand": "Google Gemini / Google One",
      "tier": "Google AI Ultra",
      "advertisedRealPrice": "From about ₹6,500/month; higher-usage variants may cost more",
      "monthlyReference": "₹6,500/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹3,250",
          "3": "₹7,800",
          "6": "₹11,700",
          "12": "₹15,600"
      },
      "effectivePrices": {
          "1": 3250.0,
          "3": 7800.0,
          "6": 11700.0,
          "12": 15600.0
      }
  },
  "7": {
      "id": 7,
      "category": "AI assistants & research",
      "brand": "Claude",
      "tier": "Pro",
      "advertisedRealPrice": "₹1,999/month (India reported); global official page: $20 monthly or $200 annually",
      "monthlyReference": "₹1,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,000",
          "3": "₹2,399",
          "6": "₹3,598",
          "12": "₹4,798"
      },
      "effectivePrices": {
          "1": 1000.0,
          "3": 2399.0,
          "6": 3598.0,
          "12": 4798.0
      }
  },
  "8": {
      "id": 8,
      "category": "AI assistants & research",
      "brand": "Claude",
      "tier": "Max 5x",
      "advertisedRealPrice": "₹11,999/month (India reported)",
      "monthlyReference": "₹11,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹6,000",
          "3": "₹14,399",
          "6": "₹21,598",
          "12": "₹28,798"
      },
      "effectivePrices": {
          "1": 6000.0,
          "3": 14399.0,
          "6": 21598.0,
          "12": 28798.0
      }
  },
  "9": {
      "id": 9,
      "category": "AI assistants & research",
      "brand": "Claude",
      "tier": "Max 20x",
      "advertisedRealPrice": "₹23,999/month (India reported)",
      "monthlyReference": "₹23,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹12,000",
          "3": "₹28,799",
          "6": "₹43,198",
          "12": "₹57,598"
      },
      "effectivePrices": {
          "1": 12000.0,
          "3": 28799.0,
          "6": 43198.0,
          "12": 57598.0
      }
  },
  "10": {
      "id": 10,
      "category": "AI assistants & research",
      "brand": "Perplexity",
      "tier": "Pro",
      "advertisedRealPrice": "About ₹1,999/month in India App Store listing",
      "monthlyReference": "₹1,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,000",
          "3": "₹2,399",
          "6": "₹3,598",
          "12": "₹4,798"
      },
      "effectivePrices": {
          "1": 1000.0,
          "3": 2399.0,
          "6": 3598.0,
          "12": 4798.0
      }
  },
  "11": {
      "id": 11,
      "category": "AI assistants & research",
      "brand": "Perplexity",
      "tier": "Max",
      "advertisedRealPrice": "About ₹19,900/month in India App Store listing",
      "monthlyReference": "₹19,900/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹9,950",
          "3": "₹23,880",
          "6": "₹35,820",
          "12": "₹47,760"
      },
      "effectivePrices": {
          "1": 9950.0,
          "3": 23880.0,
          "6": 35820.0,
          "12": 47760.0
      }
  },
  "12": {
      "id": 12,
      "category": "AI assistants & research",
      "brand": "Grok",
      "tier": "SuperGrok",
      "advertisedRealPrice": "US$30/month",
      "monthlyReference": "US$30.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$15.00",
          "3": "US$36.00",
          "6": "US$54.00",
          "12": "US$72.00"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 36.0,
          "6": 54.0,
          "12": 72.0
      }
  },
  "13": {
      "id": 13,
      "category": "AI assistants & research",
      "brand": "Grok",
      "tier": "SuperGrok Plus",
      "advertisedRealPrice": "US$100/month",
      "monthlyReference": "US$100.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$50.00",
          "3": "US$120.00",
          "6": "US$180.00",
          "12": "US$240.00"
      },
      "effectivePrices": {
          "1": 50.0,
          "3": 120.0,
          "6": 180.0,
          "12": 240.0
      }
  },
  "14": {
      "id": 14,
      "category": "AI assistants & research",
      "brand": "Microsoft Copilot / Microsoft 365",
      "tier": "Microsoft 365 Personal",
      "advertisedRealPrice": "₹689/month or ₹6,899/year",
      "monthlyReference": "₹689/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹345",
          "3": "₹827",
          "6": "₹1,240",
          "12": "₹1,654"
      },
      "effectivePrices": {
          "1": 345.0,
          "3": 827.0,
          "6": 1240.0,
          "12": 1654.0
      }
  },
  "15": {
      "id": 15,
      "category": "AI assistants & research",
      "brand": "Microsoft Copilot / Microsoft 365",
      "tier": "Microsoft 365 Family",
      "advertisedRealPrice": "₹819/month or ₹8,199/year",
      "monthlyReference": "₹819/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹410",
          "3": "₹983",
          "6": "₹1,474",
          "12": "₹1,966"
      },
      "effectivePrices": {
          "1": 410.0,
          "3": 983.0,
          "6": 1474.0,
          "12": 1966.0
      }
  },
  "16": {
      "id": 16,
      "category": "AI assistants & research",
      "brand": "Microsoft Copilot / Microsoft 365",
      "tier": "Microsoft 365 Premium",
      "advertisedRealPrice": "₹1,999/month or ₹19,999/year",
      "monthlyReference": "₹1,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,000",
          "3": "₹2,399",
          "6": "₹3,598",
          "12": "₹4,798"
      },
      "effectivePrices": {
          "1": 1000.0,
          "3": 2399.0,
          "6": 3598.0,
          "12": 4798.0
      }
  },
  "17": {
      "id": 17,
      "category": "AI image, video & voice tools",
      "brand": "Midjourney",
      "tier": "Basic",
      "advertisedRealPrice": "US$10/month or US$96/year (US$8/month equivalent)",
      "monthlyReference": "US$10.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$5.00",
          "3": "US$12.00",
          "6": "US$18.00",
          "12": "US$24.00"
      },
      "effectivePrices": {
          "1": 5.0,
          "3": 12.0,
          "6": 18.0,
          "12": 24.0
      }
  },
  "18": {
      "id": 18,
      "category": "AI image, video & voice tools",
      "brand": "Midjourney",
      "tier": "Standard",
      "advertisedRealPrice": "US$30/month or US$288/year (US$24/month equivalent)",
      "monthlyReference": "US$30.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$15.00",
          "3": "US$36.00",
          "6": "US$54.00",
          "12": "US$72.00"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 36.0,
          "6": 54.0,
          "12": 72.0
      }
  },
  "19": {
      "id": 19,
      "category": "AI image, video & voice tools",
      "brand": "Midjourney",
      "tier": "Pro",
      "advertisedRealPrice": "US$60/month or US$576/year (US$48/month equivalent)",
      "monthlyReference": "US$60.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$30.00",
          "3": "US$72.00",
          "6": "US$108.00",
          "12": "US$144.00"
      },
      "effectivePrices": {
          "1": 30.0,
          "3": 72.0,
          "6": 108.0,
          "12": 144.0
      }
  },
  "20": {
      "id": 20,
      "category": "AI image, video & voice tools",
      "brand": "Midjourney",
      "tier": "Mega",
      "advertisedRealPrice": "US$120/month or US$1,152/year (US$96/month equivalent)",
      "monthlyReference": "US$120.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$60.00",
          "3": "US$144.00",
          "6": "US$216.00",
          "12": "US$288.00"
      },
      "effectivePrices": {
          "1": 60.0,
          "3": 144.0,
          "6": 216.0,
          "12": 288.0
      }
  },
  "21": {
      "id": 21,
      "category": "AI image, video & voice tools",
      "brand": "Leonardo.Ai",
      "tier": "Essential",
      "advertisedRealPrice": "US$12/month",
      "monthlyReference": "US$12.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$6.00",
          "3": "US$14.40",
          "6": "US$21.60",
          "12": "US$28.80"
      },
      "effectivePrices": {
          "1": 6.0,
          "3": 14.4,
          "6": 21.6,
          "12": 28.8
      }
  },
  "22": {
      "id": 22,
      "category": "AI image, video & voice tools",
      "brand": "Leonardo.Ai",
      "tier": "Premium",
      "advertisedRealPrice": "US$30/month",
      "monthlyReference": "US$30.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$15.00",
          "3": "US$36.00",
          "6": "US$54.00",
          "12": "US$72.00"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 36.0,
          "6": 54.0,
          "12": 72.0
      }
  },
  "23": {
      "id": 23,
      "category": "AI image, video & voice tools",
      "brand": "Leonardo.Ai",
      "tier": "Ultimate",
      "advertisedRealPrice": "US$60/month",
      "monthlyReference": "US$60.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$30.00",
          "3": "US$72.00",
          "6": "US$108.00",
          "12": "US$144.00"
      },
      "effectivePrices": {
          "1": 30.0,
          "3": 72.0,
          "6": 108.0,
          "12": 144.0
      }
  },
  "24": {
      "id": 24,
      "category": "AI image, video & voice tools",
      "brand": "Ideogram",
      "tier": "Plus",
      "advertisedRealPrice": "US$20 month-to-month; US$15/month equivalent billed US$180 annually",
      "monthlyReference": "US$15.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$7.50",
          "3": "US$18.00",
          "6": "US$27.00",
          "12": "US$36.00"
      },
      "effectivePrices": {
          "1": 7.5,
          "3": 18.0,
          "6": 27.0,
          "12": 36.0
      }
  },
  "25": {
      "id": 25,
      "category": "AI image, video & voice tools",
      "brand": "Ideogram",
      "tier": "Pro",
      "advertisedRealPrice": "US$60 month-to-month; US$42/month equivalent billed US$504 annually",
      "monthlyReference": "US$42.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$21.00",
          "3": "US$50.40",
          "6": "US$75.60",
          "12": "US$100.80"
      },
      "effectivePrices": {
          "1": 21.0,
          "3": 50.4,
          "6": 75.6,
          "12": 100.8
      }
  },
  "26": {
      "id": 26,
      "category": "AI image, video & voice tools",
      "brand": "Adobe Firefly",
      "tier": "Firefly Pro",
      "advertisedRealPrice": "₹1,596.54/month",
      "monthlyReference": "₹1,597/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹799",
          "3": "₹1,916",
          "6": "₹2,875",
          "12": "₹3,833"
      },
      "effectivePrices": {
          "1": 799.0,
          "3": 1916.0,
          "6": 2875.0,
          "12": 3833.0
      }
  },
  "27": {
      "id": 27,
      "category": "AI image, video & voice tools",
      "brand": "Runway",
      "tier": "Standard",
      "advertisedRealPrice": "US$12/month equivalent (US$144/year billed annually); monthly list may be higher",
      "monthlyReference": "US$12.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$6.00",
          "3": "US$14.40",
          "6": "US$21.60",
          "12": "US$28.80"
      },
      "effectivePrices": {
          "1": 6.0,
          "3": 14.4,
          "6": 21.6,
          "12": 28.8
      }
  },
  "28": {
      "id": 28,
      "category": "AI image, video & voice tools",
      "brand": "Runway",
      "tier": "Pro",
      "advertisedRealPrice": "US$28/month equivalent (US$336/year billed annually)",
      "monthlyReference": "US$28.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$14.00",
          "3": "US$33.60",
          "6": "US$50.40",
          "12": "US$67.20"
      },
      "effectivePrices": {
          "1": 14.0,
          "3": 33.6,
          "6": 50.4,
          "12": 67.2
      }
  },
  "29": {
      "id": 29,
      "category": "AI image, video & voice tools",
      "brand": "Runway",
      "tier": "Max",
      "advertisedRealPrice": "US$76/month equivalent (US$912/year billed annually)",
      "monthlyReference": "US$76.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$38.00",
          "3": "US$91.20",
          "6": "US$136.80",
          "12": "US$182.40"
      },
      "effectivePrices": {
          "1": 38.0,
          "3": 91.2,
          "6": 136.8,
          "12": 182.4
      }
  },
  "30": {
      "id": 30,
      "category": "AI image, video & voice tools",
      "brand": "HeyGen",
      "tier": "Creator",
      "advertisedRealPrice": "US$29/month",
      "monthlyReference": "US$29.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$14.50",
          "3": "US$34.80",
          "6": "US$52.20",
          "12": "US$69.60"
      },
      "effectivePrices": {
          "1": 14.5,
          "3": 34.8,
          "6": 52.2,
          "12": 69.6
      }
  },
  "31": {
      "id": 31,
      "category": "AI image, video & voice tools",
      "brand": "HeyGen",
      "tier": "Pro",
      "advertisedRealPrice": "US$49/month",
      "monthlyReference": "US$49.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$24.50",
          "3": "US$58.80",
          "6": "US$88.20",
          "12": "US$117.60"
      },
      "effectivePrices": {
          "1": 24.5,
          "3": 58.8,
          "6": 88.2,
          "12": 117.6
      }
  },
  "32": {
      "id": 32,
      "category": "AI image, video & voice tools",
      "brand": "Pictory",
      "tier": "Starter",
      "advertisedRealPrice": "US$25/month equivalent billed annually; US$29 month-to-month",
      "monthlyReference": "US$25.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$12.50",
          "3": "US$30.00",
          "6": "US$45.00",
          "12": "US$60.00"
      },
      "effectivePrices": {
          "1": 12.5,
          "3": 30.0,
          "6": 45.0,
          "12": 60.0
      }
  },
  "33": {
      "id": 33,
      "category": "AI image, video & voice tools",
      "brand": "Pictory",
      "tier": "Professional",
      "advertisedRealPrice": "US$35/month equivalent billed annually; US$59 month-to-month shown on pricing page",
      "monthlyReference": "US$35.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$17.50",
          "3": "US$42.00",
          "6": "US$63.00",
          "12": "US$84.00"
      },
      "effectivePrices": {
          "1": 17.5,
          "3": 42.0,
          "6": 63.0,
          "12": 84.0
      }
  },
  "34": {
      "id": 34,
      "category": "AI image, video & voice tools",
      "brand": "InVideo AI",
      "tier": "Basic",
      "advertisedRealPrice": "₹999/month listed in India App Store",
      "monthlyReference": "₹999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹500",
          "3": "₹1,199",
          "6": "₹1,798",
          "12": "₹2,398"
      },
      "effectivePrices": {
          "1": 500.0,
          "3": 1199.0,
          "6": 1798.0,
          "12": 2398.0
      }
  },
  "35": {
      "id": 35,
      "category": "AI image, video & voice tools",
      "brand": "InVideo AI",
      "tier": "Plus",
      "advertisedRealPrice": "₹1,999/month listed in India App Store",
      "monthlyReference": "₹1,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,000",
          "3": "₹2,399",
          "6": "₹3,598",
          "12": "₹4,798"
      },
      "effectivePrices": {
          "1": 1000.0,
          "3": 2399.0,
          "6": 3598.0,
          "12": 4798.0
      }
  },
  "36": {
      "id": 36,
      "category": "AI image, video & voice tools",
      "brand": "InVideo AI",
      "tier": "Pro",
      "advertisedRealPrice": "₹2,999/month listed in India App Store",
      "monthlyReference": "₹2,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,500",
          "3": "₹3,599",
          "6": "₹5,398",
          "12": "₹7,198"
      },
      "effectivePrices": {
          "1": 1500.0,
          "3": 3599.0,
          "6": 5398.0,
          "12": 7198.0
      }
  },
  "37": {
      "id": 37,
      "category": "AI image, video & voice tools",
      "brand": "ElevenLabs",
      "tier": "Starter / Creator / Pro",
      "advertisedRealPrice": "Dynamic; published prices and included credits shown at checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "38": {
      "id": 38,
      "category": "OTT, films & TV",
      "brand": "Netflix",
      "tier": "Mobile",
      "advertisedRealPrice": "₹149/month",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "39": {
      "id": 39,
      "category": "OTT, films & TV",
      "brand": "Netflix",
      "tier": "Basic",
      "advertisedRealPrice": "₹199/month",
      "monthlyReference": "₹199/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹239",
          "6": "₹358",
          "12": "₹478"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 239.0,
          "6": 358.0,
          "12": 478.0
      }
  },
  "40": {
      "id": 40,
      "category": "OTT, films & TV",
      "brand": "Netflix",
      "tier": "Standard",
      "advertisedRealPrice": "₹499/month",
      "monthlyReference": "₹499/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹250",
          "3": "₹599",
          "6": "₹898",
          "12": "₹1,198"
      },
      "effectivePrices": {
          "1": 250.0,
          "3": 599.0,
          "6": 898.0,
          "12": 1198.0
      }
  },
  "41": {
      "id": 41,
      "category": "OTT, films & TV",
      "brand": "Netflix",
      "tier": "Premium",
      "advertisedRealPrice": "₹649/month",
      "monthlyReference": "₹649/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹325",
          "3": "₹779",
          "6": "₹1,168",
          "12": "₹1,558"
      },
      "effectivePrices": {
          "1": 325.0,
          "3": 779.0,
          "6": 1168.0,
          "12": 1558.0
      }
  },
  "42": {
      "id": 42,
      "category": "OTT, films & TV",
      "brand": "Amazon Prime",
      "tier": "Prime Shopping Edition",
      "advertisedRealPrice": "₹399/year",
      "monthlyReference": "₹33/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹17",
          "3": "₹40",
          "6": "₹59",
          "12": "₹79"
      },
      "effectivePrices": {
          "1": 17.0,
          "3": 40.0,
          "6": 59.0,
          "12": 79.0
      }
  },
  "43": {
      "id": 43,
      "category": "OTT, films & TV",
      "brand": "Amazon Prime",
      "tier": "Prime Lite",
      "advertisedRealPrice": "₹799/year",
      "monthlyReference": "₹67/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹34",
          "3": "₹80",
          "6": "₹121",
          "12": "₹161"
      },
      "effectivePrices": {
          "1": 34.0,
          "3": 80.0,
          "6": 121.0,
          "12": 161.0
      }
  },
  "44": {
      "id": 44,
      "category": "OTT, films & TV",
      "brand": "Amazon Prime",
      "tier": "Prime",
      "advertisedRealPrice": "₹1,499/year",
      "monthlyReference": "₹125/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹63",
          "3": "₹150",
          "6": "₹225",
          "12": "₹300"
      },
      "effectivePrices": {
          "1": 63.0,
          "3": 150.0,
          "6": 225.0,
          "12": 300.0
      }
  },
  "45": {
      "id": 45,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Mobile Monthly",
      "advertisedRealPrice": "₹79/month",
      "monthlyReference": "₹79/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹40",
          "3": "₹95",
          "6": "₹142",
          "12": "₹190"
      },
      "effectivePrices": {
          "1": 40.0,
          "3": 95.0,
          "6": 142.0,
          "12": 190.0
      }
  },
  "46": {
      "id": 46,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Mobile Quarterly",
      "advertisedRealPrice": "₹149/3 months",
      "monthlyReference": "₹50/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹25",
          "3": "₹60",
          "6": "₹90",
          "12": "₹120"
      },
      "effectivePrices": {
          "1": 25.0,
          "3": 60.0,
          "6": 90.0,
          "12": 120.0
      }
  },
  "47": {
      "id": 47,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Mobile Annual",
      "advertisedRealPrice": "₹499/year",
      "monthlyReference": "₹42/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹21",
          "3": "₹50",
          "6": "₹76",
          "12": "₹101"
      },
      "effectivePrices": {
          "1": 21.0,
          "3": 50.0,
          "6": 76.0,
          "12": 101.0
      }
  },
  "48": {
      "id": 48,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Super Monthly",
      "advertisedRealPrice": "₹149/month",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "49": {
      "id": 49,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Super Quarterly",
      "advertisedRealPrice": "₹349/3 months",
      "monthlyReference": "₹116/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹58",
          "3": "₹139",
          "6": "₹209",
          "12": "₹278"
      },
      "effectivePrices": {
          "1": 58.0,
          "3": 139.0,
          "6": 209.0,
          "12": 278.0
      }
  },
  "50": {
      "id": 50,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Super Annual",
      "advertisedRealPrice": "₹1,099/year",
      "monthlyReference": "₹92/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹46",
          "3": "₹110",
          "6": "₹166",
          "12": "₹221"
      },
      "effectivePrices": {
          "1": 46.0,
          "3": 110.0,
          "6": 166.0,
          "12": 221.0
      }
  },
  "51": {
      "id": 51,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Premium Monthly",
      "advertisedRealPrice": "₹299/month",
      "monthlyReference": "₹299/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹150",
          "3": "₹359",
          "6": "₹538",
          "12": "₹718"
      },
      "effectivePrices": {
          "1": 150.0,
          "3": 359.0,
          "6": 538.0,
          "12": 718.0
      }
  },
  "52": {
      "id": 52,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Premium Quarterly",
      "advertisedRealPrice": "₹699/3 months",
      "monthlyReference": "₹233/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹117",
          "3": "₹280",
          "6": "₹419",
          "12": "₹559"
      },
      "effectivePrices": {
          "1": 117.0,
          "3": 280.0,
          "6": 419.0,
          "12": 559.0
      }
  },
  "53": {
      "id": 53,
      "category": "OTT, films & TV",
      "brand": "JioHotstar",
      "tier": "Premium Annual",
      "advertisedRealPrice": "₹2,199/year",
      "monthlyReference": "₹183/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹92",
          "3": "₹220",
          "6": "₹329",
          "12": "₹439"
      },
      "effectivePrices": {
          "1": 92.0,
          "3": 220.0,
          "6": 329.0,
          "12": 439.0
      }
  },
  "54": {
      "id": 54,
      "category": "OTT, films & TV",
      "brand": "Sony LIV",
      "tier": "Mobile Only",
      "advertisedRealPrice": "₹699/year",
      "monthlyReference": "₹58/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹29",
          "3": "₹70",
          "6": "₹104",
          "12": "₹139"
      },
      "effectivePrices": {
          "1": 29.0,
          "3": 70.0,
          "6": 104.0,
          "12": 139.0
      }
  },
  "55": {
      "id": 55,
      "category": "OTT, films & TV",
      "brand": "Sony LIV",
      "tier": "Premium Monthly",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "56": {
      "id": 56,
      "category": "OTT, films & TV",
      "brand": "Sony LIV",
      "tier": "Premium Annual",
      "advertisedRealPrice": "₹1,499/year",
      "monthlyReference": "₹125/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹63",
          "3": "₹150",
          "6": "₹225",
          "12": "₹300"
      },
      "effectivePrices": {
          "1": 63.0,
          "3": 150.0,
          "6": 225.0,
          "12": 300.0
      }
  },
  "57": {
      "id": 57,
      "category": "OTT, films & TV",
      "brand": "Crunchyroll",
      "tier": "Fan",
      "advertisedRealPrice": "₹99/month listed in India App Store",
      "monthlyReference": "₹99/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹50",
          "3": "₹119",
          "6": "₹178",
          "12": "₹238"
      },
      "effectivePrices": {
          "1": 50.0,
          "3": 119.0,
          "6": 178.0,
          "12": 238.0
      }
  },
  "58": {
      "id": 58,
      "category": "OTT, films & TV",
      "brand": "Crunchyroll",
      "tier": "Mega Fan",
      "advertisedRealPrice": "₹119/month; ₹569/year listed for Mega Fan in India App Store",
      "monthlyReference": "₹119/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹60",
          "3": "₹143",
          "6": "₹214",
          "12": "₹286"
      },
      "effectivePrices": {
          "1": 60.0,
          "3": 143.0,
          "6": 214.0,
          "12": 286.0
      }
  },
  "59": {
      "id": 59,
      "category": "OTT, films & TV",
      "brand": "Crunchyroll",
      "tier": "Other app-store tiers",
      "advertisedRealPrice": "Other in-app listings range from ₹299 to ₹749",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "60": {
      "id": 60,
      "category": "OTT, films & TV",
      "brand": "hoichoi",
      "tier": "Monthly",
      "advertisedRealPrice": "₹199/month listed in India App Store",
      "monthlyReference": "₹199/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹239",
          "6": "₹358",
          "12": "₹478"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 239.0,
          "6": 358.0,
          "12": 478.0
      }
  },
  "61": {
      "id": 61,
      "category": "OTT, films & TV",
      "brand": "hoichoi",
      "tier": "12-month",
      "advertisedRealPrice": "₹999/year listed in India App Store",
      "monthlyReference": "₹83/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹42",
          "3": "₹100",
          "6": "₹149",
          "12": "₹199"
      },
      "effectivePrices": {
          "1": 42.0,
          "3": 100.0,
          "6": 149.0,
          "12": 199.0
      }
  },
  "62": {
      "id": 62,
      "category": "OTT, films & TV",
      "brand": "ManoramaMAX",
      "tier": "Premium",
      "advertisedRealPrice": "₹599/3 months or ₹1,199/year",
      "monthlyReference": "₹200/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹240",
          "6": "₹360",
          "12": "₹480"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 240.0,
          "6": 360.0,
          "12": 480.0
      }
  },
  "63": {
      "id": 63,
      "category": "OTT, films & TV",
      "brand": "ZEE5",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; exact offer shown at official checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "64": {
      "id": 64,
      "category": "OTT, films & TV",
      "brand": "Lionsgate Play",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; see official India offer",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "65": {
      "id": 65,
      "category": "OTT, films & TV",
      "brand": "Sun NXT",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; see official plans",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "66": {
      "id": 66,
      "category": "OTT, films & TV",
      "brand": "Aha",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; see official plan page",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "67": {
      "id": 67,
      "category": "OTT, films & TV",
      "brand": "Tata Play Binge",
      "tier": "4-app pack",
      "advertisedRealPrice": "From ₹149/month",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "68": {
      "id": 68,
      "category": "OTT, films & TV",
      "brand": "Tata Play Binge",
      "tier": "13-app pack",
      "advertisedRealPrice": "From ₹199/month",
      "monthlyReference": "₹199/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹239",
          "6": "₹358",
          "12": "₹478"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 239.0,
          "6": 358.0,
          "12": 478.0
      }
  },
  "69": {
      "id": 69,
      "category": "OTT, films & TV",
      "brand": "Tata Play Binge",
      "tier": "35-app pack",
      "advertisedRealPrice": "From ₹399/month",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "70": {
      "id": 70,
      "category": "OTT, films & TV",
      "brand": "Tata Play Binge (non-DTH customers)",
      "tier": "Flexi Mini",
      "advertisedRealPrice": "₹149/month; ₹499/quarter; ₹1,799/year",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "71": {
      "id": 71,
      "category": "OTT, films & TV",
      "brand": "Tata Play Binge (non-DTH customers)",
      "tier": "Flexi Max",
      "advertisedRealPrice": "₹299/month; ₹699/quarter; ₹2,499/year",
      "monthlyReference": "₹299/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹150",
          "3": "₹359",
          "6": "₹538",
          "12": "₹718"
      },
      "effectivePrices": {
          "1": 150.0,
          "3": 359.0,
          "6": 538.0,
          "12": 718.0
      }
  },
  "72": {
      "id": 72,
      "category": "OTT, films & TV",
      "brand": "Tata Play Binge (non-DTH customers)",
      "tier": "Infinity",
      "advertisedRealPrice": "₹399/month; ₹899/quarter; ₹2,999/year",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "73": {
      "id": 73,
      "category": "OTT, films & TV",
      "brand": "Jio OTT Pass",
      "tier": "Monthly pass",
      "advertisedRealPrice": "₹200/28 days",
      "monthlyReference": "₹200/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹240",
          "6": "₹360",
          "12": "₹480"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 240.0,
          "6": 360.0,
          "12": 480.0
      }
  },
  "74": {
      "id": 74,
      "category": "OTT, films & TV",
      "brand": "Jio OTT Pass",
      "tier": "Quarterly pass",
      "advertisedRealPrice": "₹550/84 days",
      "monthlyReference": "₹183/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹92",
          "3": "₹220",
          "6": "₹329",
          "12": "₹439"
      },
      "effectivePrices": {
          "1": 92.0,
          "3": 220.0,
          "6": 329.0,
          "12": 439.0
      }
  },
  "75": {
      "id": 75,
      "category": "OTT, films & TV",
      "brand": "Jio OTT Pass",
      "tier": "Annual pass",
      "advertisedRealPrice": "₹2,000/year",
      "monthlyReference": "₹167/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹84",
          "3": "₹200",
          "6": "₹301",
          "12": "₹401"
      },
      "effectivePrices": {
          "1": 84.0,
          "3": 200.0,
          "6": 301.0,
          "12": 401.0
      }
  },
  "76": {
      "id": 76,
      "category": "OTT, films & TV",
      "brand": "Airtel Xstream Play",
      "tier": "Premium / bundled packs",
      "advertisedRealPrice": "Price depends on current plan / recharge offer",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "77": {
      "id": 77,
      "category": "OTT, films & TV",
      "brand": "Tata Play DTH",
      "tier": "Channel packs and OTT add-ons",
      "advertisedRealPrice": "Pack pricing varies; e.g. Marathi Super Value ₹83/month; specific channel add-ons can be lower",
      "monthlyReference": "₹83/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹42",
          "3": "₹100",
          "6": "₹149",
          "12": "₹199"
      },
      "effectivePrices": {
          "1": 42.0,
          "3": 100.0,
          "6": 149.0,
          "12": 199.0
      }
  },
  "78": {
      "id": 78,
      "category": "YouTube & creator tools",
      "brand": "YouTube Premium",
      "tier": "Individual",
      "advertisedRealPrice": "Starts at ₹149/month; prepaid options available",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "79": {
      "id": 79,
      "category": "YouTube & creator tools",
      "brand": "YouTube Premium",
      "tier": "Family",
      "advertisedRealPrice": "₹299/month",
      "monthlyReference": "₹299/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹150",
          "3": "₹359",
          "6": "₹538",
          "12": "₹718"
      },
      "effectivePrices": {
          "1": 150.0,
          "3": 359.0,
          "6": 538.0,
          "12": 718.0
      }
  },
  "80": {
      "id": 80,
      "category": "YouTube & creator tools",
      "brand": "YouTube Premium",
      "tier": "Student",
      "advertisedRealPrice": "Student price shown after eligibility verification",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "81": {
      "id": 81,
      "category": "YouTube & creator tools",
      "brand": "YouTube Premium Lite",
      "tier": "Individual",
      "advertisedRealPrice": "Price/availability varies by current India offer",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "82": {
      "id": 82,
      "category": "YouTube & creator tools",
      "brand": "YouTube Studio / channel memberships",
      "tier": "Channel membership",
      "advertisedRealPrice": "Price set by each channel/region",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "83": {
      "id": 83,
      "category": "YouTube & creator tools",
      "brand": "vidIQ",
      "tier": "Boost",
      "advertisedRealPrice": "India App Store lists examples ₹999/month; annual/other channel packages vary",
      "monthlyReference": "₹999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹500",
          "3": "₹1,199",
          "6": "₹1,798",
          "12": "₹2,398"
      },
      "effectivePrices": {
          "1": 500.0,
          "3": 1199.0,
          "6": 1798.0,
          "12": 2398.0
      }
  },
  "84": {
      "id": 84,
      "category": "YouTube & creator tools",
      "brand": "TubeBuddy",
      "tier": "Pro / Legend",
      "advertisedRealPrice": "Current price shown on checkout; may vary by channel size/promotions",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "85": {
      "id": 85,
      "category": "YouTube & creator tools",
      "brand": "StreamYard",
      "tier": "Paid creator / streaming plans",
      "advertisedRealPrice": "Dynamic; current price at checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "86": {
      "id": 86,
      "category": "YouTube & creator tools",
      "brand": "Restream",
      "tier": "Standard / Professional / Business",
      "advertisedRealPrice": "Dynamic; current price at checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "87": {
      "id": 87,
      "category": "YouTube & creator tools",
      "brand": "Epidemic Sound",
      "tier": "Creator",
      "advertisedRealPrice": "US$9.99/month billed US$119.88 yearly",
      "monthlyReference": "US$9.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$5.00",
          "3": "US$11.99",
          "6": "US$17.98",
          "12": "US$23.98"
      },
      "effectivePrices": {
          "1": 5.0,
          "3": 11.99,
          "6": 17.98,
          "12": 23.98
      }
  },
  "88": {
      "id": 88,
      "category": "YouTube & creator tools",
      "brand": "Epidemic Sound",
      "tier": "Pro",
      "advertisedRealPrice": "US$16.99/month billed US$203.88 yearly",
      "monthlyReference": "US$16.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$8.50",
          "3": "US$20.39",
          "6": "US$30.58",
          "12": "US$40.78"
      },
      "effectivePrices": {
          "1": 8.5,
          "3": 20.39,
          "6": 30.58,
          "12": 40.78
      }
  },
  "89": {
      "id": 89,
      "category": "Music & audio",
      "brand": "Spotify Premium",
      "tier": "Standard Monthly",
      "advertisedRealPrice": "₹139/month (promotional 2-month offer may appear to new users)",
      "monthlyReference": "₹139/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹70",
          "3": "₹167",
          "6": "₹250",
          "12": "₹334"
      },
      "effectivePrices": {
          "1": 70.0,
          "3": 167.0,
          "6": 250.0,
          "12": 334.0
      }
  },
  "90": {
      "id": 90,
      "category": "Music & audio",
      "brand": "Spotify Premium",
      "tier": "Standard Annual prepaid",
      "advertisedRealPrice": "₹1,390/year (about ₹115.84/month equivalent)",
      "monthlyReference": "₹116/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹58",
          "3": "₹139",
          "6": "₹209",
          "12": "₹278"
      },
      "effectivePrices": {
          "1": 58.0,
          "3": 139.0,
          "6": 209.0,
          "12": 278.0
      }
  },
  "91": {
      "id": 91,
      "category": "Music & audio",
      "brand": "Spotify Premium",
      "tier": "Student",
      "advertisedRealPrice": "₹69/month after eligible intro offer",
      "monthlyReference": "₹69/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹35",
          "3": "₹83",
          "6": "₹124",
          "12": "₹166"
      },
      "effectivePrices": {
          "1": 35.0,
          "3": 83.0,
          "6": 124.0,
          "12": 166.0
      }
  },
  "92": {
      "id": 92,
      "category": "Music & audio",
      "brand": "Spotify Premium",
      "tier": "Platinum",
      "advertisedRealPrice": "₹299/month",
      "monthlyReference": "₹299/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹150",
          "3": "₹359",
          "6": "₹538",
          "12": "₹718"
      },
      "effectivePrices": {
          "1": 150.0,
          "3": 359.0,
          "6": 538.0,
          "12": 718.0
      }
  },
  "93": {
      "id": 93,
      "category": "Music & audio",
      "brand": "Apple Music",
      "tier": "Individual",
      "advertisedRealPrice": "₹139/month",
      "monthlyReference": "₹139/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹70",
          "3": "₹167",
          "6": "₹250",
          "12": "₹334"
      },
      "effectivePrices": {
          "1": 70.0,
          "3": 167.0,
          "6": 250.0,
          "12": 334.0
      }
  },
  "94": {
      "id": 94,
      "category": "Music & audio",
      "brand": "Apple Music",
      "tier": "Family",
      "advertisedRealPrice": "₹229/month",
      "monthlyReference": "₹229/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹115",
          "3": "₹275",
          "6": "₹412",
          "12": "₹550"
      },
      "effectivePrices": {
          "1": 115.0,
          "3": 275.0,
          "6": 412.0,
          "12": 550.0
      }
  },
  "95": {
      "id": 95,
      "category": "Music & audio",
      "brand": "Apple Music",
      "tier": "Student",
      "advertisedRealPrice": "₹69/month",
      "monthlyReference": "₹69/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹35",
          "3": "₹83",
          "6": "₹124",
          "12": "₹166"
      },
      "effectivePrices": {
          "1": 35.0,
          "3": 83.0,
          "6": 124.0,
          "12": 166.0
      }
  },
  "96": {
      "id": 96,
      "category": "Music & audio",
      "brand": "Audible",
      "tier": "Premium Plus - 1 credit",
      "advertisedRealPrice": "₹199/month after 30-day trial where eligible",
      "monthlyReference": "₹199/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹239",
          "6": "₹358",
          "12": "₹478"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 239.0,
          "6": 358.0,
          "12": 478.0
      }
  },
  "97": {
      "id": 97,
      "category": "Music & audio",
      "brand": "JioSaavn Pro",
      "tier": "Pro",
      "advertisedRealPrice": "Dynamic; verify in app/official checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "98": {
      "id": 98,
      "category": "Music & audio",
      "brand": "Apple Creator Studio",
      "tier": "Included Logic Pro / MainStage",
      "advertisedRealPrice": "₹399/month or ₹3,999/year; student/educator ₹199/month or ₹1,999/year",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "99": {
      "id": 99,
      "category": "Photo, video & design software",
      "brand": "Canva",
      "tier": "Free",
      "advertisedRealPrice": "₹0",
      "monthlyReference": "₹0/month",
      "currency": "INR",
      "pricingType": "free",
      "offers": {
          "1": "₹0",
          "3": "₹0",
          "6": "₹0",
          "12": "₹0"
      },
      "effectivePrices": {
          "1": 0.0,
          "3": 0.0,
          "6": 0.0,
          "12": 0.0
      }
  },
  "100": {
      "id": 100,
      "category": "Photo, video & design software",
      "brand": "Canva",
      "tier": "Pro Lite",
      "advertisedRealPrice": "₹1,590/year",
      "monthlyReference": "₹132/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹66",
          "3": "₹158",
          "6": "₹238",
          "12": "₹317"
      },
      "effectivePrices": {
          "1": 66.0,
          "3": 158.0,
          "6": 238.0,
          "12": 317.0
      }
  },
  "101": {
      "id": 101,
      "category": "Photo, video & design software",
      "brand": "Canva",
      "tier": "Pro",
      "advertisedRealPrice": "₹4,000/year (daily/weekly options may also appear)",
      "monthlyReference": "₹333/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹167",
          "3": "₹400",
          "6": "₹599",
          "12": "₹799"
      },
      "effectivePrices": {
          "1": 167.0,
          "3": 400.0,
          "6": 599.0,
          "12": 799.0
      }
  },
  "102": {
      "id": 102,
      "category": "Photo, video & design software",
      "brand": "Canva",
      "tier": "Business",
      "advertisedRealPrice": "₹6,800/year per person",
      "monthlyReference": "₹567/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹284",
          "3": "₹680",
          "6": "₹1,021",
          "12": "₹1,361"
      },
      "effectivePrices": {
          "1": 284.0,
          "3": 680.0,
          "6": 1021.0,
          "12": 1361.0
      }
  },
  "103": {
      "id": 103,
      "category": "Photo, video & design software",
      "brand": "Adobe Photoshop",
      "tier": "Single app",
      "advertisedRealPrice": "₹599/month promo first year; regular listed price ₹733.96/month incl. GST",
      "monthlyReference": "₹599/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹300",
          "3": "₹719",
          "6": "₹1,078",
          "12": "₹1,438"
      },
      "effectivePrices": {
          "1": 300.0,
          "3": 719.0,
          "6": 1078.0,
          "12": 1438.0
      }
  },
  "104": {
      "id": 104,
      "category": "Photo, video & design software",
      "brand": "Adobe Photography",
      "tier": "Photography plan",
      "advertisedRealPrice": "₹599/month promo; regular listed price ₹638.38/month incl. GST",
      "monthlyReference": "₹599/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹300",
          "3": "₹719",
          "6": "₹1,078",
          "12": "₹1,438"
      },
      "effectivePrices": {
          "1": 300.0,
          "3": 719.0,
          "6": 1078.0,
          "12": 1438.0
      }
  },
  "105": {
      "id": 105,
      "category": "Photo, video & design software",
      "brand": "Adobe Premiere",
      "tier": "Single app",
      "advertisedRealPrice": "₹389/month promo for first 12 months; regular listed price ₹733.96/month incl. GST",
      "monthlyReference": "₹389/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹195",
          "3": "₹467",
          "6": "₹700",
          "12": "₹934"
      },
      "effectivePrices": {
          "1": 195.0,
          "3": 467.0,
          "6": 700.0,
          "12": 934.0
      }
  },
  "106": {
      "id": 106,
      "category": "Photo, video & design software",
      "brand": "Adobe Creative Cloud Pro",
      "tier": "All-apps suite",
      "advertisedRealPrice": "About ₹4,889/month per licence excl. GST on current listed business pricing",
      "monthlyReference": "₹4,889/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹2,445",
          "3": "₹5,867",
          "6": "₹8,800",
          "12": "₹11,734"
      },
      "effectivePrices": {
          "1": 2445.0,
          "3": 5867.0,
          "6": 8800.0,
          "12": 11734.0
      }
  },
  "107": {
      "id": 107,
      "category": "Photo, video & design software",
      "brand": "Adobe Acrobat Pro",
      "tier": "PDF productivity",
      "advertisedRealPrice": "₹638.38/month incl. GST",
      "monthlyReference": "₹638/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹319",
          "3": "₹766",
          "6": "₹1,148",
          "12": "₹1,531"
      },
      "effectivePrices": {
          "1": 319.0,
          "3": 766.0,
          "6": 1148.0,
          "12": 1531.0
      }
  },
  "108": {
      "id": 108,
      "category": "Photo, video & design software",
      "brand": "Apple Creator Studio",
      "tier": "Standard",
      "advertisedRealPrice": "₹399/month or ₹3,999/year",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "109": {
      "id": 109,
      "category": "Photo, video & design software",
      "brand": "Apple Creator Studio",
      "tier": "Student / educator",
      "advertisedRealPrice": "₹199/month or ₹1,999/year",
      "monthlyReference": "₹199/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹100",
          "3": "₹239",
          "6": "₹358",
          "12": "₹478"
      },
      "effectivePrices": {
          "1": 100.0,
          "3": 239.0,
          "6": 358.0,
          "12": 478.0
      }
  },
  "110": {
      "id": 110,
      "category": "Photo, video & design software",
      "brand": "InShot Pro",
      "tier": "Monthly",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "111": {
      "id": 111,
      "category": "Photo, video & design software",
      "brand": "InShot Pro",
      "tier": "Annual",
      "advertisedRealPrice": "₹1,499/year",
      "monthlyReference": "₹125/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹63",
          "3": "₹150",
          "6": "₹225",
          "12": "₹300"
      },
      "effectivePrices": {
          "1": 63.0,
          "3": 150.0,
          "6": 225.0,
          "12": 300.0
      }
  },
  "112": {
      "id": 112,
      "category": "Photo, video & design software",
      "brand": "InShot",
      "tier": "Lifetime unlock",
      "advertisedRealPrice": "₹3,999 listed",
      "monthlyReference": "₹3,999/month",
      "currency": "INR",
      "pricingType": "one_time",
      "offers": {
          "1": "₹2,000",
          "3": "₹4,799",
          "6": "₹7,198",
          "12": "₹9,598"
      },
      "effectivePrices": {
          "1": 2000.0,
          "3": 4799.0,
          "6": 7198.0,
          "12": 9598.0
      }
  },
  "113": {
      "id": 113,
      "category": "Photo, video & design software",
      "brand": "Picsart",
      "tier": "Pro Monthly",
      "advertisedRealPrice": "₹149/month listed for one Pro SKU; other SKUs may differ",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "114": {
      "id": 114,
      "category": "Photo, video & design software",
      "brand": "Picsart",
      "tier": "Pro Annual",
      "advertisedRealPrice": "₹1,199/year listed in India App Store",
      "monthlyReference": "₹100/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹50",
          "3": "₹120",
          "6": "₹180",
          "12": "₹240"
      },
      "effectivePrices": {
          "1": 50.0,
          "3": 120.0,
          "6": 180.0,
          "12": 240.0
      }
  },
  "115": {
      "id": 115,
      "category": "Photo, video & design software",
      "brand": "Picsart",
      "tier": "Gold Monthly",
      "advertisedRealPrice": "₹399/month listed in India App Store",
      "monthlyReference": "₹399/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹200",
          "3": "₹479",
          "6": "₹718",
          "12": "₹958"
      },
      "effectivePrices": {
          "1": 200.0,
          "3": 479.0,
          "6": 718.0,
          "12": 958.0
      }
  },
  "116": {
      "id": 116,
      "category": "Photo, video & design software",
      "brand": "Picsart",
      "tier": "Gold Annual",
      "advertisedRealPrice": "₹1,849/year listed in India App Store",
      "monthlyReference": "₹154/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹77",
          "3": "₹185",
          "6": "₹277",
          "12": "₹370"
      },
      "effectivePrices": {
          "1": 77.0,
          "3": 185.0,
          "6": 277.0,
          "12": 370.0
      }
  },
  "117": {
      "id": 117,
      "category": "Photo, video & design software",
      "brand": "Filmora",
      "tier": "Creator / annual / premium options",
      "advertisedRealPrice": "India App Store lists examples from ₹999 monthly creator plan; annual plans around ₹4,999–₹7,900; lifetime around ₹7,900",
      "monthlyReference": "₹999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹500",
          "3": "₹1,199",
          "6": "₹1,798",
          "12": "₹2,398"
      },
      "effectivePrices": {
          "1": 500.0,
          "3": 1199.0,
          "6": 1798.0,
          "12": 2398.0
      }
  },
  "118": {
      "id": 118,
      "category": "Photo, video & design software",
      "brand": "DaVinci Resolve Studio",
      "tier": "Studio licence",
      "advertisedRealPrice": "Price varies by authorised India reseller; verify local price",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "119": {
      "id": 119,
      "category": "Photo, video & design software",
      "brand": "Figma",
      "tier": "Professional - Full seat",
      "advertisedRealPrice": "US$16/month for full seat (USD pricing shown)",
      "monthlyReference": "US$16.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$8.00",
          "3": "US$19.20",
          "6": "US$28.80",
          "12": "US$38.40"
      },
      "effectivePrices": {
          "1": 8.0,
          "3": 19.2,
          "6": 28.8,
          "12": 38.4
      }
  },
  "120": {
      "id": 120,
      "category": "Photo, video & design software",
      "brand": "Figma",
      "tier": "Professional - Dev seat",
      "advertisedRealPrice": "US$12/month",
      "monthlyReference": "US$12.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$6.00",
          "3": "US$14.40",
          "6": "US$21.60",
          "12": "US$28.80"
      },
      "effectivePrices": {
          "1": 6.0,
          "3": 14.4,
          "6": 21.6,
          "12": 28.8
      }
  },
  "121": {
      "id": 121,
      "category": "Photo, video & design software",
      "brand": "Figma",
      "tier": "Professional - Collab seat",
      "advertisedRealPrice": "US$3/month",
      "monthlyReference": "US$3.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$1.50",
          "3": "US$3.60",
          "6": "US$5.40",
          "12": "US$7.20"
      },
      "effectivePrices": {
          "1": 1.5,
          "3": 3.6,
          "6": 5.4,
          "12": 7.2
      }
  },
  "122": {
      "id": 122,
      "category": "Stock assets, templates & licensing",
      "brand": "Shutterstock",
      "tier": "Image downloads",
      "advertisedRealPrice": "US$25/month billed yearly at US$300/year for 10 images/month entry example",
      "monthlyReference": "US$25.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$12.50",
          "3": "US$30.00",
          "6": "US$45.00",
          "12": "US$60.00"
      },
      "effectivePrices": {
          "1": 12.5,
          "3": 30.0,
          "6": 45.0,
          "12": 60.0
      }
  },
  "123": {
      "id": 123,
      "category": "Stock assets, templates & licensing",
      "brand": "Shutterstock",
      "tier": "Unlimited Images",
      "advertisedRealPrice": "US$29/month equivalent billed US$348/year",
      "monthlyReference": "US$29.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$14.50",
          "3": "US$34.80",
          "6": "US$52.20",
          "12": "US$69.60"
      },
      "effectivePrices": {
          "1": 14.5,
          "3": 34.8,
          "6": 52.2,
          "12": 69.6
      }
  },
  "124": {
      "id": 124,
      "category": "Stock assets, templates & licensing",
      "brand": "Shutterstock",
      "tier": "Unlimited Plus",
      "advertisedRealPrice": "US$69/month equivalent billed US$828/year",
      "monthlyReference": "US$69.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$34.50",
          "3": "US$82.80",
          "6": "US$124.20",
          "12": "US$165.60"
      },
      "effectivePrices": {
          "1": 34.5,
          "3": 82.8,
          "6": 124.2,
          "12": 165.6
      }
  },
  "125": {
      "id": 125,
      "category": "Stock assets, templates & licensing",
      "brand": "Storyblocks",
      "tier": "Essentials",
      "advertisedRealPrice": "US$21/month equivalent on annual billing",
      "monthlyReference": "US$21.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$10.50",
          "3": "US$25.20",
          "6": "US$37.80",
          "12": "US$50.40"
      },
      "effectivePrices": {
          "1": 10.5,
          "3": 25.2,
          "6": 37.8,
          "12": 50.4
      }
  },
  "126": {
      "id": 126,
      "category": "Stock assets, templates & licensing",
      "brand": "Storyblocks",
      "tier": "Unlimited All Access",
      "advertisedRealPrice": "US$30/month equivalent on annual billing",
      "monthlyReference": "US$30.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$15.00",
          "3": "US$36.00",
          "6": "US$54.00",
          "12": "US$72.00"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 36.0,
          "6": 54.0,
          "12": 72.0
      }
  },
  "127": {
      "id": 127,
      "category": "Stock assets, templates & licensing",
      "brand": "Storyblocks",
      "tier": "Small Business",
      "advertisedRealPrice": "US$40/month equivalent on annual billing",
      "monthlyReference": "US$40.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$20.00",
          "3": "US$48.00",
          "6": "US$72.00",
          "12": "US$96.00"
      },
      "effectivePrices": {
          "1": 20.0,
          "3": 48.0,
          "6": 72.0,
          "12": 96.0
      }
  },
  "128": {
      "id": 128,
      "category": "Stock assets, templates & licensing",
      "brand": "Epidemic Sound",
      "tier": "Creator",
      "advertisedRealPrice": "US$9.99/month, billed US$119.88 annually",
      "monthlyReference": "US$9.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$5.00",
          "3": "US$11.99",
          "6": "US$17.98",
          "12": "US$23.98"
      },
      "effectivePrices": {
          "1": 5.0,
          "3": 11.99,
          "6": 17.98,
          "12": 23.98
      }
  },
  "129": {
      "id": 129,
      "category": "Stock assets, templates & licensing",
      "brand": "Epidemic Sound",
      "tier": "Pro",
      "advertisedRealPrice": "US$16.99/month, billed US$203.88 annually",
      "monthlyReference": "US$16.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$8.50",
          "3": "US$20.39",
          "6": "US$30.58",
          "12": "US$40.78"
      },
      "effectivePrices": {
          "1": 8.5,
          "3": 20.39,
          "6": 30.58,
          "12": 40.78
      }
  },
  "130": {
      "id": 130,
      "category": "Stock assets, templates & licensing",
      "brand": "Artlist AI Suite",
      "tier": "AI Starter",
      "advertisedRealPrice": "US$11.99/month equivalent billed annually",
      "monthlyReference": "US$11.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$6.00",
          "3": "US$14.39",
          "6": "US$21.58",
          "12": "US$28.78"
      },
      "effectivePrices": {
          "1": 6.0,
          "3": 14.39,
          "6": 21.58,
          "12": 28.78
      }
  },
  "131": {
      "id": 131,
      "category": "Stock assets, templates & licensing",
      "brand": "Artlist AI Suite",
      "tier": "AI Core",
      "advertisedRealPrice": "US$23.99/month equivalent billed annually",
      "monthlyReference": "US$23.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$12.00",
          "3": "US$28.79",
          "6": "US$43.18",
          "12": "US$57.58"
      },
      "effectivePrices": {
          "1": 12.0,
          "3": 28.79,
          "6": 43.18,
          "12": 57.58
      }
  },
  "132": {
      "id": 132,
      "category": "Stock assets, templates & licensing",
      "brand": "Envato Elements",
      "tier": "Individual subscription",
      "advertisedRealPrice": "Dynamic by plan, region and offer; verify checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "133": {
      "id": 133,
      "category": "Stock assets, templates & licensing",
      "brand": "Motion Array",
      "tier": "Everything",
      "advertisedRealPrice": "Current price shown on official checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "134": {
      "id": 134,
      "category": "Stock assets, templates & licensing",
      "brand": "Freepik",
      "tier": "Premium / Premium+ / Pro tiers",
      "advertisedRealPrice": "Dynamic; use current India checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "135": {
      "id": 135,
      "category": "Cloud storage & productivity",
      "brand": "Google One",
      "tier": "Basic 100 GB",
      "advertisedRealPrice": "₹149/month or ₹1,499/year in India App Store listing",
      "monthlyReference": "₹149/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹75",
          "3": "₹179",
          "6": "₹268",
          "12": "₹358"
      },
      "effectivePrices": {
          "1": 75.0,
          "3": 179.0,
          "6": 268.0,
          "12": 358.0
      }
  },
  "136": {
      "id": 136,
      "category": "Cloud storage & productivity",
      "brand": "Google One",
      "tier": "Standard 200 GB",
      "advertisedRealPrice": "₹219/month or ₹2,199/year in India App Store listing",
      "monthlyReference": "₹219/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹110",
          "3": "₹263",
          "6": "₹394",
          "12": "₹526"
      },
      "effectivePrices": {
          "1": 110.0,
          "3": 263.0,
          "6": 394.0,
          "12": 526.0
      }
  },
  "137": {
      "id": 137,
      "category": "Cloud storage & productivity",
      "brand": "iCloud+",
      "tier": "50 GB",
      "advertisedRealPrice": "₹75/month",
      "monthlyReference": "₹75/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹38",
          "3": "₹90",
          "6": "₹135",
          "12": "₹180"
      },
      "effectivePrices": {
          "1": 38.0,
          "3": 90.0,
          "6": 135.0,
          "12": 180.0
      }
  },
  "138": {
      "id": 138,
      "category": "Cloud storage & productivity",
      "brand": "iCloud+",
      "tier": "200 GB",
      "advertisedRealPrice": "₹219/month",
      "monthlyReference": "₹219/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹110",
          "3": "₹263",
          "6": "₹394",
          "12": "₹526"
      },
      "effectivePrices": {
          "1": 110.0,
          "3": 263.0,
          "6": 394.0,
          "12": 526.0
      }
  },
  "139": {
      "id": 139,
      "category": "Cloud storage & productivity",
      "brand": "iCloud+",
      "tier": "2 TB",
      "advertisedRealPrice": "₹749/month",
      "monthlyReference": "₹749/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹375",
          "3": "₹899",
          "6": "₹1,348",
          "12": "₹1,798"
      },
      "effectivePrices": {
          "1": 375.0,
          "3": 899.0,
          "6": 1348.0,
          "12": 1798.0
      }
  },
  "140": {
      "id": 140,
      "category": "Cloud storage & productivity",
      "brand": "iCloud+",
      "tier": "6 TB",
      "advertisedRealPrice": "₹2,999/month",
      "monthlyReference": "₹2,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,500",
          "3": "₹3,599",
          "6": "₹5,398",
          "12": "₹7,198"
      },
      "effectivePrices": {
          "1": 1500.0,
          "3": 3599.0,
          "6": 5398.0,
          "12": 7198.0
      }
  },
  "141": {
      "id": 141,
      "category": "Cloud storage & productivity",
      "brand": "iCloud+",
      "tier": "12 TB",
      "advertisedRealPrice": "₹5,900/month",
      "monthlyReference": "₹5,900/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹2,950",
          "3": "₹7,080",
          "6": "₹10,620",
          "12": "₹14,160"
      },
      "effectivePrices": {
          "1": 2950.0,
          "3": 7080.0,
          "6": 10620.0,
          "12": 14160.0
      }
  },
  "142": {
      "id": 142,
      "category": "Cloud storage & productivity",
      "brand": "Microsoft 365",
      "tier": "Personal",
      "advertisedRealPrice": "₹689/month or ₹6,899/year",
      "monthlyReference": "₹689/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹345",
          "3": "₹827",
          "6": "₹1,240",
          "12": "₹1,654"
      },
      "effectivePrices": {
          "1": 345.0,
          "3": 827.0,
          "6": 1240.0,
          "12": 1654.0
      }
  },
  "143": {
      "id": 143,
      "category": "Cloud storage & productivity",
      "brand": "Microsoft 365",
      "tier": "Family",
      "advertisedRealPrice": "₹819/month or ₹8,199/year",
      "monthlyReference": "₹819/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹410",
          "3": "₹983",
          "6": "₹1,474",
          "12": "₹1,966"
      },
      "effectivePrices": {
          "1": 410.0,
          "3": 983.0,
          "6": 1474.0,
          "12": 1966.0
      }
  },
  "144": {
      "id": 144,
      "category": "Cloud storage & productivity",
      "brand": "Microsoft 365",
      "tier": "Premium",
      "advertisedRealPrice": "₹1,999/month or ₹19,999/year",
      "monthlyReference": "₹1,999/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹1,000",
          "3": "₹2,399",
          "6": "₹3,598",
          "12": "₹4,798"
      },
      "effectivePrices": {
          "1": 1000.0,
          "3": 2399.0,
          "6": 3598.0,
          "12": 4798.0
      }
  },
  "145": {
      "id": 145,
      "category": "Cloud storage & productivity",
      "brand": "Grammarly",
      "tier": "Pro",
      "advertisedRealPrice": "US$30/month; US$60/3 months; US$144/year (US$12/month equivalent), localized INR may display",
      "monthlyReference": "US$30.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$15.00",
          "3": "US$36.00",
          "6": "US$54.00",
          "12": "US$72.00"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 36.0,
          "6": 54.0,
          "12": 72.0
      }
  },
  "146": {
      "id": 146,
      "category": "Cloud storage & productivity",
      "brand": "Notion",
      "tier": "Plus / Business",
      "advertisedRealPrice": "Dynamic; USD/region-specific price shown on official pricing",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "147": {
      "id": 147,
      "category": "Cloud storage & productivity",
      "brand": "Dropbox",
      "tier": "Plus / Professional / team",
      "advertisedRealPrice": "Dynamic; check India checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "148": {
      "id": 148,
      "category": "Cloud storage & productivity",
      "brand": "Google Workspace",
      "tier": "Business Starter / Standard / Plus",
      "advertisedRealPrice": "Price varies by India edition and billing commitment",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "149": {
      "id": 149,
      "category": "Learning, news & professional memberships",
      "brand": "Coursera Plus",
      "tier": "Monthly",
      "advertisedRealPrice": "US$59/month official global rate; local India checkout may differ",
      "monthlyReference": "US$59.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$29.50",
          "3": "US$70.80",
          "6": "US$106.20",
          "12": "US$141.60"
      },
      "effectivePrices": {
          "1": 29.5,
          "3": 70.8,
          "6": 106.2,
          "12": 141.6
      }
  },
  "150": {
      "id": 150,
      "category": "Learning, news & professional memberships",
      "brand": "Coursera Plus",
      "tier": "Annual",
      "advertisedRealPrice": "US$399/year official global rate; local India checkout may differ",
      "monthlyReference": "US$33.25/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$16.63",
          "3": "US$39.90",
          "6": "US$59.85",
          "12": "US$79.80"
      },
      "effectivePrices": {
          "1": 16.63,
          "3": 39.9,
          "6": 59.85,
          "12": 79.8
      }
  },
  "151": {
      "id": 151,
      "category": "Learning, news & professional memberships",
      "brand": "Udemy",
      "tier": "Personal Plan",
      "advertisedRealPrice": "Localized price/availability shown at checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "152": {
      "id": 152,
      "category": "Learning, news & professional memberships",
      "brand": "LinkedIn Premium Career",
      "tier": "Career membership",
      "advertisedRealPrice": "Dynamic; checkout varies by market/promotion",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "153": {
      "id": 153,
      "category": "Learning, news & professional memberships",
      "brand": "LinkedIn Premium Business / Sales Navigator",
      "tier": "Business / sales prospecting",
      "advertisedRealPrice": "Dynamic; price shown at checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "154": {
      "id": 154,
      "category": "Learning, news & professional memberships",
      "brand": "Times Prime",
      "tier": "Annual membership",
      "advertisedRealPrice": "Advertised entry offers from ₹349/year; offers vary",
      "monthlyReference": "₹29/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹15",
          "3": "₹35",
          "6": "₹52",
          "12": "₹70"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 35.0,
          "6": 52.0,
          "12": 70.0
      }
  },
  "155": {
      "id": 155,
      "category": "Learning, news & professional memberships",
      "brand": "Moneycontrol Pro",
      "tier": "Aspiring / Active Investor / Clean Experience",
      "advertisedRealPrice": "Current page displays promotional prices from ₹29–₹499 for some monthly options; annual offers also shown",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "156": {
      "id": 156,
      "category": "Learning, news & professional memberships",
      "brand": "The Hindu Digital",
      "tier": "Digital access",
      "advertisedRealPrice": "Offer/term-dependent; current pricing shown on checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "157": {
      "id": 157,
      "category": "Learning, news & professional memberships",
      "brand": "Kindle Unlimited",
      "tier": "Ebooks / digital reading",
      "advertisedRealPrice": "Official Amazon India page",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "158": {
      "id": 158,
      "category": "Gaming subscriptions",
      "brand": "PlayStation Plus",
      "tier": "Essential",
      "advertisedRealPrice": "India Store prices observed: ₹649/month; ₹5,139/year",
      "monthlyReference": "₹649/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹325",
          "3": "₹779",
          "6": "₹1,168",
          "12": "₹1,558"
      },
      "effectivePrices": {
          "1": 325.0,
          "3": 779.0,
          "6": 1168.0,
          "12": 1558.0
      }
  },
  "159": {
      "id": 159,
      "category": "Gaming subscriptions",
      "brand": "PlayStation Plus",
      "tier": "Extra",
      "advertisedRealPrice": "India Store prices observed: ₹979/month; ₹8,709/year",
      "monthlyReference": "₹979/month",
      "currency": "INR",
      "pricingType": "subscription",
      "offers": {
          "1": "₹490",
          "3": "₹1,175",
          "6": "₹1,762",
          "12": "₹2,350"
      },
      "effectivePrices": {
          "1": 490.0,
          "3": 1175.0,
          "6": 1762.0,
          "12": 2350.0
      }
  },
  "160": {
      "id": 160,
      "category": "Gaming subscriptions",
      "brand": "PlayStation Plus",
      "tier": "Deluxe (India tier)",
      "advertisedRealPrice": "India Store price varies by current offer; annual reference around ₹9,879",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "161": {
      "id": 161,
      "category": "Gaming subscriptions",
      "brand": "Google Play Pass",
      "tier": "Play Store games/apps",
      "advertisedRealPrice": "Current India checkout price; varies by offer",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "162": {
      "id": 162,
      "category": "Gaming subscriptions",
      "brand": "Xbox Game Pass",
      "tier": "Essential / Premium / Ultimate variants",
      "advertisedRealPrice": "Current India price shown in Xbox checkout; changes by tier and offers",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "163": {
      "id": 163,
      "category": "VPN, security & privacy",
      "brand": "NordVPN",
      "tier": "Basic",
      "advertisedRealPrice": "Official page shows US$14.99/month monthly; long-term intro from US$3.49/mo equivalent for 27 months, renews at higher rates",
      "monthlyReference": "US$14.99/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$7.50",
          "3": "US$17.99",
          "6": "US$26.98",
          "12": "US$35.98"
      },
      "effectivePrices": {
          "1": 7.5,
          "3": 17.99,
          "6": 26.98,
          "12": 35.98
      }
  },
  "164": {
      "id": 164,
      "category": "VPN, security & privacy",
      "brand": "Proton VPN",
      "tier": "Free / Plus / Unlimited",
      "advertisedRealPrice": "Dynamic by term; current price at checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "165": {
      "id": 165,
      "category": "VPN, security & privacy",
      "brand": "Surfshark",
      "tier": "Starter / One / One+",
      "advertisedRealPrice": "Dynamic introductory and renewal prices; verify checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "166": {
      "id": 166,
      "category": "Websites, hosting & creator infrastructure",
      "brand": "Hostinger",
      "tier": "Web hosting plans",
      "advertisedRealPrice": "Promotional price varies by duration and plan; renewal differs",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "167": {
      "id": 167,
      "category": "Websites, hosting & creator infrastructure",
      "brand": "Webflow",
      "tier": "Site plans / Workspace",
      "advertisedRealPrice": "Dynamic by site plan and billing cadence",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "168": {
      "id": 168,
      "category": "Websites, hosting & creator infrastructure",
      "brand": "Framer",
      "tier": "Mini / Basic / Pro",
      "advertisedRealPrice": "Dynamic; regional checkout can vary",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "169": {
      "id": 169,
      "category": "Websites, hosting & creator infrastructure",
      "brand": "Streamlabs",
      "tier": "Ultra",
      "advertisedRealPrice": "Price shown on official checkout",
      "monthlyReference": "Verify",
      "currency": "VERIFY",
      "pricingType": "verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      },
      "effectivePrices": {}
  },
  "170": {
      "id": 170,
      "category": "Websites, hosting & creator infrastructure",
      "brand": "Descript",
      "tier": "Pro",
      "advertisedRealPrice": "US$30 month-to-month or US$24/editor/month billed annually",
      "monthlyReference": "US$30.00/month",
      "currency": "USD",
      "pricingType": "subscription",
      "offers": {
          "1": "US$15.00",
          "3": "US$36.00",
          "6": "US$54.00",
          "12": "US$72.00"
      },
      "effectivePrices": {
          "1": 15.0,
          "3": 36.0,
          "6": 54.0,
          "12": 72.0
      }
  }, 
});

export default EFFECTIVE_PRICE_OVERRIDES;
