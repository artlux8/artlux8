import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import danaWhiteImage from "@/assets/dana-white-interview.png";

const testimonials = [
  {
    name: "DANA WHITE",
    image: danaWhiteImage,
    content: "I was on blood pressure medicine, thyroid medicine, and cholesterol medicine. I am on nothing now except [ARTLUX∞] supplements...so I'm off all these meds I've been on for 12 years, and I lost 40lbs.",
  },
  {
    name: "DR. SARAH CHEN",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    content: "The formulations are pharmaceutical-grade. I've seen remarkable improvements in my patients' biomarkers—inflammation markers down, energy up. This is what evidence-based supplementation looks like.",
  },
  {
    name: "MARCUS THOMPSON",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    content: "I've tried everything. These protocols actually move the needle. My biological age tests show I'm aging slower than my chronological age. The Longevity Stack is non-negotiable.",
  },
  {
    name: "DR. EMILY RODRIGUEZ",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    content: "Finally, a company that understands bioavailability and dosing. The methylated B-vitamins and NMN quality are comparable to what we use in clinical trials. Highly recommend.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-8">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:border-foreground/40 hover:bg-foreground/5 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Testimonial Content */}
            <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
              {/* Circular Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-lg">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Quote and Name */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6">
                  "{currentTestimonial.content}"
                </p>
                <p className="font-bold text-foreground text-lg tracking-wide">
                  {currentTestimonial.name}
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:border-foreground/40 hover:bg-foreground/5 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-gold w-6"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
