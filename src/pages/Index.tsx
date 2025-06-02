
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DownloadsSection from "@/components/DownloadsSection";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <DownloadsSection />
      <NewsSection />
      <VideoSection />
      <Footer />
    </div>
  );
};

export default Index;
