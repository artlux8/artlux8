import { CheckCircle, Moon, Utensils, Dumbbell, Users, X, Droplets } from "lucide-react";

const habits = [
  {
    icon: Moon,
    title: "SLEEP",
    description: "8+ hours consistent, high quality sleep is your #1 life priority.",
  },
  {
    icon: Utensils,
    title: "DIET",
    description: "Whole foods, time-restricted eating, caloric optimization.",
  },
  {
    icon: Dumbbell,
    title: "EXERCISE",
    description: "6 hours a week. Strength, cardio, flexibility and balance.",
  },
  {
    icon: Users,
    title: "RELATIONSHIPS",
    description: "Actively foster meaningful connections for emotional health.",
  },
  {
    icon: X,
    title: "THINGS TO AVOID",
    description: "No junk food, smoking, vaping, excessive alcohol.",
  },
];

const stats = [
  { label: "Speed of aging", value: "Top 1%" },
  { label: "Muscle mass function", value: "Top 1%" },
  { label: "Fat mass", value: "Top 1%" },
  { label: "Inflammation", value: "Top 1%" },
  { label: "Cardiovascular", value: "Top 1%" },
  { label: "Sleep quality", value: "Top 1%" },
];

const Science = () => {
  return (
    <section id="science" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Protocol Stats Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Content */}
          <div>
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-4">
              The Protocol
            </p>
            <h2 className="font-logo text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Blueprint for <span className="text-gold">Optimal Health</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              After analyzing thousands of longevity studies and protocols from the world's leading experts, 
              we've distilled the science into actionable, evidence-based practices that deliver measurable results.
            </p>
            <p className="text-muted-foreground mb-8">
              Our protocols and supplements are designed to help you achieve top-tier biomarkers 
              across all measurable health metrics. The 20% of things that account for 80% of the benefits.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
                  <span className="text-gold font-bold text-sm">{stat.value}</span>
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
                alt="Health optimization"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-gold" />
                </div>
                <span className="font-semibold text-foreground">Evidence-Based</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Every protocol backed by 500+ peer-reviewed clinical studies.
              </p>
            </div>
          </div>
        </div>

        {/* Master These 5 Habits Section */}
        <div className="text-center mb-12">
          <h3 className="font-logo text-2xl md:text-4xl font-bold text-foreground mb-4">
            Master These 5 Habits
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The scientific evidence points at mastering the basics. These fundamentals 
            form the foundation of every longevity protocol.
          </p>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {habits.map((habit) => (
            <div 
              key={habit.title} 
              className="bg-card border border-border/50 rounded-2xl p-6 text-center hover:border-gold/30 transition-colors group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <habit.icon className="w-7 h-7 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-2 tracking-wide">
                {habit.title}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {habit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Water Section */}
        <div className="mt-16 bg-card border border-border/50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-logo text-xl font-semibold text-foreground">Clean Water</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Proper hydration is foundational. Your body is 60% water, and even mild dehydration 
                impairs cognitive function and physical performance.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Drink 2-3 liters of filtered water daily
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Add electrolytes for optimal absorption
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Avoid plastic containers when possible
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "2-3L", label: "Daily Water" },
                { value: "60%", label: "Body Composition" },
                { value: "10x", label: "Performance Impact" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-secondary rounded-xl">
                  <div className="text-2xl font-bold text-gold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;