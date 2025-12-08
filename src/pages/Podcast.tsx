import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Headphones, Video } from "lucide-react";
import PodcastPlayer from "@/components/PodcastPlayer";

// Real photos from YouTube thumbnails
import garyBreckaThumbnail from "@/assets/gary-brecka-real.jpg";
import garyBreckaJoeRogan from "@/assets/gary-brecka-joe-rogan.jpg";
import ultimateHumanDiet from "@/assets/ultimate-human-diet.jpg";
import ultimateHumanSupplements from "@/assets/ultimate-human-supplements.jpg";
import ultimateHumanAI from "@/assets/ultimate-human-ai-health.jpg";
import garyBreckaRedlight from "@/assets/gary-brecka-redlight.jpg";
import hubermanBrainBody from "@/assets/huberman-brain-body.jpg";
import hubermanSleep from "@/assets/huberman-sleep.jpg";
import hubermanLight from "@/assets/huberman-light.jpg";
import wimhofBreathing from "@/assets/wimhof-breathing.jpg";
import wimhofGuided from "@/assets/wimhof-guided.jpg";
import attiaExercise from "@/assets/attia-exercise.jpg";
import attiaLongevity from "@/assets/attia-longevity.jpg";
import sinclairAging from "@/assets/sinclair-aging.jpg";

