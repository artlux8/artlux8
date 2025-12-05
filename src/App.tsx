import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
import NewsletterPopup from "./components/NewsletterPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <NewsletterPopup />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:handle" element={<ShopifyProductDetail />} />
              <Route path="/bundle/:id" element={<BundleDetail />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/free-protocol" element={<FreeProtocol />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/challenge" element={<ChallengeProgress />} />
              <Route path="/dashboard/upload" element={<UploadProof />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
