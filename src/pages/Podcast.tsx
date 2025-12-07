import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Headphones, Play } from "lucide-react";
import PodcastPlayer from "@/components/PodcastPlayer";
import podcastGaryBrecka from "@/assets/podcast-gary-brecka.jpg";
import podcastHuberman from "@/assets/podcast-huberman.jpg";
import podcastAttia from "@/assets/podcast-attia.jpg";
import podcastWimhof from "@/assets/podcast-wimhof.jpg";

// Podcast data - easily updateable with embed IDs
const podcasts = [
  {
    id: 1,
    name: "The Ultimate Human with Gary Brecka",
    host: "Gary Brecka",
    episodeTitle: "Dana White's Transformation: 10 Years Added to Life",
    description: "Gary Brecka reveals the biohacking protocols that helped UFC president Dana White lose 30 pounds and reverse his health markers. Discover the power of gene testing and personalized health optimization.",
    image: podcastGaryBrecka,
    spotifyUrl: "https://open.spotify.com/show/1a2G6j5gFCl7CVnmwpbCe2",
    youtubeUrl: "https://www.youtube.com/watch?v=TM902RqLPk8",
    category: "Biohacking",
    spotifyEmbedId: "1a2G6j5gFCl7CVnmwpbCe2",
    youtubeEmbedId: "TM902RqLPk8",
  },
  {
    id: 2,
    name: "The Ultimate Human with Gary Brecka",
    host: "Gary Brecka",
    episodeTitle: "Joe Rogan Experience: Breathwork & Cold Exposure",
    description: "Gary Brecka joins Joe Rogan to discuss the 30-30-30 protocol, breathwork science, and why morning routines are crucial for longevity. A deep dive into oxygen optimization.",
    image: podcastGaryBrecka,
    spotifyUrl: "https://open.spotify.com/episode/3bVsV4bBvFJPBxT3UWdpNq",
    youtubeUrl: "https://www.youtube.com/watch?v=TM902RqLPk8",
    category: "Health Science",
    youtubeEmbedId: "TM902RqLPk8",
  },
  {
    id: 3,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "The Science of Cold Exposure for Health & Performance",
    description: "Stanford neuroscientist explains the science behind cold exposure, including how it affects dopamine, metabolism, and mental resilience. Protocols for cold showers and ice baths.",
    image: podcastHuberman,
    spotifyUrl: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Ez0P",
    youtubeUrl: "https://www.youtube.com/@hubermanlab",
    category: "Neuroscience",
    spotifyEmbedId: "79CkJF3UJTHFV8Dse3Ez0P",
  },
  {
    id: 4,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Longevity, Healthspan & The Science of Living Longer",
    description: "Deep dive into the science of longevity, covering everything from exercise protocols to nutrition strategies for optimal healthspan. The medicine 3.0 approach to aging.",
    image: podcastAttia,
    spotifyUrl: "https://open.spotify.com/show/1ktxVBArrt5OOcicSyCCTM",
    youtubeUrl: "https://www.youtube.com/@PeterAttiaMD",
    category: "Longevity",
    spotifyEmbedId: "1ktxVBArrt5OOcicSyCCTM",
  },
  {
    id: 5,
    name: "The Rich Roll Podcast",
    host: "Rich Roll",
    episodeTitle: "Wim Hof: Mastering the Ice & Breathwork",
    description: "The Iceman himself discusses his method for cold exposure mastery, breathwork techniques, and the science behind pushing human limits for better health and mental clarity.",
    image: podcastWimhof,
    spotifyUrl: "https://open.spotify.com/show/1vSjZ4nsUFZN4eX9Bb4yHF",
    youtubeUrl: "https://www.youtube.com/@RichRoll",
    category: "Wellness",
    spotifyEmbedId: "1vSjZ4nsUFZN4eX9Bb4yHF",
  },
  {
    id: 6,
    name: "Found My Fitness",
    host: "Dr. Rhonda Patrick",
    episodeTitle: "Cold Shock Proteins & Heat Shock Response",
    description: "Research-focused discussions on the molecular mechanisms behind cold and heat exposure. Learn about hormesis and how stress adaptation improves longevity markers.",
    image: podcastHuberman,
    spotifyUrl: "https://open.spotify.com/show/5x8r9G8fDBICqBlQVUHI1l",
    youtubeUrl: "https://www.youtube.com/@FoundMyFitness",
    category: "Science",
    spotifyEmbedId: "5x8r9G8fDBICqBlQVUHI1l",
  },
  {
    id: 7,
    name: "The Model Health Show",
    host: "Shawn Stevenson",
    episodeTitle: "Sleep Optimization & Circadian Rhythm Mastery",
    description: "Evidence-based strategies for improving sleep quality, understanding your circadian rhythm, and optimizing your sleep environment for peak performance and recovery.",
    image: podcastAttia,
    spotifyUrl: "https://open.spotify.com/show/5bJQRBq1HbMl5r6fCVAOqS",
    youtubeUrl: "https://www.youtube.com/@ShawnStevensonModel",
    category: "Sleep",
    spotifyEmbedId: "5bJQRBq1HbMl5r6fCVAOqS",
  },
  {
    id: 8,
    name: "Blueprint with Bryan Johnson",
    host: "Bryan Johnson",
    episodeTitle: "Don't Die: The Protocol for Biological Age Reversal",
    description: "Tech entrepreneur Bryan Johnson shares his extreme longevity protocols including his morning routine, supplement stack, and the data-driven approach to reversing biological aging.",
    image: podcastGaryBrecka,
    spotifyUrl: "https://open.spotify.com/show/3bMhKz8bPZ3VvQF8rF2Xq5",
    youtubeUrl: "https://www.youtube.com/@BryanJohnson",
    category: "Longevity",
    spotifyEmbedId: "3bMhKz8bPZ3VvQF8rF2Xq5",
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
                <Button asChild className="bg-gold hover:bg-gold/90 text-primary">
                  <a href="https://open.spotify.com/show/1a2G6j5gFCl7CVnmwpbCe2" target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4 mr-2" />
                    Listen on Spotify
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-gold/50 text-foreground hover:bg-gold/10">
                  <a href="https://www.youtube.com/@GaryBrecka" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
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
                spotifyUrl={podcast.spotifyUrl}
                youtubeUrl={podcast.youtubeUrl}
                category={podcast.category}
                spotifyEmbedId={podcast.spotifyEmbedId}
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