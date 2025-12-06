export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const productReviews: Record<string, ProductReview[]> = {
  "artlux-nad-booster": [
    {
      id: "1",
      author: "Michael T.",
      rating: 5,
      title: "Game changer for energy levels",
      content: "After 3 weeks of consistent use, my energy levels are through the roof. No more afternoon crashes. I'm 52 and feel like I'm in my 30s again.",
      date: "2024-11-15",
      verified: true,
      helpful: 47
    },
    {
      id: "2",
      author: "Sarah K.",
      rating: 5,
      title: "Finally a supplement that works",
      content: "I've tried many NAD+ supplements before but this formula is different. The combination with TMG makes a noticeable difference. Mental clarity improved within the first week.",
      date: "2024-11-08",
      verified: true,
      helpful: 32
    },
    {
      id: "3",
      author: "David R.",
      rating: 4,
      title: "Solid product, takes time",
      content: "Took about 2-3 weeks to really notice the effects but now I'm a believer. Better sleep quality and more stable energy. Will continue using.",
      date: "2024-10-28",
      verified: true,
      helpful: 18
    },
    {
      id: "4",
      author: "Jennifer M.",
      rating: 5,
      title: "Worth every penny",
      content: "The quality is exceptional. I've been following Bryan Johnson's protocol and this NAD+ booster fits perfectly. Recovery from workouts has improved dramatically.",
      date: "2024-10-15",
      verified: true,
      helpful: 24
    }
  ],
  "artlux-mito-power": [
    {
      id: "1",
      author: "Robert H.",
      rating: 5,
      title: "Incredible for athletic performance",
      content: "As a 45-year-old marathon runner, this has been transformative. My endurance and recovery have improved significantly. The Urolithin A is the real deal.",
      date: "2024-11-12",
      verified: true,
      helpful: 38
    },
    {
      id: "2",
      author: "Lisa W.",
      rating: 5,
      title: "Brain fog gone completely",
      content: "I was skeptical but after 4 weeks, my mental clarity is better than it's been in years. The combination of ingredients is perfectly balanced.",
      date: "2024-11-01",
      verified: true,
      helpful: 29
    },
    {
      id: "3",
      author: "James P.",
      rating: 4,
      title: "Good results, premium price",
      content: "Quality ingredients and noticeable effects on energy. Would give 5 stars if the price was slightly lower, but you get what you pay for.",
      date: "2024-10-20",
      verified: true,
      helpful: 15
    }
  ],
  "artlux-lipo-detox": [
    {
      id: "1",
      author: "Amanda C.",
      rating: 5,
      title: "Perfect for post-alcohol recovery",
      content: "I quit drinking 3 months ago and this has been essential for liver support. Blood work improved significantly. Doctor was impressed.",
      date: "2024-11-10",
      verified: true,
      helpful: 52
    },
    {
      id: "2",
      author: "Chris B.",
      rating: 5,
      title: "Skin cleared up within weeks",
      content: "Didn't expect this side benefit but my skin looks better than it has in years. The NAC and glutathione combo is powerful.",
      date: "2024-10-25",
      verified: true,
      helpful: 34
    },
    {
      id: "3",
      author: "Patricia L.",
      rating: 4,
      title: "Gentle but effective detox",
      content: "Unlike harsh cleanses, this works gradually. More energy, better digestion, and I feel cleaner overall. Taking with hydrogen water as recommended.",
      date: "2024-10-18",
      verified: true,
      helpful: 21
    }
  ],
  "artlux-mind-focus": [
    {
      id: "1",
      author: "Thomas A.",
      rating: 5,
      title: "Better than any nootropic I've tried",
      content: "Software developer here. This gives me 6+ hours of focused work without the jitters or crash. Lion's Mane and L-Theanine combo is perfect.",
      date: "2024-11-14",
      verified: true,
      helpful: 41
    },
    {
      id: "2",
      author: "Emily S.",
      rating: 5,
      title: "Anxiety reduced, focus improved",
      content: "I was taking prescription medication for focus. After consulting my doctor, I've been able to reduce it while using this. Life-changing.",
      date: "2024-11-02",
      verified: true,
      helpful: 56
    },
    {
      id: "3",
      author: "Mark D.",
      rating: 4,
      title: "Great for studying",
      content: "Law student here. This has been invaluable during exam season. Memory retention is noticeably better. No stimulant crash.",
      date: "2024-10-22",
      verified: true,
      helpful: 27
    }
  ]
};

export const getProductReviews = (handle: string): ProductReview[] => {
  return productReviews[handle] || [];
};

export const getAverageRating = (reviews: ProductReview[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};
