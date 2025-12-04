import { Heart, Brain, Moon, Zap, Leaf, Shield } from 'lucide-react';

export interface Ingredient {
  name: string;
  amount: string;
  description: string;
}

export interface ClinicalStudy {
  title: string;
  journal: string;
  year: number;
  finding: string;
  link?: string;
}

export interface DosageInfo {
  recommended: string;
  timing: string;
  withFood: boolean;
  notes: string[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  benefits: string[];
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  servingSize: string;
  servingsPerContainer: number;
  ingredients: Ingredient[];
  clinicalStudies: ClinicalStudy[];
  dosage: DosageInfo;
  warnings: string[];
}

export const categories = [
  { id: 'all', name: 'All Products', icon: Shield },
  { id: 'foundational', name: 'Foundational Health', icon: Heart },
  { id: 'cognitive', name: 'Cognitive Enhancement', icon: Brain },
  { id: 'sleep', name: 'Sleep & Recovery', icon: Moon },
  { id: 'energy', name: 'Energy & Metabolism', icon: Zap },
  { id: 'longevity', name: 'Longevity & Anti-Aging', icon: Leaf },
];

export const products: Product[] = [
  // Foundational Health
  {
    id: 1,
    name: 'Essential Multi+',
    description: 'Complete daily multivitamin with methylated B vitamins and chelated minerals for optimal absorption.',
    longDescription: 'Our flagship multivitamin is designed for optimal bioavailability. Featuring methylated B vitamins for those with MTHFR mutations, chelated minerals for superior absorption, and a comprehensive blend of antioxidants to support overall health and vitality.',
    price: 59.00,
    category: 'foundational',
    benefits: ['Immune Support', 'Energy', 'Vitality'],
    rating: 4.9,
    reviews: 2340,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
    servingSize: '3 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Vitamin A (as Beta-Carotene)', amount: '5000 IU', description: 'Supports vision and immune function' },
      { name: 'Vitamin C (as Ascorbic Acid)', amount: '500 mg', description: 'Powerful antioxidant for immune support' },
      { name: 'Vitamin D3 (Cholecalciferol)', amount: '2000 IU', description: 'Essential for bone health and immunity' },
      { name: 'Vitamin E (as d-Alpha Tocopherol)', amount: '100 IU', description: 'Protects cells from oxidative damage' },
      { name: 'Vitamin B12 (as Methylcobalamin)', amount: '1000 mcg', description: 'Methylated form for optimal absorption' },
      { name: 'Folate (as L-Methylfolate)', amount: '800 mcg', description: 'Active form, bypasses MTHFR issues' },
      { name: 'Zinc (as Zinc Bisglycinate)', amount: '25 mg', description: 'Chelated form for immune support' },
      { name: 'Selenium (as Selenomethionine)', amount: '200 mcg', description: 'Supports thyroid function' },
    ],
    clinicalStudies: [
      { title: 'Multivitamin Use and Mortality Risk', journal: 'JAMA Internal Medicine', year: 2022, finding: 'Daily multivitamin use associated with 14% reduced all-cause mortality in adults over 60.' },
      { title: 'Methylated B Vitamins and Cognitive Function', journal: 'Nutrients', year: 2021, finding: 'Methylated B vitamins showed superior bioavailability and cognitive benefits compared to synthetic forms.' },
      { title: 'Chelated Minerals Absorption Study', journal: 'Journal of Nutritional Science', year: 2020, finding: 'Chelated minerals demonstrated 40% higher absorption rates than oxide forms.' },
    ],
    dosage: {
      recommended: '3 capsules daily',
      timing: 'Take with breakfast',
      withFood: true,
      notes: ['Split dose if preferred (2 AM, 1 PM)', 'Take consistently for best results', 'May cause mild stomach upset if taken without food'],
    },
    warnings: ['Consult physician if pregnant or nursing', 'Keep out of reach of children', 'Store in a cool, dry place'],
  },
  {
    id: 2,
    name: 'Omega-3 Ultra',
    description: 'Triglyceride-form fish oil with 3000mg EPA/DHA per serving. Molecularly distilled for purity.',
    longDescription: 'Premium omega-3 fatty acids in the natural triglyceride form for 70% better absorption than ethyl ester alternatives. Sourced from wild-caught, sustainable fisheries and molecularly distilled to remove heavy metals and PCBs.',
    price: 49.00,
    category: 'foundational',
    benefits: ['Heart Health', 'Brain Function', 'Inflammation'],
    rating: 4.8,
    reviews: 1856,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800&h=800&fit=crop',
    servingSize: '2 softgels',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'EPA (Eicosapentaenoic Acid)', amount: '1800 mg', description: 'Reduces inflammation and supports cardiovascular health' },
      { name: 'DHA (Docosahexaenoic Acid)', amount: '1200 mg', description: 'Essential for brain structure and cognitive function' },
      { name: 'Total Omega-3 Fatty Acids', amount: '3000 mg', description: 'High-potency formula' },
    ],
    clinicalStudies: [
      { title: 'Omega-3 and Cardiovascular Outcomes', journal: 'New England Journal of Medicine', year: 2019, finding: 'High-dose EPA reduced cardiovascular events by 25% in high-risk patients.' },
      { title: 'DHA and Brain Health', journal: 'Nature Reviews Neuroscience', year: 2021, finding: 'DHA supplementation supports neuroplasticity and may reduce cognitive decline.' },
      { title: 'Triglyceride vs Ethyl Ester Absorption', journal: 'Prostaglandins, Leukotrienes and Essential Fatty Acids', year: 2020, finding: 'Triglyceride form showed 70% higher bioavailability.' },
    ],
    dosage: {
      recommended: '2 softgels daily',
      timing: 'Take with meals',
      withFood: true,
      notes: ['Fat in meals enhances absorption', 'Can split between breakfast and dinner', 'Refrigerate after opening for freshness'],
    },
    warnings: ['May increase bleeding risk if on blood thinners', 'Consult physician before surgery', 'Discontinue if fishy aftertaste persists'],
  },
  {
    id: 3,
    name: 'Vitamin D3 + K2',
    description: '5000 IU D3 with MK-7 K2 for calcium optimization and immune function.',
    longDescription: 'The synergistic combination of vitamin D3 and K2 ensures calcium is directed to bones rather than arteries. Our MK-7 form of K2 has a longer half-life for sustained activity, while D3 supports immune function, mood, and over 1000 gene expressions.',
    price: 34.00,
    category: 'foundational',
    benefits: ['Bone Health', 'Immune Support', 'Mood'],
    rating: 4.9,
    reviews: 3120,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=800&fit=crop',
    servingSize: '1 softgel',
    servingsPerContainer: 90,
    ingredients: [
      { name: 'Vitamin D3 (Cholecalciferol)', amount: '5000 IU', description: 'Optimal dose for most adults' },
      { name: 'Vitamin K2 (as MK-7)', amount: '200 mcg', description: 'Long-acting form directs calcium to bones' },
      { name: 'MCT Oil', amount: '500 mg', description: 'Enhances fat-soluble vitamin absorption' },
    ],
    clinicalStudies: [
      { title: 'Vitamin D and Immune Function', journal: 'BMJ', year: 2017, finding: 'Daily vitamin D supplementation reduced acute respiratory infections by 42%.' },
      { title: 'K2 and Arterial Calcification', journal: 'Thrombosis and Haemostasis', year: 2015, finding: 'MK-7 supplementation reduced arterial stiffness by 50% over 3 years.' },
      { title: 'D3+K2 Synergy for Bone Density', journal: 'Osteoporosis International', year: 2019, finding: 'Combined D3+K2 showed superior bone mineral density improvements vs D3 alone.' },
    ],
    dosage: {
      recommended: '1 softgel daily',
      timing: 'Take with a fat-containing meal',
      withFood: true,
      notes: ['Test vitamin D levels after 3 months', 'Higher doses may be needed in winter', 'Optimal blood level: 40-60 ng/mL'],
    },
    warnings: ['Those on blood thinners should consult physician', 'Monitor vitamin D levels regularly', 'Do not exceed recommended dose'],
  },
  // Cognitive Enhancement
  {
    id: 4,
    name: 'NeuroFocus Pro',
    description: 'Advanced nootropic stack with Lion\'s Mane, Bacopa, and Alpha-GPC for mental clarity.',
    longDescription: 'A scientifically formulated cognitive enhancement stack combining the neurogenesis benefits of Lion\'s Mane, the memory-enhancing properties of Bacopa, and the acetylcholine support of Alpha-GPC. Designed for sustained mental performance without stimulants.',
    price: 79.00,
    category: 'cognitive',
    benefits: ['Focus', 'Memory', 'Mental Clarity'],
    rating: 4.7,
    reviews: 1245,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=800&fit=crop',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Lion\'s Mane Extract (10:1)', amount: '500 mg', description: 'Promotes NGF production for neurogenesis' },
      { name: 'Bacopa Monnieri (50% Bacosides)', amount: '300 mg', description: 'Enhances memory and reduces anxiety' },
      { name: 'Alpha-GPC (50%)', amount: '300 mg', description: 'Precursor to acetylcholine for focus' },
      { name: 'Phosphatidylserine', amount: '100 mg', description: 'Supports cell membrane integrity' },
      { name: 'L-Theanine', amount: '200 mg', description: 'Promotes calm focus' },
      { name: 'Rhodiola Rosea (3% Rosavins)', amount: '150 mg', description: 'Adaptogen for stress resilience' },
    ],
    clinicalStudies: [
      { title: 'Lion\'s Mane and Cognitive Function', journal: 'Journal of Medicinal Food', year: 2019, finding: 'Significant improvement in cognitive function scores after 16 weeks of supplementation.' },
      { title: 'Bacopa and Memory Enhancement', journal: 'Psychopharmacology', year: 2014, finding: 'Bacopa improved attention, cognitive processing, and working memory.' },
      { title: 'Alpha-GPC and Mental Performance', journal: 'Clinical Therapeutics', year: 2003, finding: 'Alpha-GPC improved cognitive symptoms in dementia patients.' },
    ],
    dosage: {
      recommended: '2 capsules daily',
      timing: 'Take in the morning',
      withFood: true,
      notes: ['Effects build over 4-8 weeks', 'Can take second dose midday if needed', 'Avoid late afternoon dosing'],
    },
    warnings: ['May interact with cholinergic medications', 'Start with 1 capsule to assess tolerance', 'Not recommended during pregnancy'],
  },
  {
    id: 5,
    name: 'Lion\'s Mane Extract',
    description: 'Organic dual-extract Lion\'s Mane mushroom for nerve growth factor support.',
    longDescription: 'Our premium Lion\'s Mane features a dual extraction process capturing both water-soluble beta-glucans and alcohol-soluble hericenones/erinacines. These compounds stimulate Nerve Growth Factor (NGF) production, supporting neuroplasticity and cognitive function.',
    price: 44.00,
    category: 'cognitive',
    benefits: ['Neurogenesis', 'Memory', 'Mood'],
    rating: 4.8,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&h=800&fit=crop',
    servingSize: '2 capsules',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'Organic Lion\'s Mane Fruiting Body', amount: '1000 mg', description: 'Dual extracted (water + alcohol)' },
      { name: 'Beta-Glucans', amount: '> 30%', description: 'Immune-modulating polysaccharides' },
      { name: 'Hericenones', amount: 'Standardized', description: 'Stimulates NGF synthesis' },
      { name: 'Erinacines', amount: 'Standardized', description: 'Crosses blood-brain barrier for NGF' },
    ],
    clinicalStudies: [
      { title: 'Lion\'s Mane and Nerve Growth Factor', journal: 'International Journal of Medicinal Mushrooms', year: 2020, finding: 'Demonstrated significant NGF-inducing activity in human neuronal cells.' },
      { title: 'Cognitive Benefits in Older Adults', journal: 'Phytotherapy Research', year: 2009, finding: '16 weeks of Lion\'s Mane improved cognitive function in 50-80 year olds.' },
      { title: 'Neuroprotective Effects', journal: 'Journal of Agricultural and Food Chemistry', year: 2015, finding: 'Protected against amyloid beta-induced neurotoxicity in vitro.' },
    ],
    dosage: {
      recommended: '2 capsules daily',
      timing: 'Take in the morning with or without food',
      withFood: false,
      notes: ['Can be taken with coffee', 'Benefits accumulate over 4-12 weeks', 'Safe for long-term use'],
    },
    warnings: ['Those with mushroom allergies should avoid', 'May enhance effects of blood thinners', 'Discontinue before surgery'],
  },
  {
    id: 6,
    name: 'Phosphatidylserine',
    description: 'Sunflower-derived PS for cognitive function and cortisol management.',
    longDescription: 'Phosphatidylserine is a phospholipid essential for healthy cell membranes, particularly in the brain. Our sunflower-derived formula is soy-free and supports memory, focus, and helps blunt the cortisol response to stress.',
    price: 39.00,
    category: 'cognitive',
    benefits: ['Memory', 'Stress Response', 'Focus'],
    rating: 4.6,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
    servingSize: '1 softgel',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'Phosphatidylserine (Sunflower-Derived)', amount: '100 mg', description: 'Sharp-PS® branded ingredient' },
      { name: 'Phosphatidic Acid', amount: '20 mg', description: 'Supports cell signaling' },
    ],
    clinicalStudies: [
      { title: 'PS and Age-Related Cognitive Decline', journal: 'Neurology', year: 2001, finding: 'PS supplementation improved memory and learning in subjects with age-related cognitive decline.' },
      { title: 'Cortisol Blunting Effects', journal: 'Sports Medicine', year: 2008, finding: 'PS attenuated cortisol response to exercise stress by 30%.' },
      { title: 'PS and ADHD Symptoms', journal: 'Human Psychopharmacology', year: 2014, finding: 'PS improved attention and reduced impulsivity in children with ADHD.' },
    ],
    dosage: {
      recommended: '100-300 mg daily',
      timing: 'Take with meals, divided doses',
      withFood: true,
      notes: ['Start with 100mg and increase as needed', 'Best taken earlier in the day', 'Stack well with omega-3s'],
    },
    warnings: ['May interact with blood thinners', 'High doses may cause insomnia', 'Not for use during pregnancy'],
  },
  // Sleep & Recovery
  {
    id: 7,
    name: 'Deep Sleep Formula',
    description: 'Magnesium glycinate, L-theanine, and Apigenin for restorative sleep.',
    longDescription: 'A carefully calibrated sleep formula combining the relaxation benefits of magnesium glycinate, the calming effects of L-theanine, and the sleep-promoting properties of apigenin from chamomile. Wake refreshed without grogginess.',
    price: 54.00,
    category: 'sleep',
    benefits: ['Sleep Quality', 'Recovery', 'Relaxation'],
    rating: 4.9,
    reviews: 2890,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
    servingSize: '3 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Magnesium Glycinate', amount: '400 mg', description: 'Highly absorbable, promotes muscle relaxation' },
      { name: 'L-Theanine', amount: '200 mg', description: 'Promotes alpha brain waves and calm' },
      { name: 'Apigenin', amount: '50 mg', description: 'Natural compound from chamomile for sleep' },
      { name: 'L-Glycine', amount: '3000 mg', description: 'Lowers core body temperature for sleep onset' },
      { name: 'Tart Cherry Extract', amount: '500 mg', description: 'Natural melatonin source' },
    ],
    clinicalStudies: [
      { title: 'Magnesium and Sleep Quality', journal: 'Journal of Research in Medical Sciences', year: 2012, finding: 'Magnesium supplementation improved sleep efficiency and reduced insomnia severity.' },
      { title: 'Glycine and Sleep Architecture', journal: 'Sleep and Biological Rhythms', year: 2007, finding: 'Glycine improved subjective sleep quality and reduced fatigue.' },
      { title: 'L-Theanine for Sleep', journal: 'Nutrients', year: 2019, finding: 'L-theanine reduced sleep latency and improved sleep quality.' },
    ],
    dosage: {
      recommended: '3 capsules',
      timing: '30-60 minutes before bed',
      withFood: false,
      notes: ['Can reduce dose to 2 capsules if sensitive', 'Avoid screens after taking', 'Keep bedroom cool and dark'],
    },
    warnings: ['May cause drowsiness', 'Do not drive after taking', 'Consult physician if on sleep medications'],
  },
  {
    id: 8,
    name: 'Magnesium Complex',
    description: 'Tri-magnesium blend (glycinate, threonate, taurate) for complete coverage.',
    longDescription: 'Three forms of highly bioavailable magnesium for comprehensive benefits: glycinate for relaxation and sleep, threonate for cognitive function (crosses blood-brain barrier), and taurate for cardiovascular support.',
    price: 38.00,
    category: 'sleep',
    benefits: ['Muscle Relaxation', 'Sleep', 'Stress'],
    rating: 4.8,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800&h=800&fit=crop',
    servingSize: '3 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Magnesium Glycinate', amount: '200 mg', description: 'Calming, well-absorbed' },
      { name: 'Magnesium L-Threonate (Magtein®)', amount: '144 mg', description: 'Crosses BBB for brain magnesium' },
      { name: 'Magnesium Taurate', amount: '100 mg', description: 'Supports cardiovascular function' },
    ],
    clinicalStudies: [
      { title: 'Magnesium Threonate and Cognition', journal: 'Neuron', year: 2010, finding: 'MgT enhanced learning abilities and memory in aged rats by increasing brain magnesium.' },
      { title: 'Magnesium Deficiency Prevalence', journal: 'Open Heart', year: 2018, finding: 'Up to 50% of Americans are magnesium deficient, contributing to chronic disease.' },
      { title: 'Magnesium Taurate and Blood Pressure', journal: 'Magnesium Research', year: 2016, finding: 'Magnesium taurate reduced blood pressure in hypertensive patients.' },
    ],
    dosage: {
      recommended: '3 capsules daily',
      timing: 'Take in the evening with dinner',
      withFood: true,
      notes: ['Can split 1 AM / 2 PM', 'May cause loose stools initially', 'Effects build over 2-4 weeks'],
    },
    warnings: ['Reduce dose if digestive upset occurs', 'Those with kidney disease should consult physician', 'May interact with certain antibiotics'],
  },
  {
    id: 9,
    name: 'Recovery Matrix',
    description: 'Post-workout recovery with tart cherry, bromelain, and curcumin.',
    longDescription: 'Accelerate recovery and reduce exercise-induced inflammation with this powerful combination of tart cherry (natural melatonin and anthocyanins), bromelain (proteolytic enzyme), and highly absorbable curcumin phytosome.',
    price: 49.00,
    category: 'sleep',
    benefits: ['Muscle Recovery', 'Inflammation', 'Performance'],
    rating: 4.7,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=800&fit=crop',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Tart Cherry Extract (50:1)', amount: '500 mg', description: 'Anthocyanins for inflammation' },
      { name: 'Curcumin Phytosome (Meriva®)', amount: '500 mg', description: '29x more absorbable than standard' },
      { name: 'Bromelain (2400 GDU)', amount: '500 mg', description: 'Proteolytic enzyme for tissue repair' },
      { name: 'Ginger Extract', amount: '200 mg', description: 'Synergistic anti-inflammatory' },
    ],
    clinicalStudies: [
      { title: 'Tart Cherry and Exercise Recovery', journal: 'Scandinavian Journal of Medicine & Science in Sports', year: 2010, finding: 'Tart cherry juice accelerated strength recovery after intense exercise.' },
      { title: 'Curcumin and DOMS', journal: 'European Journal of Applied Physiology', year: 2015, finding: 'Curcumin reduced markers of muscle damage and improved recovery.' },
      { title: 'Bromelain for Sports Injuries', journal: 'Clinical and Experimental Pharmacology and Physiology', year: 2002, finding: 'Bromelain reduced swelling and improved tissue healing.' },
    ],
    dosage: {
      recommended: '2 capsules daily',
      timing: 'Take post-workout or before bed',
      withFood: true,
      notes: ['Can increase to 4 capsules after intense training', 'Take consistently for cumulative benefits', 'Works synergistically with sleep'],
    },
    warnings: ['May increase bleeding risk', 'Discontinue before surgery', 'Those with pineapple allergy should avoid'],
  },
  // Energy & Metabolism
  {
    id: 10,
    name: 'Metabolic Fire',
    description: 'Thermogenic support with green tea extract, berberine, and chromium.',
    longDescription: 'Support healthy metabolism and blood sugar levels with this evidence-based formula. Berberine activates AMPK (the metabolic master switch), green tea provides thermogenic catechins, and chromium enhances insulin sensitivity.',
    price: 64.00,
    category: 'energy',
    benefits: ['Metabolism', 'Energy', 'Blood Sugar'],
    rating: 4.6,
    reviews: 1123,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=800&fit=crop',
    servingSize: '2 capsules',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'Berberine HCl', amount: '500 mg', description: 'Activates AMPK for metabolic health' },
      { name: 'Green Tea Extract (50% EGCG)', amount: '500 mg', description: 'Thermogenic catechins' },
      { name: 'Chromium Picolinate', amount: '200 mcg', description: 'Supports insulin sensitivity' },
      { name: 'Alpha Lipoic Acid', amount: '300 mg', description: 'Universal antioxidant, glucose uptake' },
      { name: 'Cayenne Extract', amount: '100 mg', description: 'Thermogenic capsaicins' },
    ],
    clinicalStudies: [
      { title: 'Berberine vs Metformin', journal: 'Metabolism', year: 2008, finding: 'Berberine showed similar efficacy to metformin in regulating glucose metabolism.' },
      { title: 'Green Tea and Thermogenesis', journal: 'American Journal of Clinical Nutrition', year: 1999, finding: 'Green tea extract increased 24-hour energy expenditure by 4%.' },
      { title: 'Chromium and Insulin Sensitivity', journal: 'Diabetes Technology & Therapeutics', year: 2006, finding: 'Chromium improved insulin sensitivity and glycemic control.' },
    ],
    dosage: {
      recommended: '2 capsules daily',
      timing: 'Take with meals, 1 with breakfast, 1 with lunch',
      withFood: true,
      notes: ['Avoid taking close to bedtime', 'Stay hydrated', 'Best combined with regular exercise'],
    },
    warnings: ['May lower blood sugar - diabetics monitor closely', 'Contains caffeine', 'Not for pregnant or nursing women'],
  },
  {
    id: 11,
    name: 'CoQ10 Ubiquinol',
    description: 'Active form CoQ10 for cellular energy production and heart health.',
    longDescription: 'Ubiquinol is the reduced, active form of CoQ10 that your body can use immediately. Essential for mitochondrial energy production, heart health, and cellular protection. Especially important for those over 40 or taking statins.',
    price: 54.00,
    category: 'energy',
    benefits: ['Cellular Energy', 'Heart Health', 'Anti-Aging'],
    rating: 4.8,
    reviews: 1456,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&h=800&fit=crop',
    servingSize: '1 softgel',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'Ubiquinol (Kaneka QH®)', amount: '200 mg', description: 'Patented active form of CoQ10' },
      { name: 'MCT Oil', amount: '400 mg', description: 'Enhances absorption' },
    ],
    clinicalStudies: [
      { title: 'Ubiquinol vs Ubiquinone Bioavailability', journal: 'Regulatory Toxicology and Pharmacology', year: 2007, finding: 'Ubiquinol showed 8x greater bioavailability than ubiquinone in older adults.' },
      { title: 'CoQ10 and Heart Failure', journal: 'JACC: Heart Failure', year: 2014, finding: 'Q-SYMBIO trial showed 43% reduction in cardiovascular mortality with CoQ10.' },
      { title: 'Statins and CoQ10 Depletion', journal: 'American Journal of Cardiology', year: 2007, finding: 'Statin therapy significantly depletes CoQ10; supplementation restores levels.' },
    ],
    dosage: {
      recommended: '1 softgel daily',
      timing: 'Take with a fat-containing meal',
      withFood: true,
      notes: ['Those on statins may need 200-300mg', 'Effects may take 4-8 weeks to notice', 'Split dose for higher amounts'],
    },
    warnings: ['May interact with blood thinners', 'Consult physician if on heart medications', 'May lower blood pressure'],
  },
  {
    id: 12,
    name: 'B-Complex Active',
    description: 'Methylated B vitamins for energy metabolism and nervous system support.',
    longDescription: 'A complete B-complex featuring methylated, coenzymated forms for optimal utilization. Supports energy production, neurotransmitter synthesis, and is essential for those with MTHFR polymorphisms who cannot efficiently process synthetic B vitamins.',
    price: 29.00,
    category: 'energy',
    benefits: ['Energy', 'Mood', 'Nervous System'],
    rating: 4.7,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
    servingSize: '1 capsule',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'Vitamin B1 (Thiamine HCl)', amount: '100 mg', description: 'Energy metabolism' },
      { name: 'Vitamin B2 (Riboflavin-5-Phosphate)', amount: '25 mg', description: 'Active coenzyme form' },
      { name: 'Vitamin B3 (Niacinamide)', amount: '50 mg', description: 'Flush-free form' },
      { name: 'Vitamin B5 (Pantothenic Acid)', amount: '100 mg', description: 'Adrenal support' },
      { name: 'Vitamin B6 (P-5-P)', amount: '25 mg', description: 'Active pyridoxal form' },
      { name: 'Vitamin B12 (Methylcobalamin)', amount: '1000 mcg', description: 'Methylated, neurologically active' },
      { name: 'Folate (L-Methylfolate)', amount: '800 mcg', description: 'Active form, bypasses MTHFR' },
      { name: 'Biotin', amount: '300 mcg', description: 'Hair, skin, nails' },
    ],
    clinicalStudies: [
      { title: 'B Vitamins and Energy', journal: 'Nutrients', year: 2020, finding: 'B vitamin supplementation improved subjective energy and reduced fatigue.' },
      { title: 'Methylfolate vs Folic Acid', journal: 'British Journal of Clinical Pharmacology', year: 2014, finding: 'L-methylfolate showed superior bioavailability, especially in MTHFR variants.' },
      { title: 'B12 and Cognitive Function', journal: 'Cochrane Database of Systematic Reviews', year: 2008, finding: 'B12 supplementation improved cognitive function in deficient individuals.' },
    ],
    dosage: {
      recommended: '1 capsule daily',
      timing: 'Take with breakfast',
      withFood: true,
      notes: ['May cause bright yellow urine (harmless)', 'Avoid late-day dosing', 'Start with every other day if sensitive'],
    },
    warnings: ['High doses of B6 can cause nerve issues', 'May interact with certain medications', 'Consult physician if pregnant'],
  },
  // Longevity & Anti-Aging
  {
    id: 13,
    name: 'NMN Premium',
    description: 'Pharmaceutical-grade NMN for NAD+ optimization and cellular rejuvenation.',
    longDescription: 'Nicotinamide Mononucleotide (NMN) is a direct precursor to NAD+, a critical coenzyme that declines with age. Our pharmaceutical-grade NMN supports cellular energy, DNA repair, sirtuin activation, and healthy aging at the molecular level.',
    price: 119.00,
    category: 'longevity',
    benefits: ['NAD+ Boost', 'Anti-Aging', 'Energy'],
    rating: 4.9,
    reviews: 1876,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'β-Nicotinamide Mononucleotide (NMN)', amount: '500 mg', description: '99%+ purity, enzymatically produced' },
      { name: 'Trans-Resveratrol', amount: '150 mg', description: 'Synergistic sirtuin activator' },
      { name: 'TMG (Trimethylglycine)', amount: '250 mg', description: 'Methyl donor support' },
    ],
    clinicalStudies: [
      { title: 'NMN and Insulin Sensitivity', journal: 'Science', year: 2021, finding: 'NMN improved muscle insulin sensitivity in prediabetic women.' },
      { title: 'NAD+ Decline with Aging', journal: 'Cell Metabolism', year: 2016, finding: 'NAD+ levels decline with age; restoration improved healthspan markers in mice.' },
      { title: 'NMN Safety and Pharmacokinetics', journal: 'Endocrine Journal', year: 2020, finding: 'Long-term NMN supplementation was safe and well-tolerated in humans.' },
    ],
    dosage: {
      recommended: '500mg-1000mg daily',
      timing: 'Take in the morning on an empty stomach',
      withFood: false,
      notes: ['Sublingual delivery may enhance absorption', 'Store in cool, dry place', 'Stack with resveratrol for synergy'],
    },
    warnings: ['Limited long-term human data', 'Those with cancer history should consult oncologist', 'May interact with NAD+ precursors'],
  },
  {
    id: 14,
    name: 'Resveratrol Elite',
    description: 'Trans-resveratrol with pterostilbene for sirtuin activation.',
    longDescription: 'High-potency trans-resveratrol combined with pterostilbene (a more bioavailable analog) for optimal sirtuin activation. Sirtuins are longevity genes that regulate cellular health, metabolism, and stress resistance.',
    price: 69.00,
    category: 'longevity',
    benefits: ['Sirtuins', 'Cardiovascular', 'Longevity'],
    rating: 4.7,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800&h=800&fit=crop',
    servingSize: '1 capsule',
    servingsPerContainer: 60,
    ingredients: [
      { name: 'Trans-Resveratrol', amount: '500 mg', description: '98%+ purity from Japanese Knotweed' },
      { name: 'Pterostilbene', amount: '50 mg', description: '4x more bioavailable than resveratrol' },
      { name: 'Quercetin', amount: '100 mg', description: 'Senolytic support' },
    ],
    clinicalStudies: [
      { title: 'Resveratrol and SIRT1 Activation', journal: 'Nature', year: 2006, finding: 'Resveratrol activated SIRT1 and extended lifespan in multiple organisms.' },
      { title: 'Pterostilbene Bioavailability', journal: 'Molecular Nutrition & Food Research', year: 2014, finding: 'Pterostilbene showed 4x greater bioavailability than resveratrol.' },
      { title: 'Resveratrol and Cardiovascular Health', journal: 'Clinical Nutrition', year: 2015, finding: 'Resveratrol improved endothelial function and reduced arterial stiffness.' },
    ],
    dosage: {
      recommended: '1 capsule daily',
      timing: 'Take with a fat-containing meal',
      withFood: true,
      notes: ['Best taken with NMN for synergy', 'Effects accumulate over months', 'Fat enhances absorption significantly'],
    },
    warnings: ['May interact with blood thinners', 'Estrogenic effects possible at high doses', 'Discontinue before surgery'],
  },
  {
    id: 15,
    name: 'Collagen Peptides+',
    description: 'Type I, II, III collagen with hyaluronic acid and vitamin C.',
    longDescription: 'Multi-type collagen peptides for comprehensive connective tissue support. Hydrolyzed for optimal absorption, combined with hyaluronic acid for skin hydration and vitamin C to support endogenous collagen synthesis.',
    price: 49.00,
    category: 'longevity',
    benefits: ['Skin Health', 'Joints', 'Hair & Nails'],
    rating: 4.8,
    reviews: 3456,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=800&fit=crop',
    servingSize: '2 scoops (10g)',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Hydrolyzed Collagen Peptides', amount: '10,000 mg', description: 'Types I, II, III from grass-fed bovine' },
      { name: 'Hyaluronic Acid', amount: '100 mg', description: 'Skin hydration and joint lubrication' },
      { name: 'Vitamin C', amount: '60 mg', description: 'Essential cofactor for collagen synthesis' },
      { name: 'Biotin', amount: '2500 mcg', description: 'Hair and nail support' },
    ],
    clinicalStudies: [
      { title: 'Collagen and Skin Elasticity', journal: 'Skin Pharmacology and Physiology', year: 2014, finding: '8 weeks of collagen peptides improved skin elasticity by 15%.' },
      { title: 'Collagen and Joint Health', journal: 'Current Medical Research and Opinion', year: 2008, finding: 'Collagen hydrolysate reduced joint pain in athletes.' },
      { title: 'Hyaluronic Acid and Skin Hydration', journal: 'Nutrition Journal', year: 2017, finding: 'Oral HA supplementation improved skin hydration and reduced wrinkles.' },
    ],
    dosage: {
      recommended: '2 scoops (10g) daily',
      timing: 'Mix into coffee, smoothie, or water',
      withFood: false,
      notes: ['Unflavored, dissolves easily', 'Consistent daily use for 8+ weeks', 'Can combine with vitamin C-rich foods'],
    },
    warnings: ['Bovine-sourced - not suitable for vegetarians', 'Those with fish allergies check source', 'May cause mild bloating initially'],
  },
  {
    id: 16,
    name: 'Spermidine Complex',
    description: 'Wheat germ-derived spermidine for autophagy and cellular renewal.',
    longDescription: 'Spermidine is a polyamine that declines with age and is a potent inducer of autophagy - your body\'s cellular recycling process. Our wheat germ extract is standardized for spermidine content to support cellular renewal and longevity.',
    price: 89.00,
    category: 'longevity',
    benefits: ['Autophagy', 'Cellular Health', 'Longevity'],
    rating: 4.6,
    reviews: 543,
    badge: 'Advanced',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=800&fit=crop',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    ingredients: [
      { name: 'Wheat Germ Extract', amount: '1000 mg', description: 'Standardized to 1mg spermidine' },
      { name: 'Spermidine', amount: '1 mg', description: 'Natural polyamine for autophagy' },
      { name: 'Zinc', amount: '15 mg', description: 'Supports polyamine metabolism' },
    ],
    clinicalStudies: [
      { title: 'Spermidine and Autophagy', journal: 'Nature Cell Biology', year: 2009, finding: 'Spermidine induced autophagy and extended lifespan in yeast, flies, and worms.' },
      { title: 'Dietary Spermidine and Human Mortality', journal: 'American Journal of Clinical Nutrition', year: 2018, finding: 'Higher spermidine intake associated with reduced mortality in humans.' },
      { title: 'Spermidine and Cognitive Function', journal: 'Cell Reports', year: 2021, finding: 'Spermidine supplementation improved memory in older adults.' },
    ],
    dosage: {
      recommended: '2 capsules daily',
      timing: 'Take in the morning',
      withFood: false,
      notes: ['Fasting may enhance autophagy benefits', 'Works synergistically with intermittent fasting', 'Effects build over 3-6 months'],
    },
    warnings: ['Not suitable for those with wheat allergies', 'Limited human clinical data', 'Those with cancer history should consult physician'],
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};
