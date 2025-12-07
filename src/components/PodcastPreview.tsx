import { Headphones, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import podcastGaryBrecka from "@/assets/podcast-gary-brecka.jpg";
import podcastHuberman from "@/assets/podcast-huberman.jpg";
import podcastAttia from "@/assets/podcast-attia.jpg";
import podcastWimhof from "@/assets/podcast-wimhof.jpg";

const podcasts = [
  {
    id: 1,
    image: podcastGaryBrecka,
    title: "The Ultimate Human",
    host: "Gary Brecka",
    category: "Biohacking",
    description: "Gene testing, breathwork, and the protocols that transformed Dana White.",
    youtubeUrl: "https://www.youtube.com/watch?v=oWu9TFJjHaM",
  },
  {
    id: 2,
    image: podcastHuberman,
    title: "Huberman Lab",
    host: "Dr. Andrew Huberman",
    category: "Neuroscience",
    description: "Stanford neuroscientist on cold exposure, dopamine, and performance.",
    youtubeUrl: "https://www.youtube.com/watch?v=pq6WHJzOkno",
  },
  {
    id: 3,
    image: podcastAttia,
    title: "The Peter Attia Drive",
    host: "Dr. Peter Attia",
    category: "Longevity",
    description: "Deep dive into longevity science and medicine 3.0 protocols.",
    youtubeUrl: "https://www.youtube.com/watch?v=tGLYLyHk5ck",
  },
  {
    id: 4,
    image: podcastWimhof,
    title: "The Wim Hof Method",
    host: "Wim Hof",
    category: "Cold Exposure",
    description: "The Iceman on breathwork, cold mastery, and pushing human limits.",
    youtubeUrl: "https://www.youtube.com/watch?v=JPflvEqLA3s",
  },
];

const PodcastPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-900 to-primary-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Headphones className="w-6 h-6 text-gold" />
            <span className="text-gold font-semibold tracking-widest uppercase text-sm">
              Curated Content
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            ARTLUX<span className="text-gold">∞</span> Listening Room
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn from the world's leading longevity experts. Curated podcasts on biohacking, 
            performance optimization, and the science behind the ARTLUX Protocol.
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
              className="group relative overflow-hidden rounded-xl bg-primary-800/50 hover:bg-primary-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
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
                <h3 className="font-display font-bold text-white text-sm md:text-base mb-1 line-clamp-1">
                  {podcast.title}
                </h3>
                <p className="text-gray-400 text-xs mb-2">{podcast.host}</p>
                <p className="text-gray-500 text-xs line-clamp-2 hidden md:block">
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
              className="border-gold text-gold hover:bg-gold hover:text-primary-900 transition-all"
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
