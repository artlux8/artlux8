import { Gift, Sparkles, TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ChristmasBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-900 via-red-800 to-green-900">
      {/* Animated snowflakes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-gold/30" />
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Message */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="hidden md:flex items-center gap-2">
              <TreePine className="w-6 h-6 text-green-400" />
              <Gift className="w-8 h-8 text-gold animate-bounce" />
              <TreePine className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-display text-lg md:text-xl font-bold tracking-wide">
                🎄 CHRISTMAS GIFT BUNDLES 🎁
              </h3>
              <p className="text-red-200 text-sm md:text-base">
                Give the gift of longevity — <span className="text-gold font-semibold">Save up to 25%</span> on Protocol Bundles
              </p>
            </div>
          </div>
          
          {/* Right side - CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-gold font-semibold text-sm">Limited Time Offer</p>
              <p className="text-white/70 text-xs">Free Gift Wrapping Available</p>
            </div>
            <Link to="/shop">
              <Button 
                className="bg-gold hover:bg-gold-light text-primary-900 font-semibold px-6 py-2 shadow-lg hover:shadow-gold/30 transition-all"
              >
                <Gift className="w-4 h-4 mr-2" />
                Shop Gift Bundles
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
};

export default ChristmasBanner;
