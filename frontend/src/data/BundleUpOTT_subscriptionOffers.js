/**
 * BundleUpOTT suggested subscription offers — 170 plans.
 * Source: user-provided "All_170_Subscriptions_Price_Offer_List.docx".
 * Prices are copied as strings from the offer sheet; "Verify" means confirm
 * the current provider checkout price before publishing or charging customers.
 * These are suggested commercial offers, not official-provider pricing or
 * proof of reseller/transfer rights. Do not use display strings directly as
 * payment amounts: the backend must validate the selected plan and duration.
 */
export const SUBSCRIPTION_OFFERS = {
  "1": {
      "brand": "ChatGPT",
      "tier": "Go",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "2": {
      "brand": "ChatGPT",
      "tier": "Plus",
      "advertisedRealPrice": "₹1,999/month",
      "monthlyReference": "₹1,999/month",
      "offers": {
          "1": "₹1,899",
          "3": "₹5,397",
          "6": "₹10,195",
          "12": "₹17,991"
      }
  },
  "3": {
      "brand": "ChatGPT",
      "tier": "Pro 5x",
      "advertisedRealPrice": "₹10,699/month",
      "monthlyReference": "₹10,699/month",
      "offers": {
          "1": "₹10,164",
          "3": "₹28,887",
          "6": "₹54,565",
          "12": "₹96,291"
      }
  },
  "4": {
      "brand": "Google Gemini / Google One",
      "tier": "Google AI Plus",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "5": {
      "brand": "Google Gemini / Google One",
      "tier": "Google AI Pro",
      "advertisedRealPrice": "About ₹1,950/month",
      "monthlyReference": "₹1,950/month",
      "offers": {
          "1": "₹1,852",
          "3": "₹5,265",
          "6": "₹9,945",
          "12": "₹17,550"
      }
  },
  "6": {
      "brand": "Google Gemini / Google One",
      "tier": "Google AI Ultra",
      "advertisedRealPrice": "From about ₹6,500/month; higher-usage variants may cost more",
      "monthlyReference": "₹6,500/month",
      "offers": {
          "1": "₹6,175",
          "3": "₹17,550",
          "6": "₹33,150",
          "12": "₹58,500"
      }
  },
  "7": {
      "brand": "Claude",
      "tier": "Pro",
      "advertisedRealPrice": "₹1,999/month (India reported); global official page: $20 monthly or $200 annually",
      "monthlyReference": "₹1,999/month",
      "offers": {
          "1": "₹1,899",
          "3": "₹5,397",
          "6": "₹10,195",
          "12": "₹17,991"
      }
  },
  "8": {
      "brand": "Claude",
      "tier": "Max 5x",
      "advertisedRealPrice": "₹11,999/month (India reported)",
      "monthlyReference": "₹11,999/month",
      "offers": {
          "1": "₹11,399",
          "3": "₹32,397",
          "6": "₹61,195",
          "12": "₹107,991"
      }
  },
  "9": {
      "brand": "Claude",
      "tier": "Max 20x",
      "advertisedRealPrice": "₹23,999/month (India reported)",
      "monthlyReference": "₹23,999/month",
      "offers": {
          "1": "₹22,799",
          "3": "₹64,797",
          "6": "₹122,395",
          "12": "₹215,991"
      }
  },
  "10": {
      "brand": "Perplexity",
      "tier": "Pro",
      "advertisedRealPrice": "About ₹1,999/month in India App Store listing",
      "monthlyReference": "₹1,999/month",
      "offers": {
          "1": "₹1,899",
          "3": "₹5,397",
          "6": "₹10,195",
          "12": "₹17,991"
      }
  },
  "11": {
      "brand": "Perplexity",
      "tier": "Max",
      "advertisedRealPrice": "About ₹19,900/month in India App Store listing",
      "monthlyReference": "₹19,900/month",
      "offers": {
          "1": "₹18,905",
          "3": "₹53,730",
          "6": "₹101,490",
          "12": "₹179,100"
      }
  },
  "12": {
      "brand": "Grok",
      "tier": "SuperGrok",
      "advertisedRealPrice": "US$30/month",
      "monthlyReference": "US$30.00/month",
      "offers": {
          "1": "US$28.50",
          "3": "US$81.00",
          "6": "US$153.00",
          "12": "US$270.00"
      }
  },
  "13": {
      "brand": "Grok",
      "tier": "SuperGrok Plus",
      "advertisedRealPrice": "US$100/month",
      "monthlyReference": "US$100.00/month",
      "offers": {
          "1": "US$95.00",
          "3": "US$270.00",
          "6": "US$510.00",
          "12": "US$900.00"
      }
  },
  "14": {
      "brand": "Microsoft Copilot / Microsoft 365",
      "tier": "Microsoft 365 Personal",
      "advertisedRealPrice": "₹689/month or ₹6,899/year",
      "monthlyReference": "₹689/month",
      "offers": {
          "1": "₹655",
          "3": "₹1,860",
          "6": "₹3,514",
          "12": "₹6,201"
      }
  },
  "15": {
      "brand": "Microsoft Copilot / Microsoft 365",
      "tier": "Microsoft 365 Family",
      "advertisedRealPrice": "₹819/month or ₹8,199/year",
      "monthlyReference": "₹819/month",
      "offers": {
          "1": "₹778",
          "3": "₹2,211",
          "6": "₹4,177",
          "12": "₹7,371"
      }
  },
  "16": {
      "brand": "Microsoft Copilot / Microsoft 365",
      "tier": "Microsoft 365 Premium",
      "advertisedRealPrice": "₹1,999/month or ₹19,999/year",
      "monthlyReference": "₹1,999/month",
      "offers": {
          "1": "₹1,899",
          "3": "₹5,397",
          "6": "₹10,195",
          "12": "₹17,991"
      }
  },
  "17": {
      "brand": "Midjourney",
      "tier": "Basic",
      "advertisedRealPrice": "US$10/month or US$96/year (US$8/month equivalent)",
      "monthlyReference": "US$10.00/month",
      "offers": {
          "1": "US$9.50",
          "3": "US$27.00",
          "6": "US$51.00",
          "12": "US$90.00"
      }
  },
  "18": {
      "brand": "Midjourney",
      "tier": "Standard",
      "advertisedRealPrice": "US$30/month or US$288/year (US$24/month equivalent)",
      "monthlyReference": "US$30.00/month",
      "offers": {
          "1": "US$28.50",
          "3": "US$81.00",
          "6": "US$153.00",
          "12": "US$270.00"
      }
  },
  "19": {
      "brand": "Midjourney",
      "tier": "Pro",
      "advertisedRealPrice": "US$60/month or US$576/year (US$48/month equivalent)",
      "monthlyReference": "US$60.00/month",
      "offers": {
          "1": "US$57.00",
          "3": "US$162.00",
          "6": "US$306.00",
          "12": "US$540.00"
      }
  },
  "20": {
      "brand": "Midjourney",
      "tier": "Mega",
      "advertisedRealPrice": "US$120/month or US$1,152/year (US$96/month equivalent)",
      "monthlyReference": "US$120.00/month",
      "offers": {
          "1": "US$114.00",
          "3": "US$324.00",
          "6": "US$612.00",
          "12": "US$1,080.00"
      }
  },
  "21": {
      "brand": "Leonardo.Ai",
      "tier": "Essential",
      "advertisedRealPrice": "US$12/month",
      "monthlyReference": "US$12.00/month",
      "offers": {
          "1": "US$11.40",
          "3": "US$32.40",
          "6": "US$61.20",
          "12": "US$108.00"
      }
  },
  "22": {
      "brand": "Leonardo.Ai",
      "tier": "Premium",
      "advertisedRealPrice": "US$30/month",
      "monthlyReference": "US$30.00/month",
      "offers": {
          "1": "US$28.50",
          "3": "US$81.00",
          "6": "US$153.00",
          "12": "US$270.00"
      }
  },
  "23": {
      "brand": "Leonardo.Ai",
      "tier": "Ultimate",
      "advertisedRealPrice": "US$60/month",
      "monthlyReference": "US$60.00/month",
      "offers": {
          "1": "US$57.00",
          "3": "US$162.00",
          "6": "US$306.00",
          "12": "US$540.00"
      }
  },
  "24": {
      "brand": "Ideogram",
      "tier": "Plus",
      "advertisedRealPrice": "US$20 month-to-month; US$15/month equivalent billed US$180 annually",
      "monthlyReference": "US$15.00/month",
      "offers": {
          "1": "US$14.25",
          "3": "US$40.50",
          "6": "US$76.50",
          "12": "US$135.00"
      }
  },
  "25": {
      "brand": "Ideogram",
      "tier": "Pro",
      "advertisedRealPrice": "US$60 month-to-month; US$42/month equivalent billed US$504 annually",
      "monthlyReference": "US$42.00/month",
      "offers": {
          "1": "US$39.90",
          "3": "US$113.40",
          "6": "US$214.20",
          "12": "US$378.00"
      }
  },
  "26": {
      "brand": "Adobe Firefly",
      "tier": "Firefly Pro",
      "advertisedRealPrice": "₹1,596.54/month",
      "monthlyReference": "₹1,597/month",
      "offers": {
          "1": "₹1,517",
          "3": "₹4,311",
          "6": "₹8,142",
          "12": "₹14,369"
      }
  },
  "27": {
      "brand": "Runway",
      "tier": "Standard",
      "advertisedRealPrice": "US$12/month equivalent (US$144/year billed annually); monthly list may be higher",
      "monthlyReference": "US$12.00/month",
      "offers": {
          "1": "US$11.40",
          "3": "US$32.40",
          "6": "US$61.20",
          "12": "US$108.00"
      }
  },
  "28": {
      "brand": "Runway",
      "tier": "Pro",
      "advertisedRealPrice": "US$28/month equivalent (US$336/year billed annually)",
      "monthlyReference": "US$28.00/month",
      "offers": {
          "1": "US$26.60",
          "3": "US$75.60",
          "6": "US$142.80",
          "12": "US$252.00"
      }
  },
  "29": {
      "brand": "Runway",
      "tier": "Max",
      "advertisedRealPrice": "US$76/month equivalent (US$912/year billed annually)",
      "monthlyReference": "US$76.00/month",
      "offers": {
          "1": "US$72.20",
          "3": "US$205.20",
          "6": "US$387.60",
          "12": "US$684.00"
      }
  },
  "30": {
      "brand": "HeyGen",
      "tier": "Creator",
      "advertisedRealPrice": "US$29/month",
      "monthlyReference": "US$29.00/month",
      "offers": {
          "1": "US$27.55",
          "3": "US$78.30",
          "6": "US$147.90",
          "12": "US$261.00"
      }
  },
  "31": {
      "brand": "HeyGen",
      "tier": "Pro",
      "advertisedRealPrice": "US$49/month",
      "monthlyReference": "US$49.00/month",
      "offers": {
          "1": "US$46.55",
          "3": "US$132.30",
          "6": "US$249.90",
          "12": "US$441.00"
      }
  },
  "32": {
      "brand": "Pictory",
      "tier": "Starter",
      "advertisedRealPrice": "US$25/month equivalent billed annually; US$29 month-to-month",
      "monthlyReference": "US$25.00/month",
      "offers": {
          "1": "US$23.75",
          "3": "US$67.50",
          "6": "US$127.50",
          "12": "US$225.00"
      }
  },
  "33": {
      "brand": "Pictory",
      "tier": "Professional",
      "advertisedRealPrice": "US$35/month equivalent billed annually; US$59 month-to-month shown on pricing page",
      "monthlyReference": "US$35.00/month",
      "offers": {
          "1": "US$33.25",
          "3": "US$94.50",
          "6": "US$178.50",
          "12": "US$315.00"
      }
  },
  "34": {
      "brand": "InVideo AI",
      "tier": "Basic",
      "advertisedRealPrice": "₹999/month listed in India App Store",
      "monthlyReference": "₹999/month",
      "offers": {
          "1": "₹949",
          "3": "₹2,697",
          "6": "₹5,095",
          "12": "₹8,991"
      }
  },
  "35": {
      "brand": "InVideo AI",
      "tier": "Plus",
      "advertisedRealPrice": "₹1,999/month listed in India App Store",
      "monthlyReference": "₹1,999/month",
      "offers": {
          "1": "₹1,899",
          "3": "₹5,397",
          "6": "₹10,195",
          "12": "₹17,991"
      }
  },
  "36": {
      "brand": "InVideo AI",
      "tier": "Pro",
      "advertisedRealPrice": "₹2,999/month listed in India App Store",
      "monthlyReference": "₹2,999/month",
      "offers": {
          "1": "₹2,849",
          "3": "₹8,097",
          "6": "₹15,295",
          "12": "₹26,991"
      }
  },
  "37": {
      "brand": "ElevenLabs",
      "tier": "Starter / Creator / Pro",
      "advertisedRealPrice": "Dynamic; published prices and included credits shown at checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "38": {
      "brand": "Netflix",
      "tier": "Mobile",
      "advertisedRealPrice": "₹149/month",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "39": {
      "brand": "Netflix",
      "tier": "Basic",
      "advertisedRealPrice": "₹199/month",
      "monthlyReference": "₹199/month",
      "offers": {
          "1": "₹189",
          "3": "₹537",
          "6": "₹1,015",
          "12": "₹1,791"
      }
  },
  "40": {
      "brand": "Netflix",
      "tier": "Standard",
      "advertisedRealPrice": "₹499/month",
      "monthlyReference": "₹499/month",
      "offers": {
          "1": "₹474",
          "3": "₹1,347",
          "6": "₹2,545",
          "12": "₹4,491"
      }
  },
  "41": {
      "brand": "Netflix",
      "tier": "Premium",
      "advertisedRealPrice": "₹649/month",
      "monthlyReference": "₹649/month",
      "offers": {
          "1": "₹617",
          "3": "₹1,752",
          "6": "₹3,310",
          "12": "₹5,841"
      }
  },
  "42": {
      "brand": "Amazon Prime",
      "tier": "Prime Shopping Edition",
      "advertisedRealPrice": "₹399/year",
      "monthlyReference": "₹33/month",
      "offers": {
          "1": "₹32",
          "3": "₹90",
          "6": "₹170",
          "12": "₹299"
      }
  },
  "43": {
      "brand": "Amazon Prime",
      "tier": "Prime Lite",
      "advertisedRealPrice": "₹799/year",
      "monthlyReference": "₹67/month",
      "offers": {
          "1": "₹63",
          "3": "₹180",
          "6": "₹340",
          "12": "₹599"
      }
  },
  "44": {
      "brand": "Amazon Prime",
      "tier": "Prime",
      "advertisedRealPrice": "₹1,499/year",
      "monthlyReference": "₹125/month",
      "offers": {
          "1": "₹119",
          "3": "₹337",
          "6": "₹637",
          "12": "₹1,124"
      }
  },
  "45": {
      "brand": "JioHotstar",
      "tier": "Mobile Monthly",
      "advertisedRealPrice": "₹79/month",
      "monthlyReference": "₹79/month",
      "offers": {
          "1": "₹75",
          "3": "₹213",
          "6": "₹403",
          "12": "₹711"
      }
  },
  "46": {
      "brand": "JioHotstar",
      "tier": "Mobile Quarterly",
      "advertisedRealPrice": "₹149/3 months",
      "monthlyReference": "₹50/month",
      "offers": {
          "1": "₹47",
          "3": "₹134",
          "6": "₹253",
          "12": "₹447"
      }
  },
  "47": {
      "brand": "JioHotstar",
      "tier": "Mobile Annual",
      "advertisedRealPrice": "₹499/year",
      "monthlyReference": "₹42/month",
      "offers": {
          "1": "₹40",
          "3": "₹112",
          "6": "₹212",
          "12": "₹374"
      }
  },
  "48": {
      "brand": "JioHotstar",
      "tier": "Super Monthly",
      "advertisedRealPrice": "₹149/month",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "49": {
      "brand": "JioHotstar",
      "tier": "Super Quarterly",
      "advertisedRealPrice": "₹349/3 months",
      "monthlyReference": "₹116/month",
      "offers": {
          "1": "₹111",
          "3": "₹314",
          "6": "₹593",
          "12": "₹1,047"
      }
  },
  "50": {
      "brand": "JioHotstar",
      "tier": "Super Annual",
      "advertisedRealPrice": "₹1,099/year",
      "monthlyReference": "₹92/month",
      "offers": {
          "1": "₹87",
          "3": "₹247",
          "6": "₹467",
          "12": "₹824"
      }
  },
  "51": {
      "brand": "JioHotstar",
      "tier": "Premium Monthly",
      "advertisedRealPrice": "₹299/month",
      "monthlyReference": "₹299/month",
      "offers": {
          "1": "₹284",
          "3": "₹807",
          "6": "₹1,525",
          "12": "₹2,691"
      }
  },
  "52": {
      "brand": "JioHotstar",
      "tier": "Premium Quarterly",
      "advertisedRealPrice": "₹699/3 months",
      "monthlyReference": "₹233/month",
      "offers": {
          "1": "₹221",
          "3": "₹629",
          "6": "₹1,188",
          "12": "₹2,097"
      }
  },
  "53": {
      "brand": "JioHotstar",
      "tier": "Premium Annual",
      "advertisedRealPrice": "₹2,199/year",
      "monthlyReference": "₹183/month",
      "offers": {
          "1": "₹174",
          "3": "₹495",
          "6": "₹935",
          "12": "₹1,649"
      }
  },
  "54": {
      "brand": "Sony LIV",
      "tier": "Mobile Only",
      "advertisedRealPrice": "₹699/year",
      "monthlyReference": "₹58/month",
      "offers": {
          "1": "₹55",
          "3": "₹157",
          "6": "₹297",
          "12": "₹524"
      }
  },
  "55": {
      "brand": "Sony LIV",
      "tier": "Premium Monthly",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "56": {
      "brand": "Sony LIV",
      "tier": "Premium Annual",
      "advertisedRealPrice": "₹1,499/year",
      "monthlyReference": "₹125/month",
      "offers": {
          "1": "₹119",
          "3": "₹337",
          "6": "₹637",
          "12": "₹1,124"
      }
  },
  "57": {
      "brand": "Crunchyroll",
      "tier": "Fan",
      "advertisedRealPrice": "₹99/month listed in India App Store",
      "monthlyReference": "₹99/month",
      "offers": {
          "1": "₹94",
          "3": "₹267",
          "6": "₹505",
          "12": "₹891"
      }
  },
  "58": {
      "brand": "Crunchyroll",
      "tier": "Mega Fan",
      "advertisedRealPrice": "₹119/month; ₹569/year listed for Mega Fan in India App Store",
      "monthlyReference": "₹119/month",
      "offers": {
          "1": "₹113",
          "3": "₹321",
          "6": "₹607",
          "12": "₹1,071"
      }
  },
  "59": {
      "brand": "Crunchyroll",
      "tier": "Other app-store tiers",
      "advertisedRealPrice": "Other in-app listings range from ₹299 to ₹749",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "60": {
      "brand": "hoichoi",
      "tier": "Monthly",
      "advertisedRealPrice": "₹199/month listed in India App Store",
      "monthlyReference": "₹199/month",
      "offers": {
          "1": "₹189",
          "3": "₹537",
          "6": "₹1,015",
          "12": "₹1,791"
      }
  },
  "61": {
      "brand": "hoichoi",
      "tier": "12-month",
      "advertisedRealPrice": "₹999/year listed in India App Store",
      "monthlyReference": "₹83/month",
      "offers": {
          "1": "₹79",
          "3": "₹225",
          "6": "₹425",
          "12": "₹749"
      }
  },
  "62": {
      "brand": "ManoramaMAX",
      "tier": "Premium",
      "advertisedRealPrice": "₹599/3 months or ₹1,199/year",
      "monthlyReference": "₹200/month",
      "offers": {
          "1": "₹190",
          "3": "₹539",
          "6": "₹1,018",
          "12": "₹1,797"
      }
  },
  "63": {
      "brand": "ZEE5",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; exact offer shown at official checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "64": {
      "brand": "Lionsgate Play",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; see official India offer",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "65": {
      "brand": "Sun NXT",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; see official plans",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "66": {
      "brand": "Aha",
      "tier": "Premium",
      "advertisedRealPrice": "Dynamic; see official plan page",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "67": {
      "brand": "Tata Play Binge",
      "tier": "4-app pack",
      "advertisedRealPrice": "From ₹149/month",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "68": {
      "brand": "Tata Play Binge",
      "tier": "13-app pack",
      "advertisedRealPrice": "From ₹199/month",
      "monthlyReference": "₹199/month",
      "offers": {
          "1": "₹189",
          "3": "₹537",
          "6": "₹1,015",
          "12": "₹1,791"
      }
  },
  "69": {
      "brand": "Tata Play Binge",
      "tier": "35-app pack",
      "advertisedRealPrice": "From ₹399/month",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "70": {
      "brand": "Tata Play Binge (non-DTH customers)",
      "tier": "Flexi Mini",
      "advertisedRealPrice": "₹149/month; ₹499/quarter; ₹1,799/year",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "71": {
      "brand": "Tata Play Binge (non-DTH customers)",
      "tier": "Flexi Max",
      "advertisedRealPrice": "₹299/month; ₹699/quarter; ₹2,499/year",
      "monthlyReference": "₹299/month",
      "offers": {
          "1": "₹284",
          "3": "₹807",
          "6": "₹1,525",
          "12": "₹2,691"
      }
  },
  "72": {
      "brand": "Tata Play Binge (non-DTH customers)",
      "tier": "Infinity",
      "advertisedRealPrice": "₹399/month; ₹899/quarter; ₹2,999/year",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "73": {
      "brand": "Jio OTT Pass",
      "tier": "Monthly pass",
      "advertisedRealPrice": "₹200/28 days",
      "monthlyReference": "₹200/month",
      "offers": {
          "1": "₹190",
          "3": "₹540",
          "6": "₹1,020",
          "12": "₹1,800"
      }
  },
  "74": {
      "brand": "Jio OTT Pass",
      "tier": "Quarterly pass",
      "advertisedRealPrice": "₹550/84 days",
      "monthlyReference": "₹183/month",
      "offers": {
          "1": "₹174",
          "3": "₹495",
          "6": "₹935",
          "12": "₹1,650"
      }
  },
  "75": {
      "brand": "Jio OTT Pass",
      "tier": "Annual pass",
      "advertisedRealPrice": "₹2,000/year",
      "monthlyReference": "₹167/month",
      "offers": {
          "1": "₹158",
          "3": "₹450",
          "6": "₹850",
          "12": "₹1,500"
      }
  },
  "76": {
      "brand": "Airtel Xstream Play",
      "tier": "Premium / bundled packs",
      "advertisedRealPrice": "Price depends on current plan / recharge offer",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "77": {
      "brand": "Tata Play DTH",
      "tier": "Channel packs and OTT add-ons",
      "advertisedRealPrice": "Pack pricing varies; e.g. Marathi Super Value ₹83/month; specific channel add-ons can be lower",
      "monthlyReference": "₹83/month",
      "offers": {
          "1": "₹79",
          "3": "₹224",
          "6": "₹423",
          "12": "₹747"
      }
  },
  "78": {
      "brand": "YouTube Premium",
      "tier": "Individual",
      "advertisedRealPrice": "Starts at ₹149/month; prepaid options available",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "79": {
      "brand": "YouTube Premium",
      "tier": "Family",
      "advertisedRealPrice": "₹299/month",
      "monthlyReference": "₹299/month",
      "offers": {
          "1": "₹284",
          "3": "₹807",
          "6": "₹1,525",
          "12": "₹2,691"
      }
  },
  "80": {
      "brand": "YouTube Premium",
      "tier": "Student",
      "advertisedRealPrice": "Student price shown after eligibility verification",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "81": {
      "brand": "YouTube Premium Lite",
      "tier": "Individual",
      "advertisedRealPrice": "Price/availability varies by current India offer",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "82": {
      "brand": "YouTube Studio / channel memberships",
      "tier": "Channel membership",
      "advertisedRealPrice": "Price set by each channel/region",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "83": {
      "brand": "vidIQ",
      "tier": "Boost",
      "advertisedRealPrice": "India App Store lists examples ₹999/month; annual/other channel packages vary",
      "monthlyReference": "₹999/month",
      "offers": {
          "1": "₹949",
          "3": "₹2,697",
          "6": "₹5,095",
          "12": "₹8,991"
      }
  },
  "84": {
      "brand": "TubeBuddy",
      "tier": "Pro / Legend",
      "advertisedRealPrice": "Current price shown on checkout; may vary by channel size/promotions",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "85": {
      "brand": "StreamYard",
      "tier": "Paid creator / streaming plans",
      "advertisedRealPrice": "Dynamic; current price at checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "86": {
      "brand": "Restream",
      "tier": "Standard / Professional / Business",
      "advertisedRealPrice": "Dynamic; current price at checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "87": {
      "brand": "Epidemic Sound",
      "tier": "Creator",
      "advertisedRealPrice": "US$9.99/month billed US$119.88 yearly",
      "monthlyReference": "US$9.99/month",
      "offers": {
          "1": "US$9.49",
          "3": "US$26.97",
          "6": "US$50.95",
          "12": "US$89.91"
      }
  },
  "88": {
      "brand": "Epidemic Sound",
      "tier": "Pro",
      "advertisedRealPrice": "US$16.99/month billed US$203.88 yearly",
      "monthlyReference": "US$16.99/month",
      "offers": {
          "1": "US$16.14",
          "3": "US$45.87",
          "6": "US$86.65",
          "12": "US$152.91"
      }
  },
  "89": {
      "brand": "Spotify Premium",
      "tier": "Standard Monthly",
      "advertisedRealPrice": "₹139/month (promotional 2-month offer may appear to new users)",
      "monthlyReference": "₹139/month",
      "offers": {
          "1": "₹132",
          "3": "₹375",
          "6": "₹709",
          "12": "₹1,251"
      }
  },
  "90": {
      "brand": "Spotify Premium",
      "tier": "Standard Annual prepaid",
      "advertisedRealPrice": "₹1,390/year (about ₹115.84/month equivalent)",
      "monthlyReference": "₹116/month",
      "offers": {
          "1": "₹110",
          "3": "₹313",
          "6": "₹591",
          "12": "₹1,043"
      }
  },
  "91": {
      "brand": "Spotify Premium",
      "tier": "Student",
      "advertisedRealPrice": "₹69/month after eligible intro offer",
      "monthlyReference": "₹69/month",
      "offers": {
          "1": "₹66",
          "3": "₹186",
          "6": "₹352",
          "12": "₹621"
      }
  },
  "92": {
      "brand": "Spotify Premium",
      "tier": "Platinum",
      "advertisedRealPrice": "₹299/month",
      "monthlyReference": "₹299/month",
      "offers": {
          "1": "₹284",
          "3": "₹807",
          "6": "₹1,525",
          "12": "₹2,691"
      }
  },
  "93": {
      "brand": "Apple Music",
      "tier": "Individual",
      "advertisedRealPrice": "₹139/month",
      "monthlyReference": "₹139/month",
      "offers": {
          "1": "₹132",
          "3": "₹375",
          "6": "₹709",
          "12": "₹1,251"
      }
  },
  "94": {
      "brand": "Apple Music",
      "tier": "Family",
      "advertisedRealPrice": "₹229/month",
      "monthlyReference": "₹229/month",
      "offers": {
          "1": "₹218",
          "3": "₹618",
          "6": "₹1,168",
          "12": "₹2,061"
      }
  },
  "95": {
      "brand": "Apple Music",
      "tier": "Student",
      "advertisedRealPrice": "₹69/month",
      "monthlyReference": "₹69/month",
      "offers": {
          "1": "₹66",
          "3": "₹186",
          "6": "₹352",
          "12": "₹621"
      }
  },
  "96": {
      "brand": "Audible",
      "tier": "Premium Plus - 1 credit",
      "advertisedRealPrice": "₹199/month after 30-day trial where eligible",
      "monthlyReference": "₹199/month",
      "offers": {
          "1": "₹189",
          "3": "₹537",
          "6": "₹1,015",
          "12": "₹1,791"
      }
  },
  "97": {
      "brand": "JioSaavn Pro",
      "tier": "Pro",
      "advertisedRealPrice": "Dynamic; verify in app/official checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "98": {
      "brand": "Apple Creator Studio",
      "tier": "Included Logic Pro / MainStage",
      "advertisedRealPrice": "₹399/month or ₹3,999/year; student/educator ₹199/month or ₹1,999/year",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "99": {
      "brand": "Canva",
      "tier": "Free",
      "advertisedRealPrice": "₹0",
      "monthlyReference": "₹0/month",
      "offers": {
          "1": "₹0",
          "3": "₹0",
          "6": "₹0",
          "12": "₹0"
      }
  },
  "100": {
      "brand": "Canva",
      "tier": "Pro Lite",
      "advertisedRealPrice": "₹1,590/year",
      "monthlyReference": "₹132/month",
      "offers": {
          "1": "₹126",
          "3": "₹358",
          "6": "₹676",
          "12": "₹1,192"
      }
  },
  "101": {
      "brand": "Canva",
      "tier": "Pro",
      "advertisedRealPrice": "₹4,000/year (daily/weekly options may also appear)",
      "monthlyReference": "₹333/month",
      "offers": {
          "1": "₹317",
          "3": "₹900",
          "6": "₹1,700",
          "12": "₹3,000"
      }
  },
  "102": {
      "brand": "Canva",
      "tier": "Business",
      "advertisedRealPrice": "₹6,800/year per person",
      "monthlyReference": "₹567/month",
      "offers": {
          "1": "₹538",
          "3": "₹1,530",
          "6": "₹2,890",
          "12": "₹5,100"
      }
  },
  "103": {
      "brand": "Adobe Photoshop",
      "tier": "Single app",
      "advertisedRealPrice": "₹599/month promo first year; regular listed price ₹733.96/month incl. GST",
      "monthlyReference": "₹599/month",
      "offers": {
          "1": "₹569",
          "3": "₹1,617",
          "6": "₹3,055",
          "12": "₹5,391"
      }
  },
  "104": {
      "brand": "Adobe Photography",
      "tier": "Photography plan",
      "advertisedRealPrice": "₹599/month promo; regular listed price ₹638.38/month incl. GST",
      "monthlyReference": "₹599/month",
      "offers": {
          "1": "₹569",
          "3": "₹1,617",
          "6": "₹3,055",
          "12": "₹5,391"
      }
  },
  "105": {
      "brand": "Adobe Premiere",
      "tier": "Single app",
      "advertisedRealPrice": "₹389/month promo for first 12 months; regular listed price ₹733.96/month incl. GST",
      "monthlyReference": "₹389/month",
      "offers": {
          "1": "₹370",
          "3": "₹1,050",
          "6": "₹1,984",
          "12": "₹3,501"
      }
  },
  "106": {
      "brand": "Adobe Creative Cloud Pro",
      "tier": "All-apps suite",
      "advertisedRealPrice": "About ₹4,889/month per licence excl. GST on current listed business pricing",
      "monthlyReference": "₹4,889/month",
      "offers": {
          "1": "₹4,645",
          "3": "₹13,200",
          "6": "₹24,934",
          "12": "₹44,001"
      }
  },
  "107": {
      "brand": "Adobe Acrobat Pro",
      "tier": "PDF productivity",
      "advertisedRealPrice": "₹638.38/month incl. GST",
      "monthlyReference": "₹638/month",
      "offers": {
          "1": "₹606",
          "3": "₹1,724",
          "6": "₹3,256",
          "12": "₹5,745"
      }
  },
  "108": {
      "brand": "Apple Creator Studio",
      "tier": "Standard",
      "advertisedRealPrice": "₹399/month or ₹3,999/year",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "109": {
      "brand": "Apple Creator Studio",
      "tier": "Student / educator",
      "advertisedRealPrice": "₹199/month or ₹1,999/year",
      "monthlyReference": "₹199/month",
      "offers": {
          "1": "₹189",
          "3": "₹537",
          "6": "₹1,015",
          "12": "₹1,791"
      }
  },
  "110": {
      "brand": "InShot Pro",
      "tier": "Monthly",
      "advertisedRealPrice": "₹399/month",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "111": {
      "brand": "InShot Pro",
      "tier": "Annual",
      "advertisedRealPrice": "₹1,499/year",
      "monthlyReference": "₹125/month",
      "offers": {
          "1": "₹119",
          "3": "₹337",
          "6": "₹637",
          "12": "₹1,124"
      }
  },
  "112": {
      "brand": "InShot",
      "tier": "Lifetime unlock",
      "advertisedRealPrice": "₹3,999 listed",
      "monthlyReference": "₹3,999/month",
      "offers": {
          "1": "₹3,799",
          "3": "₹10,797",
          "6": "₹20,395",
          "12": "₹35,991"
      }
  },
  "113": {
      "brand": "Picsart",
      "tier": "Pro Monthly",
      "advertisedRealPrice": "₹149/month listed for one Pro SKU; other SKUs may differ",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "114": {
      "brand": "Picsart",
      "tier": "Pro Annual",
      "advertisedRealPrice": "₹1,199/year listed in India App Store",
      "monthlyReference": "₹100/month",
      "offers": {
          "1": "₹95",
          "3": "₹270",
          "6": "₹510",
          "12": "₹899"
      }
  },
  "115": {
      "brand": "Picsart",
      "tier": "Gold Monthly",
      "advertisedRealPrice": "₹399/month listed in India App Store",
      "monthlyReference": "₹399/month",
      "offers": {
          "1": "₹379",
          "3": "₹1,077",
          "6": "₹2,035",
          "12": "₹3,591"
      }
  },
  "116": {
      "brand": "Picsart",
      "tier": "Gold Annual",
      "advertisedRealPrice": "₹1,849/year listed in India App Store",
      "monthlyReference": "₹154/month",
      "offers": {
          "1": "₹146",
          "3": "₹416",
          "6": "₹786",
          "12": "₹1,387"
      }
  },
  "117": {
      "brand": "Filmora",
      "tier": "Creator / annual / premium options",
      "advertisedRealPrice": "India App Store lists examples from ₹999 monthly creator plan; annual plans around ₹4,999–₹7,900; lifetime around ₹7,900",
      "monthlyReference": "₹999/month",
      "offers": {
          "1": "₹949",
          "3": "₹2,697",
          "6": "₹5,095",
          "12": "₹8,991"
      }
  },
  "118": {
      "brand": "DaVinci Resolve Studio",
      "tier": "Studio licence",
      "advertisedRealPrice": "Price varies by authorised India reseller; verify local price",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "119": {
      "brand": "Figma",
      "tier": "Professional - Full seat",
      "advertisedRealPrice": "US$16/month for full seat (USD pricing shown)",
      "monthlyReference": "US$16.00/month",
      "offers": {
          "1": "US$15.20",
          "3": "US$43.20",
          "6": "US$81.60",
          "12": "US$144.00"
      }
  },
  "120": {
      "brand": "Figma",
      "tier": "Professional - Dev seat",
      "advertisedRealPrice": "US$12/month",
      "monthlyReference": "US$12.00/month",
      "offers": {
          "1": "US$11.40",
          "3": "US$32.40",
          "6": "US$61.20",
          "12": "US$108.00"
      }
  },
  "121": {
      "brand": "Figma",
      "tier": "Professional - Collab seat",
      "advertisedRealPrice": "US$3/month",
      "monthlyReference": "US$3.00/month",
      "offers": {
          "1": "US$2.85",
          "3": "US$8.10",
          "6": "US$15.30",
          "12": "US$27.00"
      }
  },
  "122": {
      "brand": "Shutterstock",
      "tier": "Image downloads",
      "advertisedRealPrice": "US$25/month billed yearly at US$300/year for 10 images/month entry example",
      "monthlyReference": "US$25.00/month",
      "offers": {
          "1": "US$23.75",
          "3": "US$67.50",
          "6": "US$127.50",
          "12": "US$225.00"
      }
  },
  "123": {
      "brand": "Shutterstock",
      "tier": "Unlimited Images",
      "advertisedRealPrice": "US$29/month equivalent billed US$348/year",
      "monthlyReference": "US$29.00/month",
      "offers": {
          "1": "US$27.55",
          "3": "US$78.30",
          "6": "US$147.90",
          "12": "US$261.00"
      }
  },
  "124": {
      "brand": "Shutterstock",
      "tier": "Unlimited Plus",
      "advertisedRealPrice": "US$69/month equivalent billed US$828/year",
      "monthlyReference": "US$69.00/month",
      "offers": {
          "1": "US$65.55",
          "3": "US$186.30",
          "6": "US$351.90",
          "12": "US$621.00"
      }
  },
  "125": {
      "brand": "Storyblocks",
      "tier": "Essentials",
      "advertisedRealPrice": "US$21/month equivalent on annual billing",
      "monthlyReference": "US$21.00/month",
      "offers": {
          "1": "US$19.95",
          "3": "US$56.70",
          "6": "US$107.10",
          "12": "US$189.00"
      }
  },
  "126": {
      "brand": "Storyblocks",
      "tier": "Unlimited All Access",
      "advertisedRealPrice": "US$30/month equivalent on annual billing",
      "monthlyReference": "US$30.00/month",
      "offers": {
          "1": "US$28.50",
          "3": "US$81.00",
          "6": "US$153.00",
          "12": "US$270.00"
      }
  },
  "127": {
      "brand": "Storyblocks",
      "tier": "Small Business",
      "advertisedRealPrice": "US$40/month equivalent on annual billing",
      "monthlyReference": "US$40.00/month",
      "offers": {
          "1": "US$38.00",
          "3": "US$108.00",
          "6": "US$204.00",
          "12": "US$360.00"
      }
  },
  "128": {
      "brand": "Epidemic Sound",
      "tier": "Creator",
      "advertisedRealPrice": "US$9.99/month, billed US$119.88 annually",
      "monthlyReference": "US$9.99/month",
      "offers": {
          "1": "US$9.49",
          "3": "US$26.97",
          "6": "US$50.95",
          "12": "US$89.91"
      }
  },
  "129": {
      "brand": "Epidemic Sound",
      "tier": "Pro",
      "advertisedRealPrice": "US$16.99/month, billed US$203.88 annually",
      "monthlyReference": "US$16.99/month",
      "offers": {
          "1": "US$16.14",
          "3": "US$45.87",
          "6": "US$86.65",
          "12": "US$152.91"
      }
  },
  "130": {
      "brand": "Artlist AI Suite",
      "tier": "AI Starter",
      "advertisedRealPrice": "US$11.99/month equivalent billed annually",
      "monthlyReference": "US$11.99/month",
      "offers": {
          "1": "US$11.39",
          "3": "US$32.37",
          "6": "US$61.15",
          "12": "US$107.91"
      }
  },
  "131": {
      "brand": "Artlist AI Suite",
      "tier": "AI Core",
      "advertisedRealPrice": "US$23.99/month equivalent billed annually",
      "monthlyReference": "US$23.99/month",
      "offers": {
          "1": "US$22.79",
          "3": "US$64.77",
          "6": "US$122.35",
          "12": "US$215.91"
      }
  },
  "132": {
      "brand": "Envato Elements",
      "tier": "Individual subscription",
      "advertisedRealPrice": "Dynamic by plan, region and offer; verify checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "133": {
      "brand": "Motion Array",
      "tier": "Everything",
      "advertisedRealPrice": "Current price shown on official checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "134": {
      "brand": "Freepik",
      "tier": "Premium / Premium+ / Pro tiers",
      "advertisedRealPrice": "Dynamic; use current India checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "135": {
      "brand": "Google One",
      "tier": "Basic 100 GB",
      "advertisedRealPrice": "₹149/month or ₹1,499/year in India App Store listing",
      "monthlyReference": "₹149/month",
      "offers": {
          "1": "₹142",
          "3": "₹402",
          "6": "₹760",
          "12": "₹1,341"
      }
  },
  "136": {
      "brand": "Google One",
      "tier": "Standard 200 GB",
      "advertisedRealPrice": "₹219/month or ₹2,199/year in India App Store listing",
      "monthlyReference": "₹219/month",
      "offers": {
          "1": "₹208",
          "3": "₹591",
          "6": "₹1,117",
          "12": "₹1,971"
      }
  },
  "137": {
      "brand": "iCloud+",
      "tier": "50 GB",
      "advertisedRealPrice": "₹75/month",
      "monthlyReference": "₹75/month",
      "offers": {
          "1": "₹71",
          "3": "₹202",
          "6": "₹382",
          "12": "₹675"
      }
  },
  "138": {
      "brand": "iCloud+",
      "tier": "200 GB",
      "advertisedRealPrice": "₹219/month",
      "monthlyReference": "₹219/month",
      "offers": {
          "1": "₹208",
          "3": "₹591",
          "6": "₹1,117",
          "12": "₹1,971"
      }
  },
  "139": {
      "brand": "iCloud+",
      "tier": "2 TB",
      "advertisedRealPrice": "₹749/month",
      "monthlyReference": "₹749/month",
      "offers": {
          "1": "₹712",
          "3": "₹2,022",
          "6": "₹3,820",
          "12": "₹6,741"
      }
  },
  "140": {
      "brand": "iCloud+",
      "tier": "6 TB",
      "advertisedRealPrice": "₹2,999/month",
      "monthlyReference": "₹2,999/month",
      "offers": {
          "1": "₹2,849",
          "3": "₹8,097",
          "6": "₹15,295",
          "12": "₹26,991"
      }
  },
  "141": {
      "brand": "iCloud+",
      "tier": "12 TB",
      "advertisedRealPrice": "₹5,900/month",
      "monthlyReference": "₹5,900/month",
      "offers": {
          "1": "₹5,605",
          "3": "₹15,930",
          "6": "₹30,090",
          "12": "₹53,100"
      }
  },
  "142": {
      "brand": "Microsoft 365",
      "tier": "Personal",
      "advertisedRealPrice": "₹689/month or ₹6,899/year",
      "monthlyReference": "₹689/month",
      "offers": {
          "1": "₹655",
          "3": "₹1,860",
          "6": "₹3,514",
          "12": "₹6,201"
      }
  },
  "143": {
      "brand": "Microsoft 365",
      "tier": "Family",
      "advertisedRealPrice": "₹819/month or ₹8,199/year",
      "monthlyReference": "₹819/month",
      "offers": {
          "1": "₹778",
          "3": "₹2,211",
          "6": "₹4,177",
          "12": "₹7,371"
      }
  },
  "144": {
      "brand": "Microsoft 365",
      "tier": "Premium",
      "advertisedRealPrice": "₹1,999/month or ₹19,999/year",
      "monthlyReference": "₹1,999/month",
      "offers": {
          "1": "₹1,899",
          "3": "₹5,397",
          "6": "₹10,195",
          "12": "₹17,991"
      }
  },
  "145": {
      "brand": "Grammarly",
      "tier": "Pro",
      "advertisedRealPrice": "US$30/month; US$60/3 months; US$144/year (US$12/month equivalent), localized INR may display",
      "monthlyReference": "US$30.00/month",
      "offers": {
          "1": "US$28.50",
          "3": "US$81.00",
          "6": "US$153.00",
          "12": "US$270.00"
      }
  },
  "146": {
      "brand": "Notion",
      "tier": "Plus / Business",
      "advertisedRealPrice": "Dynamic; USD/region-specific price shown on official pricing",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "147": {
      "brand": "Dropbox",
      "tier": "Plus / Professional / team",
      "advertisedRealPrice": "Dynamic; check India checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "148": {
      "brand": "Google Workspace",
      "tier": "Business Starter / Standard / Plus",
      "advertisedRealPrice": "Price varies by India edition and billing commitment",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "149": {
      "brand": "Coursera Plus",
      "tier": "Monthly",
      "advertisedRealPrice": "US$59/month official global rate; local India checkout may differ",
      "monthlyReference": "US$59.00/month",
      "offers": {
          "1": "US$56.05",
          "3": "US$159.30",
          "6": "US$300.90",
          "12": "US$531.00"
      }
  },
  "150": {
      "brand": "Coursera Plus",
      "tier": "Annual",
      "advertisedRealPrice": "US$399/year official global rate; local India checkout may differ",
      "monthlyReference": "US$33.25/month",
      "offers": {
          "1": "US$31.59",
          "3": "US$89.78",
          "6": "US$169.57",
          "12": "US$299.25"
      }
  },
  "151": {
      "brand": "Udemy",
      "tier": "Personal Plan",
      "advertisedRealPrice": "Localized price/availability shown at checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "152": {
      "brand": "LinkedIn Premium Career",
      "tier": "Career membership",
      "advertisedRealPrice": "Dynamic; checkout varies by market/promotion",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "153": {
      "brand": "LinkedIn Premium Business / Sales Navigator",
      "tier": "Business / sales prospecting",
      "advertisedRealPrice": "Dynamic; price shown at checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "154": {
      "brand": "Times Prime",
      "tier": "Annual membership",
      "advertisedRealPrice": "Advertised entry offers from ₹349/year; offers vary",
      "monthlyReference": "₹29/month",
      "offers": {
          "1": "₹28",
          "3": "₹79",
          "6": "₹148",
          "12": "₹262"
      }
  },
  "155": {
      "brand": "Moneycontrol Pro",
      "tier": "Aspiring / Active Investor / Clean Experience",
      "advertisedRealPrice": "Current page displays promotional prices from ₹29–₹499 for some monthly options; annual offers also shown",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "156": {
      "brand": "The Hindu Digital",
      "tier": "Digital access",
      "advertisedRealPrice": "Offer/term-dependent; current pricing shown on checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "157": {
      "brand": "Kindle Unlimited",
      "tier": "Ebooks / digital reading",
      "advertisedRealPrice": "Official Amazon India page",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "158": {
      "brand": "PlayStation Plus",
      "tier": "Essential",
      "advertisedRealPrice": "India Store prices observed: ₹649/month; ₹5,139/year",
      "monthlyReference": "₹649/month",
      "offers": {
          "1": "₹617",
          "3": "₹1,752",
          "6": "₹3,310",
          "12": "₹5,841"
      }
  },
  "159": {
      "brand": "PlayStation Plus",
      "tier": "Extra",
      "advertisedRealPrice": "India Store prices observed: ₹979/month; ₹8,709/year",
      "monthlyReference": "₹979/month",
      "offers": {
          "1": "₹930",
          "3": "₹2,643",
          "6": "₹4,993",
          "12": "₹8,811"
      }
  },
  "160": {
      "brand": "PlayStation Plus",
      "tier": "Deluxe (India tier)",
      "advertisedRealPrice": "India Store price varies by current offer; annual reference around ₹9,879",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "161": {
      "brand": "Google Play Pass",
      "tier": "Play Store games/apps",
      "advertisedRealPrice": "Current India checkout price; varies by offer",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "162": {
      "brand": "Xbox Game Pass",
      "tier": "Essential / Premium / Ultimate variants",
      "advertisedRealPrice": "Current India price shown in Xbox checkout; changes by tier and offers",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "163": {
      "brand": "NordVPN",
      "tier": "Basic",
      "advertisedRealPrice": "Official page shows US$14.99/month monthly; long-term intro from US$3.49/mo equivalent for 27 months, renews at higher rates",
      "monthlyReference": "US$14.99/month",
      "offers": {
          "1": "US$14.24",
          "3": "US$40.47",
          "6": "US$76.45",
          "12": "US$134.91"
      }
  },
  "164": {
      "brand": "Proton VPN",
      "tier": "Free / Plus / Unlimited",
      "advertisedRealPrice": "Dynamic by term; current price at checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "165": {
      "brand": "Surfshark",
      "tier": "Starter / One / One+",
      "advertisedRealPrice": "Dynamic introductory and renewal prices; verify checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "166": {
      "brand": "Hostinger",
      "tier": "Web hosting plans",
      "advertisedRealPrice": "Promotional price varies by duration and plan; renewal differs",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "167": {
      "brand": "Webflow",
      "tier": "Site plans / Workspace",
      "advertisedRealPrice": "Dynamic by site plan and billing cadence",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "168": {
      "brand": "Framer",
      "tier": "Mini / Basic / Pro",
      "advertisedRealPrice": "Dynamic; regional checkout can vary",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "169": {
      "brand": "Streamlabs",
      "tier": "Ultra",
      "advertisedRealPrice": "Price shown on official checkout",
      "monthlyReference": "Verify",
      "offers": {
          "1": "Verify",
          "3": "Verify",
          "6": "Verify",
          "12": "Verify"
      }
  },
  "170": {
      "brand": "Descript",
      "tier": "Pro",
      "advertisedRealPrice": "US$30 month-to-month or US$24/editor/month billed annually",
      "monthlyReference": "US$30.00/month",
      "offers": {
          "1": "US$28.50",
          "3": "US$81.00",
          "6": "US$153.00",
          "12": "US$270.00"
      }
  },
};

export default SUBSCRIPTION_OFFERS;
