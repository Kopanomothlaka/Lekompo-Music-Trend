
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TracksSection from "@/components/TracksSection";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <TracksSection />
      <NewsSection />
      <VideoSection />
      <Footer />
    </div>
  );
};

export default Index;
