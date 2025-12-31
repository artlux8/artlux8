import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Shield, Clock, CheckCircle } from "lucide-react";

const Returns = () => {
  useEffect(() => {
    document.title = "Returns & Refunds – ARTLUX 30-Day Money-Back Guarantee";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "ARTLUX returns and refunds policy. 30-day money-back guarantee on all products. Easy, hassle-free returns process.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Returns & Refunds
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            30-day money-back guarantee on all products. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">30 Days</h3>
                <p className="text-muted-foreground text-sm">Return window</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Full Refund</h3>
                <p className="text-muted-foreground text-sm">100% money back</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <RefreshCw className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Easy Process</h3>
                <p className="text-muted-foreground text-sm">Hassle-free returns</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border text-center">
              <CardContent className="p-6">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Fast Refunds</h3>
                <p className="text-muted-foreground text-sm">5-7 business days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg text-muted-foreground">
            <h2 className="font-display text-2xl font-bold text-foreground">Our Guarantee</h2>
            <p>
              We stand behind every product we sell. If you're not completely satisfied with your purchase for any reason, 
              you may return it within 30 days of delivery for a full refund.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-10">Return Eligibility</h2>
            <ul>
              <li>Products must be returned within 30 days of delivery</li>
              <li>Items must be in original, unopened packaging for full refund</li>
              <li>Opened products may be returned but are subject to a 25% restocking fee</li>
              <li>Personalized or custom items cannot be returned unless defective</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-foreground mt-10">How to Return</h2>
            <ol>
              <li><strong>Contact Us:</strong> Email <a href="mailto:hello@artlux8.com" className="text-accent hover:underline">hello@artlux8.com</a> with your order number and reason for return</li>
              <li><strong>Receive Instructions:</strong> We'll provide a return shipping label and instructions</li>
              <li><strong>Ship Items:</strong> Pack items securely and ship using the provided label</li>
              <li><strong>Get Refunded:</strong> Once we receive and inspect your return, we'll process your refund within 5-7 business days</li>
            </ol>

            <h2 className="font-display text-2xl font-bold text-foreground mt-10">Refund Method</h2>
            <p>
              Refunds will be issued to the original payment method. Please allow 5-7 business days for the refund to appear 
              in your account after we process it.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-10">Damaged or Defective Items</h2>
            <p>
              If you receive a damaged or defective product, please contact us immediately with photos of the issue. 
              We'll arrange for a replacement or full refund at no additional cost to you.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-10">Return Shipping</h2>
            <p>
              For standard returns, customers are responsible for return shipping costs. 
              For defective or incorrectly shipped items, we'll provide a prepaid return label.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-10">Questions?</h2>
            <p>
              If you have any questions about our return policy, please contact our support team at{" "}
              <a href="mailto:hello@artlux8.com" className="text-accent hover:underline">hello@artlux8.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Returns;
