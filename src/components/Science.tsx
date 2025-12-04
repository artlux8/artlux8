import { CheckCircle, Beaker, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Beaker,
    title: "Clinically Tested",
    description: "Every formula is backed by peer-reviewed research and clinical trials.",
  },
  {
    icon: Shield,
    title: "Third-Party Verified",
    description: "Independent labs test for purity, potency, and safety.",
  },
  {
    icon: Award,
    title: "Bioavailable Forms",
    description: "We use the most absorbable forms of each ingredient.",
  },
];

const Science = () => {
  return (
    <section id="science" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
              The Science
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Fully Supported by Science & Research
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              We don't follow trends. Every product in our lineup is formulated based on 
              the latest scientific evidence and optimized for maximum bioavailability.
            </p>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop"
                alt="Laboratory research"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <span className="font-semibold text-foreground">Quality Guaranteed</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Made in FDA-registered facilities following strict GMP guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;