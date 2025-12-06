import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy – ARTLUX Data Protection";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "ARTLUX privacy policy. How we collect, use, and protect your personal information. GDPR compliant data handling.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Your privacy matters. Here's how we protect your data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg text-muted-foreground">
            <p className="text-sm text-muted-foreground">Last updated: December 2024</p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">1. Introduction</h2>
            <p>
              ARTLUX LTD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you visit our website artlux8.com 
              or make a purchase from us.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">2. Information We Collect</h2>
            <h3 className="text-foreground">Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Account credentials</li>
              <li>Order history and preferences</li>
              <li>Communications with us</li>
            </ul>

            <h3 className="text-foreground">Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent</li>
              <li>Referral sources</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about orders, products, and services</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">4. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers (shipping, payment processing, email services)</li>
              <li>Analytics providers</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">5. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze site traffic, 
              and for marketing purposes. You can control cookies through your browser settings.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">6. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:contact@artlux8.com" className="text-accent hover:underline">contact@artlux8.com</a></p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, 
              unless a longer retention period is required by law.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">9. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
              personal information from children.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-8">10. Contact Us</h2>
            <p>
              For any questions about this Privacy Policy or our data practices, contact us at:
            </p>
            <p>
              ARTLUX LTD<br />
              92 Markby Road, Birmingham, West Midlands, B18 4PN, UK<br />
              Email: <a href="mailto:contact@artlux8.com" className="text-accent hover:underline">contact@artlux8.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
