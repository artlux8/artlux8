import { Headphones, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import garyBreckaThumbnail from "@/assets/gary-brecka-real.jpg";
import garyBreckaJoeRogan from "@/assets/gary-brecka-joe-rogan.jpg";
import ultimateHumanDiet from "@/assets/ultimate-human-diet.jpg";
import ultimateHumanSupplements from "@/assets/ultimate-human-supplements.jpg";

const podcasts = [
  {
    id: 1,
    image: garyBreckaJoeRogan,
    title: "Joe Rogan Experience #2304",
    host: "Joe Rogan & Gary Brecka",
    category: "Biohacking",
    description: "Gary Brecka on longevity, breathwork, and the science of human optimization.",
    youtubeUrl: "https://www.youtube.com/watch?v=nhC8lLPpGl4",
  },
  {
    id: 2,
    image: ultimateHumanDiet,
    title: "Diet Myths & Creatine",
    host: "Gary Brecka",
    category: "Nutrition",
    description: "The real secret to longevity: avoiding processed foods and mastering the basics.",
    youtubeUrl: "https://www.youtube.com/watch?v=4dET0o0AK2I",
  },
  {
    id: 3,
    image: ultimateHumanSupplements,
    title: "Stop Guessing Supplements",
    host: "Gary Brecka",
    category: "Supplements",
    description: "Your immune system isn't attacking you for no reason. Find out what's really happening.",
    youtubeUrl: "https://www.youtube.com/watch?v=ZlvhOOD1kjw",
  },
  {
    id: 4,
    image: garyBreckaThumbnail,
    title: "AI Health Breakthroughs",
    host: "Gary Brecka & Peter",
    category: "Technology",
    description: "The most important bio hacks and health tech gadgets for living longer.",
    youtubeUrl: "https://www.youtube.com/watch?v=HR4oWQuCXSA",
  },
];

const PodcastPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Headphones className="w-6 h-6 text-gold" />
            <span className="text-gold font-semibold tracking-widest uppercase text-sm">
              The Ultimate Human Podcast
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            ARTLUX<span className="text-gold">∞</span> Listening Room
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from Gary Brecka's Ultimate Human Podcast. Curated episodes on biohacking, 
            performance optimization, and the science behind longevity.
          </p>
        </div>

        {/* Podcast Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {podcasts.map((podcast) => (
            <a
              key={podcast.id}
              href={podcast.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-gold/20 text-gold rounded-full mb-2">
                  {podcast.category}
                </span>
                <h3 className="font-display font-bold text-foreground text-sm md:text-base mb-1 line-clamp-1">
                  {podcast.title}
                </h3>
                <p className="text-muted-foreground text-xs mb-2">{podcast.host}</p>
                <p className="text-muted-foreground/70 text-xs line-clamp-2 hidden md:block">
                  {podcast.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/podcast">
            <Button 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-primary transition-all"
            >
              <Headphones className="w-4 h-4 mr-2" />
              Explore All Episodes
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PodcastPreview;
