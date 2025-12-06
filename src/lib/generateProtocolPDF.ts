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
