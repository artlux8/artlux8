import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Headphones, Play, Video } from "lucide-react";
import PodcastPlayer from "@/components/PodcastPlayer";
import podcastGaryBrecka from "@/assets/podcast-gary-brecka.jpg";
import podcastHuberman from "@/assets/podcast-huberman.jpg";
import podcastAttia from "@/assets/podcast-attia.jpg";
import podcastWimhof from "@/assets/podcast-wimhof.jpg";

// Podcast data - YouTube only
const podcasts = [
  {
    id: 1,
    name: "The Ultimate Human with Gary Brecka",
    host: "Gary Brecka",
    episodeTitle: "Dana White's Transformation: 10 Years Added to Life",
    description: "Gary Brecka reveals the biohacking protocols that helped UFC president Dana White lose 30 pounds and reverse his health markers. Discover the power of gene testing and personalized health optimization.",
    image: podcastGaryBrecka,
    youtubeUrl: "https://www.youtube.com/watch?v=oWu9TFJjHaM",
    category: "Biohacking",
    youtubeEmbedId: "oWu9TFJjHaM",
  },
  {
    id: 2,
    name: "Joe Rogan Experience",
    host: "Joe Rogan & Gary Brecka",
    episodeTitle: "#2065 - Gary Brecka: Breathwork & Human Optimization",
    description: "Gary Brecka joins Joe Rogan to discuss the 30-30-30 protocol, breathwork science, and why morning routines are crucial for longevity. A deep dive into oxygen optimization.",
    image: podcastGaryBrecka,
    youtubeUrl: "https://www.youtube.com/watch?v=I56gvjXEVUg",
    category: "Health Science",
    youtubeEmbedId: "I56gvjXEVUg",
  },
  {
    id: 3,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "The Science of Cold Exposure for Health & Performance",
    description: "Stanford neuroscientist explains the science behind cold exposure, including how it affects dopamine, metabolism, and mental resilience. Protocols for cold showers and ice baths.",
    image: podcastHuberman,
    youtubeUrl: "https://www.youtube.com/watch?v=pq6WHJzOkno",
    category: "Neuroscience",
    youtubeEmbedId: "pq6WHJzOkno",
  },
  {
    id: 4,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Longevity, Healthspan & The Science of Living Longer",
    description: "Deep dive into the science of longevity, covering everything from exercise protocols to nutrition strategies for optimal healthspan. The medicine 3.0 approach to aging.",
    image: podcastAttia,
    youtubeUrl: "https://www.youtube.com/watch?v=tGLYLyHk5ck",
    category: "Longevity",
    youtubeEmbedId: "tGLYLyHk5ck",
  },
  {
    id: 5,
    name: "The Rich Roll Podcast",
    host: "Rich Roll & Wim Hof",
    episodeTitle: "Wim Hof: Mastering the Ice & Breathwork",
    description: "The Iceman himself discusses his method for cold exposure mastery, breathwork techniques, and the science behind pushing human limits for better health and mental clarity.",
    image: podcastWimhof,
    youtubeUrl: "https://www.youtube.com/watch?v=JPflvEqLA3s",
    category: "Wellness",
    youtubeEmbedId: "JPflvEqLA3s",
  },
  {
    id: 6,
    name: "Found My Fitness",
    host: "Dr. Rhonda Patrick",
    episodeTitle: "Cold Shock Proteins & Heat Shock Response",
    description: "Research-focused discussions on the molecular mechanisms behind cold and heat exposure. Learn about hormesis and how stress adaptation improves longevity markers.",
    image: podcastHuberman,
    youtubeUrl: "https://www.youtube.com/watch?v=EbH4m6WzrxY",
    category: "Science",
    youtubeEmbedId: "EbH4m6WzrxY",
  },
  {
    id: 7,
    name: "The Model Health Show",
    host: "Shawn Stevenson",
    episodeTitle: "Sleep Optimization & Circadian Rhythm Mastery",
    description: "Evidence-based strategies for improving sleep quality, understanding your circadian rhythm, and optimizing your sleep environment for peak performance and recovery.",
    image: podcastAttia,
    youtubeUrl: "https://www.youtube.com/watch?v=nm1TxQj9IsQ",
    category: "Sleep",
    youtubeEmbedId: "nm1TxQj9IsQ",
  },
  {
    id: 8,
    name: "Blueprint with Bryan Johnson",
    host: "Bryan Johnson",
    episodeTitle: "Don't Die: The Protocol for Biological Age Reversal",
    description: "Tech entrepreneur Bryan Johnson shares his extreme longevity protocols including his morning routine, supplement stack, and the data-driven approach to reversing biological aging.",
    image: podcastGaryBrecka,
    youtubeUrl: "https://www.youtube.com/watch?v=1B-Q9k6KAL4",
    category: "Longevity",
    youtubeEmbedId: "1B-Q9k6KAL4",
  },
  {
    id: 9,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "How to Optimize Your Brain-Body Function & Health",
    description: "Comprehensive protocols for enhancing focus, sleep, and physical performance through science-backed techniques. Actionable tips for daily optimization.",
    image: podcastHuberman,
    youtubeUrl: "https://www.youtube.com/watch?v=SwQhKFMxmDY",
    category: "Neuroscience",
    youtubeEmbedId: "SwQhKFMxmDY",
  },
  {
    id: 10,
    name: "The Ultimate Human",
    host: "Gary Brecka",
    episodeTitle: "The 30-30-30 Morning Protocol Explained",
    description: "Gary Brecka breaks down his famous 30-30-30 protocol: 30 grams of protein within 30 minutes of waking, followed by 30 minutes of low-intensity exercise.",
    image: podcastGaryBrecka,
    youtubeUrl: "https://www.youtube.com/watch?v=2Q1MnZQBwlk",
    category: "Biohacking",
    youtubeEmbedId: "2Q1MnZQBwlk",
  },
  {
    id: 11,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "Master Your Sleep & Be More Alert When Awake",
    description: "Science-based tools to optimize your sleep, including light exposure, temperature, and supplements. Learn to align your circadian rhythm for peak performance.",
    image: podcastHuberman,
    youtubeUrl: "https://www.youtube.com/watch?v=h2aWYjSA1Jc",
    category: "Sleep",
    youtubeEmbedId: "h2aWYjSA1Jc",
  },
  {
    id: 12,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Exercise & Longevity: The Ultimate Guide",
    description: "Peter Attia discusses the four pillars of exercise for longevity: stability, strength, aerobic efficiency, and peak aerobic output. Zone 2 training explained.",
    image: podcastAttia,
    youtubeUrl: "https://www.youtube.com/watch?v=jN0pRAqiUJU",
    category: "Fitness",
    youtubeEmbedId: "jN0pRAqiUJU",
  },
  {
    id: 13,
    name: "Impact Theory",
    host: "Tom Bilyeu & David Sinclair",
    episodeTitle: "David Sinclair: Reverse Aging with Science",
    description: "Harvard geneticist Dr. David Sinclair explains the science of aging, NAD+ supplementation, and the lifestyle factors that can slow or reverse biological aging.",
    image: podcastAttia,
    youtubeUrl: "https://www.youtube.com/watch?v=5DtWqzalEnc",
    category: "Longevity",
    youtubeEmbedId: "5DtWqzalEnc",
  },
  {
    id: 14,
    name: "Wim Hof Method",
    host: "Wim Hof",
    episodeTitle: "Guided Breathing Session - 3 Rounds",
    description: "Follow along with Wim Hof himself in this guided breathwork session. Three rounds of the Wim Hof breathing technique for energy, focus, and stress relief.",
    image: podcastWimhof,
    youtubeUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
    category: "Breathwork",
    youtubeEmbedId: "tybOi4hjZFQ",
  },
  {
    id: 15,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "Using Light for Health, Mood & Circadian Rhythm",
    description: "How morning sunlight exposure affects cortisol, dopamine, and melatonin. Protocols for using light to improve mood, energy, and sleep quality.",
    image: podcastHuberman,
    youtubeUrl: "https://www.youtube.com/watch?v=UF0nqolsNZc",
    category: "Science",
    youtubeEmbedId: "UF0nqolsNZc",
  },
  {
    id: 16,
    name: "FoundMyFitness",
    host: "Dr. Rhonda Patrick",
    episodeTitle: "Sauna Benefits for Longevity & Health",
    description: "The science behind sauna use for cardiovascular health, brain function, and longevity. Heat shock proteins and their role in cellular repair.",
    image: podcastHuberman,
    youtubeUrl: "https://www.youtube.com/watch?v=eWKBsh7YTXQ",
    category: "Heat Therapy",
    youtubeEmbedId: "eWKBsh7YTXQ",
  },
];

