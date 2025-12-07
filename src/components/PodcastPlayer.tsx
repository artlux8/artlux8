import { useState } from "react";
import { Play, Video, ExternalLink } from "lucide-react";
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
  youtubeUrl: string;
  category: string;
  youtubeEmbedId?: string;
}

const PodcastPlayer = ({
  name,
  host,
  episodeTitle,
  description,
  image,
  youtubeUrl,
  category,
  youtubeEmbedId,
}: PodcastPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
            onClick={() => setIsOpen(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white ml-1" />
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

          <Button
            size="sm"
            className="w-full bg-red-600 hover:bg-red-600/90 text-white"
            onClick={() => setIsOpen(true)}
          >
            <Video className="w-3 h-3 mr-1" />
            Watch on YouTube
          </Button>
        </div>
      </div>

      {/* Embedded Player Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-card border-gold/20">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg font-semibold text-foreground">
              {name} - {episodeTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {youtubeEmbed ? (
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
                <Button asChild className="bg-red-600 hover:bg-red-600/90 text-white">
                  <a 
                    href={youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in YouTube
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
