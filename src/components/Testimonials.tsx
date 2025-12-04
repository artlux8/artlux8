import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Integrative Medicine Physician",
    content: "These are the only supplements I recommend to my patients. The quality and transparency are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Professional Athlete",
    content: "Since starting the performance protocol, my recovery time has improved dramatically. I feel unstoppable.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Tech Executive",
    content: "Finally found something that actually works. More energy, better focus, and I'm sleeping better than ever.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Join the community of high performers who have transformed their health.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-primary-foreground">{testimonial.name}</p>
                <p className="text-primary-foreground/60 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;