const Podcast = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Headphones className="w-6 h-6 text-gold" />
              <span className="text-gold text-sm tracking-widest uppercase font-medium">
                Curated Content
              </span>
            </div>
            <h1 className="font-logo text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              ARTLUX<span className="logo-infinity">∞</span>
              <span className="block text-gold mt-2">Listening Room</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated podcasts on longevity, performance, and wellness from the world's leading experts.
              Learn the science behind the ARTLUX Protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Episode - Gary Brecka & Dana White */}
      <section className="py-12 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-gold/20">
              <img 
                src={podcastGaryBrecka} 
                alt="The Ultimate Human Podcast"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-gold text-primary text-xs font-bold rounded-full mb-4">
                FEATURED EPISODE
              </span>
              <h2 className="font-logo text-2xl md:text-3xl font-bold text-foreground mb-2">
                Gary Brecka: The Ultimate Human
              </h2>
              <p className="text-muted-foreground mb-4">
                How Gary Brecka helped Dana White add 10 years to his life through gene testing, breathwork, and biohacking protocols. The episode that started a health revolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild className="bg-red-600 hover:bg-red-600/90 text-white">
                  <a href="https://www.youtube.com/watch?v=oWu9TFJjHaM" target="_blank" rel="noopener noreferrer">
                    <Video className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {podcasts.map((podcast) => (
              <PodcastPlayer
                key={podcast.id}
                name={podcast.name}
                host={podcast.host}
                episodeTitle={podcast.episodeTitle}
                description={podcast.description}
                image={podcast.image}
                youtubeUrl={podcast.youtubeUrl}
                category={podcast.category}
                youtubeEmbedId={podcast.youtubeEmbedId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-logo text-2xl md:text-3xl font-bold text-foreground mb-4">
            ARTLUX<span className="logo-infinity">∞</span> Podcast Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            We're launching our own podcast featuring interviews with longevity experts, 
            biohackers, and community success stories.
          </p>
          <Button variant="outline" className="border-gold/50 text-foreground hover:bg-gold/10">
            Get Notified When We Launch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
