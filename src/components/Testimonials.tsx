import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import danaWhiteImage from "@/assets/dana-white-interview.png";
import wimHofImage from "@/assets/wimhof-breathing.jpg";
import garyBreckaImage from "@/assets/gary-brecka-real.jpg";
import hubermanImage from "@/assets/huberman-brain-body.jpg";
import attiaImage from "@/assets/podcast-attia.jpg";
import sinclairImage from "@/assets/sinclair-aging.jpg";

const testimonials = [
  {
    name: "DANA WHITE",
    title: "UFC President",
    image: danaWhiteImage,
    content: "I was on blood pressure medicine, thyroid medicine, and cholesterol medicine. I am on nothing now except Gary Brecka said to do...so I'm off all these meds I've been on for 12 years, and I lost 40lbs.",
  },
  {
    name: "GARY BRECKA",
    title: "Human Biologist & Performance Coach",
    image: garyBreckaImage,
    content: "Your genes are not your destiny. With the right methylation support, hydrogen water, and targeted supplementation, you can completely transform your health in 90 days.",
  },
  {
    name: "ANDREW HUBERMAN",
    title: "Stanford Neuroscientist",
    image: hubermanImage,
    content: "Morning sunlight, cold exposure, and proper sleep hygiene cost nothing. Add quality supplements and you have a complete optimization protocol.",
  },
  {
    name: "DR. PETER ATTIA",
    title: "Longevity Physician",
    image: attiaImage,
    content: "Zone 2 cardio, strength training, sleep optimization, and targeted supplementation. These are the pillars of extending healthspan, not just lifespan.",
  },
  {
    name: "DR. DAVID SINCLAIR",
    title: "Harvard Geneticist & Aging Researcher",
    image: sinclairImage,
    content: "We now have the science to slow and even reverse aspects of aging. NMN, resveratrol, and fasting are tools that activate your longevity genes.",
  },
  {
    name: "WIM HOF",
    title: "The Iceman",
    image: wimHofImage,
    content: "The cold is your teacher. Combined with breathwork, it activates your body's natural healing response. This is not belief—this is science.",
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
                {currentTestimonial.title && (
                  <p className="text-muted-foreground text-sm mt-1">
                    {currentTestimonial.title}
                  </p>
                )}
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
