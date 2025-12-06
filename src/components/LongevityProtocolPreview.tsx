import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Clock, Moon, ArrowRight } from "lucide-react";

const protocolTimes = [
  {
    icon: Sun,
    time: "Morning",
    items: ["NAD+ Booster", "Mito Power"],
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    icon: Clock,
    time: "Day",
    items: ["Lipo Detox", "Omega-3", "Curcumin"],
    color: "from-gold/20 to-yellow-500/20"
  },
  {
    icon: Moon,
    time: "Night",
    items: ["Mind Focus", "Glycine", "Magnesium"],
    color: "from-indigo-500/20 to-purple-500/20"
  }
];

const LongevityProtocolPreview = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm tracking-widest uppercase font-medium">
              Your Daily Anti-Aging System
            </span>
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              The Longevity Protocol
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A science-backed morning-to-night protocol designed to optimize NAD+, 
              reduce inflammation, and activate autophagy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {protocolTimes.map((protocol, index) => (
              <div 
                key={index}
                className={`relative bg-gradient-to-br ${protocol.color} rounded-2xl border border-border p-6 text-center`}
              >
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mx-auto mb-4">
                  <protocol.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-foreground font-semibold text-xl mb-4">{protocol.time}</h3>
                <ul className="space-y-2">
                  {protocol.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
              <Link to="/longevity-protocol">
                Explore Full Protocol
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongevityProtocolPreview;