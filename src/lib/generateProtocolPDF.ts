import jsPDF from 'jspdf';

interface ProtocolContent {
  title: string;
  sections: {
    heading?: string;
    content: string[];
  }[];
}

const protocolContents: Record<string, ProtocolContent> = {
  "Daily Autophagy Routine": {
    title: "Daily Autophagy Routine",
    sections: [
      {
        heading: "What is Autophagy?",
        content: [
          "Autophagy is your body's natural cellular cleaning process.",
          "It removes damaged proteins and organelles, recycling them into new cellular components.",
          "This Nobel Prize-winning discovery is key to longevity and disease prevention."
        ]
      },
      {
        heading: "Morning Protocol (6-10 AM)",
        content: [
          "• Wake with sunlight exposure (10-15 min)",
          "• Drink hydrogen water on empty stomach",
          "• Extended fast until noon (16:8 minimum)",
          "• Cold shower finish (30-60 seconds)",
          "• Breathwork: 3 rounds Wim Hof method"
        ]
      },
      {
        heading: "Supplement Stack",
        content: [
          "• Spermidine: 1mg with morning water",
          "• Trehalose: 5g in water",
          "• Berberine: 500mg before first meal",
          "• Resveratrol: 500mg with meal"
        ]
      },
      {
        heading: "Evening Protocol",
        content: [
          "• Last meal 3+ hours before sleep",
          "• Red light therapy: 10-15 minutes",
          "• Grounding: 20 min barefoot outdoors",
          "• Sleep by 10 PM for optimal autophagy"
        ]
      }
    ]
  },
  "Fasting Guide": {
    title: "Complete Fasting Guide",
    sections: [
      {
        heading: "Why Fasting Works",
        content: [
          "Fasting triggers autophagy, reduces inflammation, and resets metabolic health.",
          "It's free, requires no supplements, and is backed by thousands of studies."
        ]
      },
      {
        heading: "Fasting Protocols",
        content: [
          "16:8 (Daily): Eat within 8-hour window",
          "20:4 (Warrior): Eat within 4-hour window",
          "OMAD: One meal a day",
          "36-Hour Fast: Weekly deep autophagy reset",
          "72-Hour Fast: Quarterly stem cell regeneration"
        ]
      },
      {
        heading: "What to Consume During Fast",
        content: [
          "✓ Water (still or sparkling)",
          "✓ Hydrogen water",
          "✓ Black coffee (no additives)",
          "✓ Plain tea",
          "✓ Electrolytes (no sugar)",
          "✗ Avoid: calories, sweeteners, BCAAs"
        ]
      },
      {
        heading: "Breaking Your Fast",
        content: [
          "• Start with bone broth or light soup",
          "• Add easily digestible protein",
          "• Avoid heavy meals immediately",
          "• Include fermented foods for gut health"
        ]
      }
    ]
  },
  "Anti-Inflammation Food List": {
    title: "Anti-Inflammation Food List",
    sections: [
      {
        heading: "Top Anti-Inflammatory Foods",
        content: [
          "• Wild-caught fatty fish (salmon, sardines)",
          "• Extra virgin olive oil (cold-pressed)",
          "• Leafy greens (spinach, kale, arugula)",
          "• Berries (blueberries, blackberries)",
          "• Turmeric & ginger",
          "• Bone broth",
          "• Fermented vegetables"
        ]
      },
      {
        heading: "Foods to AVOID",
        content: [
          "✗ Seed oils (canola, soybean, sunflower)",
          "✗ Refined sugar and HFCS",
          "✗ Processed meats",
          "✗ White bread and refined grains",
          "✗ Alcohol (limit severely)",
          "✗ Artificial sweeteners"
        ]
      },
      {
        heading: "Anti-Inflammatory Spices",
        content: [
          "• Turmeric (with black pepper)",
          "• Ginger",
          "• Cinnamon",
          "• Rosemary",
          "• Oregano",
          "• Cayenne pepper"
        ]
      },
      {
        heading: "Daily Protocol",
        content: [
          "Morning: Lemon water + turmeric shot",
          "Lunch: Large leafy green salad with olive oil",
          "Dinner: Wild fish + roasted vegetables",
          "Snacks: Berries, nuts, dark chocolate (85%+)"
        ]
      }
    ]
  },
  "Supplement Timing Plan": {
    title: "Optimal Supplement Timing Plan",
    sections: [
      {
        heading: "Morning (Empty Stomach)",
        content: [
          "• Hydrogen water",
          "• Spermidine (1mg)",
          "• NAD+ Booster / NMN",
          "• Trehalose (5g)"
        ]
      },
      {
        heading: "With Breakfast/First Meal",
        content: [
          "• Vitamin D3+K2 (with fat)",
          "• Omega-3 Fish Oil",
          "• Resveratrol (with fat)",
          "• Berberine (500mg)"
        ]
      },
      {
        heading: "Afternoon",
        content: [
          "• CoQ10 Ubiquinol",
          "• PQQ",
          "• B-Complex (if needed)"
        ]
      },
      {
        heading: "Evening (With Dinner)",
        content: [
          "• Magnesium Glycinate",
          "• Collagen peptides",
          "• Ashwagandha"
        ]
      },
      {
        heading: "Before Bed",
        content: [
          "• Glycine (3g)",
          "• L-Theanine (200mg)",
          "• Melatonin (0.3-1mg if needed)"
        ]
      }
    ]
  },
  "Cold Plunge Beginner Guide": {
    title: "Cold Plunge Beginner Guide",
    sections: [
      {
        heading: "Benefits of Cold Exposure",
        content: [
          "• 250% increase in dopamine (lasts hours)",
          "• Reduces inflammation systemically",
          "• Boosts metabolism and brown fat",
          "• Improves immune function",
          "• Enhances mental clarity and focus"
        ]
      },
      {
        heading: "Week 1-2: Cold Showers",
        content: [
          "Day 1-3: 15 seconds cold at end of shower",
          "Day 4-7: 30 seconds cold",
          "Day 8-14: 60 seconds cold",
          "Focus on breath control, not shivering"
        ]
      },
      {
        heading: "Week 3-4: Extended Cold",
        content: [
          "• 90-120 seconds cold shower",
          "• Try ice bath or cold plunge (3-5 min)",
          "• Temperature: 50-60°F (10-15°C)",
          "• Breathe slowly and steadily"
        ]
      },
      {
        heading: "Advanced Protocol",
        content: [
          "• 2-5 minutes at 40-50°F (4-10°C)",
          "• Morning is optimal for dopamine",
          "• Do NOT warm up immediately after",
          "• Let body rewarm naturally"
        ]
      },
      {
        heading: "Safety Notes",
        content: [
          "• Never cold plunge alone",
          "• Avoid if you have heart conditions",
          "• Stop if you feel numbness or pain",
          "• Consult doctor if unsure"
        ]
      }
    ]
  },
  "Red Light Quick Start": {
    title: "Red Light Therapy Quick Start",
    sections: [
      {
        heading: "What is Red Light Therapy?",
        content: [
          "Red and near-infrared light (630-850nm) penetrates skin and stimulates mitochondria.",
          "This increases ATP production, reduces inflammation, and accelerates healing."
        ]
      },
      {
        heading: "Optimal Wavelengths",
        content: [
          "• 630-660nm (Red): Skin, collagen, wound healing",
          "• 810-850nm (Near-IR): Deep tissue, joints, brain"
        ]
      },
      {
        heading: "Daily Protocol",
        content: [
          "• Distance: 6-12 inches from device",
          "• Duration: 10-20 minutes per area",
          "• Frequency: Daily or every other day",
          "• Best time: Morning or evening"
        ]
      },
      {
        heading: "Target Areas",
        content: [
          "Face: Anti-aging, acne, collagen",
          "Thyroid: Hormone optimization",
          "Joints: Pain relief, recovery",
          "Muscles: Recovery, performance",
          "Brain: Cognition, mood (forehead)"
        ]
      },
      {
        heading: "Tips for Best Results",
        content: [
          "• Bare skin exposure (no clothes/makeup)",
          "• Be consistent (daily is ideal)",
          "• Combine with grounding",
          "• Track your results over 30 days"
        ]
      }
    ]
  },
  "Hydrogen Water Daily Protocol": {
    title: "Hydrogen Water Daily Protocol",
    sections: [
      {
        heading: "Why Hydrogen Water?",
        content: [
          "Molecular hydrogen (H2) is the smallest antioxidant molecule.",
          "It crosses the blood-brain barrier and enters mitochondria directly.",
          "Benefits: reduced inflammation, improved energy, enhanced autophagy."
        ]
      },
      {
        heading: "Optimal Concentration",
        content: [
          "• Minimum: 1.0 ppm (parts per million)",
          "• Optimal: 1.5-3.0 ppm",
          "• Medical grade: 3.0+ ppm",
          "• ARTLUX bottles: up to 3.0 ppm"
        ]
      },
      {
        heading: "Daily Protocol",
        content: [
          "Morning (fasted): 500ml hydrogen water",
          "Pre-workout: 250ml hydrogen water",
          "Post-workout: 500ml hydrogen water",
          "Total daily: 1-1.5 liters"
        ]
      },
      {
        heading: "Best Practices",
        content: [
          "• Drink immediately after generation",
          "• Use glass or stainless container",
          "• Don't heat hydrogen water",
          "• Generate fresh each time",
          "• Store with minimal headspace"
        ]
      },
      {
        heading: "Synergies",
        content: [
          "• Combine with cold exposure",
          "• Drink before fasting periods",
          "• Use before red light therapy",
          "• Enhances NAD+ supplement effects"
        ]
      }
    ]
  },
  "Longevity Sleep Formula": {
    title: "Longevity Sleep Formula",
    sections: [
      {
        heading: "Why Sleep is Non-Negotiable",
        content: [
          "Sleep is when autophagy peaks, memories consolidate, and hormones reset.",
          "Poor sleep accelerates aging faster than almost any other factor."
        ]
      },
      {
        heading: "Evening Routine (2-3 hours before bed)",
        content: [
          "• Last meal 3+ hours before sleep",
          "• Dim lights and use red/orange bulbs",
          "• No screens 1 hour before bed",
          "• Keep room temperature 65-68°F (18-20°C)"
        ]
      },
      {
        heading: "Sleep Stack",
        content: [
          "• Magnesium Glycinate: 400-600mg",
          "• Glycine: 3g",
          "• L-Theanine: 200mg",
          "• Apigenin: 50mg (optional)",
          "• Melatonin: 0.3-1mg (occasional)"
        ]
      },
      {
        heading: "Sleep Hygiene",
        content: [
          "• Complete darkness (blackout curtains)",
          "• No electronics in bedroom",
          "• Consistent wake time (even weekends)",
          "• Morning sunlight within 30 min of waking"
        ]
      },
      {
        heading: "Recovery Metrics to Track",
        content: [
          "• Deep sleep: Target 1.5-2 hours",
          "• REM sleep: Target 1.5-2 hours",
          "• HRV: Higher is better",
          "• Resting heart rate: Lower is better",
          "• Use Oura, Whoop, or Apple Watch"
        ]
      }
    ]
  },
  "Breathwork Guide": {
    title: "Complete Breathwork Guide",
    sections: [
      {
        heading: "Why Breathwork?",
        content: [
          "Breathwork is the fastest way to shift your nervous system state.",
          "It increases oxygen delivery, reduces stress, and activates autophagy.",
          "Used by Navy SEALs, athletes, and biohackers worldwide."
        ]
      },
      {
        heading: "Wim Hof Method (3 Rounds)",
        content: [
          "1. Take 30-40 deep breaths (in through nose, out through mouth)",
          "2. Exhale fully and hold for 1-2 minutes",
          "3. Inhale deeply and hold for 15 seconds",
          "4. Repeat 3 rounds total",
          "",
          "Benefits: Increased oxygen, reduced inflammation, enhanced focus"
        ]
      },
      {
        heading: "Gary Brecka 30-30-30",
        content: [
          "• 30 deep breaths",
          "• 30 second breath hold",
          "• 30 seconds recovery",
          "• Repeat 3-5 rounds",
          "",
          "Best done first thing in the morning on empty stomach"
        ]
      },
      {
        heading: "Box Breathing (4-4-4-4)",
        content: [
          "• Inhale for 4 seconds",
          "• Hold for 4 seconds",
          "• Exhale for 4 seconds",
          "• Hold for 4 seconds",
          "",
          "Use for stress reduction and focus throughout the day"
        ]
      },
      {
        heading: "Physiological Sigh (Quick Reset)",
        content: [
          "• Double inhale through nose (fill lungs completely)",
          "• Long slow exhale through mouth",
          "• Repeat 1-3 times",
          "",
          "Fastest way to calm nervous system in seconds"
        ]
      },
      {
        heading: "Daily Protocol",
        content: [
          "Morning: Wim Hof or Brecka method (5-10 min)",
          "Midday: Box breathing if stressed (2-3 min)",
          "Pre-workout: 30 power breaths",
          "Evening: Slow breathing 4-7-8 for sleep",
          "Anytime: Physiological sigh for instant calm"
        ]
      }
    ]
  },
  "Grounding Protocol": {
    title: "Grounding (Earthing) Protocol",
    sections: [
      {
        heading: "What is Grounding?",
        content: [
          "Grounding connects your body to Earth's natural electric charge.",
          "Free electrons from the Earth neutralize free radicals.",
          "This reduces inflammation, improves sleep, and resets cortisol."
        ]
      },
      {
        heading: "The Science",
        content: [
          "• Earth has a negative electrical charge",
          "• Modern life insulates us from this charge",
          "• Chronic inflammation is linked to electron deficiency",
          "• Grounding restores electrical balance",
          "• Studies show reduced blood viscosity and pain"
        ]
      },
      {
        heading: "Outdoor Grounding (Best)",
        content: [
          "• Walk barefoot on grass, sand, or soil",
          "• Minimum 20 minutes daily",
          "• Morning sunlight + grounding = optimal",
          "• Wet surfaces conduct better",
          "• Avoid concrete and asphalt (insulating)"
        ]
      },
      {
        heading: "Indoor Grounding",
        content: [
          "• Use grounding mat under desk or bed",
          "• Grounding sheets for sleep",
          "• Connect to grounded outlet",
          "• Especially useful in winter/urban areas"
        ]
      },
      {
        heading: "Daily Protocol",
        content: [
          "Morning: 10-20 min barefoot with sunrise",
          "Afternoon: 10 min grass break if possible",
          "Evening: 20 min before sunset (stress reset)",
          "Night: Sleep on grounding sheet",
          "",
          "Combine with: hydrogen water, breathwork, red light"
        ]
      },
      {
        heading: "Benefits Timeline",
        content: [
          "Immediate: Reduced stress, calm feeling",
          "1 Week: Better sleep, less pain",
          "1 Month: Improved energy, reduced inflammation",
          "3 Months: Measurable health improvements"
        ]
      }
    ]
  },
  "Morning Sunlight Routine": {
    title: "Morning Sunlight Routine",
    sections: [
      {
        heading: "Why Morning Light Matters",
        content: [
          "Morning sunlight sets your circadian rhythm for the entire day.",
          "It triggers cortisol awakening response (natural energy).",
          "Improves sleep quality 12-16 hours later.",
          "Acts as a natural antidepressant without side effects."
        ]
      },
      {
        heading: "The Science",
        content: [
          "• Blue light receptors in eyes signal brain it's daytime",
          "• Cortisol rises naturally (healthy stress hormone)",
          "• Dopamine and serotonin production increases",
          "• Melatonin production is suppressed until evening",
          "• This sets your internal clock for 24-hour cycle"
        ]
      },
      {
        heading: "Optimal Protocol",
        content: [
          "• Get outside within 30 minutes of waking",
          "• Duration: 10-15 min (clear day) to 30 min (cloudy)",
          "• No sunglasses (eyes need the light)",
          "• Face toward sun (don't stare directly)",
          "• Works even on overcast days"
        ]
      },
      {
        heading: "What NOT to Do",
        content: [
          "✗ Look at phone/screens first thing",
          "✗ Stay indoors behind windows (glass blocks UV)",
          "✗ Wear sunglasses during morning protocol",
          "✗ Use bright indoor lights as substitute",
          "✗ Skip on cloudy days"
        ]
      },
      {
        heading: "Stack with Other Protocols",
        content: [
          "• Grounding: barefoot on grass while getting light",
          "• Breathwork: Wim Hof while facing sun",
          "• Hydrogen water: drink during outdoor time",
          "• Cold exposure: follow with cold shower"
        ]
      },
      {
        heading: "Seasonal Adjustments",
        content: [
          "Summer: Earlier wake time, shorter duration needed",
          "Winter: Use light therapy lamp if sunrise too late",
          "Travel: Reset jet lag with local sunrise",
          "Shift work: Light therapy at 'morning' of your schedule"
        ]
      }
    ]
  },
  "Detox Protocol": {
    title: "Complete Cellular Detox Protocol",
    sections: [
      {
        heading: "Real Detox vs. Fake Detox",
        content: [
          "Most 'detox' products are marketing nonsense.",
          "Real detox happens at the cellular and mitochondrial level.",
          "Your liver, kidneys, and lymph do the heavy lifting.",
          "Support these systems with the right inputs."
        ]
      },
      {
        heading: "Phase 1: Reduce Toxin Exposure",
        content: [
          "• Filter tap water (remove chlorine, fluoride, heavy metals)",
          "• Eat organic when possible (avoid pesticides)",
          "• Eliminate seed oils (use olive, avocado, coconut)",
          "• Avoid plastic containers (use glass/stainless)",
          "• Air purifier for indoor spaces"
        ]
      },
      {
        heading: "Phase 2: Support Liver Detox",
        content: [
          "• NAC (N-Acetyl Cysteine): 600-1200mg daily",
          "• Glutathione: liposomal 500mg or IV",
          "• Milk thistle: 200-400mg",
          "• Cruciferous vegetables daily",
          "• Lemon water in morning"
        ]
      },
      {
        heading: "Phase 3: Lymphatic Drainage",
        content: [
          "• Dry brushing before shower",
          "• Rebounding (mini trampoline) 10 min",
          "• Deep breathing exercises",
          "• Sauna or hot/cold contrast",
          "• Manual lymphatic massage"
        ]
      },
      {
        heading: "Phase 4: Heavy Metal Chelation",
        content: [
          "• Chlorella: binds heavy metals",
          "• Cilantro: mobilizes mercury",
          "• Zeolite: binds toxins for excretion",
          "• EDTA (consult practitioner)",
          "• Note: Go slow to avoid redistribution"
        ]
      },
      {
        heading: "Daily Detox Stack",
        content: [
          "Morning: Lemon water + NAC",
          "With meals: Chlorella + digestive enzymes",
          "Evening: Glutathione + magnesium",
          "Weekly: 24-36 hour fast for autophagy",
          "Monthly: Extended sauna session"
        ]
      }
    ]
  },
  "Mitochondria Optimization": {
    title: "Mitochondria Optimization Protocol",
    sections: [
      {
        heading: "Why Mitochondria Matter",
        content: [
          "Mitochondria are the powerhouses of your cells.",
          "They produce 90% of your body's energy (ATP).",
          "Mitochondrial decline is the #1 cause of aging.",
          "Optimizing them = more energy, slower aging, sharper mind."
        ]
      },
      {
        heading: "Core Supplements",
        content: [
          "• CoQ10 Ubiquinol: 100-200mg (not ubiquinone)",
          "• PQQ: 10-20mg (creates new mitochondria)",
          "• Urolithin A: 500-1000mg (triggers mitophagy)",
          "• ALCAR: 500-1000mg (transports fat to mitochondria)",
          "• Alpha Lipoic Acid: 300-600mg"
        ]
      },
      {
        heading: "Lifestyle Factors",
        content: [
          "• Cold exposure: Stimulates mitochondrial biogenesis",
          "• Exercise: HIIT and resistance training",
          "• Fasting: Triggers autophagy and renewal",
          "• Sleep: Repair and regeneration happens here",
          "• Sunlight: Red/infrared stimulates cytochrome c"
        ]
      },
      {
        heading: "Things That DAMAGE Mitochondria",
        content: [
          "✗ Chronic stress (cortisol overload)",
          "✗ Poor sleep (blocks repair)",
          "✗ Seed oils (oxidative damage)",
          "✗ Excess sugar (glycation)",
          "✗ Environmental toxins",
          "✗ Sedentary lifestyle"
        ]
      },
      {
        heading: "Red Light Therapy for Mitochondria",
        content: [
          "• 630-670nm (red) and 810-850nm (near-infrared)",
          "• Directly stimulates cytochrome c oxidase",
          "• Increases ATP production by 40-50%",
          "• Use 10-20 minutes daily",
          "• Focus on thyroid, face, large muscle groups"
        ]
      },
      {
        heading: "Weekly Protocol",
        content: [
          "Daily: CoQ10 + PQQ + red light therapy",
          "3x/week: Cold exposure (2-5 min)",
          "3x/week: HIIT or resistance training",
          "Weekly: 24-hour fast",
          "Monthly: 48-72 hour fast for deep renewal"
        ]
      }
    ]
  }
};

