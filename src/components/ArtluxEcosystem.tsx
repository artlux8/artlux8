import { Link } from "react-router-dom";
import { Pill, Droplets, Snowflake, Zap } from "lucide-react";

const ecosystemCards = [
  {
    icon: Pill,
    title: "Supplements",
    description: "NAD+, Mito Power, Lipo Detox & Mind Focus",
    link: "/shop",
    color: "from-gold/20 to-gold/5"
  },
  {
    icon: Droplets,
    title: "Hydrogen Water",
    description: "Medical-grade hydrogen bottles GO & PRO",
    link: "/hydrogen-water-bottles",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Snowflake,
    title: "Cold Plunge",
    description: "Cold exposure therapy systems",
    link: "/cold-plunge",
    color: "from-cyan-500/20 to-cyan-500/5"
  },
  {
    icon: Zap,
    title: "Grounding & Red Light",
    description: "Inflammation reduction & cellular repair",
    link: "/grounding",
    color: "from-amber-500/20 to-amber-500/5"
  }
];

const ArtluxEcosystem = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
            The ARTLUX<span className="logo-infinity">∞</span> Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete longevity system designed to optimize every aspect of your healthspan
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {ecosystemCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group relative bg-card rounded-2xl border border-border hover:border-gold/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <card.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtluxEcosystem;