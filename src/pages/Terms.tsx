import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service – ARTLUX Legal Terms";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "ARTLUX terms of service. Legal terms and conditions for using our website and purchasing our products.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg text-muted-foreground">
            <p className="text-sm text-muted-foreground">Last updated: December 2024</p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">1. Agreement to Terms</h2>
            <p>
              By accessing or using the ARTLUX website (artlux8.com) and purchasing our products, 
              you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree 
              with any part of these terms, you may not access our services.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">2. Company Information</h2>
            <p>
              ARTLUX LTD is a company registered in England and Wales.<br />
              Company Number: 12280833<br />
              Registered Address: 92 Markby Road, Birmingham, West Midlands, B18 4PN, UK
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">3. Products and Services</h2>
            <p>
              ARTLUX sells health and wellness supplements, devices, and related products. 
              Our products are not intended to diagnose, treat, cure, or prevent any disease. 
              Always consult with a healthcare professional before starting any supplement regimen.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">4. Ordering and Payment</h2>
            <ul>
              <li>All prices are displayed in your selected currency and include applicable taxes</li>
              <li>We reserve the right to refuse or cancel orders at our discretion</li>
              <li>Payment must be received in full before order dispatch</li>
              <li>We accept major credit cards and other payment methods as displayed at checkout</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">5. Shipping and Delivery</h2>
            <p>
              Shipping times and costs are displayed at checkout. We are not responsible for delays 
              caused by customs, postal services, or other factors beyond our control. 
              See our <a href="/shipping" className="text-accent hover:underline">Shipping Policy</a> for full details.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">6. Returns and Refunds</h2>
            <p>
              We offer a 30-day money-back guarantee on most products. 
              See our <a href="/returns" className="text-accent hover:underline">Returns Policy</a> for full details and conditions.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, 
              is the property of ARTLUX LTD and protected by intellectual property laws. 
              You may not reproduce, distribute, or create derivative works without our written permission.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">8. User Accounts</h2>
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">9. Disclaimer of Warranties</h2>
            <p>
              Our products are provided "as is" without warranties of any kind. 
              We do not guarantee that our products will meet your specific requirements or expectations. 
              Results may vary between individuals.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ARTLUX LTD shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising from your use of our products or services.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">11. Health Disclaimer</h2>
            <p>
              Our products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. 
              Consult your healthcare provider before using any supplements, especially if you are pregnant, nursing, 
              have a medical condition, or are taking medications.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">12. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of England and Wales. 
              Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
              Your continued use of our services constitutes acceptance of the modified terms.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">14. Contact Us</h2>
            <p>
              For questions about these Terms of Service, contact us at:<br />
              Email: <a href="mailto:hello@artlux8.com" className="text-accent hover:underline">hello@artlux8.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
