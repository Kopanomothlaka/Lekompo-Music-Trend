
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const News = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <NewsSection />
      </div>
      <Footer />
    </div>
  );
};

export default News;
