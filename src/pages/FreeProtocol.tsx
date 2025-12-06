import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import hydrogenBottleLuxury from "@/assets/hydrogen-bottle-luxury.png";
import hydrogenBottleStandard from "@/assets/hydrogen-bottle-standard.png";
import FreeProtocolContent from "@/components/FreeProtocolContent";
// Validation schema for form inputs
const protocolFormSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(5, "Please enter a valid phone number").max(20, "Phone number is too long").regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number"),
  shippingAddress: z.string().trim().min(5, "Please enter a valid address").max(200, "Address is too long"),
  shippingCity: z.string().trim().min(2, "Please enter a valid city").max(100, "City name is too long"),
  shippingCountry: z.string().trim().min(2, "Please enter a valid country").max(100, "Country name is too long"),
  shippingPostalCode: z.string().trim().min(2, "Please enter a valid postal code").max(20, "Postal code is too long"),
  age: z.string().regex(/^\d+$/, "Age must be a number"),
  motivation: z.string().trim().max(1000, "Motivation text is too long").optional(),
  termsAccepted: z.boolean(),
  medicalDisclaimer: z.boolean(),
});
import {
  Sun,
  Snowflake,
  Wind,
  Footprints,
  Moon,
  Gift,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Trophy,
} from "lucide-react";

const habits = [
  {
    icon: Sun,
    title: "Consistent Wake-Up Before Sunrise",
    description: "Wake up at the same time every day, before sunrise in your location. This anchors your circadian rhythm and supports optimal hormones & sleep.",
  },
  {
    icon: Snowflake,
    title: "Cold Exposure – 3 Minutes",
    description: "Every day, do 3 minutes under cold water (cold shower or cold plunge). Focus on breathing calmly; this builds resilience and nervous system strength.",
  },
  {
    icon: Wind,
    title: "Breathwork – 30×30×30 (Gary Brecka Style)",
    description: "Immediately after cold exposure: 30 deep breaths (in through nose, out through mouth), hold after exhale, repeat for 3 rounds. Boosts oxygenation, clarity, and energy.",
  },
  {
    icon: Footprints,
    title: "Grounding – 3 Minutes Barefoot",
    description: "Spend 3 minutes barefoot outside, on grass, earth, sand, or stone. No phone, no distractions – just connection with the ground and breathing.",
  },
  {
    icon: Moon,
    title: "Sleep & Lifestyle Foundation",
    description: "No all-nighters, no excessive alcohol. Aim for 7–9 hours of sleep, preferably with no screens 30–60 minutes before bed.",
  },
];

