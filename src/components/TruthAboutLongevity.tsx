import { XCircle, CheckCircle } from "lucide-react";

const pharmaLies = [
  "No one teaches autophagy",
  "No one teaches NAD+",
  "No one teaches epigenetics",
  "No one teaches cold exposure",
  "No one teaches clean supplements"
];

const artluxTruths = [
  "Autophagy activates cellular healing",
  "NAD+ is the key to energy & aging",
  "Your genes can be optimized",
  "Cold exposure reduces inflammation",
  "Clean supplements change lives"
];

const TruthAboutLongevity = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              The Truth Big Pharma Doesn't Want You To Know
            </h2>
            <p className="text-3xl font-bold text-gold">
              Sickness is profitable. Health is not.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pharma Side */}
            <div className="bg-primary-foreground/5 rounded-2xl border border-destructive/30 p-6">
              <h3 className="text-destructive font-semibold text-lg mb-6 text-center">
                What Big Pharma Hides
              </h3>
              <ul className="space-y-4">
                {pharmaLies.map((lie, index) => (
                  <li key={index} className="flex items-center gap-3 text-primary-foreground/70">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    {lie}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* ARTLUX Side */}
            <div className="bg-gold/10 rounded-2xl border border-gold/30 p-6">
              <h3 className="text-gold font-semibold text-lg mb-6 text-center">
                What ARTLUX∞ Teaches
              </h3>
              <ul className="space-y-4">
                {artluxTruths.map((truth, index) => (
                  <li key={index} className="flex items-center gap-3 text-primary-foreground">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    {truth}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="text-center text-gold font-logo text-2xl font-bold mt-12">
            ARTLUX∞ exists to break that cycle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TruthAboutLongevity;