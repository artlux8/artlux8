import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Headphones, Play } from "lucide-react";

const podcasts = [
  {
    id: 1,
    name: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    episodeTitle: "The Science of Cold Exposure for Health & Performance",
    description: "Stanford neuroscientist explains the science behind cold exposure, including how it affects dopamine, metabolism, and mental resilience.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Ez0P",
    category: "Neuroscience",
  },
  {
    id: 2,
    name: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    episodeTitle: "Longevity, Healthspan & The Science of Living Longer",
    description: "Deep dive into the science of longevity, covering everything from exercise protocols to nutrition strategies for optimal healthspan.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com/show/1ktxVBArrt5OOcicSyCCTM",
    category: "Longevity",
  },
  {
    id: 3,
    name: "The Rich Roll Podcast",
    host: "Rich Roll",
    episodeTitle: "Transforming Health Through Breathwork & Cold Therapy",
    description: "Conversations with world-class athletes and wellness experts on plant-based nutrition, endurance, and holistic health practices.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com/show/1vSjZ4nsUFZN4eX9Bb4yHF",
    category: "Wellness",
  },
  {
    id: 4,
    name: "Found My Fitness",
    host: "Dr. Rhonda Patrick",
    episodeTitle: "Cold Shock Proteins & Heat Shock Response",
    description: "Research-focused discussions on micronutrients, genetics, and the biological mechanisms behind longevity interventions.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com/show/5x8r9G8fDBICqBlQVUHI1l",
    category: "Science",
  },
  {
    id: 5,
    name: "The Gary Brecka Podcast",
    host: "Gary Brecka",
    episodeTitle: "30-30-30 Breathwork Protocol & Morning Routines",
    description: "Human biologist Gary Brecka shares insights on gene testing, biohacking, and simple protocols for optimizing health and performance.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com/show/1a2G6j5gFCl7CVnmwpbCe2",
    category: "Biohacking",
  },
  {
    id: 6,
    name: "The Model Health Show",
    host: "Shawn Stevenson",
    episodeTitle: "Sleep Optimization & Circadian Rhythm Mastery",
    description: "Evidence-based strategies for improving sleep quality, fitness, and overall health through lifestyle and nutrition changes.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com/show/5bJQRBq1HbMl5r6fCVAOqS",
    category: "Sleep",
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

      {/* Podcasts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold/90 text-primary text-xs font-semibold rounded-full">
                      {podcast.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {podcast.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Hosted by {podcast.host}
                    </p>
                  </div>

                  <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                    {podcast.episodeTitle}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {podcast.description}
                  </p>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <a href={podcast.spotifyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Listen Now
                    </a>
                  </Button>
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