const FreeProtocol = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "",
    shippingPostalCode: "",
    age: "",
    motivation: "",
    termsAccepted: false,
    medicalDisclaimer: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinProtocol = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to join the protocol");
      navigate("/auth");
      return;
    }

    // Validate form data with Zod schema
    const validationResult = protocolFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    if (!formData.termsAccepted || !formData.medicalDisclaimer) {
      toast.error("Please accept all terms and conditions");
      return;
    }

    const age = parseInt(formData.age);
    if (age < 18) {
      toast.error("You must be at least 18 years old to join");
      return;
    }

    setIsSubmitting(true);

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          shipping_address: formData.shippingAddress,
          shipping_city: formData.shippingCity,
          shipping_country: formData.shippingCountry,
          shipping_postal_code: formData.shippingPostalCode,
          age: age,
          motivation: formData.motivation,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Create challenge enrollment
      const { error: enrollmentError } = await supabase
        .from("challenge_enrollments")
        .insert({
          user_id: user.id,
          terms_accepted: formData.termsAccepted,
          medical_disclaimer_accepted: formData.medicalDisclaimer,
        });

      if (enrollmentError) {
        if (enrollmentError.code === "23505") {
          toast.error("You are already enrolled in the challenge!");
          navigate("/dashboard/challenge");
          return;
        }
        throw enrollmentError;
      }

      toast.success("Welcome to the ARTLUX Protocol! Your journey begins now.");
      navigate("/dashboard/challenge");
    } catch (error) {
      console.error("Error joining protocol:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-secondary/50 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm tracking-widest uppercase font-medium">
                Free Challenge
              </span>
            </div>
            
            <h1 className="font-logo text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              FREE ARTLUX<span className="logo-infinity">∞</span> PROTOCOL
              <span className="block text-gold mt-2 text-3xl md:text-4xl">
                7-Day Luxury Longevity Challenge
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Upgrade your habits with cold exposure, breathwork, grounding, and sleep – 
              and earn a <span className="text-gold font-semibold">FREE ARTLUX branded hydrogen water bottle</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-primary font-semibold px-8"
                onClick={() => document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Free Protocol
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              {!user && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold/50 text-foreground hover:bg-gold/10"
                  onClick={() => navigate("/auth")}
                >
                  Log In to Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Long-form Protocol Content */}
      <FreeProtocolContent />

      {/* Good Habits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
              What is the ARTLUX Free Protocol?
            </h2>
            <p className="text-muted-foreground text-lg">
              A 7-day habit challenge based on what our founder practices daily. 
              These science-backed habits form the foundation of longevity.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {habits.map((habit, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-card rounded-2xl border border-border hover:border-gold/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <habit.icon className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {index + 1}. {habit.title}
                  </h3>
                  <p className="text-muted-foreground">{habit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Rules Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
                How the 7-Day Challenge Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <Clock className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Duration</h3>
                <p className="text-muted-foreground text-sm">7 consecutive days of commitment</p>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Daily Tasks</h3>
                <p className="text-muted-foreground text-sm">Complete ALL 5 habits every day</p>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <Trophy className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Proof Upload</h3>
                <p className="text-muted-foreground text-sm">Record daily video/photo evidence</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="font-semibold text-lg text-foreground mb-4">Daily Requirements:</h3>
              <ul className="space-y-3">
                {[
                  "Wake up at the same time before sunrise in your location",
                  "3 minutes of cold water (shower or plunge)",
                  "3 rounds of 30× breathwork (Gary Brecka style)",
                  "3 minutes of barefoot grounding outdoors",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-6 h-6 text-gold" />
                  <span className="text-gold text-sm tracking-widest uppercase font-medium">
                    Your Reward
                  </span>
                </div>
                <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
                  ARTLUX<span className="logo-infinity">∞</span> Hydrogen Water Bottle
                </h2>
                <p className="text-muted-foreground mb-6">
                  Complete all 7 days with valid proofs and receive a premium ARTLUX-branded 
                  hydrogen water bottle – absolutely free. Designed for the longevity-focused lifestyle.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Premium quality, branded design",
                    "Hydrogen-generating technology",
                    "One bottle per person",
                    "Free for challenge completers",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">
                  * Shipping costs may apply depending on your region.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="bg-secondary/50 rounded-3xl p-6 flex flex-col items-center justify-center animate-fade-in hover-scale">
                  <img 
                    src={hydrogenBottleLuxury} 
                    alt="ARTLUX Luxury Hydrogen Water Bottle" 
                    className="w-full max-w-[200px] h-auto object-contain mb-3"
                  />
                  <p className="text-gold font-semibold text-sm">Luxury Edition</p>
                </div>
                <div className="bg-secondary/50 rounded-3xl p-6 flex flex-col items-center justify-center animate-fade-in hover-scale" style={{ animationDelay: '0.2s' }}>
                  <img 
                    src={hydrogenBottleStandard} 
                    alt="ARTLUX Standard Hydrogen Water Bottle" 
                    className="w-full max-w-[200px] h-auto object-contain mb-3"
                  />
                  <p className="text-muted-foreground font-semibold text-sm">Standard Edition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="join-form" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join the Free Protocol
              </h2>
              <p className="text-muted-foreground">
                Start your 7-day luxury longevity journey today.
              </p>
            </div>

            {!user ? (
              <div className="bg-card rounded-2xl border border-border p-8 text-center">
                <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  Create an Account to Join
                </h3>
                <p className="text-muted-foreground mb-6">
                  Sign up or log in to start your ARTLUX Protocol journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate("/auth?mode=signup")}
                    className="bg-gold hover:bg-gold/90 text-primary font-semibold"
                  >
                    Sign Up to Join
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/auth")}
                    className="border-gold/50 hover:bg-gold/10"
                  >
                    Log In
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoinProtocol} className="bg-card rounded-2xl border border-border p-8">
                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || user.email || ""}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="18"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shippingAddress">Shipping Address *</Label>
                    <Input
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingCountry">Country *</Label>
                      <Input
                        id="shippingCountry"
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingPostalCode">Postal Code *</Label>
                      <Input
                        id="shippingPostalCode"
                        name="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to join the ARTLUX Protocol? *</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="mt-1"
                      placeholder="Share your motivation for joining..."
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="medicalDisclaimer"
                        checked={formData.medicalDisclaimer}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, medicalDisclaimer: checked as boolean })
                        }
                      />
                      <Label htmlFor="medicalDisclaimer" className="text-sm text-muted-foreground leading-relaxed">
                        I confirm I am over 18 and understand this is not medical advice. I will consult my doctor before starting any new cold exposure, breathwork, or physical routine.
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, termsAccepted: checked as boolean })
                        }
                      />
                      <Label htmlFor="termsAccepted" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the Challenge Terms & Conditions and Privacy Policy.
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold/90 text-primary font-semibold h-12 text-lg"
                  >
                    {isSubmitting ? "Joining..." : "Start My 7-Day Protocol"}
                  </Button>
                </div>
              </form>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-8 max-w-lg mx-auto">
              The ARTLUX Protocol is a free wellness habit challenge and does not constitute medical advice. 
              Always consult your doctor before starting any new cold exposure, breathwork, or physical routine, 
              especially if you have cardiovascular, respiratory, or other health conditions.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeProtocol;
