import { useState } from "react";
import { Play, Music, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PodcastPlayerProps {
  name: string;
  host: string;
  episodeTitle: string;
  description: string;
  image: string;
  spotifyUrl: string;
  youtubeUrl?: string;
  category: string;
  spotifyEmbedId?: string;
  youtubeEmbedId?: string;
}

const PodcastPlayer = ({
  name,
  host,
  episodeTitle,
  description,
  image,
  spotifyUrl,
  youtubeUrl,
  category,
  spotifyEmbedId,
  youtubeEmbedId,
}: PodcastPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePlayer, setActivePlayer] = useState<"spotify" | "youtube">("spotify");

  const handleOpenPlayer = (player: "spotify" | "youtube") => {
    setActivePlayer(player);
    setIsOpen(true);
  };

  // Extract Spotify show/episode ID from URL if not provided
  const getSpotifyEmbedUrl = () => {
    if (spotifyEmbedId) {
      return `https://open.spotify.com/embed/show/${spotifyEmbedId}?utm_source=generator&theme=0`;
    }
    // Try to extract from URL
    const showMatch = spotifyUrl.match(/show\/([a-zA-Z0-9]+)/);
    const episodeMatch = spotifyUrl.match(/episode\/([a-zA-Z0-9]+)/);
    if (episodeMatch) {
      return `https://open.spotify.com/embed/episode/${episodeMatch[1]}?utm_source=generator&theme=0`;
    }
    if (showMatch) {
      return `https://open.spotify.com/embed/show/${showMatch[1]}?utm_source=generator&theme=0`;
    }
    return null;
  };

  // Extract YouTube video ID from URL if not provided
  const getYoutubeEmbedUrl = () => {
    if (youtubeEmbedId) {
      return `https://www.youtube.com/embed/${youtubeEmbedId}`;
    }
    if (!youtubeUrl) return null;
    const videoMatch = youtubeUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (videoMatch) {
      return `https://www.youtube.com/embed/${videoMatch[1]}`;
    }
    return null;
  };

  const spotifyEmbed = getSpotifyEmbedUrl();
  const youtubeEmbed = getYoutubeEmbedUrl();

  return (
    <>
      <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300">
        {/* Podcast Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Play Button Overlay */}
          <button
            onClick={() => handleOpenPlayer(youtubeEmbed ? "youtube" : "spotify")}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gold/90 text-primary text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-3">
            <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {host}
            </p>
          </div>

          <h4 className="font-medium text-foreground mb-2 line-clamp-2 text-sm">
            {episodeTitle}
          </h4>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white"
              onClick={() => handleOpenPlayer("spotify")}
            >
              <Music className="w-3 h-3 mr-1" />
              Spotify
            </Button>
            {youtubeUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-red-500/50 text-foreground hover:bg-red-500/10"
                onClick={() => handleOpenPlayer("youtube")}
              >
                <Video className="w-3 h-3 mr-1" />
                YouTube
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Player Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-card border-gold/20">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-foreground">
                {name} - {episodeTitle}
              </DialogTitle>
            </div>
            {/* Player Toggle */}
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant={activePlayer === "spotify" ? "default" : "outline"}
                className={activePlayer === "spotify" ? "bg-[#1DB954] hover:bg-[#1DB954]/90 text-white" : ""}
                onClick={() => setActivePlayer("spotify")}
              >
                <Music className="w-4 h-4 mr-2" />
                Spotify
              </Button>
              {youtubeEmbed && (
                <Button
                  size="sm"
                  variant={activePlayer === "youtube" ? "default" : "outline"}
                  className={activePlayer === "youtube" ? "bg-red-600 hover:bg-red-600/90 text-white" : ""}
                  onClick={() => setActivePlayer("youtube")}
                >
                  <Video className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
              )}
            </div>
          </DialogHeader>

          <div className="p-4">
            {activePlayer === "spotify" && spotifyEmbed ? (
              <iframe
                src={spotifyEmbed}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            ) : activePlayer === "youtube" && youtubeEmbed ? (
              <div className="aspect-video">
                <iframe
                  src={youtubeEmbed}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <p className="mb-4">Embedded player not available</p>
                <Button asChild className="bg-gold hover:bg-gold/90 text-primary">
                  <a 
                    href={activePlayer === "youtube" ? youtubeUrl : spotifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open in {activePlayer === "youtube" ? "YouTube" : "Spotify"}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PodcastPlayer;
