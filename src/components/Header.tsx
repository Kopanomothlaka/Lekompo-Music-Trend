
import { Music, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-gray-800/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 animate-slide-in-left">
            <div className="p-2 spotify-green rounded-xl animate-pulse-glow">
              <Music className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-2xl font-black gradient-text">Lovable Lekompo</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            <Link to="/" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/tracks" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              Tracks
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/news" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              News
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/videos" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105 font-medium relative group">
              Videos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-green-400 transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tracks" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tracks
              </Link>
              <Link 
                to="/news" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                to="/videos" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Videos
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
