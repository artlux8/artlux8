import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Headphones, Play } from "lucide-react";

// Podcast data - easily updateable
const podcasts = [
  {
    id: 1,
    name: "The Ultimate Human with Gary Brecka",
    host: "Gary Brecka",
    episodeTitle: "Dana White's Transformation: 10 Years Added to Life",
    description: "Gary Brecka reveals the biohacking protocols that helped UFC president Dana White lose 30 pounds and reverse his health markers. Discover the power of gene testing and personalized health optimization.",
    image: "https://i.scdn.co/image/ab6765630000ba8a16dd6d76af30d4c84fcd6c7a",
    spotifyUrl: "https://open.spotify.com/show/1a2G6j5gFCl7CVnmwpbCe2",
    youtubeUrl: "https://www.youtube.com/@GaryBrecka",
    category: "Biohacking",
  },
  {
    id: 2,
    name: "The Ultimate Human with Gary Brecka",
    host: "Gary Brecka",
    episodeTitle: "Joe Rogan Experience: Breathwork & Cold Exposure",
    description: "Gary Brecka joins Joe Rogan to discuss the 30-30-30 protocol, breathwork science, and why morning routines are crucial for longevity. A deep dive into oxygen optimization.",
    image: "https://i.scdn.co/image/ab6765630000ba8a16dd6d76af30d4c84fcd6c7a",
    spotifyUrl: "https://open.spotify.com/episode/3bVsV4bBvFJPBxT3UWdpNq",
    youtubeUrl: "https://www.youtube.com/watch?v=TM902RqLPk8",
    category: "Health Science",
  },
  {
    id: 3,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "The Science of Cold Exposure for Health & Performance",
    description: "Stanford neuroscientist explains the science behind cold exposure, including how it affects dopamine, metabolism, and mental resilience. Protocols for cold showers and ice baths.",
    image: "https://i.scdn.co/image/ab6765630000ba8a4350c76b7f2ddde71de7e606",
    spotifyUrl: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Ez0P",
    youtubeUrl: "https://www.youtube.com/@hubaboratorylab",
    category: "Neuroscience",
  },
  {
    id: 4,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Longevity, Healthspan & The Science of Living Longer",
    description: "Deep dive into the science of longevity, covering everything from exercise protocols to nutrition strategies for optimal healthspan. The medicine 3.0 approach to aging.",
    image: "https://i.scdn.co/image/ab6765630000ba8a4e8e6bd6a31d9c6c97f9c2d6",
    spotifyUrl: "https://open.spotify.com/show/1ktxVBArrt5OOcicSyCCTM",
    youtubeUrl: "https://www.youtube.com/@PeterAttiaMD",
    category: "Longevity",
  },
  {
    id: 5,
    name: "The Rich Roll Podcast",
    host: "Rich Roll",
    episodeTitle: "Wim Hof: Mastering the Ice & Breathwork",
    description: "The Iceman himself discusses his method for cold exposure mastery, breathwork techniques, and the science behind pushing human limits for better health and mental clarity.",
    image: "https://i.scdn.co/image/ab6765630000ba8af35e1d9c6e63ad6e54e3f0e0",
    spotifyUrl: "https://open.spotify.com/show/1vSjZ4nsUFZN4eX9Bb4yHF",
    youtubeUrl: "https://www.youtube.com/@RichRoll",
    category: "Wellness",
  },
  {
    id: 6,
    name: "Found My Fitness",
    host: "Dr. Rhonda Patrick",
    episodeTitle: "Cold Shock Proteins & Heat Shock Response",
    description: "Research-focused discussions on the molecular mechanisms behind cold and heat exposure. Learn about hormesis and how stress adaptation improves longevity markers.",
    image: "https://i.scdn.co/image/ab6765630000ba8a18a4fd4fbf41b2e8b80f1f86",
    spotifyUrl: "https://open.spotify.com/show/5x8r9G8fDBICqBlQVUHI1l",
    youtubeUrl: "https://www.youtube.com/@FoundMyFitness",
    category: "Science",
  },
  {
    id: 7,
    name: "The Model Health Show",
    host: "Shawn Stevenson",
    episodeTitle: "Sleep Optimization & Circadian Rhythm Mastery",
    description: "Evidence-based strategies for improving sleep quality, understanding your circadian rhythm, and optimizing your sleep environment for peak performance and recovery.",
    image: "https://i.scdn.co/image/ab6765630000ba8a4c9d5eb22b86b0d4b43e7e8a",
    spotifyUrl: "https://open.spotify.com/show/5bJQRBq1HbMl5r6fCVAOqS",
    youtubeUrl: "https://www.youtube.com/@ShawnStevensonModel",
    category: "Sleep",
  },
  {
    id: 8,
    name: "Blueprint with Bryan Johnson",
    host: "Bryan Johnson",
    episodeTitle: "Don't Die: The Protocol for Biological Age Reversal",
    description: "Tech entrepreneur Bryan Johnson shares his extreme longevity protocols including his morning routine, supplement stack, and the data-driven approach to reversing biological aging.",
    image: "https://i.scdn.co/image/ab6765630000ba8a9ef3b6c68d7a3e5b7f4c8d2a",
    spotifyUrl: "https://open.spotify.com/show/3bMhKz8bPZ3VvQF8rF2Xq5",
    youtubeUrl: "https://www.youtube.com/@BryanJohnson",
    category: "Longevity",
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
                src="https://i.scdn.co/image/ab6765630000ba8a16dd6d76af30d4c84fcd6c7a" 
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
              <div
                key={podcast.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
              >
                {/* Podcast Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={podcast.image}
                    alt={podcast.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <a
                    href={podcast.youtubeUrl || podcast.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </a>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold/90 text-primary text-xs font-semibold rounded-full">
                      {podcast.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-1">
                      {podcast.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {podcast.host}
                    </p>
                  </div>

                  <h4 className="font-medium text-foreground mb-2 line-clamp-2 text-sm">
                    {podcast.episodeTitle}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {podcast.description}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <a href={podcast.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        Spotify
                      </a>
                    </Button>
                    {podcast.youtubeUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <a href={podcast.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          YouTube
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
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