// Real podcast episodes with real thumbnails
const podcasts = [
  {
    id: 1,
    name: "Joe Rogan Experience #2304",
    host: "Joe Rogan & Gary Brecka",
    episodeTitle: "Gary Brecka: Longevity, Breathwork & Human Optimization",
    description: "Gary Brecka joins Joe Rogan for a deep conversation on human biology, biohacking, longevity, and the science behind optimizing human performance.",
    image: garyBreckaJoeRogan,
    youtubeUrl: "https://www.youtube.com/watch?v=nhC8lLPpGl4",
    category: "Biohacking",
    youtubeEmbedId: "nhC8lLPpGl4",
  },
  {
    id: 2,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "How to Optimize Your Brain-Body Function & Health",
    description: "Stanford neuroscientist shares comprehensive protocols for enhancing focus, sleep, and physical performance through science-backed techniques.",
    image: hubermanBrainBody,
    youtubeUrl: "https://www.youtube.com/watch?v=SwQhKFMxmDY",
    category: "Neuroscience",
    youtubeEmbedId: "SwQhKFMxmDY",
  },
  {
    id: 3,
    name: "The Ultimate Human #214",
    host: "Gary Brecka",
    episodeTitle: "Stop Guessing What Supplements You Need",
    description: "Your immune system isn't attacking you for no reason. It's protecting you from pathogens like mold, mycotoxins, parasites, and heavy metals.",
    image: ultimateHumanSupplements,
    youtubeUrl: "https://www.youtube.com/watch?v=ZlvhOOD1kjw",
    category: "Supplements",
    youtubeEmbedId: "ZlvhOOD1kjw",
  },
  {
    id: 4,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "Master Your Sleep & Be More Alert When Awake",
    description: "Science-based tools to optimize your sleep, including light exposure, temperature, and supplements for peak circadian rhythm performance.",
    image: hubermanSleep,
    youtubeUrl: "https://www.youtube.com/watch?v=h2aWYjSA1Jc",
    category: "Sleep",
    youtubeEmbedId: "h2aWYjSA1Jc",
  },
  {
    id: 5,
    name: "Wim Hof Method",
    host: "Wim Hof",
    episodeTitle: "Guided Breathing Session - 3 Rounds",
    description: "Follow along with The Iceman himself in this guided breathwork session. Three rounds of the Wim Hof breathing technique for energy and focus.",
    image: wimhofBreathing,
    youtubeUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
    category: "Breathwork",
    youtubeEmbedId: "tybOi4hjZFQ",
  },
  {
    id: 6,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Exercise & Longevity: The Ultimate Guide",
    description: "The four pillars of exercise for longevity: stability, strength, aerobic efficiency, and peak aerobic output. Zone 2 training explained.",
    image: attiaExercise,
    youtubeUrl: "https://www.youtube.com/watch?v=jN0pRAqiUJU",
    category: "Fitness",
    youtubeEmbedId: "jN0pRAqiUJU",
  },
  {
    id: 7,
    name: "The Ultimate Human",
    host: "Gary Brecka",
    episodeTitle: "Diet Myths, Creatine & What Blood Tests Don't Show",
    description: "The real secret to longevity isn't found in trendy diets. Why the world's longest-living populations thrive by avoiding processed foods.",
    image: ultimateHumanDiet,
    youtubeUrl: "https://www.youtube.com/watch?v=4dET0o0AK2I",
    category: "Nutrition",
    youtubeEmbedId: "4dET0o0AK2I",
  },
  {
    id: 8,
    name: "Impact Theory",
    host: "Tom Bilyeu & David Sinclair",
    episodeTitle: "David Sinclair: Reverse Aging with Science",
    description: "Harvard geneticist Dr. David Sinclair explains the science of aging, NAD+ supplementation, and lifestyle factors that can reverse biological aging.",
    image: sinclairAging,
    youtubeUrl: "https://www.youtube.com/watch?v=5DtWqzalEnc",
    category: "Longevity",
    youtubeEmbedId: "5DtWqzalEnc",
  },
  {
    id: 9,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "Using Light for Health, Mood & Circadian Rhythm",
    description: "How morning sunlight exposure affects cortisol, dopamine, and melatonin. Protocols for using light to improve mood, energy, and sleep.",
    image: hubermanLight,
    youtubeUrl: "https://www.youtube.com/watch?v=UF0nqolsNZc",
    category: "Science",
    youtubeEmbedId: "UF0nqolsNZc",
  },
  {
    id: 10,
    name: "The Rich Roll Podcast",
    host: "Rich Roll & Wim Hof",
    episodeTitle: "Wim Hof: Mastering the Ice & Breathwork",
    description: "The Iceman discusses his method for cold exposure mastery, breathwork techniques, and pushing human limits for better health.",
    image: wimhofGuided,
    youtubeUrl: "https://www.youtube.com/watch?v=VaMjhwFE1Zw",
    category: "Cold Exposure",
    youtubeEmbedId: "VaMjhwFE1Zw",
  },
  {
    id: 11,
    name: "The Ultimate Human #149",
    host: "Gary Brecka & Peter",
    episodeTitle: "Transform Your Life with AI Health Breakthroughs",
    description: "Gary and Peter discuss the most important bio hacks and health tech gadgets they use daily to live longer.",
    image: ultimateHumanAI,
    youtubeUrl: "https://www.youtube.com/watch?v=HR4oWQuCXSA",
    category: "Technology",
    youtubeEmbedId: "HR4oWQuCXSA",
  },
  {
    id: 12,
    name: "Diary of a CEO",
    host: "Steven Bartlett & Gary Brecka",
    episodeTitle: "The Shocking Benefits of Red Light Therapy",
    description: "Gary Brecka explains the science behind red light therapy, its benefits for skin, mitochondria, and cellular health.",
    image: garyBreckaRedlight,
    youtubeUrl: "https://www.youtube.com/watch?v=mvr0Ub3TG_Y",
    category: "Red Light",
    youtubeEmbedId: "mvr0Ub3TG_Y",
  },
  {
    id: 13,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Longevity, Healthspan & The Science of Living Longer",
    description: "Deep dive into the science of longevity, covering exercise protocols to nutrition strategies for optimal healthspan.",
    image: attiaLongevity,
    youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    category: "Longevity",
    youtubeEmbedId: "LXb3EKWsInQ",
  },
  {
    id: 14,
    name: "The Ultimate Human #98",
    host: "Gary Brecka",
    episodeTitle: "Gary Brecka Answers Your Most Common Health Questions",
    description: "Gary answers your 16 most-commonly asked questions from nutrient deficiencies to cholesterol myths.",
    image: garyBreckaThumbnail,
    youtubeUrl: "https://www.youtube.com/watch?v=9w6_fZ8nqcw",
    category: "Q&A",
    youtubeEmbedId: "9w6_fZ8nqcw",
  },
  {
    id: 15,
    name: "The Ultimate Human",
    host: "Gary Brecka",
    episodeTitle: "Dana White's Transformation: 10 Years Added to Life",
    description: "Gary reveals the biohacking protocols that helped UFC president Dana White lose 30 pounds and reverse his health markers.",
    image: garyBreckaThumbnail,
    youtubeUrl: "https://www.youtube.com/watch?v=oWu9TFJjHaM",
    category: "Transformation",
    youtubeEmbedId: "oWu9TFJjHaM",
  },
  {
    id: 16,
    name: "Joe Rogan Experience #2065",
    host: "Joe Rogan & Gary Brecka",
    episodeTitle: "The 30-30-30 Protocol & Breathwork Science",
    description: "Gary Brecka discusses the viral 30-30-30 protocol, breathwork science, and why morning routines are crucial for longevity.",
    image: garyBreckaJoeRogan,
    youtubeUrl: "https://www.youtube.com/watch?v=I56gvjXEVUg",
    category: "Protocols",
    youtubeEmbedId: "I56gvjXEVUg",
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
                Curated Longevity Content
              </span>
            </div>
            <h1 className="font-logo text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              ARTLUX<span className="logo-infinity">∞</span>
              <span className="block text-gold mt-2">Listening Room</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated episodes from the world's leading longevity experts: Gary Brecka, Andrew Huberman, 
              Peter Attia, Wim Hof, and David Sinclair.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Episode - Joe Rogan #2304 */}
      <section className="py-12 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="w-full md:w-96 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-gold/20">
              <img 
                src={garyBreckaJoeRogan} 
                alt="Gary Brecka on Joe Rogan Experience"
                className="w-full h-full object-cover aspect-video"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-gold text-primary text-xs font-bold rounded-full mb-4">
                FEATURED EPISODE
              </span>
              <h2 className="font-logo text-2xl md:text-3xl font-bold text-foreground mb-2">
                Joe Rogan Experience #2304 - Gary Brecka
              </h2>
              <p className="text-muted-foreground mb-4">
                The latest full episode with Joe Rogan. Gary Brecka discusses longevity, breathwork protocols, 
                gene testing, and the science of human optimization. Over 1.6 million views.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild className="bg-red-600 hover:bg-red-600/90 text-white">
                  <a href="https://www.youtube.com/watch?v=nhC8lLPpGl4" target="_blank" rel="noopener noreferrer">
                    <Video className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
                  <a href="https://www.theultimatehuman.com/podcast" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    The Ultimate Human
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

      {/* More Resources */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-logo text-2xl md:text-3xl font-bold text-foreground mb-4">
            Explore More Longevity Content
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Follow the world's leading longevity experts for more episodes on biohacking, 
            performance optimization, and the science of living longer.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-gold text-primary hover:bg-gold/90">
              <a href="https://www.theultimatehuman.com/podcast" target="_blank" rel="noopener noreferrer">
                <Headphones className="w-4 h-4 mr-2" />
                The Ultimate Human
              </a>
            </Button>
            <Button asChild variant="outline" className="border-foreground/30 hover:bg-foreground/10">
              <a href="https://www.hubermanlab.com" target="_blank" rel="noopener noreferrer">
                Huberman Lab
              </a>
            </Button>
            <Button asChild variant="outline" className="border-foreground/30 hover:bg-foreground/10">
              <a href="https://peterattiamd.com" target="_blank" rel="noopener noreferrer">
                Peter Attia Drive
              </a>
            </Button>
            <Button asChild variant="outline" className="border-foreground/30 hover:bg-foreground/10">
              <a href="https://www.wimhofmethod.com" target="_blank" rel="noopener noreferrer">
                Wim Hof Method
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;
