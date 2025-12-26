import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Protocols from "./pages/Protocols";
import Shop from "./pages/Shop";
import ShopifyProductDetail from "./pages/ShopifyProductDetail";
import BundleDetail from "./pages/BundleDetail";
import Podcast from "./pages/Podcast";
import FreeProtocol from "./pages/FreeProtocol";
import Dashboard from "./pages/Dashboard";
import ChallengeProgress from "./pages/ChallengeProgress";
import UploadProof from "./pages/UploadProof";
import NotFound from "./pages/NotFound";
import WholesaleCatalog from "./pages/WholesaleCatalog";
import SupplierDashboard from "./pages/SupplierDashboard";
import ExitIntentPopup from "./components/ExitIntentPopup";
import Blog from "./pages/Blog";
import GeneticTesting from "./pages/GeneticTesting";
import Peptides from "./pages/Peptides";
import Bundles from "./pages/Bundles";
import ExpertBiohacker from "./pages/ExpertBiohacker";
import PersonalizedSubscription from "./pages/PersonalizedSubscription";
import ColdPlunge from "./pages/ColdPlunge";
import InfraredMasks from "./pages/InfraredMasks";
import Grounding from "./pages/Grounding";
import WaterSystems from "./pages/WaterSystems";
import AirSystems from "./pages/AirSystems";
import BioactiveNutrients from "./pages/BioactiveNutrients";
import HydrogenBottles from "./pages/HydrogenBottles";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import LongevityProtocol from "./pages/LongevityProtocol";
import ThankYou from "./pages/ThankYou";
import LongevityChat from "./components/LongevityChat";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            {/* <ExitIntentPopup /> */}
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/longevity-protocol" element={<LongevityProtocol />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:handle" element={<ShopifyProductDetail />} />
              <Route path="/bundle/:id" element={<BundleDetail />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/podcasts" element={<Podcast />} />
              <Route path="/free-protocol" element={<FreeProtocol />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/challenge" element={<ChallengeProgress />} />
              <Route path="/dashboard/upload" element={<UploadProof />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/wholesale" element={<WholesaleCatalog />} />
              <Route path="/admin/suppliers" element={<SupplierDashboard />} />
              <Route path="/genetic-testing" element={<GeneticTesting />} />
              <Route path="/peptides" element={<Peptides />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/expert-biohacker" element={<ExpertBiohacker />} />
              <Route path="/personalized-subscription" element={<PersonalizedSubscription />} />
              <Route path="/cold-plunge" element={<ColdPlunge />} />
              <Route path="/infrared-masks" element={<InfraredMasks />} />
              <Route path="/grounding" element={<Grounding />} />
              <Route path="/water-systems" element={<WaterSystems />} />
              <Route path="/oxygen-air-systems" element={<AirSystems />} />
              <Route path="/bioactive-nutrients" element={<BioactiveNutrients />} />
              <Route path="/hydrogen-water-bottles" element={<HydrogenBottles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/thank-you" element={<ThankYou />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
              <LongevityChat />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