export const generateProtocolPDF = (protocolName: string): void => {
  const content = protocolContents[protocolName];
  if (!content) {
    console.error(`Protocol "${protocolName}" not found`);
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let yPosition = 20;

  // Header with gold color simulation (dark yellow)
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(content.title, pageWidth / 2, 25, { align: 'center' });

  // ARTLUX branding
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('ARTLUX∞ — THE LUXURY LONGEVITY', pageWidth / 2, 35, { align: 'center' });

  yPosition = 55;

  // Content sections
  content.sections.forEach((section) => {
    // Check if we need a new page
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    // Section heading
    if (section.heading) {
      doc.setTextColor(180, 140, 40);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(section.heading, margin, yPosition);
      yPosition += 10;
    }

    // Section content
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    section.content.forEach((line) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      const splitText = doc.splitTextToSize(line, maxWidth);
      splitText.forEach((textLine: string) => {
        doc.text(textLine, margin, yPosition);
        yPosition += 6;
      });
      yPosition += 2;
    });

    yPosition += 8;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'artlux8.com | Free Longevity Protocol',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Download
  const fileName = protocolName.toLowerCase().replace(/\s+/g, '-') + '.pdf';
  doc.save(fileName);
};

export const getAvailableProtocols = (): string[] => {
  return Object.keys(protocolContents);
};
