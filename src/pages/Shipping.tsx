import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Globe, Clock, Package, MapPin } from "lucide-react";
import { useLocalizationStore } from "@/stores/localizationStore";
import OrderTracker from "@/components/OrderTracker";

const Shipping = () => {
  const { formatPrice, fetchLiveRates } = useLocalizationStore();

  useEffect(() => {
    document.title = "Shipping Information – ARTLUX Worldwide Delivery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "ARTLUX shipping information. Free worldwide shipping on qualifying orders. Fast delivery to UK, EU, USA, and international destinations.");
    }
    fetchLiveRates();
  }, [fetchLiveRates]);

  // Base prices in USD for conversion
  const shippingZones = [
    {
      zone: "United Kingdom",
      standard: "2-4 days",
      express: "1-2 days",
      freeThreshold: 75,
      standardCost: 6.29,
      expressCost: 12.59,
    },
    {
      zone: "European Union",
      standard: "5-7 days",
      express: "3-4 days",
      freeThreshold: 82,
      standardCost: 9.49,
      expressCost: 17.79,
    },
    {
      zone: "United States",
      standard: "7-10 days",
      express: "4-5 days",
      freeThreshold: 75,
      standardCost: 9.99,
      expressCost: 19.99,
    },
    {
      zone: "Rest of World",
      standard: "10-14 days",
      express: "5-7 days",
      freeThreshold: 100,
      standardCost: 14.99,
      expressCost: 29.99,
    },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On qualifying orders" },
    { icon: Globe, title: "Worldwide", desc: "We ship globally" },
    { icon: Clock, title: "Fast Dispatch", desc: "Ships within 24h" },
    { icon: Package, title: "Tracked", desc: "Full order tracking" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Compact Hero */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Shipping Information
          </h1>
          <p className="text-primary-foreground/80 text-base max-w-md mx-auto">
            Fast, reliable worldwide shipping with free delivery on qualifying orders.
          </p>
        </div>
      </section>

      {/* Compact Features Row */}
      <section className="py-6 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-center">
                <feat.icon className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <span className="font-medium text-foreground text-sm">{feat.title}</span>
                  <span className="text-muted-foreground text-xs ml-1">– {feat.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Rates Table */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
            Shipping Rates & Times
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Region</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Standard</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Express</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Free Over</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, index) => (
                  <tr key={index} className="border-t border-border hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground text-sm">{zone.zone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-foreground text-sm">{formatPrice(zone.standardCost, false)}</span>
                      <span className="text-muted-foreground text-xs block">{zone.standard}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-foreground text-sm">{formatPrice(zone.expressCost, false)}</span>
                      <span className="text-muted-foreground text-xs block">{zone.express}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-accent font-semibold text-sm">{formatPrice(zone.freeThreshold)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Order Tracking */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Track Your Order
            </h2>
          </div>
          <OrderTracker />
        </div>
      </section>

      {/* Compact Additional Info */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Additional Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Order Processing</h3>
              <p className="text-muted-foreground">Orders placed before 2pm GMT ship same day. Weekend orders ship next business day.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Tracking</h3>
              <p className="text-muted-foreground">You'll receive a tracking number via email once your order ships.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Customs & Duties</h3>
              <p className="text-muted-foreground">International orders may incur customs duties depending on your country.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Questions?</h3>
              <p className="text-muted-foreground">Contact us at <a href="mailto:hello@artlux8.com" className="text-accent hover:underline">hello@artlux8.com</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;