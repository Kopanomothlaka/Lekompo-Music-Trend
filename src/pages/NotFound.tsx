import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 pb-32">
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Music icon animation */}
              <div className="mb-8">
                <div className="p-8 spotify-green rounded-full w-32 h-32 mx-auto animate-pulse-glow flex items-center justify-center">
                  <Music className="h-16 w-16 text-black" />
                </div>
              </div>
              
              <h1 className="text-8xl md:text-9xl font-black mb-6 gradient-text">404</h1>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Oops! Page Not Found
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild
                  className="spotify-green hover:scale-105 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-2xl"
                >
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
                
                <Button 
                  variant="outline"
                  asChild
                  className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link to="/tracks">
                    <Music className="mr-2 h-5 w-5" />
                    Browse Tracks
                  </Link>
                </Button>
              </div>
              
              <div className="mt-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm">
                  <strong>Requested URL:</strong> {location.pathname}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
