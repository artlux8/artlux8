import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

// Custom TikTok icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom Pinterest icon
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44.21-.94 1.37-5.85 1.37-5.85s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.49.75 1.49 1.66 0 1.02-.65 2.54-.98 3.95-.28 1.17.59 2.13 1.74 2.13 2.09 0 3.7-2.2 3.7-5.38 0-2.81-2.02-4.78-4.9-4.78a5.07 5.07 0 0 0-5.29 5.08c0 1 .39 2.08.87 2.66.1.12.11.22.08.34-.09.36-.28 1.17-.32 1.33-.05.22-.17.26-.39.16-1.46-.68-2.37-2.81-2.37-4.52 0-3.67 2.67-7.05 7.7-7.05 4.04 0 7.19 2.88 7.19 6.73 0 4.02-2.53 7.25-6.05 7.25-1.18 0-2.29-.61-2.67-1.34l-.73 2.77c-.26 1.01-.97 2.28-1.44 3.06A12 12 0 1 0 12 0z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="text-2xl font-logo font-semibold tracking-[0.25em] mb-2 block">ARTLUX<span className="logo-infinity-light text-3xl font-bold ml-0.5">∞</span></span>
            <span className="text-[9px] text-primary-foreground/60 mb-4 block tracking-[0.2em] uppercase font-medium">The Luxury Longevity</span>
            <p className="text-primary-foreground/60 text-sm mb-4 max-w-xs">
              Premium supplements and protocols designed for optimal longevity, backed by cutting-edge science.
            </p>
            <div className="text-primary-foreground/60 text-sm mb-4 space-y-1">
              <p className="font-semibold text-primary-foreground">ARTLUX LTD</p>
              <p>Company No: 12280833</p>
              <p>92 Markby Road, Birmingham</p>
              <p>West Midlands, B18 4PN, UK</p>
              <a href="mailto:contact@artlux8.com" className="hover:text-primary-foreground transition-colors block">
                contact@artlux8.com
              </a>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.instagram.com/artlux_88" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@artlux_88" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="TikTok - ARTLUX">
                <TikTokIcon />
              </a>
              <a href="https://www.tiktok.com/@garybrecka" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="TikTok - Gary Brecka">
                <TikTokIcon />
              </a>
              <a href="https://www.tiktok.com/@bryanjohnson" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="TikTok - Bryan Johnson">
                <TikTokIcon />
              </a>
              <a href="https://www.pinterest.com/garybrecka" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="Pinterest - Gary Brecka">
                <PinterestIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/shop" className="hover:text-primary-foreground transition-colors">All Products</a></li>
              <li><a href="/hydrogen-water-bottles" className="hover:text-primary-foreground transition-colors">Hydrogen Bottles</a></li>
              <li><a href="/cold-plunge" className="hover:text-primary-foreground transition-colors">Cold Plunge</a></li>
              <li><a href="/grounding" className="hover:text-primary-foreground transition-colors">Grounding</a></li>
              <li><a href="/bundles" className="hover:text-primary-foreground transition-colors">Bundles</a></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/longevity-protocol" className="hover:text-primary-foreground transition-colors">Protocols</a></li>
              <li><a href="/podcast" className="hover:text-primary-foreground transition-colors">Podcast</a></li>
              <li><a href="/free-protocol" className="hover:text-primary-foreground transition-colors">Free Protocol</a></li>
              <li><a href="/blog" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="/genetic-testing" className="hover:text-primary-foreground transition-colors">Genetic Testing</a></li>
              <li><a href="/expert-biohacker" className="hover:text-primary-foreground transition-colors">Expert Biohacker</a></li>
              <li><a href="/contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/shipping" className="hover:text-primary-foreground transition-colors">Shipping</a></li>
              <li><a href="/returns" className="hover:text-primary-foreground transition-colors">Returns</a></li>
              <li><a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2024 ARTLUX LTD. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/40">
            <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
