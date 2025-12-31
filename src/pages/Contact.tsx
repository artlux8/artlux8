import { useEffect } from "react";
import HeaderMinimal from "@/components/HeaderMinimal";
import Footer from "@/components/Footer";
import { Mail, MapPin, Building2 } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact – ARTLUX LTD";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Contact ARTLUX LTD - Premium longevity supplements company based in Birmingham, United Kingdom.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderMinimal />
      
      {/* Contact Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {/* Company Name */}
            <div className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                ARTLUX LTD
              </h1>
              <p className="text-muted-foreground">
                Company No: 12280833
              </p>
            </div>

            {/* Address */}
            <div className="mb-8 p-6 bg-card rounded-xl border border-border">
              <div className="flex items-start justify-center gap-3 text-left">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-foreground">
                  <p>92 Markby Road, Birmingham</p>
                  <p>West Midlands, B18 4PN</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a 
                  href="mailto:hello@artlux8.com" 
                  className="text-foreground hover:text-accent transition-colors"
                >
                  hello@artlux8.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
