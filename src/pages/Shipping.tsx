import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Globe, Clock, Package } from "lucide-react";

const Shipping = () => {
  useEffect(() => {
    document.title = "Shipping Information – ARTLUX Worldwide Delivery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "ARTLUX shipping information. Free worldwide shipping on qualifying orders. Fast delivery to UK, EU, USA, and international destinations.");
    }
  }, []);

  const shippingZones = [
    {
      zone: "United Kingdom",
      standard: "2-4 business days",
      express: "1-2 business days",
      freeThreshold: "£60",
      standardCost: "£4.99",
      expressCost: "£9.99",
    },
    {
      zone: "European Union",
      standard: "5-7 business days",
      express: "3-4 business days",
      freeThreshold: "€70",
      standardCost: "€7.99",
      expressCost: "€14.99",
    },
    {
      zone: "United States",
      standard: "7-10 business days",
      express: "4-5 business days",
      freeThreshold: "$75",
      standardCost: "$9.99",
      expressCost: "$19.99",
    },
    {
      zone: "Rest of World",
      standard: "10-14 business days",
      express: "5-7 business days",
      freeThreshold: "$100",
      standardCost: "$14.99",
      expressCost: "$29.99",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Shipping Information
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Fast, reliable worldwide shipping. Free delivery on qualifying orders.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <Truck className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Free Shipping</h3>
                <p className="text-muted-foreground text-sm">On qualifying orders</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Worldwide</h3>
                <p className="text-muted-foreground text-sm">We ship globally</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Fast Dispatch</h3>
                <p className="text-muted-foreground text-sm">Orders ship within 24h</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <Package className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Tracked</h3>
                <p className="text-muted-foreground text-sm">Full order tracking</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shipping Rates */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            Shipping Rates & Times
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Region</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Standard</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Express</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Free Over</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-4 px-4">
                      <span className="font-medium text-foreground">{zone.zone}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-foreground">{zone.standardCost}</span>
                      <span className="text-muted-foreground text-sm block">{zone.standard}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-foreground">{zone.expressCost}</span>
                      <span className="text-muted-foreground text-sm block">{zone.express}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-accent font-semibold">{zone.freeThreshold}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Additional Information
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <h3 className="text-foreground">Order Processing</h3>
            <p>Orders placed before 2pm GMT on business days are dispatched the same day. Orders placed after 2pm or on weekends will be dispatched the next business day.</p>
            
            <h3 className="text-foreground">Tracking</h3>
            <p>Once your order is dispatched, you'll receive a confirmation email with a tracking number. You can track your order status at any time through your account dashboard.</p>
            
            <h3 className="text-foreground">Customs & Duties</h3>
            <p>For international orders, customs duties and import taxes may apply depending on your country's regulations. These charges are the responsibility of the recipient.</p>
            
            <h3 className="text-foreground">Questions?</h3>
            <p>If you have any questions about shipping, please contact us at <a href="mailto:hello@artlux8.com" className="text-accent hover:underline">hello@artlux8.com</a></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;
