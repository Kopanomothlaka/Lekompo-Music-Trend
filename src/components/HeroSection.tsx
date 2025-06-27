import { Play, Download, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements - more Spotify-like */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Floating music notes */}
        <div className="absolute top-1/4 left-1/4 text-green-500/20 animate-float">
          <Music size={40} />
        </div>
        <div className="absolute top-3/4 right-1/4 text-green-400/20 animate-float" style={{animationDelay: '1s'}}>
          <Music size={32} />
        </div>
        <div className="absolute top-1/3 right-1/3 text-green-300/20 animate-float" style={{animationDelay: '3s'}}>
          <Music size={28} />
        </div>
      </div>
      
      {/* Main hero image */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop" 
          alt="Music concert" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center z-10 max-w-4xl">
        <div className="animate-slide-up">
          {/* Music bars animation */}
          <div className="flex justify-center mb-8">
            <div className="music-bars">
              <div className="music-bar"></div>
              <div className="music-bar"></div>
              <div className="music-bar"></div>
              <div className="music-bar"></div>
              <div className="music-bar"></div>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 gradient-text tracking-tight">
            LEKOMPO MUSIC
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light max-w-3xl mx-auto">
            Where tradition meets innovation
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the revolutionary sound of Lekompo music. Stream, download, and immerse yourself in authentic rhythms reimagined for the modern world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="spotify-green hover:scale-105 text-black font-semibold px-12 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-2xl animate-pulse-glow"
                    onClick={() => navigate('/tracks')}>
              <Play className="mr-3 h-6 w-6" fill="currentColor" />
              Play Now
            </Button>
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 px-12 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    onClick={() => navigate('/downloads')}>
              <Download className="mr-3 h-6 w-6" />
              Free Downloads
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-green-400 mb-2">1M+</div>
              <div className="text-gray-400 text-sm">Monthly Listeners</div>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-400 text-sm">Tracks Available</div>
            </div>
            <div className="text-center animate-slide-in-right" style={{animationDelay: '0.6s'}}>
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-400 text-sm">Featured Artists</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
