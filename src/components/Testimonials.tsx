import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import danaWhiteImage from "@/assets/dana-white-interview.png";
import wimHofImage from "@/assets/wimhof-breathing.jpg";

const testimonials = [
  {
    name: "DANA WHITE",
    title: "UFC President",
    image: danaWhiteImage,
    content: "I was on blood pressure medicine, thyroid medicine, and cholesterol medicine. I am on nothing now except Gary Brecka said to do...so I'm off all these meds I've been on for 12 years, and I lost 40lbs.",
  },
  {
    name: "JOE ROGAN",
    title: "Podcast Host & Comedian",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    content: "I do cold plunge every single morning. The mental clarity you get from that 3 minutes of discomfort is unmatched. It sets the tone for everything else.",
  },
  {
    name: "DR. RHONDA PATRICK",
    title: "Biomedical Scientist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    content: "Sulforaphane, omega-3s, and vitamin D are the foundation. But what matters most is consistency and quality. Your mitochondria will thank you.",
  },
  {
    name: "BEN GREENFIELD",
    title: "Biohacker & Author",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    content: "I test everything on myself first. Hydrogen water, red light therapy, grounding—these aren't trends, they're tools backed by real science.",
  },
  {
    name: "DAVE ASPREY",
    title: "Father of Biohacking",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    content: "I spent over $2 million hacking my own biology. The ROI on quality supplements and protocols is the best investment you can make.",
  },
  {
    name: "DR. PETER ATTIA",
    title: "Longevity Physician",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    content: "Zone 2 cardio, strength training, sleep optimization, and targeted supplementation. These are the pillars of extending healthspan, not just lifespan.",
  },
  {
    name: "ANDREW HUBERMAN",
    title: "Stanford Neuroscientist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    content: "Morning sunlight, cold exposure, and proper sleep hygiene cost nothing. Add quality supplements and you have a complete optimization protocol.",
  },
  {
    name: "WIM HOF",
    title: "The Iceman",
    image: wimHofImage,
    content: "The cold is your teacher. Combined with breathwork, it activates your body's natural healing response. This is not belief—this is science.",
  },
  {
    name: "LAIRD HAMILTON",
    title: "Big Wave Surfer",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face",
    content: "At 60, I perform better than I did at 40. Hydrogen water, sauna, ice baths, and clean supplementation are my daily non-negotiables.",
  },
  {
    name: "GABBY REECE",
    title: "Pro Volleyball & Wellness Advocate",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    content: "Recovery is where the magic happens. Quality sleep, magnesium, and stress management have transformed how I age and perform.",
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
