import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Integrative Medicine Physician",
    content: "The formulations are pharmaceutical-grade. I've seen remarkable improvements in my patients' biomarkers—inflammation markers down, energy up. This is what evidence-based supplementation looks like.",
    rating: 5,
  },
  {
    name: "Marcus Thompson",
    role: "Biohacker & Entrepreneur",
    content: "I've tried everything. These protocols actually move the needle. My biological age tests show I'm aging slower than my chronological age. The Longevity Stack is non-negotiable.",
    rating: 5,
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Longevity Researcher",
    content: "Finally, a company that understands bioavailability and dosing. The methylated B-vitamins and NMN quality are comparable to what we use in clinical trials. Highly recommend.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold-light font-medium text-sm tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-logo text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Trusted by Biohackers & Physicians
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Join thousands of high performers optimizing their healthspan with science-backed protocols.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:border-gold/30 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-gold/40 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-primary-foreground/90 text-base mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-primary-foreground">{testimonial.name}</p>
                <p className="text-gold-light/70 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;