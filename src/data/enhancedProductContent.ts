export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductIngredient {
  name: string;
  benefit: string;
}

export interface EnhancedProductContent {
  handle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  heroHeadline: string;
  heroSubtext: string;
  sections: {
    title: string;
    content: string[];
    listItems?: string[];
  }[];
  ingredients: ProductIngredient[];
  benefits: ProductFeature[];
  howToUse: {
    instructions: string;
    combineWith: string[];
  };
  ctaButtons: {
    primary: string;
    secondary?: string;
  };
}

export const enhancedProductContent: Record<string, EnhancedProductContent> = {
  "artlux-nad-booster": {
    handle: "artlux-nad-booster",
    metaTitle: "ARTLUX NAD+ Booster – Cellular Energy, Longevity & DNA Repair",
    metaDescription: "Clinical-dose NAD+ boosting formula supporting mitochondrial energy, cellular repair and healthy aging. Includes NMN alternatives, PQQ, resveratrol and methylation support.",
    heroHeadline: "ARTLUX NAD+ BOOSTER — Cellular Energy & Longevity Activation",
    heroSubtext: "Aging follows one central rule: When NAD+ drops, everything else collapses — energy, metabolism, immunity, brain function and cellular repair. ARTLUX NAD+ Booster is a clinical-grade formula created to restore your natural vitality by supporting the body's core longevity system.",
    sections: [
      {
        title: "Why NAD+ Matters More Than Almost Any Other Molecule",
        content: [
          "NAD+ governs the most critical functions in your body. After age 30, NAD+ drops by up to 50%. By age 50 — by 80–90%. This decline leads to chronic fatigue, slow metabolism, brain fog, accelerated aging, inflammation, sleep disruption, and poor recovery.",
          "ARTLUX NAD+ Booster is engineered to reverse the decline."
        ],
        listItems: [
          "Mitochondrial energy production (ATP)",
          "DNA repair",
          "Inflammation control",
          "Brain performance",
          "Stem cell activation",
          "Sirtuin function (SIRT1–SIRT7)",
          "Metabolic health",
          "Stress resilience"
        ]
      },
      {
        title: "What Makes ARTLUX Different?",
        content: [
          "Most NAD+ supplements fail because: the dose is too low, ingredients are unstable, formula lacks methylation support, timing isn't optimized, absorption is poor.",
          "ARTLUX solves ALL of these problems."
        ]
      }
    ],
    ingredients: [
      { name: "NMN-grade NAD precursors", benefit: "Provide direct material for NAD+ synthesis." },
      { name: "PQQ — mitochondrial biogenesis activator", benefit: "Promotes creation of new mitochondria." },
      { name: "Trans-Resveratrol (micronized)", benefit: "Activates SIRT1, boosts longevity pathways." },
      { name: "R-Lipoic Acid", benefit: "Enhances insulin sensitivity and recycles antioxidants." },
      { name: "TMG (betaine)", benefit: "Supports methylation — essential for NMN pathways." },
      { name: "CoQ10 Ubiquinol", benefit: "The superior active form for mitochondrial ATP production." }
    ],
    benefits: [
      { icon: "⚡", title: "All-day energy", description: "No stimulants. No crash. Just natural mitochondrial output." },
      { icon: "🧠", title: "Clear brain function", description: "Faster processing, memory support, focus." },
      { icon: "🔥", title: "Faster metabolism", description: "Better glucose control and fat oxidation." },
      { icon: "🧬", title: "Cellular repair", description: "NAD+ fuels DNA repair enzymes (PARPs)." },
      { icon: "🛡", title: "Reduced inflammation", description: "NAD+ downregulates inflammatory pathways." },
      { icon: "⏳", title: "Slower biological aging", description: "Higher NAD+ = younger epigenetic profile." }
    ],
    howToUse: {
      instructions: "Take 2 capsules in the morning with food.",
      combineWith: ["Cold exposure", "Hydrogen water", "Grounding", "Sunlight"]
    },
    ctaButtons: {
      primary: "Add to Cart",
      secondary: "Bundle with Mito Power for 20% Off"
    }
  },
  "artlux-mito-power": {
    handle: "artlux-mito-power",
    metaTitle: "ARTLUX Mito Power – Mitochondrial Support & Anti-Aging Energy",
    metaDescription: "Urolithin A, PQQ, ALCAR, R-ALA and CoQ10 support mitochondrial biogenesis, energy, focus, strength and healthy aging.",
    heroHeadline: "ARTLUX MITO POWER — Advanced Mitochondrial Support Formula",
    heroSubtext: "Youth is mitochondrial. Energy is mitochondrial. Longevity is mitochondrial. When your mitochondria weaken, you age faster. When you strengthen them — you reverse the process. ARTLUX MITO POWER is a next-generation mitochondrial upgrade system combining the strongest known nutrients for energy, repair and performance.",
    sections: [
      {
        title: "The 3 Phases of Mitochondrial Aging",
        content: [
          "MITO POWER targets all three phases simultaneously."
        ],
        listItems: [
          "1️⃣ Mitochondrial damage — From stress, toxins, poor sleep, alcohol, ultra-processed foods.",
          "2️⃣ Mitochondrial dysfunction — Low ATP, brain fog, inflammation, weight gain.",
          "3️⃣ Decline in biogenesis — Your cells stop producing healthy new mitochondria."
        ]
      }
    ],
    ingredients: [
      { name: "Urolithin A — the mitophagy master molecule", benefit: "Removes damaged mitochondria → promotes new healthy ones." },
      { name: "PQQ — \"the spark of life\"", benefit: "Clinically shown to stimulate mitochondrial biogenesis." },
      { name: "Acetyl-L-Carnitine (ALCAR)", benefit: "Transports fatty acids into mitochondria → clean energy." },
      { name: "R-Lipoic Acid", benefit: "Enhances mitochondrial function and antioxidant recycling." },
      { name: "CoQ10 Ubiquinol", benefit: "Drives electron transport chain → boosts ATP output." }
    ],
    benefits: [
      { icon: "⚡", title: "Explosive clean energy", description: "No caffeine. No stimulants." },
      { icon: "🧠", title: "Enhanced cognitive performance", description: "Sharper memory, faster recall, better focus." },
      { icon: "💪", title: "Better physical output", description: "Strength, endurance, recovery." },
      { icon: "🛡", title: "Lower inflammation", description: "Mitochondria + antioxidants → less cellular stress." },
      { icon: "🔁", title: "Improved metabolism", description: "Less insulin resistance, better fat burning." },
      { icon: "⏳", title: "Younger biological age", description: "More youthful mitochondria = slower aging." }
    ],
    howToUse: {
      instructions: "Take 2 capsules with breakfast or early lunch.",
      combineWith: ["NAD+ Booster", "Hydrogen water", "Cold exposure"]
    },
    ctaButtons: {
      primary: "Add to Cart",
      secondary: "Mito Power + NAD Booster Combo"
    }
  },
  "artlux-lipo-detox": {
    handle: "artlux-lipo-detox",
    metaTitle: "ARTLUX Lipo Detox – Liver Support, Metabolism & Daily Detox",
    metaDescription: "A powerful detox formula supporting liver health, fat metabolism, inflammation reduction and cellular cleansing.",
    heroHeadline: "ARTLUX LIPO DETOX — Daily Detoxification & Liver Support",
    heroSubtext: "Detox is not a juice cleanse. Detox is a cellular process driven by liver enzymes, glutathione, methylation, mitochondrial activity, and hydration. LIPO DETOX is engineered to support every stage of natural detoxification.",
    sections: [
      {
        title: "Why Detox Matters",
        content: [
          "The modern world overloads your liver with alcohol, medications, pollution, plastics, seed oils, sugar, and chronic stress. These toxins accumulate in fat tissue, the lymphatic system, liver cells, and the brain.",
          "LIPO DETOX helps your body clear them naturally."
        ]
      }
    ],
    ingredients: [
      { name: "NAC (N-acetyl cysteine)", benefit: "Boosts glutathione — the body's master detoxifier." },
      { name: "S-Acetyl Glutathione", benefit: "Highly bioavailable antioxidant for liver and brain." },
      { name: "Milk Thistle Extract", benefit: "Protects and regenerates liver tissue." },
      { name: "Berberine HCL", benefit: "Improves glucose metabolism and reduces inflammation." },
      { name: "Curcumin Phytosome", benefit: "Anti-inflammatory support for detox pathways." },
      { name: "Carnosine", benefit: "Prevents glycation and cellular aging." }
    ],
    benefits: [
      { icon: "🫁", title: "Improved liver health", description: "Better enzyme balance and regeneration." },
      { icon: "🔥", title: "Faster metabolism", description: "Better glucose control and fat utilization." },
      { icon: "🌿", title: "Clearer skin", description: "Detox = inflammation reduction." },
      { icon: "🧠", title: "Cleaner mental state", description: "Toxins heavily impact brain fog." },
      { icon: "🍷", title: "Ideal for alcohol recovery", description: "A must-have for anyone reducing or quitting alcohol." }
    ],
    howToUse: {
      instructions: "Take 2 capsules after lunch.",
      combineWith: ["Baja Salt hydration", "Hydrogen water", "Cold exposure", "NAD+ Booster"]
    },
    ctaButtons: {
      primary: "Add to Cart",
      secondary: "Alcohol Detox Bundle"
    }
  },
  "artlux-mind-focus": {
    handle: "artlux-mind-focus",
    metaTitle: "ARTLUX Mind Focus – Nootropic Formula for Brain Clarity",
    metaDescription: "A clean, natural nootropic formula enhancing focus, memory, creativity and mental performance without stimulants.",
    heroHeadline: "ARTLUX MIND FOCUS — Clean Cognitive Enhancement",
    heroSubtext: "Your brain doesn't need stimulants. It needs nutrients, oxygen, mitochondrial energy and neurotransmitter balance. MIND FOCUS is designed to provide exactly that.",
    sections: [
      {
        title: "Why Most Nootropics Fail",
        content: [
          "Most products rely on caffeine, synthetics, and temporary tricks. They give short-term focus… and long-term burnout.",
          "ARTLUX Mind Focus fuels the brain naturally with increased blood flow, improved mitochondrial function, balanced neurotransmitters, and reduced inflammation."
        ]
      }
    ],
    ingredients: [
      { name: "Lion's Mane Mushroom Extract", benefit: "Supports neurogenesis and nerve growth factor." },
      { name: "L-Theanine", benefit: "Calm focus without jitter." },
      { name: "Magnesium L-Threonate", benefit: "Reaches the brain and enhances synaptic plasticity." },
      { name: "Apigenin", benefit: "Reduces stress, improves focus, protects telomeres." },
      { name: "Bacopa Monnieri", benefit: "Memory and learning enhancer." }
    ],
    benefits: [
      { icon: "🧠", title: "Sharper focus", description: "Perfect for work, study, creativity." },
      { icon: "📚", title: "Better memory", description: "Long-term retention and learning." },
      { icon: "😌", title: "Reduced anxiety", description: "Calm but alert mental state." },
      { icon: "⚡", title: "No crash", description: "Zero stimulants." },
      { icon: "🧬", title: "Neuroprotective", description: "Supports long-term brain health." }
    ],
    howToUse: {
      instructions: "Take 1–2 capsules in the morning or early afternoon.",
      combineWith: ["Hydrogen water", "Red light therapy", "Mito Power"]
    },
    ctaButtons: {
      primary: "Add to Cart",
      secondary: "Brain Performance Bundle"
    }
  },
  "artlux-hydrogen-water-bottle": {
    handle: "artlux-hydrogen-water-bottle",
    metaTitle: "ARTLUX∞ Hydrogen Water Bottle – Premium Molecular Hydrogen Generator",
    metaDescription: "Premium hydrogen-rich water generator for optimal cellular hydration, antioxidant support, and longevity. Luxury matte black design with gold ARTLUX branding.",
    heroHeadline: "ARTLUX∞ HYDROGEN WATER BOTTLE — Molecular Hydration Technology",
    heroSubtext: "Hydrogen is the smallest molecule in the universe — and one of the most powerful antioxidants known to science. ARTLUX∞ Hydrogen Water Bottle generates molecular hydrogen (H₂) directly in your water, providing deep cellular hydration and protection against oxidative stress.",
    sections: [
      {
        title: "Why Hydrogen Water Changes Everything",
        content: [
          "Molecular hydrogen (H₂) is a selective antioxidant that targets only harmful free radicals (hydroxyl radicals) without disrupting beneficial reactive oxygen species needed for cell signaling. Unlike other antioxidants, H₂ is small enough to penetrate every cell, tissue, and even cross the blood-brain barrier.",
          "Over 1,500 peer-reviewed studies demonstrate hydrogen's benefits for energy, inflammation, cognitive function, athletic performance, and recovery."
        ],
        listItems: [
          "Neutralizes harmful free radicals selectively",
          "Crosses the blood-brain barrier for neural protection",
          "Reduces inflammation at the cellular level",
          "Supports mitochondrial function and ATP production",
          "Enhances hydration absorption",
          "Promotes faster athletic recovery"
        ]
      },
      {
        title: "Premium ARTLUX∞ Design",
        content: [
          "The ARTLUX∞ Hydrogen Water Bottle combines cutting-edge hydrogen generation technology with luxury design. Featuring a sleek matte black finish with gold ARTLUX∞ branding, this bottle is as beautiful as it is functional."
        ],
        listItems: [
          "SPE/PEM electrolysis technology for pure H₂ generation",
          "Food-grade borosilicate glass chamber",
          "Rechargeable USB-C battery (30+ cycles per charge)",
          "3-minute rapid hydrogen infusion cycle",
          "Portable design for daily use",
          "Premium matte black with gold accents"
        ]
      }
    ],
    ingredients: [
      { name: "Molecular Hydrogen (H₂)", benefit: "The universe's smallest antioxidant molecule for deep cellular penetration." },
      { name: "SPE/PEM Technology", benefit: "Solid Polymer Electrolyte generates pure hydrogen, separating H₂ from oxygen." },
      { name: "Borosilicate Glass", benefit: "Premium food-grade glass chamber ensures purity and taste." }
    ],
    benefits: [
      { icon: "💧", title: "Deep cellular hydration", description: "H₂ molecules penetrate cells 100x faster than water alone." },
      { icon: "🛡", title: "Selective antioxidant", description: "Targets only harmful free radicals, preserving beneficial ones." },
      { icon: "⚡", title: "Enhanced energy", description: "Supports mitochondrial ATP production for natural vitality." },
      { icon: "🧠", title: "Brain protection", description: "Crosses blood-brain barrier for neurological support." },
      { icon: "💪", title: "Faster recovery", description: "Reduces exercise-induced oxidative stress and inflammation." },
      { icon: "✨", title: "Anti-aging support", description: "Combats oxidative damage linked to accelerated aging." }
    ],
    howToUse: {
      instructions: "Fill with filtered water, press the button, and wait 3 minutes for hydrogen infusion. Drink immediately for maximum H₂ concentration. Use 2-3 times daily.",
      combineWith: ["Morning sunlight", "Cold exposure", "NAD+ Booster", "Grounding practice"]
    },
    ctaButtons: {
      primary: "Add to Cart",
      secondary: "Complete the 7-Day Protocol Challenge"
    }
  },
  "artlux8-hydrogen-water-bottle-go": {
    handle: "artlux8-hydrogen-water-bottle-go",
    metaTitle: "ARTLUX∞ Hydrogen Water Bottle Go+ | Premium Hydrogen Water Bottle",
    metaDescription: "Premium hydrogen water bottle and portable hydrogen water generator inspired by modern longevity and hydration protocols discussed by Gary Brecka and Bryan Johnson.",
    metaKeywords: "hydrogen water bottle, hydrogen water, hydrogen rich water bottle, portable hydrogen water generator, longevity hydration, biohacking hydration, premium hydrogen water",
    heroHeadline: "ARTLUX∞ HYDROGEN WATER BOTTLE GO+ — Molecular Hydration Technology",
    heroSubtext: "Hydration. Simplified. Elevated. The ARTLUX∞ Hydrogen Water Bottle Go+ transforms ordinary water into a modern hydration upgrade — with clean design, effortless use, and portable format.",
    sections: [
      {
        title: "Why Hydrogen Water Changes Everything",
        content: [
          "Molecular hydrogen (H₂) is a selective antioxidant that targets only harmful free radicals without disrupting beneficial reactive oxygen species. Unlike other antioxidants, H₂ is small enough to penetrate every cell, tissue, and even cross the blood-brain barrier.",
          "Over 1,500 peer-reviewed studies demonstrate hydrogen's benefits for energy, inflammation, cognitive function, athletic performance, and recovery."
        ],
        listItems: [
          "Neutralizes harmful free radicals selectively",
          "Crosses the blood-brain barrier for neural protection",
          "Reduces inflammation at the cellular level",
          "Supports mitochondrial function and ATP production",
          "Enhances hydration absorption",
          "Promotes faster athletic recovery"
        ]
      },
      {
        title: "Premium ARTLUX∞ Design",
        content: [
          "The ARTLUX∞ Hydrogen Water Bottle Go+ combines cutting-edge hydrogen generation technology with luxury portable design. Available in sleek Black or stunning Gold finish."
        ],
        listItems: [
          "SPE/PEM electrolysis technology for pure H₂ generation",
          "Food-grade borosilicate glass chamber",
          "Rechargeable USB battery (30+ cycles per charge)",
          "3-minute rapid hydrogen infusion cycle",
          "Portable 450ml design for daily use",
          "Premium Black or Gold finish"
        ]
      }
    ],
    ingredients: [
      { name: "Molecular Hydrogen (H₂)", benefit: "The universe's smallest antioxidant molecule for deep cellular penetration." },
      { name: "SPE/PEM Technology", benefit: "Solid Polymer Electrolyte generates pure hydrogen, separating H₂ from oxygen." },
      { name: "Borosilicate Glass", benefit: "Premium food-grade glass chamber ensures purity and taste." }
    ],
    benefits: [
      { icon: "💧", title: "Deep cellular hydration", description: "H₂ molecules penetrate cells 100x faster than water alone." },
      { icon: "🛡", title: "Selective antioxidant", description: "Targets only harmful free radicals, preserving beneficial ones." },
      { icon: "⚡", title: "Enhanced energy", description: "Supports mitochondrial ATP production for natural vitality." },
      { icon: "🧠", title: "Brain protection", description: "Crosses blood-brain barrier for neurological support." },
      { icon: "💪", title: "Faster recovery", description: "Reduces exercise-induced oxidative stress and inflammation." },
      { icon: "✨", title: "Anti-aging support", description: "Combats oxidative damage linked to accelerated aging." }
    ],
    howToUse: {
      instructions: "Fill with filtered water, press the button, and wait 3 minutes for hydrogen infusion. Drink immediately for maximum H₂ concentration. Use 2-3 times daily.",
      combineWith: ["Morning sunlight", "Cold exposure", "NAD+ Booster", "Grounding practice"]
    },
    ctaButtons: {
      primary: "Add to Cart",
      secondary: "Complete the 7-Day Protocol Challenge"
    }
  }
};

export const getEnhancedContent = (handle: string): EnhancedProductContent | null => {
  return enhancedProductContent[handle] || null;
};
