
import Header from "@/components/Header";
import DownloadsSection from "@/components/DownloadsSection";
import Footer from "@/components/Footer";

const Downloads = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <DownloadsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Downloads;
