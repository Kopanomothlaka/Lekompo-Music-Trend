import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Tracks from "./pages/Tracks";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Videos from "./pages/Videos";
import Downloads from "./pages/Downloads";
import About from "./pages/About";
import Education from "./pages/Education";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
