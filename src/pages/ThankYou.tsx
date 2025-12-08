import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Package, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ThankYou = () => {
  useEffect(() => {
    // Clear cart after successful checkout
    localStorage.removeItem('shopify-cart');
  }, []);

  return (
    <>
      <Helmet>
        <title>Thank You | ARTLUX∞ - THE LUXURY LONGEVITY</title>
        <meta name="description" content="Thank you for your order. Your journey to optimal longevity begins now." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Success Animation */}
            <div className="max-w-2xl mx-auto text-center">
              {/* Gold Check Icon */}
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" />
              </div>

              {/* Thank You Message */}
              <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground mb-4">
                Thank You
              </h1>
              <p className="text-xl text-primary font-cinzel mb-6">
                Your Order Has Been Confirmed
              </p>
              <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
                Welcome to the ARTLUX∞ community. Your journey to optimal longevity and cellular vitality begins now.
              </p>

              {/* Order Info Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-card border border-border/50 rounded-xl p-6 text-left hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Confirmation Email</h3>
                      <p className="text-sm text-muted-foreground">Sent to your inbox</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an order confirmation with tracking details once your package ships.
                  </p>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 text-left hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Fast Shipping</h3>
                      <p className="text-sm text-muted-foreground">Premium delivery</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your order will be carefully packaged and shipped within 1-2 business days.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/shop">
                    Continue Shopping
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                  <Link to="/free-protocol">
                    Explore Free Protocol
                  </Link>
                </Button>
              </div>

              {/* Longevity Quote */}
              <div className="border-t border-border/30 pt-12">
                <blockquote className="text-lg italic text-muted-foreground max-w-xl mx-auto">
                  "The goal isn't just to live longer—it's to live better, with energy, clarity, and vitality at every age."
                </blockquote>
                <p className="text-primary font-cinzel mt-4">— ARTLUX∞ Philosophy</p>
              </div>

              {/* Infinity Symbol */}
              <div className="mt-12">
                <span className="text-6xl font-cinzel bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-pulse">
                  ∞
                </span>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThankYou;
