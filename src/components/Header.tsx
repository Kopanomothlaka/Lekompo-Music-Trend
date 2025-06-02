
import { Music } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg animate-pulse-glow">
              <Music className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Lovable Lekompo</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
              Home
            </a>
            <a href="#downloads" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
              Downloads
            </a>
            <a href="#news" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
              News
            </a>
            <a href="#videos" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
              Videos
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
