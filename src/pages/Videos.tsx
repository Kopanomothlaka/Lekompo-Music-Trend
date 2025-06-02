
import Header from "@/components/Header";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

const Videos = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <VideoSection />
      </div>
      <Footer />
    </div>
  );
};

export default Videos;
