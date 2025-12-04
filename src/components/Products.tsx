import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    title: "Supplements",
    description: "Pharmaceutical-grade formulas backed by clinical research",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Health Tests",
    description: "Comprehensive at-home testing for actionable insights",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Protocols",
    description: "Personalized routines designed by longevity experts",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Skincare",
    description: "Advanced formulas that fight aging at the cellular level",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
];

const Products = () => {
  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            Our Products
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Shop By Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to optimize your health and unlock your full potential.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <a
              key={product.title}
              href={product.link}
              className="group relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5] flex flex-col justify-end transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                  {product.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm mb-4">
                  {product.description}
                </p>
                <span className="inline-flex items-center text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;